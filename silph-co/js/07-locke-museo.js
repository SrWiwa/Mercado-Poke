/* ═══ LOCKE ACTIVO + NUEVO LOCKE ═══ */
var NL_JUEGOS = [
  // GBA - Gen 1 remake
  {n:'Pokémon Rojo Fuego / Verde Hoja', gen:'GBA',  icon:'🔥', color:'#d8293f'},
  // GBA - Gen 3
  {n:'Pokémon Rubí / Zafiro',          gen:'GBA',  icon:'💎', color:'#3e6fa6'},
  {n:'Pokémon Esmeralda',              gen:'GBA',  icon:'💚', color:'#16a34a'},
  // GBA - Gen 3 remake
  {n:'Pokémon Rubí Omega / Zafiro Alfa',gen:'GBA', icon:'♦️', color:'#b81f32'},
  // NDS - Gen 4
  {n:'Pokémon Diamante / Perla',       gen:'NDS',  icon:'💠', color:'#818cf8'},
  {n:'Pokémon Platino',                gen:'NDS',  icon:'⚙️', color:'#94a3b8'},
  // NDS - Gen 2 remake
  {n:'Pokémon Oro HeartGold / Plata SoulSilver', gen:'NDS', icon:'🌟', color:'#c99a2e'},
  // NDS - Gen 5
  {n:'Pokémon Negro / Blanco',         gen:'NDS',  icon:'🖤', color:'#e2e8f0'},
  {n:'Pokémon Negro 2 / Blanco 2',     gen:'NDS',  icon:'🌀', color:'#6366f1'},
  // 3DS - Gen 6
  {n:'Pokémon X / Y',                  gen:'3DS',  icon:'❌', color:'#3e6fa6'},
  // 3DS - Gen 7
  {n:'Pokémon Sol / Luna',             gen:'3DS',  icon:'☀️', color:'#c99a2e'},
  {n:'Pokémon Ultra Sol / Ultra Luna', gen:'3DS',  icon:'🌞', color:'#ea580c'},
  // FanGame
  {n:'Pokémon Añil (FanGame)',         gen:'FAN',  icon:'🟦', color:'#3e6fa6'},
];

// Grupos para el selector visual por generación
var NL_GRUPOS = [
  { label:'Gen I · FR/VH', gen:'GBA', juego: 'Pokémon Rojo Fuego / Verde Hoja' },
  { label:'Gen III · Rubí/Zafiro', gen:'GBA', juego: 'Pokémon Rubí / Zafiro' },
  { label:'Gen III · Esmeralda', gen:'GBA', juego: 'Pokémon Esmeralda' },
  { label:'Gen III · OR/ZA', gen:'GBA', juego: 'Pokémon Rubí Omega / Zafiro Alfa' },
  { label:'Gen IV · D/P', gen:'NDS', juego: 'Pokémon Diamante / Perla' },
  { label:'Gen IV · Platino', gen:'NDS', juego: 'Pokémon Platino' },
  { label:'Gen II · HG/SS', gen:'NDS', juego: 'Pokémon Oro HeartGold / Plata SoulSilver' },
  { label:'Gen V · N/B', gen:'NDS', juego: 'Pokémon Negro / Blanco' },
  { label:'Gen V · N2/B2', gen:'NDS', juego: 'Pokémon Negro 2 / Blanco 2' },
  { label:'Gen VI · X/Y', gen:'3DS', juego: 'Pokémon X / Y' },
  { label:'Gen VII · Sol/Luna', gen:'3DS', juego: 'Pokémon Sol / Luna' },
  { label:'Gen VII · US/UL', gen:'3DS', juego: 'Pokémon Ultra Sol / Ultra Luna' },
  { label:'FanGame · Añil', gen:'FAN', juego: 'Pokémon Añil (FanGame)' },
];

