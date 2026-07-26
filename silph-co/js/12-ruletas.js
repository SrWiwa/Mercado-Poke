/* ═══════════ RULETAS ═══════════ */
var RULETA_COLORES = ['#d8293f','#3e6fa6','#c99a2e','#1e9e73','#8e4fc7','#5b52c7','#b8602e','#e2646f'];
var _ruletaEditorOpciones = [];
var _ruletaActivaId = null;
var _ruletaGirando = false;

window.renderizarRuletas = function(){
  var grid = document.getElementById('ruletas-grid');
  var vacio = document.getElementById('ruletas-vacio');
  if(!grid) return;
  var ruletas = baseDatos.ruletas || {};
  var ids = Object.keys(ruletas);
  if(!ids.length){
    grid.innerHTML = '';
    if(vacio) vacio.style.display = 'block';
    return;
  }
  if(vacio) vacio.style.display = 'none';
  grid.innerHTML = ids.map(function(id){
    var r = ruletas[id];
    var opts = r.opciones || [];
    return '<div class="card" style="padding:16px">'
      + '<div style="font-family:var(--font-display);font-size:13px;font-weight:800;color:var(--blanco);margin-bottom:4px">🎡 '+escaparHTML(r.nombre)+'</div>'
      + '<div style="font-size:10px;color:var(--txt-muted);font-family:var(--font-display);margin-bottom:12px">'+opts.length+' opciones · por '+escaparHTML((r.autor||'?').toUpperCase())+'</div>'
      + '<div style="display:flex;gap:6px">'
      + '<button class="btn-admin packs" style="margin-bottom:0;flex:1" onclick="abrirGirarRuleta(\''+id+'\')">🎡 Girar</button>'
      + '<button class="btn-admin-sm" style="border:1px solid var(--borde);background:var(--bg-overlay);color:var(--txt-secondary)" onclick="abrirEditorRuleta(\''+id+'\')">✏️</button>'
      + '<button class="btn-admin-sm danger" onclick="eliminarRuleta(\''+id+'\')">🗑️</button>'
      + '</div>'
      + '</div>';
  }).join('');
};

