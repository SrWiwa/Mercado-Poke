/* ═══ CALCULADORA DE EFECTIVIDAD DE TIPOS ═══ */
(function(){
  'use strict';
  var TYPES = [
    {id:'normal',    label:'Normal',     color:'#A8A878', icon:'⭐'},
    {id:'fuego',     label:'Fuego',      color:'#F08030', icon:'🔥'},
    {id:'agua',      label:'Agua',       color:'#6890F0', icon:'💧'},
    {id:'electrico', label:'Eléctrico',  color:'#F8D030', icon:'⚡'},
    {id:'planta',    label:'Planta',     color:'#78C850', icon:'🌿'},
    {id:'hielo',     label:'Hielo',      color:'#98D8D8', icon:'❄️'},
    {id:'lucha',     label:'Lucha',      color:'#C03028', icon:'🥊'},
    {id:'veneno',    label:'Veneno',     color:'#A040A0', icon:'☠️'},
    {id:'tierra',    label:'Tierra',     color:'#E0C068', icon:'🌍'},
    {id:'volador',   label:'Volador',    color:'#A890F0', icon:'🌪️'},
    {id:'psiquico',  label:'Psíquico',   color:'#F85888', icon:'🔮'},
    {id:'bicho',     label:'Bicho',      color:'#A8B820', icon:'🐛'},
    {id:'roca',      label:'Roca',       color:'#B8A038', icon:'🪨'},
    {id:'fantasma',  label:'Fantasma',   color:'#705898', icon:'👻'},
    {id:'dragon',    label:'Dragón',     color:'#7038F8', icon:'🐉'},
    {id:'siniestro', label:'Siniestro',  color:'#705848', icon:'🌑'},
    {id:'acero',     label:'Acero',      color:'#B8B8D0', icon:'⚙️'},
    {id:'hada',      label:'Hada',       color:'#EE99AC', icon:'✨'}
  ];
  var TYPES_BY_ID = {};
  TYPES.forEach(function(t){ TYPES_BY_ID[t.id] = t; });

  var CHART = {
    normal:    {roca:.5, fantasma:0, acero:.5},
    fuego:     {fuego:.5, agua:.5, planta:2, hielo:2, bicho:2, roca:.5, dragon:.5, acero:2},
    agua:      {fuego:2, agua:.5, planta:.5, tierra:2, roca:2, dragon:.5},
    electrico: {agua:2, electrico:.5, planta:.5, tierra:0, volador:2, dragon:.5},
    planta:    {fuego:.5, agua:2, planta:.5, veneno:.5, tierra:2, volador:.5, bicho:.5, roca:2, dragon:.5, acero:.5},
    hielo:     {fuego:.5, agua:.5, planta:2, hielo:.5, tierra:2, volador:2, dragon:2, acero:.5},
    lucha:     {normal:2, hielo:2, veneno:.5, volador:.5, psiquico:.5, bicho:.5, roca:2, fantasma:0, siniestro:2, acero:2, hada:.5},
    veneno:    {planta:2, veneno:.5, tierra:.5, roca:.5, fantasma:.5, acero:0, hada:2},
    tierra:    {fuego:2, electrico:2, planta:.5, veneno:2, volador:0, bicho:.5, roca:2, acero:2},
    volador:   {electrico:.5, lucha:2, planta:2, bicho:2, roca:.5, acero:.5},
    psiquico:  {lucha:2, veneno:2, psiquico:.5, siniestro:0, acero:.5},
    bicho:     {fuego:.5, planta:2, lucha:.5, veneno:.5, volador:.5, psiquico:2, fantasma:.5, siniestro:2, acero:.5, hada:.5},
    roca:      {fuego:2, hielo:2, lucha:.5, tierra:.5, volador:2, bicho:2, acero:.5},
    fantasma:  {normal:0, psiquico:2, fantasma:2, siniestro:.5},
    dragon:    {dragon:2, acero:.5, hada:0},
    siniestro: {lucha:.5, psiquico:2, fantasma:2, siniestro:.5, hada:.5},
    acero:     {fuego:.5, agua:.5, electrico:.5, hielo:2, roca:2, acero:.5, hada:2},
    hada:      {lucha:2, veneno:.5, dragon:2, siniestro:2, acero:.5}
  };

  var TIERS = [
    {mult:0,    key:'nulo',     label:'Sin efecto',            icon:'✕'},
    {mult:0.25, key:'muypoco',  label:'Muy poco eficaz',       icon:'▽ ▽'},
    {mult:0.5,  key:'poco',     label:'Poco eficaz',           icon:'▽'},
    {mult:1,    key:'neutral',  label:'Eficaz / Daño Neutro',  icon:'●'},
    {mult:2,    key:'super',    label:'Súper eficaz',          icon:'▲'},
    {mult:4,    key:'hiper',    label:'Hiper eficaz',          icon:'▲ ▲'}
  ];

  function getTier(mult){
    for (var i=0;i<TIERS.length;i++){ if (Math.abs(TIERS[i].mult-mult) < 0.001) return TIERS[i]; }
    return TIERS[3];
  }
  function getMultiplier(atkId, defId){
    if (!defId) return 1;
    var fila = CHART[atkId];
    if (!fila || !(defId in fila)) return 1;
    return fila[defId];
  }
  function contrastTextColor(hex){
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    var luminosidad = (0.299*r + 0.587*g + 0.114*b) / 255;
    return luminosidad > 0.6 ? '#1a1a1a' : '#ffffff';
  }
  function poblarSelectTipos(select, conNinguno){
    if (!select) return;
    select.innerHTML = '';
    if (conNinguno){
      var op0 = document.createElement('option');
      op0.value = '';
      op0.textContent = '— Ninguno —';
      select.appendChild(op0);
    }
    TYPES.forEach(function(t){
      var op = document.createElement('option');
      op.value = t.id;
      op.textContent = t.icon + ' ' + t.label;
      op.style.backgroundColor = t.color;
      op.style.color = contrastTextColor(t.color);
      select.appendChild(op);
    });
  }

  function inicializarCalculadoraTipos(){
    var selAtk  = document.getElementById('tpk-atk');
    var selDef1 = document.getElementById('tpk-def1');
    var selDef2 = document.getElementById('tpk-def2');
    if (!selAtk || !selDef1 || !selDef2 || selAtk.dataset.tpkInit) return;
    selAtk.dataset.tpkInit = '1';

    poblarSelectTipos(selAtk, false);
    poblarSelectTipos(selDef1, false);
    poblarSelectTipos(selDef2, true);
    selAtk.value  = 'fuego';
    selDef1.value = 'planta';
    selDef2.value = '';

    function actualizarChip(chipEl, typeId){
      if (!chipEl) return;
      if (!typeId){
        chipEl.textContent = '— Ninguno —';
        chipEl.className = 'tpk-chip tpk-chip-empty';
        chipEl.style.backgroundColor = '';
        chipEl.style.color = '';
        return;
      }
      var t = TYPES_BY_ID[typeId];
      chipEl.className = 'tpk-chip';
      chipEl.style.backgroundColor = t.color;
      chipEl.style.color = contrastTextColor(t.color);
      chipEl.innerHTML = '<span class="tpk-chip-dot"></span>' + t.icon + ' ' + t.label;
    }

    var resultEl      = document.getElementById('tpk-result');
    var resultMultEl  = document.getElementById('tpk-result-mult');
    var resultIconEl  = document.getElementById('tpk-result-icon');
    var resultLabelEl = document.getElementById('tpk-result-label');
    var resultBreakEl = document.getElementById('tpk-result-breakdown');

    function calcularTipos(){
      var atkId  = selAtk.value;
      var def1Id = selDef1.value;
      var def2Id = selDef2.value || null;

      actualizarChip(document.getElementById('tpk-atk-chip'),  atkId);
      actualizarChip(document.getElementById('tpk-def1-chip'), def1Id);
      actualizarChip(document.getElementById('tpk-def2-chip'), def2Id);

      var m1 = getMultiplier(atkId, def1Id);
      var m2 = def2Id ? getMultiplier(atkId, def2Id) : 1;
      var total = m1 * m2;

      var tier  = getTier(total);
      var atkT  = TYPES_BY_ID[atkId];
      var def1T = TYPES_BY_ID[def1Id];
      var def2T = def2Id ? TYPES_BY_ID[def2Id] : null;

      resultEl.setAttribute('data-tier', tier.key);
      resultMultEl.textContent = '×' + total;
      resultIconEl.textContent = tier.icon;
      resultLabelEl.textContent = tier.label;
      resultBreakEl.textContent = def2T
        ? (atkT.label + ' → ' + def1T.label + ' (×' + m1 + ') × ' + def2T.label + ' (×' + m2 + ') = ×' + total)
        : (atkT.label + ' → ' + def1T.label + ' = ×' + total);
    }

    [selAtk, selDef1, selDef2].forEach(function(sel){ sel.addEventListener('change', calcularTipos); });
    calcularTipos();
    construirTablaTipos();
  }

  function construirTablaTipos(){
    var tabla = document.getElementById('tpk-chart-table');
    if (!tabla || tabla.dataset.tpkInit) return;
    tabla.dataset.tpkInit = '1';

    var thead = '<tr><th class="tpk-chart-corner"></th>' + TYPES.map(function(t){
      return '<th title="Defensor: ' + t.label + '">' + t.icon + '</th>';
    }).join('') + '</tr>';

    var rows = TYPES.map(function(atk){
      var celdas = TYPES.map(function(def){
        var m = getMultiplier(atk.id, def.id);
        var cls = m === 0 ? 'tpk-c0' : m === 0.5 ? 'tpk-c05' : m === 2 ? 'tpk-c2' : 'tpk-c1';
        var txt = m === 0 ? '0' : m === 0.5 ? '½' : m === 2 ? '2' : '';
        return '<td class="' + cls + '" data-atk="' + atk.id + '" data-def="' + def.id + '">' + txt + '</td>';
      }).join('');
      return '<tr><th title="Atacante: ' + atk.label + '">' + atk.icon + '</th>' + celdas + '</tr>';
    }).join('');

    tabla.innerHTML = thead + rows;

    // Resaltar fila/columna al pasar el ratón
    tabla.addEventListener('mouseover', function(e){
      var celda = e.target.closest('td');
      if (!celda) return;
      var atk = celda.getAttribute('data-atk'), def = celda.getAttribute('data-def');
      tabla.querySelectorAll('td[data-atk="' + atk + '"], td[data-def="' + def + '"]').forEach(function(c){ c.classList.add('tpk-resaltada'); });
      tabla.querySelectorAll('tr').forEach(function(tr, i){
        if (i > 0 && TYPES[i-1].id === atk) tr.querySelector('th').classList.add('tpk-resaltada');
      });
      tabla.querySelectorAll('th').forEach(function(th, i){
        if (i > 0 && TYPES[i-1].id === def) th.classList.add('tpk-resaltada');
      });
    });
    tabla.addEventListener('mouseout', function(){
      tabla.querySelectorAll('.tpk-resaltada').forEach(function(c){ c.classList.remove('tpk-resaltada'); });
    });
    // Clic en una celda: cargarla directamente en la calculadora de arriba
    tabla.addEventListener('click', function(e){
      var celda = e.target.closest('td');
      if (!celda) return;
      var selAtk = document.getElementById('tpk-atk'), selDef1 = document.getElementById('tpk-def1'), selDef2 = document.getElementById('tpk-def2');
      if (!selAtk || !selDef1 || !selDef2) return;
      selAtk.value = celda.getAttribute('data-atk');
      selDef1.value = celda.getAttribute('data-def');
      selDef2.value = '';
      [selAtk, selDef1, selDef2].forEach(function(s){ s.dispatchEvent(new Event('change')); });
      var widget = document.getElementById('tpk-widget');
      if (widget) widget.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }
  document.addEventListener('DOMContentLoaded', inicializarCalculadoraTipos);
  if (document.readyState === 'complete' || document.readyState === 'interactive') inicializarCalculadoraTipos();
})();

/* ═══ CONSULTOR TIPOS POR GENERACIÓN ═══ */
(function(){
  // Traducción de nombre de tipo EN -> ES
  var TIPO_ES = {
    normal:'Normal',fire:'Fuego',water:'Agua',grass:'Planta',electric:'Eléctrico',
    ice:'Hielo',fighting:'Lucha',poison:'Veneno',ground:'Tierra',flying:'Volador',
    psychic:'Psíquico',bug:'Bicho',rock:'Roca',ghost:'Fantasma',dragon:'Dragón',
    dark:'Siniestro',steel:'Acero',fairy:'Hada'
  };

  // Colores por tipo ES
  var TYPE_COL = {
    Normal:'#A8A878',Fuego:'#F08030',Agua:'#6890F0',Planta:'#78C850','Eléctrico':'#F8D030',
    Hielo:'#98D8D8',Lucha:'#C03028',Veneno:'#A040A0',Tierra:'#E0C068',Volador:'#A890F0',
    'Psíquico':'#F85888',Bicho:'#A8B820',Roca:'#B8A038',Fantasma:'#705898','Dragón':'#7038F8',
    Siniestro:'#705848',Acero:'#B8B8D0',Hada:'#EE99AC'
  };

  // Generaciones a consultar con sus endpoints
  var GENS = [
    {label:'Gen I',   gen:1},
    {label:'Gen II',  gen:2},
    {label:'Gen III', gen:3},
    {label:'Gen IV',  gen:4},
    {label:'Gen V',   gen:5},
    {label:'Gen VI',  gen:6},
    {label:'Gen VII', gen:7},
    {label:'Gen VIII',gen:8},
    {label:'Gen IX',  gen:9},
  ];

  function typeTag(t){
    var c = TYPE_COL[t] || '#666';
    var r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
    var txt = (0.299*r+0.587*g+0.114*b)>145 ? '#111' : '#fff';
    return '<span style="background:'+c+';color:'+txt+';padding:2px 10px;border-radius:99px;font-size:10px;font-family:var(--font-display);font-weight:700;letter-spacing:.3px;display:inline-block;margin:1px 2px">'+t+'</span>';
  }

  function setResultado(html){
    document.getElementById('pgl-resultado').innerHTML = html;
  }

  function loading(msg){
    setResultado('<div style="color:var(--txt-secondary);font-size:12px;font-family:var(--font-display);animation:pulse 1s infinite">⏳ '+msg+'</div>');
  }

  function error(msg){
    setResultado('<div style="color:#e2646f;font-size:12px;font-family:var(--font-display)">⛔ '+msg+'</div>');
  }

  // Fetch with cache
  var _cache = {};
  function apiFetch(url){
    if(_cache[url]) return Promise.resolve(_cache[url]);
    return fetch(url).then(function(r){
      if(!r.ok) throw new Error('HTTP '+r.status);
      return r.json();
    }).then(function(d){ _cache[url]=d; return d; });
  }

  // Normalizar nombre para URL: quitar acentos, espacios->guion
  function toApiName(s){
    return s.trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/['']/g,'')
      .replace(/\s+/g,'-')
      .replace(/[^a-z0-9\-\.]/g,'');
  }

  // Obtener tipos de un pokemon en una gen concreta desde PokeAPI
  // Usamos el endpoint pokemon-species para saber en qué gen apareció,
  // y el pokemon endpoint para los tipos actuales. Para cambios históricos
  // usamos la historia en past_types del pokemon endpoint.
  function consultarPokemon(nameRaw){
    var apiName = toApiName(nameRaw);
    if(!apiName){ error('Nombre inválido.'); return; }

    loading('Buscando ' + nameRaw + '...');

    // 1) Buscar datos del pokémon (tipos actuales + past_types)
    apiFetch('https://pokeapi.co/api/v2/pokemon/' + apiName)
    .then(function(pokeData){
      // Nombre bonito
      var displayName = pokeData.name.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});

      // Tipos actuales
      var currentTypes = pokeData.types.map(function(t){ return TIPO_ES[t.type.name] || t.type.name; });

      // past_types: array de {generation:{url}, types:[...]}
      // generation url contiene /generation-N/ al final
      var pastTypes = pokeData.past_types || []; // [{generation:{url}, types:[]}]

      // 2) Saber en qué gen apareció usando species
      apiFetch(pokeData.species.url)
      .then(function(speciesData){
        // generation url ej: https://pokeapi.co/api/v2/generation/1/
        var genUrl = speciesData.generation.url;
        var genMatch = genUrl.match(/\/generation\/(\d+)\//);
        var introGen = genMatch ? parseInt(genMatch[1]) : 1;

        // Construir mapa genNum -> tipos
        // past_types tiene los tipos que tenía HASTA esa gen (inclusive)
        // Ordenar past_types por generación descendente
        var pastSorted = pastTypes.map(function(pt){
          var m = pt.generation.url.match(/\/generation\/(\d+)\//);
          return { gen: m ? parseInt(m[1]) : 0, types: pt.types.map(function(t){ return TIPO_ES[t.type.name]||t.type.name; }) };
        }).sort(function(a,b){ return a.gen - b.gen; });

        // Para cada gen (1..9), determinar los tipos
        function getTypesForGen(g){
          if(g < introGen) return null;
          // buscar el past_types más antiguo que cubra esta gen
          for(var i=0; i<pastSorted.length; i++){
            if(g <= pastSorted[i].gen) return pastSorted[i].types;
          }
          return currentTypes;
        }

        // Renderizar tabla
        var filas = '';
        var prevKey = '__NONE__';
        var hasCambio = false;
        for(var g=0; g<GENS.length; g++){
          var genNum = GENS[g].gen;
          var tipos = getTypesForGen(genNum);
          if(tipos === null) continue;
          var tipoKey = tipos.join('/');
          var esCambio = prevKey !== '__NONE__' && tipoKey !== prevKey;
          if(esCambio) hasCambio = true;
          var tags = tipos.map(typeTag).join('');
          var cambioMark = esCambio ? '<span style="color:var(--neon-packs);font-size:9px;font-family:var(--font-display);margin-left:8px;vertical-align:middle;font-weight:700">▲ CAMBIO</span>' : '';
          var rowStyle = esCambio
            ? 'background:rgba(201,154,46,.06);border-left:3px solid var(--neon-packs)'
            : 'border-left:3px solid transparent';
          filas += '<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--borde);'+rowStyle+'">'
                 + '<span style="min-width:54px;font-family:var(--font-display);font-size:10px;font-weight:700;color:var(--txt-secondary)">'+GENS[g].label+'</span>'
                 + '<div style="flex:1">'+tags+'</div>'
                 + cambioMark
                 + '</div>';
          prevKey = tipoKey;
        }

        var banner = hasCambio
          ? '<div style="background:rgba(201,154,46,.08);border:1px solid rgba(201,154,46,.25);border-radius:var(--r-md);padding:8px 12px;margin-bottom:10px;font-size:11px;color:var(--neon-packs);font-family:var(--font-display);font-weight:700">⚠️ Este Pokémon cambió de tipo entre generaciones</div>'
          : '<div style="background:rgba(30,158,115,.06);border:1px solid rgba(30,158,115,.18);border-radius:var(--r-md);padding:8px 12px;margin-bottom:10px;font-size:11px;color:var(--neon-legal);font-family:var(--font-display);font-weight:700">✅ Tipos consistentes en todas las generaciones</div>';

        setResultado(
          '<div style="font-family:var(--font-display);font-size:14px;font-weight:900;color:var(--blanco);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">'+displayName+'</div>'
          + banner
          + '<div style="border:1px solid var(--borde);border-radius:var(--r-md);overflow:hidden">'+filas+'</div>'
        );
      });
    })
    .catch(function(e){
      error('Pokémon no encontrado. Prueba con el nombre en inglés (ej: "snubbull", "clefairy", "charizard").');
    });
  }

  // Autocomplete con PokeAPI name list (cargamos los primeros 2000)
  var _allNames = [];
  function cargarNombres(){
    apiFetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0').then(function(d){
      _allNames = d.results.map(function(p){ return p.name; });
    }).catch(function(){});
  }
  cargarNombres();

  window.pglBuscar = function(){
    var val = document.getElementById('pgl-input').value.trim().toLowerCase().replace(/\s+/g,'-');
    var sug = document.getElementById('pgl-sugerencias');
    if(val.length < 2){ sug.style.display='none'; return; }
    var matches = _allNames.filter(function(n){ return n.indexOf(val) !== -1; }).slice(0,8);
    if(!matches.length){ sug.style.display='none'; return; }
    sug.innerHTML = matches.map(function(m){
      var label = m.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
      return '<div onclick="document.getElementById(\'pgl-input\').value=\''+label+'\';document.getElementById(\'pgl-sugerencias\').style.display=\'none\';window.pglConsultar()" '
           + 'style="padding:8px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--borde);color:var(--txt-primary);font-family:var(--font-body)" '
           + 'onmouseover="this.style.background=\'var(--bg-overlay)\'" onmouseout="this.style.background=\'\'">'+label+'</div>';
    }).join('');
    sug.style.display = 'block';
  };

  window.pglConsultar = function(){
    var val = document.getElementById('pgl-input').value.trim();
    document.getElementById('pgl-sugerencias').style.display='none';
    if(!val){ error('Escribe el nombre de un Pokémon.'); return; }
    consultarPokemon(val);
  };

  document.addEventListener('click', function(e){
    if(!e.target.closest('#poke-gen-lookup')){
      var s = document.getElementById('pgl-sugerencias');
      if(s) s.style.display = 'none';
    }
  });

  document.addEventListener('DOMContentLoaded', function(){
    var inp = document.getElementById('pgl-input');
    if(inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter') window.pglConsultar(); });
    // Cerrar sugerencias mipoke al clickar fuera
    document.addEventListener('click', function(e){
      if(!e.target.closest('#mipoke-search') && !e.target.closest('#mipoke-sugerencias')){
        var s = document.getElementById('mipoke-sugerencias');
        if(s) s.style.display='none';
      }
    });
    // Enter en buscador mipoke selecciona el primer resultado
    var msin = document.getElementById('mipoke-search');
    if(msin) msin.addEventListener('keydown', function(e){
      if(e.key==='Enter'){
        var s = document.getElementById('mipoke-sugerencias');
        if(s && s.firstChild) s.firstChild.click();
      }
    });
  });
})();