var NL_TIPOS = {
  'EggLocke':    {icon:'🥚', color:'#fbbf24', bg:'rgba(251,191,36,.06)',  tema:'egglocke',    label:'EggLocke'},
  'Randomlocke': {icon:'🎲', color:'#34d399', bg:'rgba(52,211,153,.06)', tema:'randomlocke', label:'Randomlocke'},
  'SuperRandomlocke': {icon:'🎰', color:'#22d3ee', bg:'rgba(34,211,238,.06)', tema:'randomlocke', label:'Super RandomLocke'},
  'EvoLocke':    {icon:'🧬', color:'#a3e635', bg:'rgba(163,230,53,.06)', tema:'egglocke', label:'EvoLocke'},
  'Shinylocke':  {icon:'✨', color:'#c084fc', bg:'rgba(192,132,252,.06)', tema:'shinylocke',  label:'Shinylocke'},
  'SoulLink':    {icon:'⚡', color:'#facc15', bg:'rgba(250,204,21,.06)',  tema:'duallinks',   label:'Soul-Link'},
  'DualLinks':   {icon:'⚡', color:'#facc15', bg:'rgba(250,204,21,.06)',  tema:'duallinks',   label:'Soul-Link'},
};

var _nlJuegoSel = null;
var _nlRutas = [];

window.nlAnadirRuta = function(){
  var inp = document.getElementById('nl-ruta-input');
  var val = (inp.value||'').trim();
  if(!val){ return; }
  _nlRutas.push(val);
  inp.value = '';
  inp.focus();
  nlRenderRutas();
};

window.nlEliminarRuta = function(idx){
  _nlRutas.splice(idx,1);
  nlRenderRutas();
};

window.nlMoverRuta = function(idx, dir){
  var nuevo = idx + dir;
  if(nuevo < 0 || nuevo >= _nlRutas.length) return;
  var tmp = _nlRutas[idx];
  _nlRutas[idx] = _nlRutas[nuevo];
  _nlRutas[nuevo] = tmp;
  nlRenderRutas();
};

function nlRenderRutas(){
  var cont = document.getElementById('nl-rutas-lista');
  var vacio = document.getElementById('nl-rutas-vacio');
  if(!cont) return;
  if(!_nlRutas.length){
    cont.innerHTML = '';
    if(vacio) vacio.style.display = 'block';
    return;
  }
  if(vacio) vacio.style.display = 'none';
  cont.innerHTML = _nlRutas.map(function(r, i){
    return '<div class="nl-ruta-row">'
      + '<span class="nl-ruta-orden">'+(i+1)+'.</span>'
      + '<span class="nl-ruta-nombre">'+escaparHTML(r)+'</span>'
      + '<button class="nl-ruta-up" onclick="nlMoverRuta('+i+',-1)" title="Subir">▲</button>'
      + '<button class="nl-ruta-down" onclick="nlMoverRuta('+i+',1)" title="Bajar">▼</button>'
      + '<button class="nl-ruta-del" onclick="nlEliminarRuta('+i+')" title="Eliminar">✕</button>'
      + '</div>';
  }).join('');
}

function nlRenderGrupos(){
  var cont = document.getElementById('nl-juego-grupos');
  if(!cont) return;
  cont.innerHTML = NL_GRUPOS.map(function(g, idx){
    var j = NL_JUEGOS.find(function(x){ return x.n === g.juego; });
    if(!j) return '';
    var sel = (_nlJuegoSel && _nlJuegoSel.n === j.n);
    var genColor = g.gen==='GBA'?'#22c55e': g.gen==='NDS'?'#818cf8':'#c99a2e';
    var bgCol = sel ? 'rgba(216,41,63,.14)' : 'var(--bg-card)';
    var borCol = sel ? 'rgba(216,41,63,.5)' : 'var(--borde)';
    var txtCol = sel ? 'var(--blanco)' : 'var(--txt-primary)';
    return '<button class="nl-juego-btn" data-juego-idx="'+idx+'" style="background:'+bgCol+';border:1px solid '+borCol+';border-radius:var(--r-md);padding:9px 10px;cursor:pointer;text-align:left;transition:all .15s;display:flex;flex-direction:column;gap:4px">'
      +'<span style="font-size:18px">'+j.icon+'</span>'
      +'<span style="font-family:var(--font-display);font-size:10px;font-weight:700;color:'+txtCol+';line-height:1.2">'+g.label+'</span>'
      +'<span style="font-size:9px;font-family:var(--font-display);color:'+genColor+';font-weight:700">'+g.gen+'</span>'
      +'</button>';
  }).join('');
  cont.onclick = function(e){
    var btn = e.target.closest('.nl-juego-btn');
    if(!btn) return;
    var idx = parseInt(btn.getAttribute('data-juego-idx'));
    var g = NL_GRUPOS[idx];
    if(g) nlSelJuego(g.juego);
  };
}