window.abrirEditorRuleta = function(id){
  var overlay = document.getElementById('ruleta-editor-overlay');
  var titulo = document.getElementById('ruleta-editor-titulo');
  var nombreInput = document.getElementById('ruleta-editor-nombre');
  var idInput = document.getElementById('ruleta-editor-id');
  if(id && baseDatos.ruletas && baseDatos.ruletas[id]){
    var r = baseDatos.ruletas[id];
    titulo.textContent = '✏️ Editar Ruleta';
    nombreInput.value = r.nombre;
    idInput.value = id;
    _ruletaEditorOpciones = (r.opciones||[]).slice();
  } else {
    titulo.textContent = '🎡 Nueva Ruleta';
    nombreInput.value = '';
    idInput.value = '';
    _ruletaEditorOpciones = ['',''];
  }
  _renderOpcionesEditorRuleta();
  overlay.style.display = 'flex';
};
window.cerrarEditorRuleta = function(){
  document.getElementById('ruleta-editor-overlay').style.display = 'none';
};
function _renderOpcionesEditorRuleta(){
  var box = document.getElementById('ruleta-editor-opciones');
  box.innerHTML = _ruletaEditorOpciones.map(function(texto, idx){
    return '<div style="display:flex;gap:6px;align-items:center">'
      + '<input type="text" class="admin-input" style="margin-bottom:0;flex:1" value="'+escaparHTML(texto)+'" placeholder="Opción '+(idx+1)+'" oninput="_ruletaEditorOpciones['+idx+']=this.value">'
      + '<button type="button" onclick="quitarOpcionRuleta('+idx+')" style="background:rgba(216,41,63,.1);border:1px solid rgba(216,41,63,.3);color:#e2646f;border-radius:var(--r-sm);padding:8px 10px;cursor:pointer;flex-shrink:0">✕</button>'
      + '</div>';
  }).join('');
}
window.anadirOpcionRuleta = function(){
  _ruletaEditorOpciones.push('');
  _renderOpcionesEditorRuleta();
};
window.quitarOpcionRuleta = function(idx){
  _ruletaEditorOpciones.splice(idx,1);
  _renderOpcionesEditorRuleta();
};
window.guardarRuleta = function(){
  if(!userSesion) return;
  var nombre = document.getElementById('ruleta-editor-nombre').value.trim();
  var id = document.getElementById('ruleta-editor-id').value;
  var opciones = Array.prototype.map.call(document.querySelectorAll('#ruleta-editor-opciones input'), function(inp){ return inp.value; });
  if(!nombre){ mostrarNotificacion('Ponle un nombre a la ruleta.','error','🎡'); return; }
  if(!baseDatos.ruletas) baseDatos.ruletas = {};
  var esNueva = !id;
  if(!id) id = 'rul_'+Date.now();
  var autorFinal = (baseDatos.ruletas[id] && baseDatos.ruletas[id].autor) || userSesion;
  baseDatos.ruletas[id] = { nombre: nombre, opciones: opciones, autor: autorFinal, fecha: new Date().toLocaleDateString() };
  var _dRul=new Date(),_tsRul=String(_dRul.getDate()).padStart(2,'0')+'/'+String(_dRul.getMonth()+1).padStart(2,'0')+'/'+_dRul.getFullYear()+' '+String(_dRul.getHours()).padStart(2,'0')+':'+String(_dRul.getMinutes()).padStart(2,'0')+':'+String(_dRul.getSeconds()).padStart(2,'0');
  registrarActividadGlobal(userSesion, (esNueva?'creó':'editó')+' la ruleta 🎡 "'+nombre+'"', _tsRul);
  guardarBD();
  reproducirSonido('exito');
  mostrarNotificacion(esNueva?'Ruleta creada 🎡':'Ruleta actualizada 🎡','exito','🎡');
  cerrarEditorRuleta();
  renderizarRuletas();
};
window.eliminarRuleta = function(id){
  if(!baseDatos.ruletas || !baseDatos.ruletas[id]) return;
  var nombre = baseDatos.ruletas[id].nombre;
  mostrarConfirmacion({icono:'🗑️',titulo:'¿Eliminar ruleta?',descripcion:'Se borrará "'+nombre+'" para todo el mundo. Esta acción no se puede deshacer.',tipo:'peligro',textoConfirmar:'Eliminar'}).then(function(ok){
    if(!ok) return;
    delete baseDatos.ruletas[id];
    guardarBD();
    reproducirSonido('cerrar');
    mostrarNotificacion('Ruleta eliminada.','info','🗑️');
    renderizarRuletas();
  });
};

