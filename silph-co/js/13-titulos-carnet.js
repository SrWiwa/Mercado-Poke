/* ═══════════ TÍTULOS / RANGOS ═══════════ */

var TITULOS_CONFIG = [
  {
    id: 'ganalockes',
    icon: '🏆',
    nombre: 'Ganalockes',
    desc: 'Gana al menos un Locke',
    condicion: function(u){ return u.lockeStatus === 'ganado'; }
  },
  {
    id: 'lloron',
    icon: '😭',
    nombre: 'Llorón',
    desc: '5 o más muertes en el Locke',
    condicion: function(u){ return (u.cementerio||[]).length >= 5; }
  },
  {
    id: 'wipeador',
    icon: '💥',
    nombre: 'Wipeador',
    desc: '10 o más muertes en el Locke',
    condicion: function(u){ return (u.cementerio||[]).length >= 10; }
  },
  {
    id: 'juicioso',
    icon: '🧘',
    nombre: 'Juicioso',
    desc: '3 o más torneos ganados',
    condicion: function(u){ return (u.torneos||0) >= 3; }
  },
  {
    id: 'pokeinomano',
    icon: '🔥',
    nombre: 'Pokéinomano',
    desc: '3 o más sacrificios realizados',
    condicion: function(u){ return (u.sacrificios||[]).length >= 3; }
  }
];

var TEMAS_DESBLOQUEABLES = [
  { id:'locke',    nombre:'Tema del Locke',  dot:'#c99a2e', desc:'Automático (Campeón)', gratis:true },
];

function calcularTitulosDesbloqueados(u){
  if(!u) return [];
  return TITULOS_CONFIG.filter(function(t){ return t.condicion(u); }).map(function(t){ return t.id; });
}

window.obtenerTituloActivoJugador = function(u){
  if(!u || !u.tituloActivo) return null;
  if(u.tituloActivo === 'manual'){
    return u.tituloManual ? { icon: '🏷️', nombre: u.tituloManual } : null;
  }
  var desbloqueados = calcularTitulosDesbloqueados(u);
  if(desbloqueados.indexOf(u.tituloActivo) === -1) return null;
  var cfg = TITULOS_CONFIG.find(function(t){ return t.id === u.tituloActivo; });
  return cfg ? { icon: cfg.icon, nombre: cfg.nombre } : null;
};

/* ═══ CARNET DE ENTRENADOR (SVG) ═══ */
var carnetTargetId = null;

/* ════════════════════════════════════════
   CARNET DE ENTRENADOR — sistema completo
   ════════════════════════════════════════ */

var CARNET_COLORES = [
  { id:'auto',    hex:null,      label:'Auto'     },
  { id:'indigo',  hex:'#6366f1', label:'Índigo'   },
  { id:'cyan',    hex:'#06b6d4', label:'Cyan'     },
  { id:'emerald', hex:'#1e9e73', label:'Esmeralda'},
  { id:'rose',    hex:'#f43f5e', label:'Rosa'     },
  { id:'amber',   hex:'#c99a2e', label:'Ámbar'    },
  { id:'violet',  hex:'#8e4fc7', label:'Violeta'  },
  { id:'slate',   hex:'#94a3b8', label:'Gris'     },
];

var CARNET_FONDOS = [
  { id:'oscuro',   label:'Oscuro',   icon:'🌑', desc:'Clásico oscuro' },
  { id:'midnight', label:'Midnight', icon:'🌌', desc:'Azul noche'     },
  { id:'carbon',   label:'Carbon',   icon:'⬛', desc:'Negro mate'     },
  { id:'aurora',   label:'Aurora',   icon:'🌈', desc:'Degradado vivo' },
];

var CARNET_LAYOUTS = [
  { id:'clasico',    label:'Clásico',    icon:'🪪', desc:'Horizontal'  },
  { id:'vertical',   label:'Pokémon',    icon:'📄', desc:'Vertical'    },
  { id:'minimalista',label:'Minimalista',icon:'◻️', desc:'Sin sprites'  },
];

function _carnetColor(id, jugadorColor){
  if(id === 'auto' || !id) return jugadorColor;
  var c = CARNET_COLORES.find(function(x){ return x.id === id; });
  return (c && c.hex) ? c.hex : jugadorColor;
}

function _carnetFondoParams(id){
  switch(id){
    // Azul noche profundo con franja azul eléctrico
    case 'midnight': return { bg1:'#030d1f', bg2:'#000810', stripe1:'#0ea5e9', stripe2:'#0284c7', accentOp:0.32, borderOp:0.35 };
    // Negro puro carbón, contraste máximo
    case 'carbon':   return { bg1:'#141414', bg2:'#000000', stripe1:'#27272a', stripe2:'#18181b', accentOp:0.40, borderOp:0.45 };
    // Degradado vivo violeta→índigo
    case 'aurora':   return { bg1:'#160b2e', bg2:'#060314', stripe1:'#7c3aed', stripe2:'#4f46e5', accentOp:0.55, borderOp:0.50 };
    // Oscuro clásico (default)
    default:         return { bg1:'#0f1929', bg2:'#060c16', stripe1:null,       stripe2:null,      accentOp:0.18, borderOp:0.30 };
  }
}

function _pipsSVG(numMed, color, startX, spacing, r){
  var s = '';
  for(var i = 0; i < 8; i++){
    var cx = startX + i * spacing;
    var filled = i < numMed;
    s += '<circle cx="'+cx+'" cy="0" r="'+r+'" fill="'+(filled?color:'#1a2234')+'" stroke="'+(filled?color:'#2d3f5a')+'" stroke-width="1.5" opacity="'+(filled?'1':'0.5')+'"/>';
  }
  return s;
}

function _mpBlock_clasico(mp, color){
  if(mp && mp.nombre){
    var n  = escaparHTML(mp.nombre);
    var mo = mp.mote ? '<text x="534" y="234" text-anchor="middle" font-size="10" fill="#ffffff" opacity="0.65" font-style="italic">&#8220;'+escaparHTML(mp.mote)+'&#8221;</text>' : '';
    var img = mp.sprite
      ? '<image href="'+mp.sprite+'" x="476" y="88" width="116" height="116" preserveAspectRatio="xMidYMid meet"/>'
      : '<text x="534" y="152" text-anchor="middle" font-size="38" fill="#ffffff" opacity="0.15">?</text>';
    return img+'<text x="534" y="222" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff">'+n+'</text>'+mo;
  }
  return '<text x="534" y="155" text-anchor="middle" font-size="36" fill="#ffffff" opacity="0.15">❓</text>'
       + '<text x="534" y="215" text-anchor="middle" font-size="10" fill="#ffffff" opacity="0.38">Sin Pokemon asignado</text>';
}

