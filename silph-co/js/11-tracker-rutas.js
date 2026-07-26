/* ═══════════ TRACKER DE ENCUENTROS ═══════════ */
/* Estructura por jugador: baseDatos.jugadores[uid].tracker = [{orden, ruta, estado:'pendiente'|'atrapado'|'perdido', pokemon, mote}] */

function _trackerNombrePoke(entrada){
  if(!entrada.pokemon) return '';
  return entrada.mote ? `${entrada.pokemon} "${entrada.mote}"` : entrada.pokemon;
}

/* ════════════════════════════════════════
   MAPA VISUAL DEL LOCKE — serpentina SVG
   ════════════════════════════════════════ */

var _trackerVista = 'lista'; // 'lista' | 'mapa'

window.trackerCambiarVista = function(vista){
  _trackerVista = vista;
  var btnL = document.getElementById('tracker-btn-lista');
  var btnM = document.getElementById('tracker-btn-mapa');
  var vL   = document.getElementById('tracker-vista-lista');
  var vM   = document.getElementById('tracker-vista-mapa');
  if(btnL) btnL.classList.toggle('activo', vista === 'lista');
  if(btnM) btnM.classList.toggle('activo', vista === 'mapa');
  if(vL)   vL.style.display   = vista === 'lista' ? 'block' : 'none';
  if(vM)   vM.style.display   = vista === 'mapa'  ? 'block' : 'none';
  if(vista === 'mapa') renderizarMapaTracker();
};

/* Mapa del Inicio — usa los mismos datos pero distinto contenedor */
window.renderizarMapaInicio = function(){
  var rutas = (baseDatos && baseDatos.lockeActivo && baseDatos.lockeActivo.rutasDefinidas) || [];
  var card  = document.getElementById('inicio-mapa-card');
  if(!card) return;
  if(!rutas.length || !baseDatos.jugadores){
    card.style.display = 'none';
    return;
  }
  card.style.display = 'block';
  // Reutiliza la lógica SVG del mapa pero renderiza en los IDs del Inicio
  _renderizarMapaSVG(
    document.getElementById('inicio-mapa-svg'),
    document.getElementById('inicio-mapa-leyenda'),
    null,
    rutas
  );
};

window.renderizarMapaTracker = function(){
  var svgEl   = document.getElementById('tracker-mapa-svg');
  var vacioEl = document.getElementById('tracker-mapa-vacio');
  var leyEl   = document.getElementById('tracker-mapa-leyenda');
  if(!svgEl) return;
  var rutas = (baseDatos.lockeActivo && baseDatos.lockeActivo.rutasDefinidas) || [];
  if(!rutas.length){
    svgEl.innerHTML = '';
    if(vacioEl) vacioEl.style.display = 'block';
    if(leyEl)   leyEl.innerHTML = '';
    return;
  }
  if(vacioEl) vacioEl.style.display = 'none';
  _renderizarMapaSVG(svgEl, leyEl, vacioEl, rutas);
};