window.abrirGirarRuleta = function(id){
  var r = baseDatos.ruletas && baseDatos.ruletas[id];
  if(!r) return;
  if(!r.opciones || !r.opciones.length){ mostrarNotificacion('Esta ruleta todavía no tiene opciones. Edítala para añadir alguna.','error','🎡'); return; }
  _ruletaActivaId = id;
  document.getElementById('ruleta-girar-nombre').textContent = r.nombre;
  document.getElementById('ruleta-resultado').style.display = 'none';
  var rueda = document.getElementById('ruleta-rueda');
  rueda.style.transition = 'none';
  rueda.style.transform = 'rotate(0deg)';
  void rueda.offsetWidth;
  rueda.style.transition = '';
  _pintarSegmentosRuleta(r.opciones);
  var sel = document.getElementById('ruleta-jugador-selector');
  if(sel){
    sel.innerHTML = '';
    Object.keys(baseDatos.jugadores||{}).forEach(function(uid){
      var opt = document.createElement('option');
      opt.value = uid;
      opt.textContent = uid.toUpperCase();
      if(uid === userSesion) opt.selected = true;
      sel.appendChild(opt);
    });
  }
  var btn = document.getElementById('ruleta-btn-girar');
  btn.disabled = false; btn.style.opacity = '1';
  document.getElementById('ruleta-girar-overlay').style.display = 'flex';
};
window.cerrarGirarRuleta = function(){
  document.getElementById('ruleta-girar-overlay').style.display = 'none';
};
function _pintarSegmentosRuleta(opciones){
  var n = opciones.length;
  var anguloSeg = 360/n;
  var partes = [];
  for(var i=0;i<n;i++){
    var color = RULETA_COLORES[i % RULETA_COLORES.length];
    partes.push(color+' '+(i*anguloSeg)+'deg '+((i+1)*anguloSeg)+'deg');
  }
  document.getElementById('ruleta-rueda').style.background = 'conic-gradient(from 0deg, '+partes.join(', ')+')';
  var segBox = document.getElementById('ruleta-segmentos');
  segBox.innerHTML = opciones.map(function(texto, i){
    var mid = anguloSeg*i + anguloSeg/2;
    var txtShort = texto.length>13 ? texto.slice(0,12)+'…' : texto;
    return '<div style="position:absolute;top:50%;left:50%;width:0;height:0;transform:rotate('+mid+'deg)">'
      + '<span style="position:absolute;left:-45px;top:-100px;width:90px;text-align:center;font-size:10px;font-weight:800;font-family:var(--font-display);color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+escaparHTML(txtShort)+'</span>'
      + '</div>';
  }).join('');
}
window.ejecutarGiroRuleta = function(){
  if(_ruletaGirando) return;
  var r = baseDatos.ruletas && baseDatos.ruletas[_ruletaActivaId];
  if(!r) return;
  var sel = document.getElementById('ruleta-jugador-selector');
  var jugadorTiro = (sel && sel.value) ? sel.value : userSesion;
  var n = r.opciones.length;
  var anguloSeg = 360/n;
  var idxGanador = Math.floor(Math.random()*n);
  // El puntero está arriba (0°). Queremos que el CENTRO del segmento ganador quede en 0°.
  // La rueda gira en sentido horario: para que el segmento i quede arriba
  // hay que rotar (360 - (i*anguloSeg + anguloSeg/2)) grados más las vueltas completas.
  var centroSeg = idxGanador * anguloSeg + anguloSeg / 2;
  var vueltas = 6 + Math.floor(Math.random() * 4);
  var totalGrados = vueltas * 360 + (360 - centroSeg);
  var rueda = document.getElementById('ruleta-rueda');
  var btn = document.getElementById('ruleta-btn-girar');
  _ruletaGirando = true;
  btn.disabled = true; btn.style.opacity = '.5';
  reproducirSonido('abrir');
  var _anguloActual = 0;
  var _velocidad = 18 + Math.random() * 6; // grados por frame al inicio
  var _velocidadMax = _velocidad;
  var _fase = 'acelerando'; // acelerando → girando → frenando
  var _gradosAcum = 0;
  var _umbralAceleracion = totalGrados * 0.15;
  var _umbralFreno = totalGrados * 0.60;
  var _sonidoTick = false;
  function _tick(){
    if(!_ruletaGirando) return;
    if(_fase === 'acelerando'){
      _velocidad = Math.min(_velocidadMax, _velocidad + 0.6);
      if(_gradosAcum >= _umbralAceleracion) _fase = 'girando';
    } else if(_fase === 'girando'){
      if(_gradosAcum >= _umbralFreno) _fase = 'frenando';
    } else {
      // frenado con easing exponencial
      var restantes = totalGrados - _gradosAcum;
      _velocidad = Math.max(0.25, restantes * 0.018 + 0.25);
    }
    _gradosAcum += _velocidad;
    _anguloActual += _velocidad;
    rueda.style.transform = 'rotate(' + _anguloActual + 'deg)';
    // tick sonoro cada vuelta
    var vueltaActual = Math.floor(_gradosAcum / 360);
    var vueltaAnterior = Math.floor((_gradosAcum - _velocidad) / 360);
    if(vueltaActual > vueltaAnterior && _sonidoTick){ /* silencio para no saturar */ }
    _sonidoTick = !_sonidoTick;
    if(_gradosAcum < totalGrados){
      requestAnimationFrame(_tick);
    } else {
      // ajuste fino al ángulo exacto
      rueda.style.transform = 'rotate(' + ((_anguloActual - _gradosAcum) + totalGrados) + 'deg)';
      _ruletaGirando = false;
      btn.disabled = false; btn.style.opacity = '1';
      reproducirSonido('exito');
      var resultado = r.opciones[idxGanador];
      document.getElementById('ruleta-resultado-texto').textContent = resultado;
      document.getElementById('ruleta-resultado').style.display = 'block';
      var textoLog = '🎡 Tiró la ruleta "'+r.nombre+'" → '+resultado;
      inyectarEntradaDiarioAutomaticaPara(jugadorTiro, textoLog);
      guardarBD();
      renderizarActividadGlobalInicio();
    }
  }
  requestAnimationFrame(_tick);
};