/* ── LAYOUT CLÁSICO / HORIZONTAL (640×300) ── */
function _svgClasico(u, id, color, fondo, tit, lockeStatus){
  var fp=_carnetFondoParams(fondo), cm=color;
  var lockeTxt  = lockeStatus==='ganado'?'LOCKE GANADO':(lockeStatus==='perdido'?'LOCKE PERDIDO':'EN CURSO');
  var lockeIco  = lockeStatus==='ganado'?'🏆':(lockeStatus==='perdido'?'💀':'⚡');
  var lockeCol  = lockeStatus==='ganado'?'#1e9e73':(lockeStatus==='perdido'?'#d8293f':'#c99a2e');
  var numMed=u.numMedallas||0, dinero=(u.dinero||0).toLocaleString('es-ES'), pf=u.pf||0;
  var vidas=u.vidasActuales!==undefined?u.vidasActuales:(u.vidasTotales||20), vidasT=u.vidasTotales||20;
  var fecha=new Date().toLocaleDateString('es-ES'), ini=escaparHTML(id.slice(0,2).toUpperCase());
  var mp=u.mejorPokemon||null;

  // Pokémon panel (columna derecha fija 180px)
  var mpX=460, mpCX=550;
  var mpImg=mp&&mp.sprite
    ?'<image href="'+mp.sprite+'" x="'+(mpX+10)+'" y="88" width="120" height="120" preserveAspectRatio="xMidYMid meet"/>'
    :'<text x="'+mpCX+'" y="160" text-anchor="middle" font-size="48" fill="'+cm+'12">?</text>';
  var mpNom=mp&&mp.nombre?'<text x="'+mpCX+'" y="222" text-anchor="middle" font-size="11" font-weight="700" fill="#e2e8f0">'+escaparHTML(mp.nombre)+'</text>':'<text x="'+mpCX+'" y="220" text-anchor="middle" font-size="9" fill="#ffffff" opacity="0.60">Sin Pokémon</text>';
  var mpMot=mp&&mp.mote?'<text x="'+mpCX+'" y="237" text-anchor="middle" font-size="9" fill="#ffffff" opacity="0.65" font-style="italic">"'+escaparHTML(mp.mote)+'"</text>':'';

  // Columna izquierda — layout fijo sin variables dinámicas problemáticas
  // Zona: nombre en y=92, título en y=114 (opcional), badge en y=138/114
  var titSVG='', badgeY=0;
  if(tit){
    titSVG='<rect x="108" y="100" rx="10" width="210" height="19" fill="'+cm+'18" stroke="'+cm+'40" stroke-width="1"/>'
           +'<text x="213" y="113" text-anchor="middle" font-size="9.5" font-weight="700" fill="'+cm+'">'+escaparHTML(tit.icon+' '+tit.nombre)+'</text>';
    badgeY=128;
  } else {
    badgeY=108;
  }

  // Medallas en fila simple
  var pips='';
  for(var pi=0;pi<8;pi++){
    var px=28+pi*28, filled=pi<numMed;
    pips+='<rect x="'+(px-7)+'" y="-7" width="14" height="14" rx="4" fill="'+(filled?cm:'#1a2234')+'" stroke="'+(filled?cm:'#2d3748')+'" stroke-width="1.5" opacity="'+(filled?'1':'0.5')+'"/>';
  }

  // Zona de stats: empieza en y=160 (fija)
  // Vidas: label y=163, valor y=182
  // Medallas: label y=200, pips y=216
  // Separador: y=232
  // Cards dinero/PF: y=240 → 300
  var totalH=310;

  return '<svg viewBox="0 0 640 '+totalH+'" xmlns="http://www.w3.org/2000/svg" font-family="Arial,sans-serif">'
    +'<defs>'
    +'<linearGradient id="cg0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="'+fp.bg1+'"/><stop offset="100%" stop-color="'+fp.bg2+'"/></linearGradient>'
    +'<linearGradient id="cg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="'+cm+'" stop-opacity="0.60"/><stop offset="100%" stop-color="'+cm+'" stop-opacity="0"/></linearGradient>'
    +'<clipPath id="cpcard"><rect x="1" y="1" width="638" height="'+(totalH-2)+'" rx="16"/></clipPath>'
    +'</defs>'
    +'<rect x="1" y="1" width="638" height="'+(totalH-2)+'" rx="16" fill="url(#cg0)" stroke="'+cm+'55" stroke-width="1.5"/>'
    // Franja superior de color
    +'<rect x="1" y="1" width="638" height="54" rx="16" fill="'+cm+'" opacity="0.10" clip-path="url(#cpcard)"/>'
    // Barra izq decorativa
    +'<rect x="1" y="1" width="4" height="'+(totalH-2)+'" rx="2" fill="url(#cg1)"/>'
    // Divisor header
    +'<line x1="1" y1="54" x2="639" y2="54" stroke="'+cm+'" stroke-opacity="0.15" stroke-width="1"/>'
    // Header: logo + fecha
    +'<text x="20" y="28" font-size="11" font-weight="700" letter-spacing="3" fill="'+cm+'" opacity="0.9">SILPH CO.</text>'
    +'<text x="20" y="44" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">TRAINER CARD</text>'
    +'<text x="620" y="44" text-anchor="end" font-size="7.5" fill="#ffffff" opacity="0.60">'+fecha+'</text>'
    // Divisor vertical columna pokémon
    +'<line x1="452" y1="62" x2="452" y2="'+(totalH-12)+'" stroke="'+cm+'" stroke-opacity="0.12" stroke-width="1"/>'
    // Pokémon panel — label de cabecera
    +'<text x="'+mpCX+'" y="80" text-anchor="middle" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">MEJOR POKÉMON</text>'
    +'<line x1="462" y1="84" x2="630" y2="84" stroke="'+cm+'" stroke-opacity="0.08" stroke-width="1"/>'
    +mpImg+mpNom+mpMot
    // Avatar
    +'<circle cx="56" cy="108" r="34" fill="'+cm+'14" stroke="'+cm+'" stroke-width="2"/>'
    +'<circle cx="56" cy="108" r="26" fill="'+cm+'22"/>'
    +'<text x="56" y="116" text-anchor="middle" font-size="19" font-weight="700" fill="'+cm+'">'+ini+'</text>'
    // Nombre — y fijo en 90
    +'<text x="104" y="90" font-size="19" font-weight="700" fill="#f1f5f9" letter-spacing="0.4">'+escaparHTML(id.toUpperCase())+'</text>'
    // Título (opcional) — y fijo en 113
    +titSVG
    // Badge estado — posición calculada según si hay título
    +'<rect x="104" y="'+badgeY+'" width="162" height="18" rx="9" fill="'+lockeCol+'18" stroke="'+lockeCol+'50" stroke-width="1"/>'
    +'<text x="185" y="'+(badgeY+12)+'" text-anchor="middle" font-size="8.5" font-weight="700" fill="'+lockeCol+'">'+lockeIco+' '+lockeTxt+'</text>'
    // Separador horizontal
    +'<line x1="14" y1="158" x2="442" y2="158" stroke="'+cm+'" stroke-opacity="0.10" stroke-width="1"/>'
    // Vidas — label y=170, valor y=188
    +'<text x="20" y="170" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">VIDAS</text>'
    +'<text x="20" y="188" font-size="16" font-weight="700" fill="#e2646f">'+vidas+' / '+vidasT+' ❤️</text>'
    // Medallas — label y=206, pips en y=220
    +'<text x="20" y="206" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">MEDALLAS · '+numMed+'/8</text>'
    +'<g transform="translate(20,220)">'+pips+'</g>'
    // Separador
    +'<line x1="14" y1="240" x2="442" y2="240" stroke="'+cm+'" stroke-opacity="0.08" stroke-width="1"/>'
    // Cards dinero + PF — desde y=248
    +'<rect x="16" y="250" width="195" height="50" rx="10" fill="'+cm+'08" stroke="#1e9e7330" stroke-width="1"/>'
    +'<text x="28" y="264" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">POKEDÓLARES</text>'
    +'<text x="28" y="291" font-size="18" font-weight="700" fill="#1e9e73">'+dinero+' P&#8360;</text>'
    +'<rect x="222" y="250" width="195" height="50" rx="10" fill="'+cm+'08" stroke="#8e4fc730" stroke-width="1"/>'
    +'<text x="234" y="264" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">PUNTOS DE FAVOR</text>'
    +'<text x="234" y="291" font-size="18" font-weight="700" fill="#8e4fc7">'+pf+' PF</text>'
    +'</svg>';
}