window.nlSelJuego = function(nombre){
  _nlJuegoSel = NL_JUEGOS.find(function(j){ return j.n===nombre; });
  var sel = document.getElementById('nl-juego-sel');
  var txt = document.getElementById('nl-juego-sel-txt');
  if(sel) sel.style.display = 'block';
  if(txt && _nlJuegoSel) txt.textContent = _nlJuegoSel.icon+' '+_nlJuegoSel.n+' ('+_nlJuegoSel.gen+')';
  nlRenderGrupos();
};

window.nlPaso = function(n){
  document.getElementById('nl-paso1').style.display = n===1 ? 'block' : 'none';
  document.getElementById('nl-paso2').style.display = n===2 ? 'block' : 'none';
  if(n===2){
    _nlJuegoSel=null;
    var sel = document.getElementById('nl-juego-sel'); if(sel) sel.style.display='none';
    document.querySelectorAll('input[name="nl-tipo"]').forEach(function(cb){ cb.checked=false; });
    _nlRutas = [];
    var ri = document.getElementById('nl-ruta-input'); if(ri) ri.value='';
    var vi = document.getElementById('nl-vidas-val'); if(vi) vi.value=5;
    nlRenderRutas();
    nlRenderGrupos();
  }
};

window.confirmarNuevoLocke = function(){
  var checks = Array.from(document.querySelectorAll('input[name="nl-tipo"]:checked'));
  var modalidades = checks.map(function(c){ return c.value; });
  if(!modalidades.length){ mostrarNotificacion('Elige al menos una modalidad.','error','🎮'); return; }
  if(!_nlJuegoSel){ mostrarNotificacion('Elige un juego primero.','error','🎮'); return; }
  var vidasIni = parseInt(document.getElementById('nl-vidas-val').value)||5;
  var rutas = _nlRutas.slice();
  // Usamos la primera modalidad como tipo principal para compatibilidad con NL_TIPOS
  var tipoPrincipal = modalidades[0];
  ejecutarNuevoLocke(tipoPrincipal, _nlJuegoSel, vidasIni, rutas, modalidades);
  nlPaso(1);
};

function crearTrackerDesdeRutas(rutas){
  return (rutas||[]).map(function(nombre, i){
    return { orden:i, ruta:nombre, estado:'pendiente', pokemon:'', mote:'' };
  });
}