window.trackerCambiarEstado = function(idx, nuevoEstado){
  if(!userSesion||!baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  if(!u.tracker || !u.tracker[idx]) return;
  var entrada = u.tracker[idx];
  var estadoAnterior = entrada.estado;
  entrada.estado = nuevoEstado;

  if(nuevoEstado === 'atrapado' && estadoAnterior !== 'atrapado'){
    entrada.pokemon = entrada.pokemon || '';
    entrada.mote = entrada.mote || '';
    inyectarEntradaDiarioAutomatica(`🟢 ${entrada.ruta} - ¡Encuentro Atrapado!`);
    reproducirSonido('exito');
  } else if(nuevoEstado === 'perdido' && estadoAnterior !== 'perdido'){
    inyectarEntradaDiarioAutomatica(`🔴 ${entrada.ruta} - ¡Encuentro Perdido (F)!`);
    reproducirSonido('muerte');
  } else if(nuevoEstado === 'pendiente'){
    entrada.pokemon = '';
    entrada.mote = '';
    inyectarEntradaDiarioAutomatica(`🔄 ${entrada.ruta} - ruta reiniciada en el tracker.`);
  }

  guardarBD();
  renderizarTracker();
  if(window.renderizarMapaInicio) renderizarMapaInicio();
};

window.trackerActualizarPokemon = function(idx, valorCrudo){
  if(!userSesion||!baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  if(!u.tracker || !u.tracker[idx]) return;
  var entrada = u.tracker[idx];
  if(entrada.estado !== 'atrapado') return;

  var val = (valorCrudo||'').trim();
  var nombre = val, mote = '';
  var m = val.match(/^(.*?)\s*"([^"]+)"\s*$/);
  if(m){ nombre = m[1].trim(); mote = m[2].trim(); }

  entrada.pokemon = nombre;
  entrada.mote = mote;
  guardarBD();
  if(nombre){
    inyectarEntradaDiarioAutomatica(`🟢 ${entrada.ruta} - ¡Encuentro Atrapado! (${_trackerNombrePoke(entrada)})`);
  }
};

/* Autocomplete reutilizando la lista de nombres ya cargada por el Hall of Fame (_mipokeNombres) */
window.trackerSugerirPokemon = function(inputEl, idx){
  var sugBox = document.getElementById('tracker-sug-'+idx);
  if(!sugBox) return;
  var raw = inputEl.value || '';
  var motePart = '';
  var mQuote = raw.match(/^(.*?)"(.*)$/);
  var basePart = raw;
  if(mQuote){ basePart = mQuote[1]; motePart = mQuote[2]; }
  var val = basePart.trim().toLowerCase().replace(/\s+/g,'-');
  if(val.length < 2 || typeof _mipokeNombres === 'undefined' || !_mipokeNombres.length){
    sugBox.innerHTML=''; sugBox.style.display='none'; return;
  }
  var matches = _mipokeNombres.filter(function(n){ return n.indexOf(val)!==-1; }).slice(0,6);
  if(!matches.length){ sugBox.innerHTML=''; sugBox.style.display='none'; return; }
  sugBox.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:var(--bg-elevated);border:1px solid var(--borde);border-radius:0 0 var(--r-sm) var(--r-sm);z-index:60;max-height:160px;overflow-y:auto;display:block';
  sugBox.innerHTML = matches.map(function(n){
    var label = n.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
    var motSuffix = motePart ? (' "'+motePart+'"') : '';
    return '<div onclick="trackerSeleccionarSugerencia('+idx+',\''+label.replace(/'/g,"\\'")+'\')" '
      +'style="padding:7px 10px;cursor:pointer;font-size:11px;border-bottom:1px solid var(--borde);color:var(--txt-primary);font-family:var(--font-body)" '
      +'onmouseover="this.style.background=\'var(--bg-overlay)\'" onmouseout="this.style.background=\'\'">'+escaparHTML(label+motSuffix)+'</div>';
  }).join('');
};

window.trackerSeleccionarSugerencia = function(idx, labelConMote){
  var input = document.querySelector('.tracker-row[data-idx="'+idx+'"] .tracker-poke-input');
  var sugBox = document.getElementById('tracker-sug-'+idx);
  if(input){
    input.value = labelConMote;
    trackerActualizarPokemon(idx, labelConMote);
  }
  if(sugBox){ sugBox.innerHTML=''; sugBox.style.display='none'; }
};

document.addEventListener('click', function(e){
  if(!e.target.closest('.tracker-info')){
    document.querySelectorAll('[id^="tracker-sug-"]').forEach(function(s){ s.style.display='none'; });
  }
});

