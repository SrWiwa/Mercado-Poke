/* ═══ HALL OF FAME — MEJOR POKÉMON ═══ */
/* ── MEJOR POKÉMON: nombres para autocompletar ── */
var _mipokeNombres = [];
(function(){
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
    .then(function(r){return r.json();})
    .then(function(d){ _mipokeNombres = d.results.map(function(p){return p.name;}); })
    .catch(function(){});
})();

window.mipokeAutocompletar = function(){
  var val = (document.getElementById('mipoke-search').value||'').trim().toLowerCase().replace(/\s+/g,'-');
  var sug = document.getElementById('mipoke-sugerencias');
  if(val.length < 2){ sug.style.display='none'; return; }
  var matches = _mipokeNombres.filter(function(n){ return n.indexOf(val)!==-1; }).slice(0,8);
  if(!matches.length){ sug.style.display='none'; return; }
  sug.innerHTML = matches.map(function(m){
    var label = m.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
    return '<div onclick="mipokeSeleccionar(\''+m+'\',\''+label+'\')" '
      +'style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--borde);color:var(--txt-primary);font-family:var(--font-body)" '
      +'onmouseover="this.style.background=\'var(--bg-overlay)\'" onmouseout="this.style.background=\'\'">'+label+'</div>';
  }).join('');
  sug.style.display = 'block';
};

window.mipokeSeleccionar = function(apiName, label){
  document.getElementById('mipoke-search').value = label;
  document.getElementById('mipoke-nombre').value  = apiName;
  document.getElementById('mipoke-sugerencias').style.display = 'none';
  // Cargar imagen desde PokeAPI
  var img = document.getElementById('mipoke-img');
  var ph  = document.getElementById('mipoke-img-placeholder');
  img.style.display = 'none'; ph.style.display = '';
  fetch('https://pokeapi.co/api/v2/pokemon/'+apiName)
    .then(function(r){return r.json();})
    .then(function(d){
      var sprite = (d.sprites&&d.sprites.other&&d.sprites.other['official-artwork']&&d.sprites.other['official-artwork'].front_default)
        || d.sprites.front_default || '';
      if(sprite){ img.src=sprite; img.style.display='block'; ph.style.display='none'; }
    }).catch(function(){});
};

window.guardarMejorPokemon = function(){
  if(!userSesion||!baseDatos.jugadores[userSesion])return;
  var apiName = document.getElementById('mipoke-nombre').value.trim();
  var label   = document.getElementById('mipoke-search').value.trim();
  if(!apiName){mostrarNotificacion('Selecciona un Pokémon de la lista.','error','⭐');return;}
  var mote = document.getElementById('mipoke-mote').value.trim();
  var img  = document.getElementById('mipoke-img');
  var sprite = img.src||'';
  baseDatos.jugadores[userSesion].mejorPokemon = {nombre:label, apiName:apiName, mote:mote, sprite:sprite};
  guardarBD();
  renderizarHofPokemon();
  mostrarNotificacion('⭐ '+label+' en el Hall of Fame.','exito','⭐','Guardado');
};

function cargarMejorPokemonEnPerfil(){
  if(!userSesion||!baseDatos.jugadores[userSesion])return;
  var mp = baseDatos.jugadores[userSesion].mejorPokemon||{};
  var elS = document.getElementById('mipoke-search');
  var elN = document.getElementById('mipoke-nombre');
  var elM = document.getElementById('mipoke-mote');
  if(elS) elS.value = mp.nombre||'';
  if(elN) elN.value = mp.apiName||'';
  if(elM) elM.value = mp.mote||'';
  var img = document.getElementById('mipoke-img');
  var ph  = document.getElementById('mipoke-img-placeholder');
  if(img && mp.sprite){ img.src=mp.sprite; img.style.display='block'; if(ph)ph.style.display='none'; }
  else if(img){ img.style.display='none'; if(ph)ph.style.display=''; }
}