function ejecutarNuevoLocke(tipo, juego, vidasIni, rutas, modalidades){
  modalidades = modalidades || [tipo];
  var numActual = (baseDatos.lockeActivo && baseDatos.lockeActivo.num) || 1;
  var numNuevo  = numActual + 1;

  // ── ARCHIVAR el locke ACTUAL antes de borrarlo ──
  if(!baseDatos.historialLockes) baseDatos.historialLockes = {};
  var entrada = {
    num:        numActual,
    tipo:       (baseDatos.lockeActivo && baseDatos.lockeActivo.tipo)       || 'EggLocke',
    modalidades:(baseDatos.lockeActivo && baseDatos.lockeActivo.modalidades) || [],
    juego:      (baseDatos.lockeActivo && baseDatos.lockeActivo.juego)      || '—',
    juegoIcon:  (baseDatos.lockeActivo && baseDatos.lockeActivo.juegoIcon)  || '🎮',
    juegoGen:   (baseDatos.lockeActivo && baseDatos.lockeActivo.juegoGen)   || '',
    campeones:  JSON.parse(JSON.stringify(baseDatos.campeones || {})),
    pokemon:    {}
  };
  Object.keys(baseDatos.jugadores || {}).forEach(function(id){
    var mp = baseDatos.jugadores[id].mejorPokemon;
    if(mp && mp.nombre) entrada.pokemon[id] = JSON.parse(JSON.stringify(mp));
  });
  baseDatos.historialLockes['locke' + numActual] = entrada;

  // Resetear todos los jugadores
  Object.keys(baseDatos.jugadores||{}).forEach(function(id){
    var u = baseDatos.jugadores[id];
    u.dinero       = 0;
    u.pf           = 0;
    u.vidasActuales= vidasIni;
    u.vidasTotales = vidasIni;
    u.inventario   = [];
    u.muertes      = [];
    u.sacrificios  = [];
    u.diarioLogs   = [{timestamp:'Inicio', texto:'Nuevo Locke iniciado.'}];
    u.comprasHoy   = {};
    u.mejorPokemon = null;
    u.cementerio   = [];
    u.tracker      = crearTrackerDesdeRutas(rutas);
    // NO tocar: numMedallas, tipoMedallas, torneos, lockeStatus
    u.lockeStatus  = 'jugando';
  });

  // Limpiar feed de actividad global
  baseDatos.actividadGlobal = [];
  // Guardar info del locke activo
  if(!baseDatos.lockeActivo) baseDatos.lockeActivo = {};
  baseDatos.lockeActivo.tipo   = tipo;
  baseDatos.lockeActivo.modalidades = modalidades;
  baseDatos.lockeActivo.juego  = juego.n;
  baseDatos.lockeActivo.juegoIcon = juego.icon;
  baseDatos.lockeActivo.juegoColor= juego.color;
  baseDatos.lockeActivo.juegoGen  = juego.gen;
  baseDatos.lockeActivo.num    = numNuevo;
  baseDatos.lockeActivo.rutasDefinidas = (rutas||[]).slice();
  // Limpiar campeones del locke anterior
  baseDatos.campeones = {};
  guardarBD();

  document.body.style.transition='opacity .25s ease';
  document.body.style.opacity='0';
  setTimeout(function(){
    aplicarTemaLocke();
    renderizarBannerLocke();
    actualizarHeroStrip();
    renderizarHallOfFame();
    document.body.style.opacity='1';
  }, 260);
  var modLabel = modalidades.map(function(m){ return (NL_TIPOS[m]&&NL_TIPOS[m].label)||m; }).join(' + ');
  logAdmin('🔄','Nuevo Locke iniciado',modLabel+' · '+juego.n+' · '+vidasIni+' vidas · '+(rutas&&rutas.length?rutas.length+' rutas':'sin rutas'));
  mostrarNotificacion('¡Nuevo Locke iniciado! '+juego.icon+' '+juego.n+' · '+modLabel,'exito','🔄');
  // Volver al tab reset
  setTimeout(function(){ cambiarAdminTab('reset'); }, 800);
}

function aplicarTemaLocke(){
  aplicarTemaPersonal();
}

function renderizarBannerLocke(){
  var la = baseDatos && baseDatos.lockeActivo;
  var banner = document.getElementById('hof-locke-banner');
  if(!banner) return;
  if(!la || !la.tipo){ banner.style.display='none'; return; }
  var cfg = NL_TIPOS[la.tipo] || NL_TIPOS['EggLocke'];
  banner.style.display = 'block';
  banner.style.setProperty('--hof-color', cfg.color);
  banner.style.setProperty('--hof-bg', cfg.bg);
  // Etiqueta de modalidades combinadas
  var mods = la.modalidades || [la.tipo];
  var modLabel = mods.map(function(m){ return (NL_TIPOS[m]&&NL_TIPOS[m].label)||m; }).join(' + ');
  // Actualizar subtítulo de la sección
  var sub = banner.closest('.page-section');
  if(sub){
    var subEl = sub.querySelector('.section-subtitle');
    if(subEl) subEl.textContent = cfg.icon+' '+modLabel+' · '+la.juegoIcon+' '+la.juego;
  }
  var elIcon  = document.getElementById('hof-locke-icon');
  var elNombre= document.getElementById('hof-locke-nombre');
  var elJuego = document.getElementById('hof-locke-juego');
  var elNum   = document.getElementById('hof-locke-num');
  if(elIcon)   elIcon.textContent  = cfg.icon+' '+la.juegoIcon;
  if(elNombre) elNombre.textContent= modLabel;
  if(elNombre) elNombre.style.color= cfg.color;
  if(elJuego)  elJuego.textContent = la.juegoIcon+' '+la.juego+' ('+la.juegoGen+')';
  if(elNum)    elNum.textContent   = 'Locke #'+(la.num||1);
}

