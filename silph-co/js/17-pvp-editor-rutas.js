/* ═══ EDITOR DE RUTAS (Modo Dios) ═══ */
var _erRutas = []; // copia de trabajo

function erCargar(){
  _erRutas = ((baseDatos.lockeActivo && baseDatos.lockeActivo.rutasDefinidas) || []).slice();
  erRender();
}

function erRender(){
  var lista = document.getElementById('er-lista');
  var vacio = document.getElementById('er-vacio');
  if(!lista) return;
  if(!_erRutas.length){
    lista.innerHTML = '';
    if(vacio) vacio.style.display = 'block';
    return;
  }
  if(vacio) vacio.style.display = 'none';
  lista.innerHTML = _erRutas.map(function(r, i){
    return '<div class="nl-ruta-row" id="er-row-'+i+'">'
      + '<span class="nl-ruta-orden">'+(i+1)+'</span>'
      + '<input value="'+escaparHTML(r)+'" data-idx="'+i+'" data-er-input="1"'
      +   ' style="flex:1;background:var(--bg-overlay);color:var(--blanco);border:1px solid transparent;border-radius:4px;font-family:var(--font-display);font-size:12px;font-weight:700;outline:none;min-width:0;padding:3px 7px;transition:border-color .15s">'
      + '<button class="nl-ruta-up" data-er-up="'+i+'" title="Subir" '+(i===0?'disabled style="opacity:.3"':'')+'>▲</button>'
      + '<button class="nl-ruta-down" data-er-down="'+i+'" title="Bajar" '+(i===_erRutas.length-1?'disabled style="opacity:.3"':'')+'>▼</button>'
      + '<button class="nl-ruta-del" data-er-del="'+i+'" title="Eliminar">✕</button>'
      + '</div>';
  }).join('');
  // Event delegation: un solo listener en el contenedor
  lista.oninput = function(e){
    var inp = e.target;
    if(inp.dataset.erInput){
      var idx = parseInt(inp.dataset.idx, 10);
      if(!isNaN(idx)) _erRutas[idx] = inp.value;
    }
  };
  lista.onclick = function(e){
    var btn = e.target;
    if(btn.dataset.erUp  !== undefined){ erMover(parseInt(btn.dataset.erUp,10), -1); return; }
    if(btn.dataset.erDown!== undefined){ erMover(parseInt(btn.dataset.erDown,10), 1); return; }
    if(btn.dataset.erDel !== undefined){ erEliminar(parseInt(btn.dataset.erDel,10)); return; }
  };
}

window.erAnadirRuta = function(){
  var inp = document.getElementById('er-input');
  var nombre = (inp ? inp.value.trim() : '');
  if(!nombre){ mostrarNotificacion('Escribe el nombre de la ruta.','error','🗺️'); return; }
  _erRutas.push(nombre);
  if(inp) inp.value = '';
  erRender();
  // Scroll al final
  var lista = document.getElementById('er-lista');
  if(lista) lista.scrollTop = lista.scrollHeight;
};

// Lee los valores actuales de los inputs del DOM antes de operar
function erSincronizarInputs(){
  var lista = document.getElementById('er-lista');
  if(!lista) return;
  lista.querySelectorAll('[data-er-input]').forEach(function(inp){
    var idx = parseInt(inp.dataset.idx, 10);
    if(!isNaN(idx) && idx < _erRutas.length) _erRutas[idx] = inp.value;
  });
}

window.erMover = function(idx, dir){
  erSincronizarInputs();
  var dest = idx + dir;
  if(dest < 0 || dest >= _erRutas.length) return;
  var tmp = _erRutas[idx];
  _erRutas[idx] = _erRutas[dest];
  _erRutas[dest] = tmp;
  erRender();
};

window.erEliminar = function(idx){
  erSincronizarInputs();
  var nombre = _erRutas[idx];
  mostrarConfirmacion({
    icono:'🗑️',
    titulo:'Eliminar ruta',
    descripcion:'"'+nombre+'" se quitará de la lista. Los trackers que ya tengan esta ruta la conservarán hasta que guardes.',
    textoConfirmar:'Eliminar',
    tipo:'peligro'
  }).then(function(cf){
    if(!cf) return;
    _erRutas.splice(idx, 1);
    erRender();
  });
};

window.erGuardarRutas = function(){
  // Capturar últimos valores escritos en los inputs antes de leer _erRutas
  erSincronizarInputs();

  var limpias = _erRutas.map(function(r){ return (r||'').trim(); }).filter(Boolean);
  _erRutas = limpias;

  if(!baseDatos.lockeActivo) baseDatos.lockeActivo = {};
  baseDatos.lockeActivo.rutasDefinidas = limpias.slice();

  // Sincronizar trackers de todos los jugadores:
  // — rutas existentes (por nombre) conservan su estado y pokémon
  // — rutas nuevas se añaden como 'pendiente'
  // — rutas eliminadas desaparecen del tracker
  Object.keys(baseDatos.jugadores || {}).forEach(function(uid){
    var u = baseDatos.jugadores[uid];
    if(!u) return;
    var trackerActual = u.tracker || [];
    u.tracker = limpias.map(function(nombre, i){
      var existing = trackerActual.find(function(t){ return t.ruta === nombre; });
      if(existing){
        return { orden: i, ruta: nombre, estado: existing.estado, pokemon: existing.pokemon||'', mote: existing.mote||'' };
      }
      return { orden: i, ruta: nombre, estado: 'pendiente', pokemon: '', mote: '' };
    });
  });

  guardarBD();
  logAdmin('🗺️','Editor de Rutas','Rutas actualizadas: '+limpias.length+' rutas');
  erRender();

  // Refrescar tracker y mapa en tiempo real para todos los que estén viendo
  if(window.renderizarTracker) renderizarTracker();
  if(window.renderizarMapaInicio) renderizarMapaInicio();
  if(window.renderizarMapaTracker) renderizarMapaTracker();

  var av = document.getElementById('er-aviso-cambios');
  if(av){
    av.style.display = 'block';
    setTimeout(function(){ av.style.display = 'none'; }, 3000);
  }
  mostrarNotificacion('Rutas guardadas. Trackers y mapa sincronizados.','exito','🗺️');
};

window.erDescartar = function(){
  erCargar();
  mostrarNotificacion('Cambios descartados.','info','↩️');
};