/* ── LAYOUT VERTICAL (360×600) ──────────────────────────────────────
   MAPA DE ZONAS (todas coordenadas absolutas, nada dinámico):

    0 ──── HEADER (bg coloreado) ────────────────────────────
   65 ──── AVATAR  cy=108  r=34  (ocupa 74–142) ────────────
  142 ──── NOMBRE  text-y=158 ──────────────────────────────
  160 ──── TÍTULO  rect y=164 h=20 (si existe, si no: vacío)
  186 ──── BADGE   rect y=188 h=22 ────────────────────────
  212 ──── gap ────────────────────────────────────────────
  220 ──── PANEL POKÉMON rect y=220 h=160 ─────────────────
              label  text-y=235
              imagen x=110 y=244 w=140 h=100
              nombre text-y=360
              mote   text-y=376
  382 ──── fin panel (220+160=380 + 2px borde) ────────────
  394 ──── SEPARADOR line y=394 ───────────────────────────
  408 ──── LABEL VIDAS   x=20   | LABEL MEDALLAS x=192 ──
  426 ──── VALOR VIDAS   x=20   | PIPS g(192,428) ────────
            (font-size 15, ocupa hasta ~442)
            (pips 2 filas×18px+4gap = 40 → hasta ~468)
  470 ──── SEPARADOR line y=470 ───────────────────────────
  480 ──── CARD DINERO rect y=480 h=54 ────────────────────
            label  text-y=494
            valor  text-y=524   (font 16)
  536 ──── fin cards ────────────────────────────────────
  548 ──── PIE fecha text-y=562 ────────────────────────
  570 ──── viewBox height ─────────────────────────────
─────────────────────────────────────────────────────── */
function _svgVertical(u, id, color, fondo, tit, lockeStatus){
  var fp=_carnetFondoParams(fondo), cm=color;
  var lockeTxt = lockeStatus==='ganado'?'GANADO':(lockeStatus==='perdido'?'PERDIDO':'EN CURSO');
  var lockeIco = lockeStatus==='ganado'?'🏆':(lockeStatus==='perdido'?'💀':'⚡');
  var lockeCol = lockeStatus==='ganado'?'#1e9e73':(lockeStatus==='perdido'?'#d8293f':'#c99a2e');
  var numMed=u.numMedallas||0, dinero=(u.dinero||0).toLocaleString('es-ES'), pf=u.pf||0;
  var vidas=u.vidasActuales!==undefined?u.vidasActuales:(u.vidasTotales||20), vidasT=u.vidasTotales||20;
  var fecha=new Date().toLocaleDateString('es-ES'), ini=escaparHTML(id.slice(0,2).toUpperCase());
  var mp=u.mejorPokemon||null;

  // Título — ocupa zona y=164–184 (solo si existe; si no, espacio en blanco)
  var titSVG = tit
    ? '<rect x="90" y="164" rx="10" width="180" height="20" fill="'+cm+'18" stroke="'+cm+'40" stroke-width="1"/>'
      +'<text x="180" y="177" text-anchor="middle" font-size="9" font-weight="700" fill="'+cm+'">'+escaparHTML(tit.icon+' '+tit.nombre)+'</text>'
    : '';

  // Panel pokémon — coordenadas ABSOLUTAS, no relativas
  // rect: y=220 h=160  →  termina en 380
  // label: y=235  imagen: y=244 h=100 (termina 344)  nombre: y=360  mote: y=376
  var mpImg = mp&&mp.sprite
    ? '<image href="'+mp.sprite+'" x="110" y="244" width="140" height="100" preserveAspectRatio="xMidYMid meet"/>'
    : '<text x="180" y="310" text-anchor="middle" font-size="44" fill="'+cm+'10">?</text>';
  var mpNom = mp&&mp.nombre
    ? '<text x="180" y="360" text-anchor="middle" font-size="12" font-weight="700" fill="#e2e8f0">'+escaparHTML(mp.nombre)+'</text>'
    : '<text x="180" y="356" text-anchor="middle" font-size="9" fill="#ffffff" opacity="0.60">Sin Pokémon asignado</text>';
  var mpMot = mp&&mp.mote
    ? '<text x="180" y="376" text-anchor="middle" font-size="9" fill="#ffffff" opacity="0.65" font-style="italic">"'+escaparHTML(mp.mote)+'"</text>'
    : '';

  // Medallas 4×2 — pips de 18×18 con gap 4px — grupo translateado a (192,428)
  // fila0: y=0–18  fila1: y=22–40 → el grupo mide 40px de alto, termina en 468
  var pipsMed='';
  for(var pi=0;pi<8;pi++){
    var col2=pi%4, row2=Math.floor(pi/4);
    pipsMed+='<rect x="'+(col2*22)+'" y="'+(row2*22)+'" width="18" height="18" rx="5"'
      +' fill="'+(pi<numMed?cm:'#1a2234')+'" stroke="'+(pi<numMed?cm:'#2d3748')+'"'
      +' stroke-width="1.5" opacity="'+(pi<numMed?'1':'0.45')+'"/>';
  }

  return '<svg viewBox="0 0 360 580" xmlns="http://www.w3.org/2000/svg" font-family="Arial,sans-serif">'
    // ── DEFS ──
    +'<defs>'
    +'<linearGradient id="cv0" x1="0" y1="0" x2="0" y2="1">'
      +'<stop offset="0%" stop-color="'+fp.bg1+'"/>'
      +'<stop offset="100%" stop-color="'+fp.bg2+'"/>'
    +'</linearGradient>'
    +'<linearGradient id="cv1" x1="0" y1="0" x2="1" y2="0">'
      +'<stop offset="0%" stop-color="'+cm+'" stop-opacity="0.4"/>'
      +'<stop offset="100%" stop-color="'+cm+'" stop-opacity="0"/>'
    +'</linearGradient>'
    +'<clipPath id="cvclip"><rect x="1" y="1" width="358" height="578" rx="18"/></clipPath>'
    +'</defs>'

    // ── FONDO ──
    +'<rect x="1" y="1" width="358" height="578" rx="18" fill="url(#cv0)" stroke="'+cm+'55" stroke-width="1.5"/>'
    +'<rect x="1" y="1" width="358" height="65" rx="18" fill="'+cm+'" opacity="0.12" clip-path="url(#cvclip)"/>'
    +'<rect x="1" y="1" width="358" height="4" rx="2" fill="url(#cv1)"/>'
    +'<line x1="1" y1="65" x2="359" y2="65" stroke="'+cm+'" stroke-opacity="0.18" stroke-width="1"/>'

    // ── ZONA 1: HEADER  (y 0–65) ──
    +'<text x="180" y="32" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="3" fill="'+cm+'" opacity="0.9">SILPH CO.</text>'
    +'<text x="180" y="49" text-anchor="middle" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">TRAINER CARD</text>'

    // ── ZONA 2: AVATAR  (cy=108, ocupa 74–142) ──
    +'<circle cx="180" cy="108" r="34" fill="'+cm+'14" stroke="'+cm+'" stroke-width="2"/>'
    +'<circle cx="180" cy="108" r="25" fill="'+cm+'22"/>'
    +'<text x="180" y="116" text-anchor="middle" font-size="18" font-weight="700" fill="'+cm+'">'+ini+'</text>'

    // ── ZONA 3: NOMBRE  (text-y=156) ──
    +'<text x="180" y="156" text-anchor="middle" font-size="16" font-weight="700" fill="#f1f5f9" letter-spacing="0.5">'+escaparHTML(id.toUpperCase())+'</text>'

    // ── ZONA 4: TÍTULO opcional (rect y=164–184) ──
    +titSVG

    // ── ZONA 5: BADGE ESTADO  (rect y=188–210) ──
    +'<rect x="100" y="188" width="160" height="22" rx="11" fill="'+lockeCol+'18" stroke="'+lockeCol+'50" stroke-width="1"/>'
    +'<text x="180" y="203" text-anchor="middle" font-size="8.5" font-weight="700" fill="'+lockeCol+'">'+lockeIco+' '+lockeTxt+'</text>'

    // ── ZONA 6: PANEL POKÉMON  (rect y=220–380) ──
    +'<rect x="30" y="220" width="300" height="160" rx="12" fill="'+cm+'07" stroke="'+cm+'22" stroke-width="1"/>'
    +'<line x1="30" y1="242" x2="330" y2="242" stroke="'+cm+'" stroke-opacity="0.10" stroke-width="1"/>'
    +'<text x="180" y="235" text-anchor="middle" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">MEJOR POKÉMON</text>'
    +mpImg
    +mpNom
    +mpMot

    // ── ZONA 7: SEPARADOR  (y=394) ──
    +'<line x1="20" y1="394" x2="340" y2="394" stroke="'+cm+'" stroke-opacity="0.10" stroke-width="1"/>'

    // ── ZONA 8: STATS  (labels y=408, valores y=426 | pips desde y=410) ──
    +'<text x="20" y="408" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">VIDAS</text>'
    +'<text x="20" y="428" font-size="16" font-weight="700" fill="#e2646f">'+vidas+' / '+vidasT+' ❤️</text>'
    +'<text x="192" y="408" font-size="7.5" fill="#ffffff" opacity="0.60" letter-spacing="1.5">MEDALLAS · '+numMed+'/8</text>'
    +'<g transform="translate(192,414)">'+pipsMed+'</g>'

    // ── ZONA 9: SEPARADOR  (y=468) ──
    +'<line x1="20" y1="468" x2="340" y2="468" stroke="'+cm+'" stroke-opacity="0.08" stroke-width="1"/>'

    // ── ZONA 10: CARDS DINERO + PF  (rect y=478 h=54 → termina 532) ──
    +'<rect x="14" y="478" width="156" height="54" rx="10" fill="'+cm+'08" stroke="#1e9e7330" stroke-width="1"/>'
    +'<text x="26" y="492" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">POKEDÓLARES</text>'
    +'<text x="26" y="522" font-size="16" font-weight="700" fill="#1e9e73">'+dinero+' P&#8360;</text>'
    +'<rect x="184" y="478" width="156" height="54" rx="10" fill="'+cm+'08" stroke="#8e4fc730" stroke-width="1"/>'
    +'<text x="196" y="492" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">PUNTOS DE FAVOR</text>'
    +'<text x="196" y="522" font-size="16" font-weight="700" fill="#8e4fc7">'+pf+' PF</text>'

    // ── ZONA 11: PIE  (y=562) ──
    +'<text x="180" y="566" text-anchor="middle" font-size="7.5" fill="#ffffff" opacity="0.40">'+fecha+'</text>'

    +'</svg>';
}