/* ═══ HERO STRIP — barra de progreso de gimnasio ═══ */
function actualizarHeroStrip(){
  var strip = document.getElementById('hero-strip');
  if(!strip) return;
  var la = baseDatos && baseDatos.lockeActivo;
  var ga = baseDatos && baseDatos.gimnasioActivo;
  if(!la || !la.tipo){ strip.style.display='none'; return; }
  var cfg = (typeof NL_TIPOS!=='undefined' && NL_TIPOS[la.tipo]) || {icon:'🎮',color:'var(--neon-packs)'};
  var mods = la.modalidades || [la.tipo];
  var modLabel = mods.map(function(m){ return (NL_TIPOS[m]&&NL_TIPOS[m].label)||m; }).join(' + ');
  strip.style.display = 'flex';
  strip.style.setProperty('--hero-color', cfg.color);
  var elIcon = document.getElementById('hero-icon');
  var elTipo = document.getElementById('hero-tipo');
  var elJuego= document.getElementById('hero-juego');
  if(elIcon) elIcon.textContent = cfg.icon+' '+(la.juegoIcon||'🎮');
  if(elTipo) elTipo.textContent = modLabel;
  if(elTipo) elTipo.style.color = cfg.color;
  if(elJuego) elJuego.textContent = (la.juego||'—')+(la.juegoGen?' ('+la.juegoGen+')':'');

  var tierActivo = ga ? ga.tier : 0;
  var segs = strip.querySelectorAll('.hero-gym-seg');
  segs.forEach(function(seg){
    var g = parseInt(seg.getAttribute('data-gym'));
    seg.classList.remove('done','activo');
    if(g < tierActivo) seg.classList.add('done');
    else if(g === tierActivo) seg.classList.add('activo');
  });
  var label = document.getElementById('hero-gym-label');
  if(label){
    label.textContent = tierActivo >= 8 ? 'Liga Pokémon' : ('Gimnasio '+(tierActivo+1)+'/8');
  }
}



