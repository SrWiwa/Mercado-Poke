/* ════════════════════════════════════════
   SISTEMA PvP — Duelos con ELO
   ════════════════════════════════════════ */

var PVP_ELO_BASE    = 1000;
var PVP_ELO_GANADOR = 25;
var PVP_ELO_PERDEDOR = 20;

function pvpGetData(){
  if(!baseDatos.pvp) baseDatos.pvp = { duelos:[], elo:{} };
  if(!baseDatos.pvp.duelos) baseDatos.pvp.duelos = [];
  if(!baseDatos.pvp.elo)    baseDatos.pvp.elo    = {};
  return baseDatos.pvp;
}

function pvpGetElo(id){
  var pvp = pvpGetData();
  if(!pvp.elo[id]) pvp.elo[id] = { puntos:PVP_ELO_BASE, victorias:0, derrotas:0, racha:0 };
  return pvp.elo[id];
}

function pvpDueloActivo(){
  var pvp = pvpGetData();
  return pvp.duelos.find(function(d){ return d.estado === 'activo'; }) || null;
}

/* ── Crear duelo ── */
/* ── PVP Pokémon equipos (1–6 por lado) ── */
var _pvpEquipos      = { a: [], b: [] };
var _pvpPokeSelected = { a: null, b: null };

function pvpRenderEquipo(lado){
  var lista  = document.getElementById('pvp-equipo-'+lado+'-lista');
  var btnAdd = document.getElementById('pvp-btn-add-'+lado);
  if(!lista) return;
  var eq = _pvpEquipos[lado];
  lista.innerHTML = eq.map(function(p, i){
    return '<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;background:var(--bg-card);border:1px solid var(--borde);border-radius:var(--r-sm)">'
      +'<img src="'+p.sprite+'" style="width:24px;height:24px;image-rendering:pixelated" onerror="this.style.opacity=\'0.2\'">'
      +'<span style="font-family:var(--font-display);font-size:11px;flex:1;color:var(--txt-primary)">'+escaparHTML(p.nombre)+'</span>'
      +'<button onclick="pvpQuitarPoke(\''+lado+'\','+i+')" style="background:none;border:none;color:var(--txt-muted);cursor:pointer;font-size:15px;padding:0 2px;line-height:1">&#215;</button>'
      +'</div>';
  }).join('');
  if(btnAdd) btnAdd.style.display = eq.length >= 6 ? 'none' : 'block';
}

window.pvpToggleAddPoke = function(lado){
  var formEl  = document.getElementById('pvp-equipo-'+lado+'-form');
  var inputEl = document.getElementById('pvp-poke-'+lado);
  if(!formEl) return;
  var visible = formEl.style.display !== 'none';
  formEl.style.display = visible ? 'none' : 'block';
  if(!visible && inputEl){ inputEl.value=''; inputEl.focus(); _pvpPokeSelected[lado]=null; }
};

window.pvpQuitarPoke = function(lado, idx){
  _pvpEquipos[lado].splice(idx,1);
  pvpRenderEquipo(lado);
};