/* ── LAYOUT MINIMALISTA — Tarjeta ID horizontal compacta (620×220) ──
   Zonas fijas:
   0–220  → card completa
   Izq:   avatar centrado en cx=52 cy=110
   Dcha:  columna x=108
     y=32  → SILPH CO. (label)
     y=46  → TRAINER CARD (sub-label)
     y=72  → nombre jugador
     y=88  → título (opcional)
     y=106 → badge estado
     ── separador y=124 ──
     y=138 → labels stats
     y=158 → valores stats (vidas | medallas | dinero | PF)
     y=196 → fecha
── */
function _svgMinimalista(u, id, color, fondo, tit, lockeStatus){
  var fp=_carnetFondoParams(fondo), cm=color;
  var lockeTxt  = lockeStatus==='ganado'?'GANADO':(lockeStatus==='perdido'?'PERDIDO':'EN CURSO');
  var lockeIco  = lockeStatus==='ganado'?'🏆':(lockeStatus==='perdido'?'💀':'⚡');
  var lockeCol  = lockeStatus==='ganado'?'#1e9e73':(lockeStatus==='perdido'?'#d8293f':'#c99a2e');
  var numMed=u.numMedallas||0, dinero=(u.dinero||0).toLocaleString('es-ES'), pf=u.pf||0;
  var vidas=u.vidasActuales!==undefined?u.vidasActuales:(u.vidasTotales||20), vidasT=u.vidasTotales||20;
  var fecha=new Date().toLocaleDateString('es-ES'), ini=escaparHTML(id.slice(0,2).toUpperCase());

  // Título (opcional) — ocupa y=88-100, empuja badge si está presente
  var titSVG=tit
    ?'<rect x="108" y="88" rx="9" width="190" height="16" fill="'+cm+'18" stroke="'+cm+'40" stroke-width="1"/>'
     +'<text x="203" y="99" text-anchor="middle" font-size="8.5" font-weight="700" fill="'+cm+'">'+escaparHTML(tit.icon+' '+tit.nombre)+'</text>'
    :'';
  // Badge: y=110 sin título / y=110 con título (el título está en 88-104, badge en 110 de todas formas — las filas no se pisan)
  var badgeY = tit ? 110 : 110; // mismo sitio: la fila de label+badge siempre en y=110

  // Medallas — 8 pips en línea, espaciado 18px
  var pips='';
  for(var pi=0;pi<8;pi++){
    pips+='<rect x="'+(pi*19)+'" y="0" width="14" height="14" rx="4" fill="'+(pi<numMed?cm:'#1a2234')+'" stroke="'+(pi<numMed?cm:'#2d3748')+'" stroke-width="1.2" opacity="'+(pi<numMed?'1':'0.45')+'"/>';
  }

  return '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" font-family="Arial,sans-serif">'
    +'<defs>'
    +'<linearGradient id="cm0" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="'+fp.bg1+'"/><stop offset="100%" stop-color="'+fp.bg2+'"/></linearGradient>'
    +'<linearGradient id="cm1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="'+cm+'" stop-opacity="0.65"/><stop offset="55%" stop-color="'+cm+'" stop-opacity="0.06"/><stop offset="100%" stop-color="'+cm+'" stop-opacity="0"/></linearGradient>'
    +'<clipPath id="cmclip"><rect x="1" y="1" width="618" height="218" rx="14"/></clipPath>'
    +'</defs>'
    +'<rect x="1" y="1" width="618" height="218" rx="14" fill="url(#cm0)" stroke="'+cm+'55" stroke-width="1.5"/>'
    // Zona izquierda coloreada + gradiente
    +'<rect x="1" y="1" width="94" height="218" rx="14" fill="'+cm+'" opacity="0.11" clip-path="url(#cmclip)"/>'
    +'<rect x="1" y="1" width="618" height="218" fill="url(#cm1)" clip-path="url(#cmclip)" opacity="0.55"/>'
    // Borde izq sólido (acento color)
    +'<rect x="1" y="1" width="5" height="218" rx="3" fill="'+cm+'" opacity="0.85"/>'
    // Divisor vertical
    +'<line x1="96" y1="14" x2="96" y2="206" stroke="'+cm+'" stroke-opacity="0.15" stroke-width="1"/>'
    // ── AVATAR ── cx=52 cy=110
    +'<circle cx="52" cy="110" r="30" fill="'+cm+'1a" stroke="'+cm+'" stroke-width="1.5"/>'
    +'<circle cx="52" cy="110" r="22" fill="'+cm+'26"/>'
    +'<text x="52" y="118" text-anchor="middle" font-size="16" font-weight="700" fill="'+cm+'">'+ini+'</text>'
    // ── BLOQUE INFO DERECHO ──
    // Sub-label superior
    +'<text x="108" y="32" font-size="7" fill="#ffffff" opacity="0.40" letter-spacing="2">SILPH CO. · TRAINER CARD</text>'
    // Nombre
    +'<text x="108" y="60" font-size="20" font-weight="700" fill="#f1f5f9" letter-spacing="0.4">'+escaparHTML(id.toUpperCase())+'</text>'
    // Línea bajo nombre
    +'<line x1="108" y1="68" x2="500" y2="68" stroke="'+cm+'" stroke-opacity="0.12" stroke-width="1"/>'
    // Título (opcional) — y=88-104
    +titSVG
    // Badge estado — SIEMPRE en y=110, independiente del título
    +'<rect x="108" y="112" width="150" height="17" rx="8.5" fill="'+lockeCol+'18" stroke="'+lockeCol+'50" stroke-width="1"/>'
    +'<text x="183" y="124" text-anchor="middle" font-size="8.5" font-weight="700" fill="'+lockeCol+'">'+lockeIco+' '+lockeTxt+'</text>'
    // ── SEPARADOR ── y=140
    +'<line x1="108" y1="140" x2="610" y2="140" stroke="'+cm+'" stroke-opacity="0.10" stroke-width="1"/>'
    // ── LABELS STATS ── y=154
    +'<text x="108" y="154" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">VIDAS</text>'
    +'<text x="192" y="154" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">MEDALLAS · '+numMed+'/8</text>'
    +'<text x="390" y="154" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">POKEDÓLARES</text>'
    +'<text x="530" y="154" font-size="7" fill="#ffffff" opacity="0.60" letter-spacing="1.5">PF</text>'
    // ── VALORES STATS ── y=174
    +'<text x="108" y="174" font-size="15" font-weight="700" fill="#e2646f">'+vidas+'/'+vidasT+' ❤️</text>'
    +'<g transform="translate(192,162)">'+pips+'</g>'
    +'<text x="390" y="174" font-size="14" font-weight="700" fill="#1e9e73">'+dinero+' P&#8360;</text>'
    +'<text x="530" y="174" font-size="15" font-weight="700" fill="#8e4fc7">'+pf+'</text>'
    // ── FECHA ──
    +'<text x="610" y="210" text-anchor="end" font-size="7" fill="#ffffff" opacity="0.40">'+fecha+'</text>'
    +'</svg>';
}