function museoCardHTML(e, idx, total){
  var tipoKey = e.tipo || 'EggLocke';
  var cfg = NL_TIPOS[tipoKey] || {icon:'🎮', color:'#6366f1', bg:'rgba(99,102,241,.06)', label: tipoKey};
  var mods = (e.modalidades && e.modalidades.length) ? e.modalidades : [tipoKey];
  var modLabel = mods.map(function(m){ return (NL_TIPOS[m] && NL_TIPOS[m].label) || m; }).join(' + ');
  var numDisplay = e.num || (total - idx);
  var cfgColor = cfg.color || '#6366f1';
  var borderCol = cfgColor.indexOf('var(') === 0 ? 'rgba(99,102,241,.35)' : cfgColor+'88';
  var juegoIcon = e.juegoIcon || '🎮';
  var juegoNombre = (e.juego && e.juego !== '?') ? e.juego : '—';
  var colorFn = window.colorParaJugador || function(){ return 'var(--neon-packs)'; };

  // ── Campeones ──
  var c = e.campeones || {};
  var campRows = [
    {lbl:'Torneos',   ico:'🎖️', val:c.torneos,                                          col:'var(--neon-packs)'},
    {lbl:'Por Vidas', ico:'❤️', val:Array.isArray(c.vidas)?c.vidas.join(' & '):c.vidas, col:'#e2646f'},
    {lbl:'Finalísima',ico:'👑', val:c['finalísima']||c.finalísima,                      col:'#fbbf24'}
  ].filter(function(x){ return x.val; });

  var campHTML = campRows.length
    ? campRows.map(function(x){
        return '<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--bg-elevated);border-radius:var(--r-md);border:1px solid rgba(255,255,255,.05)">'
          +'<span style="font-size:16px;flex-shrink:0">'+x.ico+'</span>'
          +'<div style="min-width:0">'
            +'<div style="font-size:8px;color:'+x.col+';font-family:var(--font-display);font-weight:700;text-transform:uppercase;letter-spacing:.5px">'+x.lbl+'</div>'
            +'<div style="font-family:var(--font-display);font-size:12px;font-weight:900;color:var(--blanco);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+escaparHTML(String(x.val).toUpperCase())+'</div>'
          +'</div>'
          +'</div>';
      }).join('')
    : '<div style="color:var(--txt-muted);font-size:10px;font-family:var(--font-display);padding:8px 4px;font-style:italic">Sin campeones registrados</div>';

  // ── Pokémon ──
  var pokes = e.pokemon || {};
  var pokesKeys = Object.keys(pokes);
  var pokesHTML = pokesKeys.length
    ? pokesKeys.map(function(id){
        var mp = pokes[id];
        var c2 = colorFn(id);
        var imgH = mp.sprite
          ? '<img src="'+mp.sprite+'" alt="" style="width:clamp(40px,10vw,56px);height:clamp(40px,10vw,56px);image-rendering:pixelated;display:block;margin:0 auto;filter:drop-shadow(0 2px 6px '+c2+'44)">'
          : '<div style="font-size:30px;text-align:center;line-height:56px;opacity:.25">❓</div>';
        var moteH = mp.mote ? '<div style="font-size:9px;color:'+c2+';font-family:var(--font-display);font-weight:700;font-style:italic;margin-top:1px">&ldquo;'+escaparHTML(mp.mote)+'&rdquo;</div>' : '';
        return '<div style="text-align:center;background:var(--bg-elevated);border:1px solid rgba(255,255,255,.06);border-radius:var(--r-lg);padding:8px 6px;min-width:70px;max-width:90px">'
          +imgH
          +'<div style="font-size:8px;color:'+c2+';font-family:var(--font-display);font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-top:4px">'+escaparHTML(id)+'</div>'
          +'<div style="font-family:var(--font-display);font-size:11px;font-weight:900;color:var(--blanco)">'+escaparHTML(mp.nombre)+'</div>'
          +moteH
          +'</div>';
      }).join('')
    : '<div style="color:var(--txt-muted);font-size:10px;font-family:var(--font-display);padding:8px 4px;font-style:italic">Sin Pokémon registrados</div>';

  return '<div class="museo-card" data-idx="'+idx+'" style="border:1px solid '+borderCol+';border-radius:var(--r-xl);overflow:hidden;background:linear-gradient(145deg,'+cfg.bg+',transparent)">'
    // ── Cabecera ──
    +'<div style="background:linear-gradient(135deg,'+cfg.bg+',rgba(0,0,0,.2));padding:14px 18px;display:flex;align-items:center;gap:14px;border-bottom:1px solid rgba(255,255,255,.06)">'
      +'<div style="width:clamp(36px,8vw,50px);height:clamp(36px,8vw,50px);border-radius:50%;background:'+cfg.bg+';border:2px solid '+borderCol+';display:flex;align-items:center;justify-content:center;font-size:clamp(16px,4vw,22px);flex-shrink:0">'+cfg.icon+'</div>'
      +'<div style="flex:1;min-width:0">'
        +'<div style="font-family:var(--font-display);font-size:14px;font-weight:900;color:'+cfgColor+';letter-spacing:.3px">'+escaparHTML(modLabel)+'</div>'
        +'<div style="font-size:11px;color:var(--txt-secondary);font-family:var(--font-display);margin-top:2px">'+escaparHTML(juegoIcon+' '+juegoNombre)+(e.juegoGen?' <span style="color:var(--txt-muted);font-size:9px">('+escaparHTML(e.juegoGen)+')</span>':'')+'</div>'
      +'</div>'
      +'<div style="text-align:right;flex-shrink:0">'
        +'<div style="font-family:var(--font-display);font-size:18px;font-weight:900;color:'+cfgColor+';opacity:.6">#'+numDisplay+'</div>'
        +'<div style="font-size:8px;color:var(--txt-muted);font-family:var(--font-display);text-transform:uppercase;letter-spacing:.5px">Locke</div>'
      +'</div>'
    +'</div>'
    // ── Cuerpo ──
    +'<div style="padding:14px 16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px">'
      // Campeones
      +'<div>'
        +'<div style="font-size:8px;color:var(--txt-muted);font-family:var(--font-display);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">🏆 Campeones</div>'
        +'<div style="display:flex;flex-direction:column;gap:6px">'+campHTML+'</div>'
      +'</div>'
      // Pokémon
      +'<div>'
        +'<div style="font-size:8px;color:var(--txt-muted);font-family:var(--font-display);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">⭐ Mejores Pokémon</div>'
        +'<div style="display:flex;flex-wrap:wrap;gap:6px">'+pokesHTML+'</div>'
      +'</div>'
    +'</div>'
    +'</div>';
}