/* Función central del SVG — compartida entre Inicio y Tracker */
function _renderizarMapaSVG(svgEl, leyEl, vacioEl, rutas){
  if(!svgEl) return;
  var jugadores = baseDatos.jugadores || {};
  var jugIds    = Object.keys(jugadores);

  // Estado de cada ruta agregando todos los jugadores
  var rutaEstados = rutas.map(function(){ return {atrapado:[],perdido:[],pendiente:[]}; });
  jugIds.forEach(function(jid){
    (jugadores[jid].tracker||[]).forEach(function(e){
      var idx=e.orden!==undefined?e.orden:-1;
      if(idx>=0&&idx<rutas.length) (rutaEstados[idx][e.estado]||rutaEstados[idx].pendiente).push(jid);
    });
  });

  // Posición actual de cada jugador (último nodo resuelto)
  var jugadorPos={};
  jugIds.forEach(function(jid){
    var last=-1;
    (jugadores[jid].tracker||[]).forEach(function(e){
      if(e.estado!=='pendiente'){var idx=e.orden!==undefined?e.orden:-1;if(idx>last)last=idx;}
    });
    if(last>=0&&last<rutas.length) jugadorPos[jid]={idx:last};
  });

  // Pokémon capturados por ruta (primer jugador que tenga uno)
  var rutaPoke={};
  jugIds.forEach(function(jid){
    (jugadores[jid].tracker||[]).forEach(function(e){
      var idx=e.orden!==undefined?e.orden:-1;
      if(idx>=0&&e.estado==='atrapado'&&e.pokemon&&!rutaPoke[idx]) rutaPoke[idx]=e.pokemon;
    });
  });

  // Layout — sendero serpenteante tipo mapa real, en vez de rejilla de diagrama
  var NR=22, PY=70, ROW_H=100, MARGIN_X=70, AVR=10, FONT='Georgia,serif';
  var W=520;
  var H=PY*2+Math.max(0,rutas.length-1)*ROW_H+40;

  function nodoPos(i){
    var y = PY + i*ROW_H;
    var x = W/2 + Math.sin(i*0.95)*(W/2-MARGIN_X);
    return {x:x, y:y};
  }

  // Progreso global
  var totalResueltas=rutaEstados.filter(function(e){return e.atrapado.length+e.perdido.length>0;}).length;
  var pctProg=rutas.length?Math.round(totalResueltas/rutas.length*100):0;

  var defs='<defs>'
    +'<linearGradient id="terreno" x1="0" y1="0" x2="0" y2="1">'
    +'<stop offset="0%" stop-color="#1c3a2e"/><stop offset="55%" stop-color="#243d2a"/><stop offset="100%" stop-color="#2e3320"/>'
    +'</linearGradient>'
    +'<filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.55"/></filter>'
    +'</defs>';

  var bg='<rect width="'+W+'" height="'+H+'" fill="url(#terreno)" rx="18"/>'
    +'<rect x="6" y="6" width="'+(W-12)+'" height="'+(H-12)+'" fill="none" stroke="#c9a35e" stroke-width="1.5" stroke-opacity="0.35" rx="13"/>'
    +'<rect x="11" y="11" width="'+(W-22)+'" height="'+(H-22)+'" fill="none" stroke="#c9a35e" stroke-width="0.75" stroke-opacity="0.2" rx="10"/>';

  // Decoración de terreno (árboles / rocas) alternando a los lados del sendero
  var deco='';
  for(var d=0; d<rutas.length; d++){
    var pd=nodoPos(d);
    var lado = (d%2===0) ? -1 : 1;
    var ox = pd.x + lado*(38 + (d*13)%14);
    var oy = pd.y + ((d*7)%23) - 10;
    if(ox>28 && ox<W-28){
      if(d%3===0){
        deco+='<g opacity="0.55"><path d="M'+ox+' '+(oy-10)+' l7 12 h-14 z" fill="#3f6b3f"/><path d="M'+ox+' '+(oy-4)+' l6 10 h-12 z" fill="#4a7a4a"/><rect x="'+(ox-1.5)+'" y="'+(oy+6)+'" width="3" height="6" fill="#5c4632"/></g>';
      } else if(d%3===1){
        deco+='<ellipse cx="'+ox+'" cy="'+(oy+4)+'" rx="7" ry="4.5" fill="#5a6b4a" opacity="0.5"/>';
      } else {
        deco+='<circle cx="'+ox+'" cy="'+oy+'" r="4" fill="#8a8577" opacity="0.4"/><circle cx="'+(ox+5)+'" cy="'+(oy+3)+'" r="3" fill="#8a8577" opacity="0.35"/>';
      }
    }
  }

  // Barra de progreso estilo pergamino, arriba
  var bpW=W-60, bpX=30, bpY=30;
  var progBar='<rect x="'+bpX+'" y="'+bpY+'" width="'+bpW+'" height="9" rx="4.5" fill="#1a1510" opacity="0.5"/>'
    +'<rect x="'+bpX+'" y="'+bpY+'" width="'+Math.round(bpW*pctProg/100)+'" height="9" rx="4.5" fill="'+(pctProg>80?'#4ade80':pctProg>40?'#f5b915':'#c9a35e')+'"/>'
    +'<text x="'+bpX+'" y="'+(bpY-7)+'" font-size="8" fill="#c9a35e" font-family="'+FONT+'" letter-spacing="1.5">RUTA DEL LOCKE</text>'
    +'<text x="'+(bpX+bpW)+'" y="'+(bpY-7)+'" text-anchor="end" font-size="8" font-weight="700" fill="#f5b915" font-family="'+FONT+'">'+pctProg+'%</text>';

  var paths='', nodes='', labels='', avatars='', pokebadges='';

  // Sendero: camino de tierra grueso, discontinuo, entre cada nodo
  for(var i=0;i<rutas.length-1;i++){
    var p1=nodoPos(i),p2=nodoPos(i+1);
    var est=rutaEstados[i];
    var recorrido = est.atrapado.length>est.perdido.length&&est.atrapado.length>0;
    var perdido = est.perdido.length>0 && !recorrido;
    var pc = recorrido?'#4ade80':perdido?'#d8293f':'#7a6a4d';
    var midx=(p1.x+p2.x)/2;
    var d='M'+p1.x+' '+p1.y+' Q'+midx+' '+p1.y+' '+midx+' '+((p1.y+p2.y)/2)+' Q'+midx+' '+p2.y+' '+p2.x+' '+p2.y;
    paths+='<path d="'+d+'" stroke="#160e02" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.35"/>';
    paths+='<path d="'+d+'" stroke="'+pc+'" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.85" stroke-dasharray="1 9"/>';
  }

  // Nodos — marcadores tipo pin de mapa
  for(var i=0;i<rutas.length;i++){
    var pos=nodoPos(i), est=rutaEstados[i];
    var resuelto=est.atrapado.length+est.perdido.length>0;
    var esFinal = est.perdido.length>est.atrapado.length;
    var pinFill = esFinal?'#7a1620':est.atrapado.length>0?'#1a5c34':'#3a3226';
    var pinBorde = esFinal?'#e2646f':est.atrapado.length>0?'#4ade80':'#a89878';
    var ico=esFinal?'✕':est.atrapado.length>0?'✓':String(i+1);
    var ic=esFinal?'#ffd7db':est.atrapado.length>0?'#e8fff0':'#c9c0ac';

    // sombra proyectada del pin sobre el terreno
    nodes+='<ellipse cx="'+pos.x+'" cy="'+(pos.y+NR+3)+'" rx="'+(NR*0.55)+'" ry="4" fill="#000" opacity="0.3"/>';
    // cola del pin
    nodes+='<path d="M'+(pos.x-6)+' '+(pos.y+NR-4)+' L'+pos.x+' '+(pos.y+NR+9)+' L'+(pos.x+6)+' '+(pos.y+NR-4)+' Z" fill="'+pinFill+'" stroke="'+pinBorde+'" stroke-width="1.5"/>';
    if(resuelto){ nodes+='<circle cx="'+pos.x+'" cy="'+pos.y+'" r="'+(NR+3)+'" fill="'+pinBorde+'" opacity="0.15"/>'; }
    nodes+='<circle cx="'+pos.x+'" cy="'+pos.y+'" r="'+NR+'" fill="'+pinFill+'" stroke="'+pinBorde+'" stroke-width="2.5" filter="url(#shadow)"/>';
    nodes+='<text x="'+pos.x+'" y="'+(pos.y+5)+'" text-anchor="middle" font-size="13" font-weight="700" font-family="'+FONT+'" fill="'+ic+'">'+ico+'</text>';

    // Nombre en cartela junto al pin
    var nombre=rutas[i]||('Ruta '+(i+1));
    var nombreShort=nombre.length>16?nombre.slice(0,15)+'…':nombre;
    var lblSide = pos.x > W/2 ? -1 : 1;
    var lblX = pos.x + lblSide*(NR+10);
    labels+='<text x="'+lblX+'" y="'+(pos.y+4)+'" text-anchor="'+(lblSide>0?'start':'end')+'" font-size="9.5" font-style="italic" font-family="'+FONT+'" fill="#e6dcc8">'+escaparHTML(nombreShort)+'</text>';

    // Badge pokémon capturado
    if(rutaPoke[i]){
      var pnombre=rutaPoke[i].length>10?rutaPoke[i].slice(0,9)+'…':rutaPoke[i];
      var badgeW=pnombre.length*5.2+14;
      var by=pos.y-NR-16;
      pokebadges+='<rect x="'+(pos.x-badgeW/2)+'" y="'+by+'" width="'+badgeW+'" height="13" rx="6.5" fill="#14532d" stroke="#4ade80" stroke-width="0.75"/>';
      pokebadges+='<text x="'+pos.x+'" y="'+(by+9.5)+'" text-anchor="middle" font-size="7" font-family="'+FONT+'" fill="#bbf7d0">'+escaparHTML(pnombre)+'</text>';
    }

    // Avatares de jugadores en este nodo
    var aqui=jugIds.filter(function(jid){return jugadorPos[jid]&&jugadorPos[jid].idx===i;});
    aqui.forEach(function(jid,ai){
      var color2=colorParaJugador(jid);
      var esYo=(jid===userSesion);
      var rAv=esYo?(AVR+4):AVR;
      var ax=pos.x-(aqui.length-1)*(AVR+3)+ai*(AVR*2+6);
      var ay=pos.y+NR+22;
      if(esYo){
        avatars+='<circle cx="'+ax+'" cy="'+ay+'" r="'+(rAv+5)+'" fill="none" stroke="#f5b915" stroke-width="2" opacity="0.9"><animate attributeName="r" values="'+(rAv+4)+';'+(rAv+8)+';'+(rAv+4)+'" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite"/></circle>';
      }
      avatars+='<circle cx="'+ax+'" cy="'+ay+'" r="'+rAv+'" fill="'+color2+'" stroke="'+(esYo?'#f5b915':'#160e02')+'" stroke-width="'+(esYo?3:2)+'"/>';
      avatars+='<text x="'+ax+'" y="'+(ay+4)+'" text-anchor="middle" font-size="'+(esYo?7.5:7)+'" font-weight="900" font-family="Arial,sans-serif" fill="#fff">'+(esYo?'TÚ':jid.slice(0,2).toUpperCase())+'</text>';
    });
  }

  svgEl.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;min-width:280px;max-width:'+W+'px;display:block;margin:0 auto">'
    +defs+bg+deco+progBar+paths+nodes+labels+pokebadges+avatars+'</svg>';
  svgEl.style.maxHeight='560px';
  svgEl.style.overflowY='auto';

  if(leyEl){
    var jugConPos=jugIds.filter(function(jid){return jugadorPos[jid];});
    var jugSinPos=jugIds.filter(function(jid){return !jugadorPos[jid];});
    var miResumenHTML='';
    if(jugadorPos[userSesion]){
      var miIdx=jugadorPos[userSesion].idx;
      var miRutaNombre=rutas[miIdx]||('Ruta '+(miIdx+1));
      miResumenHTML='<div style="width:100%;background:rgba(245,185,21,.08);border:1px solid rgba(245,185,21,.3);border-radius:var(--r-md);padding:8px 12px;margin-bottom:8px;font-family:var(--font-display);font-size:11px;color:var(--txt-primary)">📍 Estás en <strong style="color:#f5b915">'+escaparHTML(miRutaNombre)+'</strong> · Ruta '+(miIdx+1)+' de '+rutas.length+'</div>';
    } else {
      miResumenHTML='<div style="width:100%;background:var(--bg-overlay);border:1px solid var(--borde);border-radius:var(--r-md);padding:8px 12px;margin-bottom:8px;font-family:var(--font-display);font-size:11px;color:var(--txt-muted)">📍 Todavía no has avanzado ninguna ruta.</div>';
    }
    var items=jugConPos.map(function(jid){
      var color2=colorParaJugador(jid);
      var ruta2=rutas[jugadorPos[jid].idx]||('Ruta '+(jugadorPos[jid].idx+1));
      return '<div class="tracker-mapa-leyenda-item">'
        +'<div class="tracker-mapa-leyenda-dot" style="background:'+color2+'"></div>'
        +'<span style="color:var(--txt-primary);font-weight:700">'+jid.toUpperCase()+'</span>'
        +'<span style="color:var(--txt-muted)"> — '+escaparHTML(ruta2)+'</span></div>';
    });
    jugSinPos.forEach(function(jid){
      var color2=colorParaJugador(jid);
      items.push('<div class="tracker-mapa-leyenda-item"><div class="tracker-mapa-leyenda-dot" style="background:'+color2+';opacity:.4"></div><span style="color:var(--txt-muted)">'+jid.toUpperCase()+' — Sin avance</span></div>');
    });
    leyEl.innerHTML=miResumenHTML+items.join('');
  }
}