window.pvpPokeAutocom = function(lado){
  var inputEl = document.getElementById('pvp-poke-'+lado);
  var ddEl    = document.getElementById('pvp-poke-'+lado+'-dd');
  if(!inputEl || !ddEl) return;
  var raw = (inputEl.value||'').trim().toLowerCase();
  var q   = raw.replace(/\s+/g,'-');
  _pvpPokeSelected[lado] = null;
  if(raw.length < 2){ ddEl.style.display='none'; return; }

  function doSearch(){
    var matches = _museoPokeListaCompleta
      .filter(function(p){
        if(p.name.indexOf(q) !== -1) return true;
        return museoPokeLabel(p.name).toLowerCase().indexOf(raw) !== -1;
      }).slice(0,10);
    if(!matches.length){ ddEl.style.display='none'; return; }
    ddEl.innerHTML = matches.map(function(m){
      var id     = museoPokeIdDesdeUrl(m.url);
      var sprite = id ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png' : '';
      var label  = museoPokeLabel(m.name);
      return '<div class="pvp-poke-opt"'
        +' data-label="'+label.replace(/"/g,'&quot;')+'"'
        +' data-sprite="'+sprite+'"'
        +' data-id="'+id+'"'
        +' style="padding:7px 12px;cursor:pointer;font-size:12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--borde);color:var(--txt-primary);font-family:var(--font-body)">'
        +'<img src="'+sprite+'" style="width:28px;height:28px;image-rendering:pixelated" onerror="this.style.opacity=\'0.25\'">'
        +'<span>'+label+'</span>'
        +(id ? '<span style="color:var(--txt-muted);font-size:9px;margin-left:auto">#'+id+'</span>' : '')
        +'</div>';
    }).join('');
    ddEl.style.display = 'block';
    ddEl.onclick = function(ev){
      var opt = ev.target.closest('.pvp-poke-opt');
      if(!opt) return;
      var label  = opt.getAttribute('data-label');
      var sprite = opt.getAttribute('data-sprite');
      var id     = parseInt(opt.getAttribute('data-id'))||0;
      ddEl.style.display = 'none';
      if(_pvpEquipos[lado].length < 6){
        _pvpEquipos[lado].push({ nombre: label, sprite: sprite, num: id });
        pvpRenderEquipo(lado);
      }
      inputEl.value = '';
      var formEl = document.getElementById('pvp-equipo-'+lado+'-form');
      if(formEl) formEl.style.display = 'none';
      _pvpPokeSelected[lado] = null;
    };
  }

  if(_museoPokeListaCargada){ doSearch(); }
  else {
    ddEl.innerHTML = '<div style="padding:10px 12px;font-size:11px;color:var(--txt-muted);font-family:var(--font-display)">⏳ Cargando lista...</div>';
    ddEl.style.display = 'block';
    museoCargarListaCompleta(doSearch);
  }
};

document.addEventListener('click', function(e){
  ['a','b'].forEach(function(lado){
    if(!e.target.closest('#pvp-poke-'+lado) && !e.target.closest('#pvp-poke-'+lado+'-dd')){
      var dd = document.getElementById('pvp-poke-'+lado+'-dd');
      if(dd) dd.style.display = 'none';
    }
  });
});

function pvpRenderSpritesEquipo(equipo){
  if(!equipo || !equipo.length) return '';
  return '<div style="display:flex;flex-wrap:wrap;gap:2px;justify-content:center;margin-top:4px">'
    + equipo.map(function(p){
        return '<img src="'+escaparHTML(p.sprite)+'" title="'+escaparHTML(p.nombre)+'" style="width:30px;height:30px;image-rendering:pixelated" onerror="this.style.opacity=\'0.2\'">';
      }).join('')
    + '</div>';
}

window.pvpCrearDuelo = function(){
  var a  = document.getElementById('pvp-jugador-a').value;
  var b  = document.getElementById('pvp-jugador-b').value;
  var n  = (document.getElementById('pvp-notas').value||'').trim();
  if(!a || !b)         { mostrarNotificacion('Elige los dos jugadores.','error','⚔️'); return; }
  if(a === b)          { mostrarNotificacion('Un jugador no puede luchar contra si mismo.','error','⚔️'); return; }
  if(pvpDueloActivo()) { mostrarNotificacion('Ya hay un duelo activo. Resuelvelo primero.','error','⚔️'); return; }
  var equipoA = _pvpEquipos.a.slice();
  var equipoB = _pvpEquipos.b.slice();
  var pa = equipoA.map(function(p){ return p.nombre; }).join(', ');
  var pb = equipoB.map(function(p){ return p.nombre; }).join(', ');
  var pvp = pvpGetData();
  var duelo = {
    id:        'duelo_'+Date.now(),
    retador:   a,
    retado:    b,
    equipoA:   equipoA,
    equipoB:   equipoB,
    pokeA:     pa,
    pokeB:     pb,
    notas:     n,
    estado:    'activo',
    ganador:   null,
    timestamp: Date.now(),
    fecha:     new Date().toLocaleDateString('es-ES')
  };
  pvp.duelos.unshift(duelo);
  var resLog = (pa||pb ? ' ('+[pa,pb].filter(Boolean).join(' vs ')+')' : '');
  logAdmin('🥊','Crear duelo PvP', a.toUpperCase()+' vs '+b.toUpperCase()+resLog);
  inyectarEntradaDiarioAutomatica('⚔️ Nuevo duelo! '+a.toUpperCase()+' vs '+b.toUpperCase()+resLog);
  mostrarNotificacion('Duelo iniciado! '+a.toUpperCase()+' vs '+b.toUpperCase(),'exito','⚔️');
  var notas = document.getElementById('pvp-notas'); if(notas) notas.value='';
  _pvpEquipos = { a: [], b: [] };
  _pvpPokeSelected = { a: null, b: null };
  ['a','b'].forEach(function(lado){
    pvpRenderEquipo(lado);
    var f = document.getElementById('pvp-equipo-'+lado+'-form'); if(f) f.style.display='none';
    var inp = document.getElementById('pvp-poke-'+lado); if(inp) inp.value='';
  });
  pvpActualizarAdminPanel();
  renderizarDuelosPvP();
};


/* ── Resolver duelo ── */
window.pvpResolverDuelo = function(quien){
  var duelo = pvpDueloActivo();
  if(!duelo){ mostrarNotificacion('No hay duelo activo.','error','⚔️'); return; }
  var ganadorId  = quien === 'a' ? duelo.retador : duelo.retado;
  var perdedorId = quien === 'a' ? duelo.retado  : duelo.retador;
  duelo.estado  = 'resuelto';
  duelo.ganador = ganadorId;
  // ELO
  var pvp = pvpGetData();
  var eloG = pvpGetElo(ganadorId);
  var eloP = pvpGetElo(perdedorId);
  eloG.puntos    += PVP_ELO_GANADOR;
  eloG.victorias += 1;
  eloG.racha      = (eloG.racha > 0 ? eloG.racha : 0) + 1;
  eloP.puntos     = Math.max(800, eloP.puntos - PVP_ELO_PERDEDOR);
  eloP.derrotas  += 1;
  eloP.racha      = (eloP.racha < 0 ? eloP.racha : 0) - 1;
    reproducirSonido('exito');
  logAdmin('🥊','Resolver duelo PvP',ganadorId.toUpperCase()+' GANA a '+perdedorId.toUpperCase()+' | ELO: +'+PVP_ELO_GANADOR+' / -'+PVP_ELO_PERDEDOR);inyectarEntradaDiarioAutomatica('🏆 Duelo resuelto: '+ganadorId.toUpperCase()+' GANA a '+perdedorId.toUpperCase()+'. ELO: +'+PVP_ELO_GANADOR+' / -'+PVP_ELO_PERDEDOR);
  mostrarNotificacion('🏆 '+ganadorId.toUpperCase()+' gana el duelo! +'+PVP_ELO_GANADOR+' ELO','exito','🏆');
  pvpActualizarAdminPanel();
  renderizarDuelosPvP();
};

/* ── Cancelar duelo ── */
window.pvpCancelarDuelo = function(){
  var duelo = pvpDueloActivo();
  if(!duelo){ mostrarNotificacion('No hay duelo activo.','error','⚔️'); return; }
  duelo.estado = 'cancelado';
  logAdmin('Cancelar duelo PvP', duelo.retador.toUpperCase()+' vs '+duelo.retado.toUpperCase());
  mostrarNotificacion('Duelo cancelado.','advertencia','✕');
  pvpActualizarAdminPanel();
  renderizarDuelosPvP();
};

/* ── Resetear ELO ── */
window.pvpResetearElo = async function(){
  let cf = await mostrarConfirmacion({icono:'🗑️',titulo:'Resetear PvP',descripcion:'¿Borrar todo el historial y ELO del locke actual? Esta acción es irreversible.',tipo:'peligro',textoConfirmar:'Sí, resetear',textoCancelar:'Cancelar',sonidoConfirmar:'error'});
  if(!cf) return;
  baseDatos.pvp = { duelos:[], elo:{} };
  logAdmin('Resetear ELO PvP','');
  mostrarNotificacion('Historial PvP reseteado.','exito','🗑️');
  pvpActualizarAdminPanel();
  renderizarDuelosPvP();
};

/* ── Panel admin: info duelo activo ── */
window.pvpActualizarAdminPanel = function(){
  var infoEl  = document.getElementById('pvp-admin-activo-info');
  var btsEl   = document.getElementById('pvp-admin-botones');
  var btnA    = document.getElementById('pvp-btn-gana-a');
  var btnB    = document.getElementById('pvp-btn-gana-b');
  if(!infoEl) return;
  var duelo = pvpDueloActivo();
  if(!duelo){
    infoEl.textContent = 'No hay duelo activo.';
    if(btsEl) btsEl.style.display = 'none';
    return;
  }
  var eloA = pvpGetElo(duelo.retador).puntos;
  var eloB = pvpGetElo(duelo.retado).puntos;
  infoEl.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
    + '<div style="flex:1;text-align:center"><div style="font-family:var(--font-display);font-size:12px;font-weight:900;color:#4ade80">'+duelo.retador.toUpperCase()+'</div>'
    + (duelo.equipoA&&duelo.equipoA.length ? pvpRenderSpritesEquipo(duelo.equipoA) : (duelo.pokeA ? '<div style="font-size:10px;color:var(--txt-muted)">'+escaparHTML(duelo.pokeA)+'</div>' : ''))
    + '<div style="font-size:10px;color:var(--neon-packs)">ELO: '+eloA+'</div></div>'
    + '<div style="font-family:var(--font-display);font-size:16px;font-weight:900;color:var(--neon-arena)">VS</div>'
    + '<div style="flex:1;text-align:center"><div style="font-family:var(--font-display);font-size:12px;font-weight:900;color:#6f9cc4">'+duelo.retado.toUpperCase()+'</div>'
    + (duelo.equipoB&&duelo.equipoB.length ? pvpRenderSpritesEquipo(duelo.equipoB) : (duelo.pokeB ? '<div style="font-size:10px;color:var(--txt-muted)">'+escaparHTML(duelo.pokeB)+'</div>' : ''))
    + '<div style="font-size:10px;color:var(--neon-packs)">ELO: '+eloB+'</div></div>'
    + '</div>'
    + (duelo.notas ? '<div style="font-size:10px;color:var(--txt-muted);font-style:italic">📝 '+escaparHTML(duelo.notas)+'</div>' : '');
  if(btsEl) btsEl.style.display = 'flex';
  if(btnA) btnA.textContent = '🏆 Gana '+duelo.retador.toUpperCase();
  if(btnB) btnB.textContent = '🏆 Gana '+duelo.retado.toUpperCase();
};

/* ── Render público ── */
window.renderizarDuelosPvP = function(){
  var pvp = pvpGetData();

  // Duelo activo
  var activoEl = document.getElementById('pvp-duelo-activo');
  var duelo    = pvpDueloActivo();
  if(activoEl){
    if(duelo){
      activoEl.style.display = 'block';
      var eloA = pvpGetElo(duelo.retador).puntos;
      var eloB = pvpGetElo(duelo.retado).puntos;
      activoEl.innerHTML = '<div class="pvp-duelo-activo-card">'
        + '<div style="font-family:var(--font-display);font-size:10px;color:var(--neon-arena);letter-spacing:1px;margin-bottom:8px">⚔️ DUELO EN CURSO · '+duelo.fecha+'</div>'
        + '<div class="pvp-vs-row">'
        + '<div class="pvp-jugador-box"><div class="pvp-jugador-nombre" style="color:#4ade80">'+duelo.retador.toUpperCase()+'</div>'
        + (duelo.equipoA&&duelo.equipoA.length ? pvpRenderSpritesEquipo(duelo.equipoA) : (duelo.pokeA ? '<div class="pvp-jugador-poke">'+escaparHTML(duelo.pokeA)+'</div>' : ''))
        + '<div class="pvp-jugador-elo">ELO '+eloA+'</div></div>'
        + '<div class="pvp-vs-badge">VS</div>'
        + '<div class="pvp-jugador-box"><div class="pvp-jugador-nombre" style="color:#6f9cc4">'+duelo.retado.toUpperCase()+'</div>'
        + (duelo.equipoB&&duelo.equipoB.length ? pvpRenderSpritesEquipo(duelo.equipoB) : (duelo.pokeB ? '<div class="pvp-jugador-poke">'+escaparHTML(duelo.pokeB)+'</div>' : ''))
        + '<div class="pvp-jugador-elo">ELO '+eloB+'</div></div>'
        + '</div>'
        + (duelo.notas ? '<div style="font-size:10px;color:var(--txt-muted);text-align:center;font-style:italic">📝 '+escaparHTML(duelo.notas)+'</div>' : '')
        + '</div>';
    } else {
      activoEl.style.display = 'none';
    }
  }

  // Ranking ELO
  var rankEl   = document.getElementById('pvp-ranking');
  var rankVacio = document.getElementById('pvp-ranking-vacio');
  if(rankEl){
    var elos = Object.keys(pvp.elo).map(function(id){
      return { id:id, data:pvp.elo[id] };
    }).sort(function(a,b){ return b.data.puntos - a.data.puntos; });
    if(!elos.length){
      rankEl.innerHTML = '';
      if(rankVacio) rankVacio.style.display = 'block';
    } else {
      if(rankVacio) rankVacio.style.display = 'none';
      var posClases = ['oro','plata','bronce'];
      rankEl.innerHTML = elos.map(function(e, i){
        var cls = posClases[i] || '';
        var racha = e.data.racha;
        var rachaStr = racha > 1 ? ' 🔥'+racha : (racha < -1 ? ' 📉'+Math.abs(racha) : '');
        return '<div class="pvp-ranking-row">'
          + '<span class="pvp-ranking-pos '+cls+'">'+(i+1)+'º</span>'
          + '<span class="pvp-ranking-nombre">'+e.id.toUpperCase()+rachaStr+'</span>'
          + '<span class="pvp-ranking-stats">'+e.data.victorias+'V / '+e.data.derrotas+'D</span>'
          + '<span class="pvp-ranking-elo">'+e.data.puntos+' ELO</span>'
          + '</div>';
      }).join('');
    }
  }

  // Historial
  var histEl   = document.getElementById('pvp-historial');
  var histVacio = document.getElementById('pvp-historial-vacio');
  var resueltos = pvp.duelos.filter(function(d){ return d.estado === 'resuelto'; });
  function pintarHistorialCard(d){
        var perdedor = d.ganador === d.retador ? d.retado : d.retador;
        var esA = d.ganador === d.retador;
        var pokeG = esA ? d.pokeA : d.pokeB;
        var pokeP = esA ? d.pokeB : d.pokeA;
        return '<div class="pvp-historial-card '+(esA?'victoria-a':'victoria-b')+'">'
          + '<div style="flex:1">'
          + '<div class="pvp-historial-ganador">🏆 '+d.ganador.toUpperCase()+' venció a '+perdedor.toUpperCase()
          + (pokeG||pokeP ? ' <span style="font-size:9px;color:var(--txt-muted);font-weight:400">('+[pokeG,pokeP].filter(Boolean).join(' vs ')+')</span>' : '')
          + '</div>'
          + (d.notas ? '<div class="pvp-historial-meta">📝 '+escaparHTML(d.notas)+'</div>' : '')
          + '</div>'
          + '<div class="pvp-historial-meta">'+d.fecha+'</div>'
          + '</div>';
  }
  if(histEl){
    if(!resueltos.length){
      histEl.innerHTML = '';
      if(histVacio) histVacio.style.display = 'block';
    } else {
      if(histVacio) histVacio.style.display = 'none';
      histEl.innerHTML = resueltos.slice(0,20).map(pintarHistorialCard).join('');
    }
  }
  var histIniEl = document.getElementById('pvp-historial-inicio');
  var histIniVacio = document.getElementById('pvp-historial-inicio-vacio');
  if(histIniEl){
    if(!resueltos.length){
      histIniEl.innerHTML = '';
      if(histIniVacio) histIniVacio.style.display = 'block';
    } else {
      if(histIniVacio) histIniVacio.style.display = 'none';
      histIniEl.innerHTML = resueltos.slice(0,6).map(pintarHistorialCard).join('');
    }
  }
};