// Datos cacheados para filtrar sin re-renderizar
var _museoEntradas = [];

function renderizarHistorialLockes(){
  var wrap = document.getElementById('hof-historial-wrap');
  var list = document.getElementById('hof-historial-list');
  if(!wrap || !list) return;
  var hist = baseDatos && baseDatos.historialLockes;
  if(!hist || !Object.keys(hist).length){ wrap.style.display='none'; return; }
  wrap.style.display = 'block';

  _museoEntradas = Object.values(hist).sort(function(a,b){ return b.num - a.num; });

  var countEl = document.getElementById('hof-historial-count');
  if(countEl) countEl.textContent = _museoEntradas.length + (_museoEntradas.length === 1 ? ' locke' : ' lockes');

  list.innerHTML = _museoEntradas.map(function(e,i){ return museoCardHTML(e, i, _museoEntradas.length); }).join('');
  museoFiltrar();
}

window.museoFiltrar = function(){
  var qJ  = (document.getElementById('museo-q-jugador')||{value:''}).value.toLowerCase().trim();
  var qG  = (document.getElementById('museo-q-juego')  ||{value:''}).value.toLowerCase().trim();
  var qM  = (document.getElementById('museo-q-modal')  ||{value:''}).value.toLowerCase().trim();
  var qP  = (document.getElementById('museo-q-poke')   ||{value:''}).value.toLowerCase().trim();
  var any = qJ||qG||qM||qP;

  var visible = 0;
  var cards = document.querySelectorAll('.museo-card');
  cards.forEach(function(card, i){
    var e = _museoEntradas[i];
    if(!e){ card.style.display='none'; return; }
    var mods  = (e.modalidades||[e.tipo||'']).join(' ').toLowerCase();
    var juego = (e.juego||'').toLowerCase();
    var jugadores = Object.keys(e.pokemon||{}).join(' ').toLowerCase();
    var campeones = Object.values(e.campeones||{}).join(' ').toLowerCase();
    var pokeNames = Object.values(e.pokemon||{}).map(function(p){ return (p.nombre||'')+' '+(p.mote||''); }).join(' ').toLowerCase();

    var ok = (!qJ || jugadores.indexOf(qJ)!==-1 || campeones.indexOf(qJ)!==-1)
          && (!qG || juego.indexOf(qG)!==-1)
          && (!qM || mods.indexOf(qM)!==-1)
          && (!qP || pokeNames.indexOf(qP)!==-1);

    card.style.display = ok ? '' : 'none';
    if(ok) visible++;
  });

  var noRes = document.getElementById('museo-no-results');
  var activo = document.getElementById('museo-filtro-activo');
  var countFilt = document.getElementById('museo-filtro-count');
  if(noRes) noRes.style.display = (any && visible===0) ? 'block' : 'none';
  if(activo) activo.style.display = any ? 'flex' : 'none';
  if(countFilt) countFilt.textContent = visible + ' de ' + _museoEntradas.length + ' lockes';
};

window.museoClearFiltros = function(){
  ['museo-q-jugador','museo-q-juego','museo-q-modal','museo-q-poke'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value='';
  });
  museoFiltrar();
};