window.renderizarTracker = function(){
  if(!userSesion||!baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  var lista = document.getElementById('tracker-lista');
  var vacio = document.getElementById('tracker-vacio');
  var resumen = document.getElementById('tracker-progreso-resumen');
  var fill = document.getElementById('tracker-progreso-fill');
  if(!lista) return;
  var tracker = u.tracker || [];
  if(!tracker.length){
    lista.innerHTML = '';
    if(vacio) vacio.style.display = 'block';
    if(resumen) resumen.textContent = '0 / 0 rutas';
    if(fill) fill.style.width = '0%';
    return;
  }
  if(vacio) vacio.style.display = 'none';

  var atrapados = tracker.filter(function(e){ return e.estado==='atrapado'; }).length;
  var perdidos  = tracker.filter(function(e){ return e.estado==='perdido'; }).length;
  var resueltos = atrapados + perdidos;
  if(resumen) resumen.textContent = `${resueltos} / ${tracker.length} rutas · ✅ ${atrapados} capturados · 💀 ${perdidos} caídos`;
  if(fill){
    var pct = tracker.length ? Math.round((resueltos/tracker.length)*100) : 0;
    fill.style.width = pct + '%';
    fill.className = 'tracker-progreso-fill' + (perdidos > atrapados ? ' perdido' : '');
  }

  lista.innerHTML = tracker.map(function(e, idx){
    var fila = '<div class="tracker-row estado-'+e.estado+'" data-idx="'+idx+'">';
    if(e.estado !== 'pendiente'){
      fila += '<button class="tracker-btn-reset" onclick="trackerCambiarEstado('+idx+',\'pendiente\')" title="Resetear ruta">🔄</button>';
    }
    fila += '<span class="tracker-orden">'+(e.orden!==undefined?e.orden+1:idx+1)+'.</span>';
    fila += '<div class="tracker-info">';
    fila += '<span class="tracker-ruta-nombre">'+escaparHTML(e.ruta)+'</span>';
    if(e.estado === 'atrapado'){
      fila += '<input type="text" class="tracker-poke-input" placeholder="Pokémon capturado + mote (opcional)" '
            + 'value="'+escaparHTML(_trackerNombrePoke(e))+'" '
            + 'onchange="trackerActualizarPokemon('+idx+',this.value)" '
            + 'oninput="trackerSugerirPokemon(this,'+idx+')" autocomplete="off">';
      fila += '<div class="tracker-sugerencias" id="tracker-sug-'+idx+'" style="position:relative"></div>';
    }
    fila += '</div>';
    if(e.estado === 'pendiente'){
      fila += '<div class="tracker-actions">';
      fila += '<button class="tracker-btn-captura" onclick="trackerCambiarEstado('+idx+',\'atrapado\')">🟢 Captura</button>';
      fila += '<button class="tracker-btn-perdido" onclick="trackerCambiarEstado('+idx+',\'perdido\')">🔴 F</button>';
      fila += '</div>';
    }
    fila += '</div>';
    return fila;
  }).join('');
  // Si el mapa está visible, refrescarlo también
  if(_trackerVista === 'mapa' && window.renderizarMapaTracker) renderizarMapaTracker();
  // Siempre refrescar el mapa del inicio
  if(window.renderizarMapaInicio) renderizarMapaInicio();
};