function generarCarnetSVGMarkup(id){
  var u  = (baseDatos.jugadores && baseDatos.jugadores[id]) || {};
  var cfg = u.carnetConfig || {};
  var jugadorColor = colorParaJugador(id);
  var color  = _carnetColor(cfg.color||'auto', jugadorColor);
  var fondo  = cfg.fondo  || 'oscuro';
  var layout = cfg.layout || 'clasico';
  var tit    = obtenerTituloActivoJugador(u);
  var lockeStatus = u.lockeStatus || 'jugando';

  if(layout === 'vertical')    return _svgVertical(u, id, color, fondo, tit, lockeStatus);
  if(layout === 'minimalista') return _svgMinimalista(u, id, color, fondo, tit, lockeStatus);
  return _svgClasico(u, id, color, fondo, tit, lockeStatus);
}

/* ── PANEL DE PERSONALIZACIÓN ── */
window.renderizarPanelCarnet = function(){
  if(!userSesion || !baseDatos.jugadores[userSesion]) return;
  var u   = baseDatos.jugadores[userSesion];
  var cfg = u.carnetConfig || {};
  var colorActivo  = cfg.color  || 'auto';
  var fondoActivo  = cfg.fondo  || 'oscuro';
  var layoutActivo = cfg.layout || 'clasico';

  // Preview
  var preview = document.getElementById('carnet-perfil-preview');
  if(preview) preview.innerHTML = generarCarnetSVGMarkup(userSesion);

  // Color swatches
  var cpEl = document.getElementById('carnet-color-picker');
  if(cpEl){
    var jugadorColor = colorParaJugador(userSesion);
    cpEl.innerHTML = CARNET_COLORES.map(function(c){
      var hex    = c.id === 'auto' ? jugadorColor : c.hex;
      var activo = colorActivo === c.id ? ' activo' : '';
      var bcolor = activo ? '#fff' : hex+'66';
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px">'
           + '<div class="carnet-color-swatch'+activo+'" data-campo="color" data-valor="'+c.id+'" style="background:'+hex+';border-color:'+bcolor+';" title="'+c.label+'"></div>'
           + '<span style="font-size:9px;font-family:var(--font-display);color:var(--txt-muted)">'+c.label+'</span>'
           + '</div>';
    }).join('');
    cpEl.querySelectorAll('[data-campo]').forEach(function(el){
      el.addEventListener('click', function(){ carnetSetConfig(this.dataset.campo, this.dataset.valor); });
    });
  }

  // Fondos
  var fpEl = document.getElementById('carnet-fondo-picker');
  if(fpEl){
    fpEl.innerHTML = CARNET_FONDOS.map(function(f){
      var activo = fondoActivo === f.id ? ' activo' : '';
      return '<div class="carnet-fondo-opt'+activo+'" data-campo="fondo" data-valor="'+f.id+'">'
           + '<span class="cf-icon">'+f.icon+'</span>'
           + '<span class="cf-label">'+f.label+'</span>'
           + '</div>';
    }).join('');
    fpEl.querySelectorAll('[data-campo]').forEach(function(el){
      el.addEventListener('click', function(){ carnetSetConfig(this.dataset.campo, this.dataset.valor); });
    });
  }

  // Layouts
  var lpEl = document.getElementById('carnet-layout-picker');
  if(lpEl){
    lpEl.innerHTML = CARNET_LAYOUTS.map(function(l){
      var activo = layoutActivo === l.id ? ' activo' : '';
      return '<div class="carnet-layout-opt'+activo+'" data-campo="layout" data-valor="'+l.id+'">'
           + '<span class="cl-icon">'+l.icon+'</span>'
           + '<span class="cl-label">'+l.label+'</span>'
           + '<div style="font-size:9px;color:var(--txt-muted);margin-top:3px">'+l.desc+'</div>'
           + '</div>';
    }).join('');
    lpEl.querySelectorAll('[data-campo]').forEach(function(el){
      el.addEventListener('click', function(){ carnetSetConfig(this.dataset.campo, this.dataset.valor); });
    });
  }
};