/* ── Campeones Por Vidas — selección dinámica ── */
window.agregarGanadorVidas = function(){
  agregarGanadorVidasConValor('');
};

function agregarGanadorVidasConValor(val){
  var lista = document.getElementById('adm-campeon-vidas-lista');
  if(!lista) return;
  var ids = Object.keys(baseDatos.jugadores||{});
  var idx = lista.children.length;
  var div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:6px;align-items:center';
  var sel = document.createElement('select');
  sel.className = 'admin-select adm-vidas-select';
  sel.style.cssText = 'margin-bottom:0;flex:1;border-color:rgba(248,113,113,.3)';
  sel.innerHTML = '<option value="">— Sin ganador —</option>' +
    ids.map(function(id){
      return '<option value="'+id+'"'+(id===val?' selected':'')+'>'+id.toUpperCase()+'</option>';
    }).join('');
  var btn = document.createElement('button');
  btn.textContent = '✕';
  btn.style.cssText = 'background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.2);color:#e2646f;padding:6px 10px;border-radius:var(--r-sm);cursor:pointer;font-family:var(--font-display);font-size:10px;flex-shrink:0';
  btn.onclick = function(){ div.remove(); };
  div.appendChild(sel);
  div.appendChild(btn);
  lista.appendChild(div);
}
/* ── Campeones Torneos — selección dinámica (igual patrón que Vidas) ── */
window.agregarGanadorTorneos = function(){
  agregarGanadorTorneosConValor('');
};
function agregarGanadorTorneosConValor(val){
  var lista = document.getElementById('adm-campeon-torneos-lista');
  if(!lista) return;
  var ids = Object.keys(baseDatos.jugadores||{});
  var div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:6px;align-items:center';
  var sel = document.createElement('select');
  sel.className = 'admin-select adm-torneos-select';
  sel.style.cssText = 'margin-bottom:0;flex:1;border-color:rgba(201,154,46,.3)';
  sel.innerHTML = '<option value="">— Sin ganador —</option>' +
    ids.map(function(id){
      return '<option value="'+id+'"'+(id===val?' selected':'')+'>'+id.toUpperCase()+'</option>';
    }).join('');
  var btn = document.createElement('button');
  btn.textContent = '✕';
  btn.style.cssText = 'background:rgba(201,154,46,.1);border:1px solid rgba(201,154,46,.25);color:var(--neon-packs);padding:6px 10px;border-radius:var(--r-sm);cursor:pointer;font-family:var(--font-display);font-size:10px;flex-shrink:0';
  btn.onclick = function(){ div.remove(); };
  div.appendChild(sel);
  div.appendChild(btn);
  lista.appendChild(div);
}
/* ═══ CAMPEONES / HALL OF FAME ═══ */
window.guardarCampeones = function(){
  if(!baseDatos.campeones) baseDatos.campeones = {};
  var torneosGanadores = [];
  document.querySelectorAll('.adm-torneos-select').forEach(function(sel){
    if(sel.value) torneosGanadores.push(sel.value);
  });
  baseDatos.campeones.torneos = torneosGanadores;
  // Campeones por vidas: recoger todos los selects añadidos
  var vidasGanadores = [];
  document.querySelectorAll('.adm-vidas-select').forEach(function(sel){
    if(sel.value) vidasGanadores.push(sel.value);
  });
  baseDatos.campeones.vidas = vidasGanadores;
  var sf = document.getElementById('adm-campeon-finalísima');
  baseDatos.campeones.finalísima = sf ? sf.value : '';
  logAdmin('Guardar campeones Hall of Fame', 'Torneos: '+(torneosGanadores.join(', ')||'-')+', Vidas: '+(vidasGanadores.join(', ')||'-')+', Finalísima: '+(baseDatos.campeones.finalísima||'-'));
  renderizarHallOfFame();
  var est = document.getElementById('adm-campeones-estado');
  if(est){ est.textContent = '✅ Campeones guardados correctamente'; setTimeout(()=>{ est.textContent=''; }, 2500); }
  mostrarNotificacion('Hall of Fame actualizado.','exito','🏆');
};