function renderizarHofPokemon(){
  var grid = document.getElementById('hof-pokemon-grid');
  if(!grid) return;
  var jugadores = baseDatos.jugadores||{};
  var entradas = [];
  Object.keys(jugadores).forEach(function(id){
    var u = jugadores[id];
    if(u.mejorPokemon && u.mejorPokemon.nombre) entradas.push({id:id, mp:u.mejorPokemon});
  });
  if(!entradas.length){
    grid.innerHTML='<div style="color:var(--txt-muted);font-size:11px;font-family:var(--font-display);text-align:center;padding:30px;grid-column:1/-1">Todavía no hay entrenadores en el Hall of Fame.</div>';
    return;
  }
  var color = window.colorParaJugador || function(){ return 'var(--neon-packs)'; };
  grid.innerHTML = entradas.map(function(e){
    var mp = e.mp;
    var c  = color(e.id);
    var imgHtml = mp.sprite
      ? '<img src="'+mp.sprite+'" alt="'+escaparHTML(mp.nombre)+'" style="width:80px;height:80px;image-rendering:pixelated;display:block;margin:0 auto 6px">'
      : '<div style="width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:36px;opacity:.3;margin:0 auto 6px">❓</div>';
    var moteHtml = mp.mote ? '<div style="color:'+c+';font-size:10px;font-family:var(--font-display);font-weight:700;margin-top:2px">&ldquo;'+escaparHTML(mp.mote)+'&rdquo;</div>' : '';
    return '<div class="medallas-card" style="border-top:3px solid '+c+';padding:14px;border-radius:var(--r-lg);text-align:center">'
      +'<div style="font-size:9px;font-family:var(--font-display);font-weight:700;color:'+c+';text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">'+escaparHTML(e.id.toUpperCase())+'</div>'
      +imgHtml
      +'<div style="font-family:var(--font-display);font-size:12px;font-weight:900;color:var(--blanco)">'+escaparHTML(mp.nombre)+'</div>'
      +moteHtml
      +'</div>';
  }).join('');
}

/* ── renderizarHallOfFame actualizado para incluir Pokémon ── */
function renderizarHallOfFame(){
  var c = (baseDatos && baseDatos.campeones) || {};
  var t  = c.torneos    || '';
  var v  = c.vidas      || '';
  var f  = c['finalísima'] || c.finalísima || '';

  var elT = document.getElementById('hof-torneos');
  var elV = document.getElementById('hof-vidas');
  var elF = document.getElementById('hof-finalísima');
  if(elT){
    if(!t || (Array.isArray(t) && !t.length)){
      elT.textContent = '—';
    } else {
      var torneosArr = Array.isArray(t) ? t : [t];
      elT.innerHTML = torneosArr.map(function(n){
        return '<span style="display:block">'+n.toUpperCase()+'</span>';
      }).join('');
    }
  }
  if(elV){
    if(!v || (Array.isArray(v) && !v.length)){
      elV.textContent = '—';
    } else {
      var vidasArr = Array.isArray(v) ? v : [v];
      elV.innerHTML = vidasArr.map(function(n){
        return '<span style="display:block">'+n.toUpperCase()+'</span>';
      }).join('');
    }
  }
  if(elF) elF.textContent = f ? f.toUpperCase() : '—';

  // Selectores admin
  var sV = document.getElementById('adm-campeon-vidas');
  var sF = document.getElementById('adm-campeon-finalísima');
  if(sV && v) sV.value = v;
  if(sF && f) sF.value = f;

  renderizarHofPokemon();
  renderizarBannerLocke();
  renderizarHistorialLockes();
}







/* ═══════════════════════════════════════════════
   MOTOR DE GENERACIÓN DE TIENDAS POR GIMNASIO
   ═══════════════════════════════════════════════ */

/* ─── BASE DE DATOS DE OBJETOS ─── */
/* Cada objeto: {n:nombre, i:icono, cat:categoría, tier:0-8 (gymMin), gen:genMin, precio:base, pf:base, rareza:1-5} */