window.carnetSetConfig = function(campo, valor){
  if(!userSesion || !baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  if(!u.carnetConfig) u.carnetConfig = {};
  u.carnetConfig[campo] = valor;
  guardarBD();
  renderizarPanelCarnet();
};
window.abrirCarnetEntrenador = function(id){
  if(!id || !baseDatos.jugadores || !baseDatos.jugadores[id]){ mostrarNotificacion("Entrenador no encontrado.","error","🪪"); return; }
  carnetTargetId = id;
  var wrap = document.getElementById('carnet-svg-wrap');
  if(wrap) wrap.innerHTML = generarCarnetSVGMarkup(id);
  reproducirSonido('abrir');
  document.getElementById('carnet-modal-overlay').style.display = 'flex';
};

window.abrirMiCarnetEntrenador = function(){
  if(!userSesion){ mostrarNotificacion("Inicia sesión primero.","error","🪪"); return; }
  abrirCarnetEntrenador(userSesion);
};

window.refrescarCarnetEntrenador = function(){
  if(!carnetTargetId) return;
  var overlay = document.getElementById('carnet-modal-overlay');
  if(overlay && overlay.style.display === 'flex'){
    if(!baseDatos.jugadores || !baseDatos.jugadores[carnetTargetId]) return;
    var wrap = document.getElementById('carnet-svg-wrap');
    if(wrap) wrap.innerHTML = generarCarnetSVGMarkup(carnetTargetId);
  }
  // Refrescar también el preview en la pestaña del perfil si está activa
  var preview = document.getElementById('carnet-perfil-preview');
  if(preview && preview.innerHTML && userSesion){
    preview.innerHTML = generarCarnetSVGMarkup(userSesion);
  }
};

window.cerrarCarnetEntrenador = function(){
  reproducirSonido('cerrar');
  document.getElementById('carnet-modal-overlay').style.display = 'none';
  carnetTargetId = null;
};

window.descargarCarnetSVG = function(){
  var wrap = document.getElementById('carnet-svg-wrap');
  var svgEl = wrap ? wrap.querySelector('svg') : null;
  if(!svgEl){ mostrarNotificacion("No hay carnet para descargar.","error","🪪"); return; }
  var xml = new XMLSerializer().serializeToString(svgEl);
  if(!xml.match(/^<svg[^>]+xmlns=/)) xml = xml.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  var blob = new Blob([xml], {type: 'image/svg+xml;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'carnet_' + (carnetTargetId||'entrenador') + '.svg';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
  mostrarNotificacion("Carnet SVG descargado.","exito","📥");
};

window.descargarCarnetPNG = function(){
  var wrap = document.getElementById('carnet-svg-wrap');
  var svgEl = wrap ? wrap.querySelector('svg') : null;
  if(!svgEl){ mostrarNotificacion("No hay carnet para descargar.","error","🪪"); return; }
  var xml = new XMLSerializer().serializeToString(svgEl);
  if(!xml.match(/^<svg[^>]+xmlns=/)) xml = xml.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  var svgBlob = new Blob([xml], {type: 'image/svg+xml;charset=utf-8'});
  var url = URL.createObjectURL(svgBlob);
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function(){
    try{
      var scale = 2;
      var canvas = document.createElement('canvas');
      canvas.width = 640*scale;
      canvas.height = 380*scale;
      var ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, 640, 380);
      URL.revokeObjectURL(url);
      canvas.toBlob(function(pngBlob){
        if(!pngBlob){ mostrarNotificacion("No se pudo generar el PNG. Prueba a descargar el SVG.","error","🖼️"); return; }
        var purl = URL.createObjectURL(pngBlob);
        var a = document.createElement('a');
        a.href = purl;
        a.download = 'carnet_' + (carnetTargetId||'entrenador') + '.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=>URL.revokeObjectURL(purl), 2000);
        mostrarNotificacion("Carnet PNG descargado.","exito","🖼️");
      }, 'image/png');
    }catch(e){
      mostrarNotificacion("No se pudo exportar a PNG (imagen bloqueada). Prueba a descargar el SVG.","error","🖼️");
    }
  };
  img.onerror = function(){
    URL.revokeObjectURL(url);
    mostrarNotificacion("No se pudo exportar a PNG. Prueba a descargar el SVG.","error","🖼️");
  };
  img.src = url;
};

window.renderizarTitulosYTemas = function(){
  if(!userSesion || !baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];

  var desbloqueados = calcularTitulosDesbloqueados(u);
  if(!u.titulosDesbloqueados) u.titulosDesbloqueados = [];
  var nuevos = desbloqueados.filter(function(id){ return u.titulosDesbloqueados.indexOf(id) === -1; });
  if(nuevos.length){
    u.titulosDesbloqueados = desbloqueados;
    nuevos.forEach(function(id){
      var cfg = TITULOS_CONFIG.find(function(t){ return t.id === id; });
      if(cfg) mostrarNotificacion('¡Título desbloqueado: '+cfg.icon+' '+cfg.nombre+'!','exito','🏷️');
    });
    guardarBD();
  } else {
    u.titulosDesbloqueados = desbloqueados;
  }

  var listaEl = document.getElementById('titulos-lista');
  if(listaEl){
    var html = TITULOS_CONFIG.map(function(t){
      var tiene = desbloqueados.indexOf(t.id) !== -1;
      var esActivo = u.tituloActivo === t.id;
      var cls = 'titulo-chip' + (tiene ? ' desbloqueado' : '') + (esActivo ? ' activo' : '');
      var btnTxt = esActivo ? '✓ Activo' : 'Usar';
      var lock = tiene ? '' : '<span class="titulo-lock">🔒</span>';
      var btn = tiene
        ? '<button onclick="seleccionarTitulo(\''+t.id+'\')">'+btnTxt+'</button>'
        : '';
      return '<div class="'+cls+'" title="'+escaparHTML(t.desc)+'">'+t.icon+' '+escaparHTML(t.nombre)+lock+btn+'</div>';
    }).join('');
    if(u.tituloManual){
      var esActivoM = u.tituloActivo === 'manual';
      var clsM = 'titulo-chip desbloqueado' + (esActivoM ? ' activo' : '');
      var btnTxtM = esActivoM ? '✓ Activo' : 'Usar';
      html += '<div class="'+clsM+'" title="Título especial otorgado por el Mercader">🏷️ '+escaparHTML(u.tituloManual)+'<button onclick="seleccionarTitulo(\'manual\')">'+btnTxtM+'</button></div>';
    }
    listaEl.innerHTML = html;
  }

  var temasEl = document.getElementById('temas-lista');
  var temasDesbloqueados = u.temasDesbloqueados || [];
  if(temasEl){
    temasEl.innerHTML = TEMAS_DESBLOQUEABLES.map(function(t){
      var tiene = t.gratis || temasDesbloqueados.indexOf(t.id) !== -1;
      var esActivo = (u.temaActivo||'locke') === t.id;
      var cls = 'tema-chip' + (tiene ? '' : ' bloqueado') + (esActivo ? ' activo' : '');
      var lock = tiene ? '' : '<span class="tema-lock">🔒</span>';
      var onclick = tiene ? 'onclick="seleccionarTema(\''+t.id+'\')"' : '';
      return '<div class="'+cls+'" '+onclick+'>'
        + '<span class="tema-dot" style="background:'+t.dot+'"></span>'
        + '<span class="tema-nombre">'+escaparHTML(t.nombre)+'</span>'
        + lock
        + '</div>';
    }).join('');
  }

  var display = document.getElementById('perfil-titulo-activo');
  if(display){
    var cfgActivo = obtenerTituloActivoJugador(u);
    if(cfgActivo){
      display.textContent = cfgActivo.icon + ' ' + cfgActivo.nombre;
      display.style.display = 'block';
    } else {
      display.style.display = 'none';
    }
  }
};

window.seleccionarTitulo = function(id){
  if(!userSesion || !baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  u.tituloActivo = (u.tituloActivo === id) ? null : id;
  guardarBD();
  renderizarTitulosYTemas();
};

window.seleccionarTema = function(id){
  if(!userSesion || !baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  var temasDesbloqueados = u.temasDesbloqueados || [];
  var cfg = TEMAS_DESBLOQUEABLES.find(function(t){ return t.id === id; });
  if(!cfg) return;
  if(!cfg.gratis && temasDesbloqueados.indexOf(id) === -1){
    mostrarNotificacion('Tema no desbloqueado. Cómpralo en la tienda.','error','🎨');
    return;
  }
  u.temaActivo = id;
  guardarBD();
  aplicarTemaPersonal();
  renderizarTitulosYTemas();
  mostrarNotificacion('Tema '+cfg.nombre+' activado.','exito','🎨');
};

/* ═══════════ SISTEMA DE TEMAS PERSONAL ═══════════ */

var _TODOS_TEMAS = ['tema-egglocke','tema-randomlocke','tema-shinylocke','tema-duallinks','tema-plasma','tema-rocket','tema-campeon'];

function aplicarTemaPersonal(){
  /* El tema queda siempre fijado a "Campeón" (ver :root). Nos limitamos a asegurar que ninguna clase de tema antigua quede aplicada. */
  _TODOS_TEMAS.forEach(function(c){ document.body.classList.remove(c); });
}

/* ═══════════ HOOK EN COMPRA: detectar temas ═══════════ */

var _NOMBRES_TEMAS_TIENDA = {};

function _checkCompraTemaTienda(nombreProducto){
  var idTema = _NOMBRES_TEMAS_TIENDA[nombreProducto];
  if(!idTema || !userSesion || !baseDatos.jugadores[userSesion]) return;
  var u = baseDatos.jugadores[userSesion];
  if(!u.temasDesbloqueados) u.temasDesbloqueados = [];
  if(u.temasDesbloqueados.indexOf(idTema) === -1){
    u.temasDesbloqueados.push(idTema);
    guardarBD();
    mostrarNotificacion('¡Tema '+nombreProducto+' desbloqueado! Actívalo en Perfil → Medallas y Torneos.','exito','🎨');
  }
}

function renderizarInsigniasPerfil(){let box=document.getElementById('medallas-insignias-grid');if(!box)return;let tipoEl=document.getElementById('perf-tipo-medallas'),numEl=document.getElementById('perf-num-medallas');let tipo=tipoEl?tipoEl.value:'medallas',n=numEl?(parseInt(numEl.value)||0):0,icon=tipo==='kahunas'?'🌺':'🏅';let html='';for(let i=1;i<=8;i++){html+=`<div class="medalla-insignia${i<=n?' ganada':''}">${icon}</div>`;}box.innerHTML=html;}
window.guardarDatosPerfilGamer=function(){let u=baseDatos.jugadores[userSesion];u.lockeStatus=document.getElementById('perf-locke-status').value;u.tipoMedallas=document.getElementById('perf-tipo-medallas').value;u.numMedallas=parseInt(document.getElementById('perf-num-medallas').value)||0;guardarBD();};
window.guardarVidasPerfilGamer=function(){let u=baseDatos.jugadores[userSesion],ini=parseInt(document.getElementById('perf-vidas-iniciales').value)||20;u.vidasTotales=ini;if(u.vidasActuales===undefined)u.vidasActuales=ini;if(u.vidasActuales<=0)u.lockeStatus='perdido';guardarBD();reproducirSonido('exito');actualizarBarraVidasDesdeDB();mostrarNotificacion("Contador de vidas sincronizado con la red.","exito","💾");};
window.alterarTorneosPerfil=function(v){let u=baseDatos.jugadores[userSesion];u.torneos=Math.max(0,(u.torneos||0)+v);document.getElementById('perf-txt-torneos').textContent=u.torneos;guardarBD();};
function renderizarCementerioDOM(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],box=document.getElementById('cementerio-lista-local');if(!box)return;box.innerHTML='';if(!u.cementerio||!u.cementerio.length){box.innerHTML='<div style="color:var(--txt-muted);text-align:center;font-size:11px;padding:16px;font-family:var(--font-display);letter-spacing:.5px">Sin bajas registradas en este Locke... Aún.</div>';return;}u.cementerio.forEach(b=>{box.innerHTML+=`<div class="graveyard-item"><div class="graveyard-name">💀 ${escaparHTML(b.nombre)}</div><div class="graveyard-meta">${escaparHTML(b.ruta)} · ${escaparHTML(b.fecha)}</div><div class="graveyard-epitafio">"${escaparHTML(b.epitafio)}"</div></div>`;});}

/* ═══ BANNER ═══ */
function actualizarBannerAlertasVisuales(){let b=document.getElementById('alertas-sistema-marquee');if(!b)return;let ev=baseDatos.eventoSistema||"normal";if(ev==="normal"){b.classList.remove('active');b.innerHTML='';return;}b.classList.add('active');if(ev==="rebajas"){b.style.borderColor='rgba(30,158,115,.3)';b.style.color='var(--neon-legal)';b.innerHTML='📉 RED ESTABLE: −25% de descuento en Tienda Legal y Packs.';}if(ev==="inflacion"){b.style.borderColor='rgba(216,41,63,.3)';b.style.color='#e2646f';b.innerHTML='⚠️ RED INESTABLE: +50% de recargo en costes P₠.';}if(ev==="bonus_pf"){b.style.borderColor='rgba(201,154,46,.3)';b.style.color='var(--neon-packs)';b.innerHTML='🪙 REPUTACIÓN INTEGRAL: ¡Doble bono de PF por compras!';}}

