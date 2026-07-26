/* ═══ NOTIFICACIONES ═══ */
window.mostrarNotificacion=function(texto,tipo,icono,titulo,sinSonido){tipo=tipo||'info';icono=icono||({exito:'✅',error:'⛔',info:'ℹ️',pf:'🔮',sacrificio:'🔥'}[tipo]||'✅');let cont=document.getElementById('toast-container');if(!cont)return;let el=document.createElement('div');el.className=`toast tipo-${tipo}`;el.innerHTML=`<span class="toast-icon">${icono}</span><div>${titulo?`<div class="toast-titulo">${escaparHTML(titulo)}</div>`:''}<div class="toast-texto">${escaparHTML(texto)}</div></div>`;cont.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));if(!sinSonido)reproducirSonido(tipo==='error'?'error':(tipo==='exito'?'exito':'click'));setTimeout(()=>{el.classList.remove('show');el.classList.add('hide');setTimeout(()=>el.remove(),350);},3800);};
window.mostrarConfirmacion=function(opts){opts=opts||{};return new Promise(resolve=>{let overlay=document.getElementById('gx-overlay');document.getElementById('gx-icon').textContent=opts.icono||'❔';document.getElementById('gx-title').textContent=opts.titulo||'Confirmar acción';document.getElementById('gx-desc').textContent=opts.descripcion||'';let bc=document.getElementById('gx-btn-confirmar'),bcan=document.getElementById('gx-btn-cancelar');bc.textContent=opts.textoConfirmar||'Confirmar';bcan.textContent=opts.textoCancelar||'Cancelar';bc.className='gx-btn gx-btn-confirmar '+(opts.tipo==='peligro'?'peligro':(opts.tipo==='sacrificio'?'sacrificio':''));bcan.style.display=opts.soloInfo?'none':'';reproducirSonido('abrir');function cerrar(v){overlay.classList.remove('show');bc.onclick=null;bcan.onclick=null;resolve(v);}bc.onclick=()=>{reproducirSonido(opts.sonidoConfirmar||(opts.tipo==='peligro'?'error':'exito'));cerrar(true);};bcan.onclick=()=>{reproducirSonido('cerrar');cerrar(false);};overlay.classList.add('show');});};
window.mostrarInfo=function(opts){opts=opts||{};opts.soloInfo=true;opts.textoConfirmar=opts.textoConfirmar||'Entendido';return window.mostrarConfirmacion(opts);};
window.mostrarRevelacionGacha=function(opts){opts=opts||{};let ov=document.getElementById('gacha-overlay'),card=document.getElementById('gacha-card');card.className='gacha-card rareza-'+(opts.rareza||'item');document.getElementById('gacha-icon').textContent=opts.icono||'🎁';document.getElementById('gacha-nombre').textContent=opts.nombre||'Recompensa';document.getElementById('gacha-detalle').textContent=opts.detalle||'';ov.classList.add('show');reproducirSonido(opts.especial?'raro':'gacha');if(opts.especial){const s=['✨','🌟','⭐','💫'];for(let i=0;i<6;i++){let sp=document.createElement('span');sp.className='gacha-sparkle';sp.textContent=s[Math.floor(Math.random()*s.length)];sp.style.left=(10+Math.random()*80)+'%';sp.style.top=(60+Math.random()*20)+'%';sp.style.animationDelay=(Math.random()*.6)+'s';card.appendChild(sp);setTimeout(()=>sp.remove(),2200);}}};
window.cerrarRevelacionGacha=function(){document.getElementById('gacha-overlay').classList.remove('show');reproducirSonido('cerrar');};
window.destellarPantalla=function(color){let el=document.createElement('div');let t={rojo:'rgba(216,41,63,.16)',naranja:'rgba(184,96,46,.16)',verde:'rgba(30,158,115,.14)',morado:'rgba(142,79,199,.14)'};el.style.cssText=`position:fixed;inset:0;background:${t[color]||t.rojo};z-index:6000;pointer-events:none;opacity:0;transition:opacity .15s ease;`;document.body.appendChild(el);requestAnimationFrame(()=>{el.style.opacity='1';setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),250);},120);});};

/* ═══ SELECT PERSONALIZADO ═══ */
function mejorarSelect(sel){if(sel.dataset.cselDone)return;sel.dataset.cselDone='1';let cls=sel.className,sty=sel.getAttribute('style')||'';let wr=document.createElement('div');wr.className='csel';let tr=document.createElement('div');tr.className='csel-trigger '+cls;if(sty)tr.setAttribute('style',sty);tr.tabIndex=0;tr.innerHTML='<span class="csel-trigger-label"></span><span class="csel-trigger-arrow">▾</span>';let pn=document.createElement('div');pn.className='csel-panel';sel.parentNode.insertBefore(wr,sel);wr.appendChild(tr);wr.appendChild(pn);wr.appendChild(sel);sel.classList.add('csel-native-hidden');function upLabel(){let op=sel.options[sel.selectedIndex];tr.querySelector('.csel-trigger-label').textContent=op?op.textContent:'';}function buildPanel(){pn.innerHTML='';if(!sel.options.length){pn.innerHTML='<div class="csel-panel-vacio">Sin opciones</div>';return;}Array.from(sel.options).forEach((op,i)=>{let f=document.createElement('div');f.className='csel-option'+(i===sel.selectedIndex?' selected':'');f.textContent=op.textContent;f.addEventListener('click',e=>{e.stopPropagation();sel.value=op.value;upLabel();wr.classList.remove('open');sel.dispatchEvent(new Event('change',{bubbles:true}));reproducirSonido('click');});pn.appendChild(f);});}function open(){document.querySelectorAll('.csel.open').forEach(w=>{if(w!==wr)w.classList.remove('open');});buildPanel();wr.classList.add('open');reproducirSonido('click');}function close(){wr.classList.remove('open');}tr.addEventListener('click',e=>{e.stopPropagation();wr.classList.contains('open')?close():open();});tr.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tr.click();}if(e.key==='Escape')close();});upLabel();sel.__cselRefrescar=upLabel;}
function mejorarTodosLosSelects(r){(r||document).querySelectorAll('select').forEach(mejorarSelect);}
window.refrescarSelectsPersonalizados=function(){document.querySelectorAll('select').forEach(s=>{if(s.__cselRefrescar)s.__cselRefrescar();});};
document.addEventListener('click',()=>document.querySelectorAll('.csel.open').forEach(w=>w.classList.remove('open')));

/* ═══ DOMContentLoaded ═══ */
document.addEventListener('DOMContentLoaded',()=>{
    const btn=document.getElementById('btn-sonido-toggle');
    if(btn){btn.textContent=sonidoActivo?'🔊':'🔇';btn.classList.toggle('muted',!sonidoActivo);}
    inicializarAudioRadio();
    if(!radioIntervaloSync)radioIntervaloSync=setInterval(sincronizarRadio,5000);
    let icv=document.getElementById('radio-icono-vol');
    if(icv)icv.textContent=radioSilenciada?'🔇':(radioVolumen<0.5?'🔉':'🔊');
    const fi=document.getElementById('radio-file-input');
    if(fi){fi.addEventListener('change',function(){subirCancionesRadio(this.files);this.value='';});}
    let inp=document.getElementById('sac-nombre-poke');
    if(inp)inp.addEventListener('input',window.actualizarPreviewSacrificio);
    mejorarTodosLosSelects(document);
});
document.addEventListener('mouseover',e=>{if(!sonidoActivo)return;let el=e.target.closest('.item-card:not(.agotado),.tienda-acceso-card,.nav-item,.btn-comprar:not(:disabled),.torneos-btn,.mochila-tag');if(el&&el!==el.__ultimoHover){el.__ultimoHover=true;reproducirSonido('hover');setTimeout(()=>{if(el)el.__ultimoHover=false;},250);}});

/* ═══ DRAWER ═══ */
window.abrirDrawer=function(){reproducirSonido('abrir');document.getElementById('sidebar').classList.add('open');document.getElementById('drawer-backdrop').classList.add('active');document.body.style.overflow='hidden';};
window.abrirMasSheet=function(){
  reproducirSonido('abrir');
  const sh=document.getElementById('more-sheet'),bd=document.getElementById('more-sheet-backdrop'),ad=document.getElementById('more-sheet-admin');
  if(ad)ad.style.display=(userSesion&&userSesion.toLowerCase()==='srwiwa')?'flex':'none';
  sh.classList.add('open');bd.classList.add('active');document.body.style.overflow='hidden';
  requestAnimationFrame(()=>requestAnimationFrame(()=>sh.classList.add('show')));
};
window.cerrarMasSheet=function(){
  const sh=document.getElementById('more-sheet'),bd=document.getElementById('more-sheet-backdrop');
  if(!sh.classList.contains('open'))return;
  reproducirSonido('cerrar');
  sh.classList.remove('show');bd.classList.remove('active');document.body.style.overflow='';
  setTimeout(()=>sh.classList.remove('open'),300);
};
window.cerrarDrawer=function(){if(document.getElementById('sidebar').classList.contains('open'))reproducirSonido('cerrar');document.getElementById('sidebar').classList.remove('open');document.getElementById('drawer-backdrop').classList.remove('active');document.body.style.overflow='';};
function transicionarVista(el){if(!el)return;el.classList.remove('vista-visible');el.classList.add('vista-transicion');void el.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('vista-visible')));}
function reanimarElemento(el){transicionarVista(el);}

/* ═══ FIREBASE ═══ */
let _bdCargadaAlgunaVez=false;
onValue(ref(db,'silph_co_market'),snapshot=>{
    const data=snapshot.val();
    if(data){baseDatos=data;_bdCargadaAlgunaVez=true;if(!baseDatos.productos)baseDatos.productos=[];if(!baseDatos.jugadores)baseDatos.jugadores={};if(!baseDatos.intercambios)baseDatos.intercambios={};if(!baseDatos.arena)baseDatos.arena={};if(!baseDatos.camara)baseDatos.camara={};if(!baseDatos.eventoSistema)baseDatos.eventoSistema="normal";if(!baseDatos.radio)baseDatos.radio={canciones:{},semillaOrden:0,inicioEpoch:0,activada:false};if(!baseDatos.radio.canciones)baseDatos.radio.canciones={};if(baseDatos.radio.activada===undefined)baseDatos.radio.activada=false;if(!baseDatos.actividadGlobal)baseDatos.actividadGlobal=[];if(!baseDatos.adminLog)baseDatos.adminLog=[];if(!baseDatos.ruletas)baseDatos.ruletas={};}
    else if(_bdCargadaAlgunaVez){
        /* Ya habíamos cargado datos reales antes: una lectura vacía ahora es un fallo transitorio de red/Firebase, NO una base de datos vacía de verdad. Se ignora por completo para no arriesgarse a machacar los datos reales. */
        return;
    }
    else{
        /* Primera vez que no vemos datos: podría ser una base de datos nueva de verdad, o un simple parpadeo de red en la primerísima carga. En vez de asumir y sobrescribir al momento, esperamos y volvemos a comprobar una sola vez antes de decidir. */
        if(!window._bdVerificandoVacio){
            window._bdVerificandoVacio=true;
            setTimeout(()=>{
                get(ref(db,'silph_co_market')).then(snap2=>{
                    window._bdVerificandoVacio=false;
                    if(!snap2.val()){
                        /* Confirmado dos veces por separado: ahora sí, base de datos nueva de verdad. */
                        baseDatos={productos:baseDatosInicial,jugadores:{},intercambios:{},arena:{},camara:{},legalOpen:true,packOpen:true,illegalOpen:true,eventoSistema:"normal",radio:{canciones:{},semillaOrden:0,inicioEpoch:0,activada:false},actividadGlobal:[],adminLog:[]};
                        set(ref(db,'silph_co_market'),baseDatos);
                    }
                    /* Si en la relectura sí hay datos, era un parpadeo: no hacemos nada, el propio listener ya recibirá los datos reales. */
                }).catch(()=>{window._bdVerificandoVacio=false;});
            },2500);
        }
        return;
    }
    sincronizarRadio();
    if(userSesion){document.getElementById('login-screen').style.display='none';document.getElementById('app-shell').style.display='block';actualizarComprasPorTiempo();refrescarPantallaGamer();actualizarBannerAlertasVisuales();renderizarArenaPublica();renderizarCamaraPublica();actualizarBarraVidasDesdeDB();renderizarCementerioDOM();actualizarEstadisticasSacrificioPanel();renderizarActividadGlobalInicio();const bA=document.getElementById('nav-admin');if(bA)bA.style.display=(userSesion.toLowerCase()==="srwiwa")?"flex":"none";if(document.getElementById('section-admin').classList.contains('active'))redibujarConsolaAdminMaster();mejorarTodosLosSelects(document);refrescarSelectsPersonalizados();if(window.refrescarCarnetEntrenador)refrescarCarnetEntrenador();renderizarDuelosPvP();pvpActualizarAdminPanel();if(document.getElementById('section-tracker')&&document.getElementById('section-tracker').classList.contains('active'))renderizarTracker();renderizarMapaInicio();}
    else{document.getElementById('login-screen').style.display='flex';document.getElementById('app-shell').style.display='none';const bA=document.getElementById('nav-admin');if(bA)bA.style.display="none";}
});
function guardarBD(){set(ref(db,'silph_co_market'),baseDatos);}

/* ═══ NAVEGACIÓN ═══ */
window.navegarA=function(s){
  if(userSesion&&jugadorBaneado(userSesion)&&['tiendas','eventos','duelos','red-entrenadores','hall-of-fame'].includes(s)){
    let mot=(baseDatos.jugadores[userSesion].baneado&&baseDatos.jugadores[userSesion].baneado.motivo)||'Sin motivo especificado.';
    mostrarNotificacion(`🚫 Estás baneado de esta sección. Motivo: ${mot}`,'error','🚫','Acceso restringido');
    s='inicio';
  }
  reproducirSonido('tab');document.querySelectorAll('.page-section').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));document.querySelectorAll('.bn-item').forEach(n=>n.classList.remove('active'));const sec=document.getElementById(`section-${s}`),nav=document.getElementById(`nav-${s}`),bn=document.getElementById(`bn-${s}`);if(sec){sec.classList.add('active');reanimarElemento(sec);}if(nav)nav.classList.add('active');if(bn)bn.classList.add('active');if(s==='red-entrenadores')renderizarVisorRivalPublico();if(s==='eventos'){renderizarArenaPublica();renderizarCamaraPublica();}if(s==='vidas-sacrificios'){actualizarBarraVidasDesdeDB();renderizarCementerioDOM();actualizarEstadisticasSacrificioPanel();}if(s==='medallas-torneos'){cargarDatosPerfilEnDOM();renderizarInsigniasPerfil();}if(s==='perfil'){cargarDatosPerfilEnDOM();}if(s==='admin'&&userSesion&&userSesion.toLowerCase()==='srwiwa')redibujarConsolaAdminMaster();if(s==='hall-of-fame'){renderizarHallOfFame();renderizarBannerLocke();}if(s==='museo'){renderizarHistorialLockes();}if(s==='perfil'){cargarMejorPokemonEnPerfil();renderizarTitulosYTemas();}if(s==='tiendas'){actualizarBadgeGimnasio();}if(s==='duelos')renderizarDuelosPvP();if(s==='tracker')renderizarTracker();if(s==='ruletas')renderizarRuletas();if(s==='inicio'){renderizarMapaInicio();renderizarDuelosPvP();}var sb=document.getElementById('sidebar');var bd=document.getElementById('drawer-backdrop');if(sb){sb.classList.remove('open');}if(bd){bd.classList.remove('active');}var ms=document.getElementById('more-sheet');if(ms&&ms.classList.contains('open')){cerrarMasSheet();}document.body.style.overflow='';};
window.cambiarAdminTab=function(tab){reproducirSonido('tab');document.querySelectorAll('.dios-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.dios-view').forEach(v=>v.classList.remove('active'));const te=document.getElementById(`dtab-${tab}`),ve=document.getElementById(`dv-${tab}`);if(te){te.classList.add('active');te.classList.add('tab-pop');setTimeout(()=>te.classList.remove('tab-pop'),300);}if(ve){ve.classList.add('active');reanimarElemento(ve);}if(tab==='radio')renderizarListaRadioAdmin();if(tab==='nuevolocke'&&window.nlPaso)nlPaso(1);if(tab==='tienda'){var ga=baseDatos&&baseDatos.gimnasioActivo;var gs=document.getElementById('gen-gimnasio');if(ga&&gs)gs.value=ga.tier||0;var gg=document.getElementById('gen-generacion');if(ga&&gg)gg.value=ga.gen||3;}if(tab==='pvp')pvpActualizarAdminPanel();if(tab==='log')renderizarLogAdmin(1);if(tab==='museo'){ if(window.museoIniciarPanel) museoIniciarPanel(); else museoRenderAdmin(); }if(tab==='rutas'){ erCargar(); }};


/* ═══ MUSEO ADMIN — estado local ═══ */
var _museoPokesTemp    = {};
var _museoJuegoSel     = null;
var _museoPokeSelected = null;

var _museoPokeListaCompleta = [];
var _museoPokeListaCargada  = false;
var _museoPokeListaCargando = false;

function museoCargarListaCompleta(cb){
  if(_museoPokeListaCargada){ if(cb) cb(); return; }
  if(_museoPokeListaCargando){ if(cb) setTimeout(function(){ museoCargarListaCompleta(cb); }, 200); return; }
  _museoPokeListaCargando = true;
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
    .then(function(r){ return r.json(); })
    .then(function(d){
      _museoPokeListaCompleta = d.results;
      _museoPokeListaCargada  = true;
      _museoPokeListaCargando = false;
      if(cb) cb();
    })
    .catch(function(){ _museoPokeListaCargando = false; });
}

function museoPokeIdDesdeUrl(url){
  var m = url.match(/\/pokemon\/(\d+)\//);
  return m ? parseInt(m[1]) : 0;
}

function museoPokeLabel(apiName){
  var compuestos = ['mr-mime','mr-rime','ho-oh','porygon-z','jangmo-o','hakamo-o','kommo-o',
    'tapu-koko','tapu-lele','tapu-bulu','tapu-fini','chi-yu','ting-lu','chien-pao','wo-chien',
    'iron-leaves','iron-valiant','iron-moth','iron-hands','iron-jugulis','iron-thorns',
    'iron-bundle','iron-treads','flutter-mane','slither-wing','sandy-shocks','scream-tail',
    'brute-bonnet','roaring-moon','great-tusk','gouging-fire','raging-bolt','walking-wake',
    'iron-boulder','iron-crown'];
  if(compuestos.indexOf(apiName) !== -1)
    return apiName.replace(/-/g,' ').replace(/\b\w/g,function(c){ return c.toUpperCase(); });
  var partes = apiName.split('-');
  var base   = partes[0].charAt(0).toUpperCase()+partes[0].slice(1);
  if(partes.length === 1) return base;
  var sufijos = {
    'mega':'Mega','mega-x':'Mega X','mega-y':'Mega Y',
    'alola':'(Alola)','alolan':'(Alola)','galar':'(Galar)','galarian':'(Galar)',
    'hisui':'(Hisui)','hisuian':'(Hisui)','paldea':'(Paldea)','paldean':'(Paldea)',
    'gmax':'Gigamax','f':'\u2640','m':'\u2642','x':'X','y':'Y','z':'Z',
    'black':'Negro','white':'Blanco','sky':'Cielo','land':'Tierra',
    'incarnate':'Encarnado','therian':'T\u00f3tem','pirouette':'Pirueta','aria':'Aria',
    'blade':'Espada','shield':'Escudo','10':'10%','complete':'Completo',
    'original':'Original','crowned':'Coronado','eternamax':'Eternamax',
    'zero':'Zero','hero':'H\u00e9roe','combat':'Combate','blaze':'Llama','aqua':'Agua',
    'sunny':'Soleado','rainy':'Lluvioso','snowy':'Nevado',
    'heat':'Calor','wash':'Agua','frost':'Hielo','fan':'Ventilador','mow':'Cortac\u00e9sped',
    'dawn':'Aurora','dusk':'Crep\u00fasculo','midnight':'Medianoche',
    'school':'Banco','solo':'Solo','disguised':'Disfrazado','busted':'Revelado',
    'low-key':'Nota Baja','amped':'Amplificado','ice':'Hielo','dragon':'Drag\u00f3n',
    'single-strike':'Golpe \u00danico','rapid-strike':'Golpe R\u00e1pido',
    'hangry':'Hambriento','apex':'Apex'
  };
  var sufStr = partes.slice(1).join('-');
  var sufFmt = sufijos[sufStr]
    ? sufijos[sufStr]
    : partes.slice(1).map(function(p){ return p.charAt(0).toUpperCase()+p.slice(1); }).join(' ');
  return base+' '+sufFmt;
}

window.museoPokeAutocom = function(){
  var inputEl = document.getElementById('museo-poke-nombre');
  var dd      = document.getElementById('museo-poke-dropdown');
  if(!inputEl || !dd) return;
  var raw = (inputEl.value||'').trim().toLowerCase();
  var q   = raw.replace(/\s+/g,'-');
  _museoPokeSelected = null;
  document.getElementById('museo-poke-preview').style.display = 'none';
  if(raw.length < 2){ dd.style.display='none'; return; }

  function doSearch(){
    var matches = _museoPokeListaCompleta
      .filter(function(p){
        if(p.name.indexOf(q) !== -1) return true;
        return museoPokeLabel(p.name).toLowerCase().indexOf(raw) !== -1;
      }).slice(0,10);
    if(!matches.length){ dd.style.display='none'; return; }
    dd.innerHTML = matches.map(function(m){
      var id     = museoPokeIdDesdeUrl(m.url);
      var sprite = id ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png' : '';
      var label  = museoPokeLabel(m.name);
      return '<div class="museo-poke-opt"'
        +' data-apiname="'+m.name+'"'
        +' data-id="'+id+'"'
        +' data-sprite="'+sprite+'"'
        +' data-label="'+label.replace(/"/g,'&quot;')+'"'
        +' style="padding:7px 12px;cursor:pointer;font-size:12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--borde);color:var(--txt-primary);font-family:var(--font-body)">'
        +'<img src="'+sprite+'" style="width:28px;height:28px;image-rendering:pixelated" onerror="this.style.opacity=&apos;0.25&apos;">'
        +'<span>'+label+'</span>'
        +(id ? '<span style="color:var(--txt-muted);font-size:9px;margin-left:auto">#'+id+'</span>' : '')
        +'</div>';
    }).join('');
    dd.style.display = 'block';
    dd.onclick = function(ev){
      var opt = ev.target.closest('.museo-poke-opt');
      if(!opt) return;
      var label  = opt.getAttribute('data-label');
      var sprite = opt.getAttribute('data-sprite');
      var id     = parseInt(opt.getAttribute('data-id'))||0;
      inputEl.value = label;
      dd.style.display = 'none';
      _museoPokeSelected = { num: id, nombre: label, sprite: sprite };
      document.getElementById('museo-poke-sprite').src = sprite;
      document.getElementById('museo-poke-nombre-preview').textContent = label;
      document.getElementById('museo-poke-num-preview').textContent = id||'?';
      document.getElementById('museo-poke-preview').style.display = 'flex';
    };
  }

  if(_museoPokeListaCargada){ doSearch(); }
  else {
    dd.innerHTML = '<div style="padding:10px 12px;font-size:11px;color:var(--txt-muted);font-family:var(--font-display)">\u23f3 Cargando lista...</div>';
    dd.style.display = 'block';
    museoCargarListaCompleta(doSearch);
  }
};
document.addEventListener('click', function(e){
  if(!e.target.closest('#museo-poke-nombre') && !e.target.closest('#museo-poke-dropdown')){
    var dd = document.getElementById('museo-poke-dropdown');
    if(dd) dd.style.display = 'none';
  }
});

window.museoAnadirPoke = function(){
  var jugador = (document.getElementById('museo-poke-jugador')||{}).value;
  var mote    = (document.getElementById('museo-poke-mote')||{}).value.trim();
  if(!jugador){ mostrarNotificacion('Selecciona un jugador.','error','⭐'); return; }
  if(!_museoPokeSelected){ mostrarNotificacion('Selecciona un Pokémon del desplegable.','error','⭐'); return; }
  _museoPokesTemp[jugador] = { nombre: _museoPokeSelected.nombre, sprite: _museoPokeSelected.sprite, num: _museoPokeSelected.num, mote: mote };
  _museoPokeSelected = null;
  document.getElementById('museo-poke-nombre').value = '';
  document.getElementById('museo-poke-mote').value = '';
  document.getElementById('museo-poke-preview').style.display = 'none';
  museoPokesRender();
};

function museoPokesRender(){
  var cont = document.getElementById('museo-pokes-lista');
  if(!cont) return;
  var keys = Object.keys(_museoPokesTemp);
  if(!keys.length){ cont.innerHTML = ''; return; }
  cont.innerHTML = keys.map(function(id){
    var p = _museoPokesTemp[id];
    return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg-card);border:1px solid var(--borde);border-radius:var(--r-md)">'
      +'<img src="'+p.sprite+'" style="width:32px;height:32px;image-rendering:pixelated">'
      +'<div style="flex:1;min-width:0">'
        +'<div style="font-family:var(--font-display);font-size:11px;font-weight:700;color:var(--blanco)">'+escaparHTML(id.toUpperCase())+': '+escaparHTML(p.nombre)+(p.mote?' <span style="color:var(--txt-muted)">— '+escaparHTML(p.mote)+'</span>':'')+'</div>'
      +'</div>'
      +'<button class="museo-poke-del" data-id="'+id+'" style="background:none;border:none;color:var(--neon-ilegal);cursor:pointer;font-size:14px;padding:2px 6px">✕</button>'
      +'</div>';
  }).join('');
  cont.onclick = function(e){
    var btn = e.target.closest('.museo-poke-del');
    if(!btn) return;
    delete _museoPokesTemp[btn.getAttribute('data-id')];
    museoPokesRender();
  };
}


// ── Estado temporal del formulario del museo ──
var _museoJuegoSel   = null;
var _museoPokesTemp  = {};

window.museoIniciarPanel = function(){
  _museoJuegoSel     = null;
  _museoPokesTemp    = {};
  _museoPokeSelected = null;
  museoCargarListaCompleta(null);
  var fields = ['museo-num','museo-poke-nombre','museo-poke-mote'];
  fields.forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  document.querySelectorAll('input[name="museo-modal"]').forEach(function(cb){ cb.checked=false; });
  var juegoVal = document.getElementById('museo-juego-val'); if(juegoVal) juegoVal.value='';
  var juegoSel = document.getElementById('museo-juego-sel'); if(juegoSel) juegoSel.style.display='none';
  var preview  = document.getElementById('museo-poke-preview'); if(preview) preview.style.display='none';
  museoRenderJuegoGrid();
  museoRenderCampBtns();
  museoRenderPokesLista();
  museoRenderAdmin();
};

window.museoRenderJuegoGrid = function(){
  var cont = document.getElementById('museo-juego-grid');
  if(!cont) return;
  cont.innerHTML = NL_GRUPOS.map(function(g, idx){
    var j = NL_JUEGOS.find(function(x){ return x.n === g.juego; });
    if(!j) return '';
    var sel = (_museoJuegoSel && _museoJuegoSel.n === j.n);
    var genColor = g.gen==='GBA'?'#22c55e': g.gen==='NDS'?'#818cf8':'#c99a2e';
    var bgCol  = sel ? 'rgba(129,140,248,.2)' : 'var(--bg-card)';
    var borCol = sel ? 'rgba(129,140,248,.6)' : 'var(--borde)';
    var txtCol = sel ? 'var(--blanco)' : 'var(--txt-secondary)';
    return '<button class="museo-juego-btn" data-idx="'+idx+'" style="background:'+bgCol+';border:1px solid '+borCol+';border-radius:var(--r-md);padding:7px 6px;cursor:pointer;text-align:left;transition:all .15s;display:flex;flex-direction:column;gap:2px">'
      +'<span style="font-size:16px">'+j.icon+'</span>'
      +'<span style="font-family:var(--font-display);font-size:9px;font-weight:700;color:'+txtCol+';line-height:1.2">'+g.label+'</span>'
      +'<span style="font-size:8px;font-family:var(--font-display);color:'+genColor+';font-weight:700">'+g.gen+'</span>'
      +'</button>';
  }).join('');
  cont.onclick = function(e){
    var btn = e.target.closest('.museo-juego-btn');
    if(!btn) return;
    var idx = parseInt(btn.getAttribute('data-idx'));
    var g = NL_GRUPOS[idx]; if(!g) return;
    _museoJuegoSel = NL_JUEGOS.find(function(x){ return x.n === g.juego; });
    var hidVal = document.getElementById('museo-juego-val'); if(hidVal) hidVal.value = _museoJuegoSel ? _museoJuegoSel.n : '';
    var sel = document.getElementById('museo-juego-sel');
    var txt = document.getElementById('museo-juego-sel-txt');
    if(sel) sel.style.display = 'block';
    if(txt && _museoJuegoSel) txt.textContent = _museoJuegoSel.icon+' '+_museoJuegoSel.n+' ('+_museoJuegoSel.gen+')';
    museoRenderJuegoGrid();
  };
};

window.museoRenderCampBtns = function(){
  var jugadores = Object.keys((baseDatos && baseDatos.jugadores) || {});
  function renderGroup(contId, hidId, single){
    var cont = document.getElementById(contId);
    if(!cont) return;
    var hidEl = document.getElementById(hidId);
    var curVal = hidEl ? hidEl.value : '';
    cont.innerHTML = jugadores.map(function(id){
      var sel = single ? (curVal === id) : false;
      var c = colorParaJugador(id);
      var selBorder = sel ? c : 'var(--borde)';
      var selBg     = sel ? (c+'22') : 'var(--bg-card)';
      var selColor  = sel ? c : 'var(--txt-secondary)';
      return '<button class="museo-btn-jugador'+(sel?' museo-btn-activo':'')+'" data-id="'+id+'"'
        +' style="font-family:var(--font-display);font-size:10px;font-weight:700;padding:5px 10px;border-radius:20px;cursor:pointer;'
        +'border:1px solid '+selBorder+';background:'+selBg+';color:'+selColor+'">'
        +id.toUpperCase()+'</button>';
    }).join('');
    cont.onclick = function(e){
      var btn = e.target.closest('.museo-btn-jugador');
      if(!btn) return;
      var id = btn.getAttribute('data-id');
      if(single){
        var wasActive = btn.classList.contains('museo-btn-activo');
        cont.querySelectorAll('.museo-btn-jugador').forEach(function(b){
          b.classList.remove('museo-btn-activo');
          var bi=b.getAttribute('data-id'); var ci=colorParaJugador(bi);
          b.style.border='1px solid var(--borde)'; b.style.background='var(--bg-card)'; b.style.color='var(--txt-secondary)';
        });
        if(!wasActive){
          btn.classList.add('museo-btn-activo');
          var c2=colorParaJugador(id);
          btn.style.border='1px solid '+c2; btn.style.background=c2+'22'; btn.style.color=c2;
          if(hidEl) hidEl.value = id;
        } else { if(hidEl) hidEl.value = ''; }
      } else {
        var isNowActive = btn.classList.toggle('museo-btn-activo');
        var c3=colorParaJugador(id);
        btn.style.border = isNowActive ? '1px solid '+c3 : '1px solid var(--borde)';
        btn.style.background = isNowActive ? c3+'22' : 'var(--bg-card)';
        btn.style.color = isNowActive ? c3 : 'var(--txt-secondary)';
      }
    };
  }
  renderGroup('museo-camp-torneos-btns', 'museo-camp-torneos-val', true);
  renderGroup('museo-camp-final-btns',   'museo-camp-final-val',   true);
  renderGroup('museo-camp-vidas-btns',   null,                     false);
  var pjSel = document.getElementById('museo-poke-jugador');
  if(pjSel){
    pjSel.innerHTML = jugadores.map(function(id){
      return '<option value="'+id+'">'+id.toUpperCase()+'</option>';
    }).join('');
  }
};

window.museoRenderPokesLista = function(){
  var lista = document.getElementById('museo-pokes-lista');
  if(!lista) return;
  var keys = Object.keys(_museoPokesTemp);
  if(!keys.length){ lista.innerHTML=''; return; }
  lista.innerHTML = keys.map(function(id){
    var mp = _museoPokesTemp[id];
    var c = colorParaJugador(id);
    return '<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--bg-card);border:1px solid rgba(255,255,255,.06);border-radius:var(--r-md)">'
      +'<img src="'+mp.sprite+'" style="width:32px;height:32px;image-rendering:pixelated;flex-shrink:0">'
      +'<div style="flex:1;min-width:0">'
        +'<span style="font-family:var(--font-display);font-size:9px;font-weight:700;color:'+c+';text-transform:uppercase">'+escaparHTML(id)+'</span> '
        +'<span style="font-family:var(--font-display);font-size:11px;font-weight:900;color:var(--blanco)">'+escaparHTML(mp.nombre)+'</span>'
        +(mp.mote ? ' <span style="font-size:9px;color:var(--txt-muted)">&ldquo;'+escaparHTML(mp.mote)+'&rdquo;</span>' : '')
      +'</div>'
      +'<button class="museo-poke-quitar" data-id="'+id+'" style="background:none;border:none;color:var(--neon-ilegal);cursor:pointer;font-size:13px;flex-shrink:0">✕</button>'
      +'</div>';
  }).join('');
  lista.onclick = function(e){
    var btn = e.target.closest('.museo-poke-quitar');
    if(!btn) return;
    delete _museoPokesTemp[btn.getAttribute('data-id')];
    museoRenderPokesLista();
  };
};

window.museoGuardarEntrada = function(){
  var num = parseInt((document.getElementById('museo-num')||{}).value);
  if(!num||num<1){ mostrarNotificacion('Pon un número de locke válido.','error','📜'); return; }
  if(!_museoJuegoSel){ mostrarNotificacion('Selecciona un juego.','error','📜'); return; }
  var mods = Array.from(document.querySelectorAll('input[name="museo-modal"]:checked')).map(function(cb){ return cb.value; });
  if(!mods.length) mods=['EggLocke'];
  var cTorn=(document.getElementById('museo-camp-torneos-val')||{value:''}).value||null;
  var cFin =(document.getElementById('museo-camp-final-val')  ||{value:''}).value||null;
  var vidasBtns=document.querySelectorAll('#museo-camp-vidas-btns .museo-btn-activo');
  var vidasArr=Array.from(vidasBtns).map(function(b){ return b.getAttribute('data-id'); });
  if(!baseDatos.historialLockes) baseDatos.historialLockes={};
  baseDatos.historialLockes['locke'+Date.now()]={
    num:num, tipo:mods[0], modalidades:mods,
    juego:_museoJuegoSel.n, juegoIcon:_museoJuegoSel.icon, juegoGen:_museoJuegoSel.gen, juegoColor:_museoJuegoSel.color,
    campeones:{torneos:cTorn||null,'finalísima':cFin||null,
      vidas:vidasArr.length?(vidasArr.length===1?vidasArr[0]:vidasArr):null},
    pokemon:JSON.parse(JSON.stringify(_museoPokesTemp))
  };
  guardarBD();
  mostrarNotificacion('Locke #'+num+' guardado ✅','exito','📜');
  var est=document.getElementById('museo-estado');
  if(est){ est.textContent='✅ Guardado'; setTimeout(function(){ est.textContent=''; },3000); }
  museoIniciarPanel();
  renderizarHistorialLockes();
};

window.museoEliminarEntrada = function(clave){
  if(!baseDatos.historialLockes||!baseDatos.historialLockes[clave]) return;
  delete baseDatos.historialLockes[clave];
  guardarBD();
  mostrarNotificacion('Entrada eliminada.','info','🗑️');
  museoRenderAdmin();
  renderizarHistorialLockes();
};

window.museoRenderAdmin = function(){
  var lista=document.getElementById('museo-lista-admin');
  if(!lista) return;
  var hist=baseDatos&&baseDatos.historialLockes;
  if(!hist||!Object.keys(hist).length){ lista.innerHTML='<div style="font-size:11px;color:var(--txt-muted);font-style:italic;padding:8px 0">Sin entradas todavía.</div>'; return; }
  var entradas=Object.entries(hist).sort(function(a,b){ return b[1].num-a[1].num; });
  lista.innerHTML=entradas.map(function(kv){
    var clave=kv[0],e=kv[1];
    var mods=(e.modalidades&&e.modalidades.length)?e.modalidades.map(function(m){ return (NL_TIPOS[m]&&NL_TIPOS[m].label)||m; }).join(' + '):(e.tipo||'—');
    var c=e.campeones||{};
    var camps=[c.torneos,c['finalísima'],Array.isArray(c.vidas)?c.vidas.join('/'):c.vidas].filter(Boolean).join(' · ')||'Sin campeones';
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg-card);border:1px solid var(--borde);border-radius:var(--r-md)">'
      +'<span style="font-family:var(--font-display);font-weight:900;color:#818cf8;font-size:14px;min-width:26px">#'+e.num+'</span>'
      +'<div style="flex:1;min-width:0">'
        +'<div style="font-family:var(--font-display);font-size:10px;font-weight:700;color:var(--blanco);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+escaparHTML(mods)+' · '+escaparHTML(e.juego||'—')+'</div>'
        +'<div style="font-size:9px;color:var(--txt-muted)">'+escaparHTML(camps)+'</div>'
      +'</div>'
      +'<button class="btn-admin danger" style="padding:3px 8px;font-size:9px;flex-shrink:0" data-clave="'+escaparHTML(clave)+'">🗑️</button>'
      +'</div>';
  }).join('');
  lista.onclick=function(e){
    var btn=e.target.closest('button[data-clave]');
    if(btn) museoEliminarEntrada(btn.getAttribute('data-clave'));
  };
};

document.addEventListener('click',function(e){
  if(!e.target.closest('#museo-poke-nombre')&&!e.target.closest('#museo-poke-dropdown')){
    var dd=document.getElementById('museo-poke-dropdown'); if(dd) dd.style.display='none';
  }
});

window.navegarAConTab=function(s,t){navegarA(s);if(s==='tiendas')cambiarTiendaTab(t);};
window.cambiarTiendaTab=function(tab){reproducirSonido('tab');document.querySelectorAll('.tienda-tab').forEach(t=>t.classList.remove('active-legal','active-pack','active-illegal'));document.querySelectorAll('.tienda-view').forEach(v=>v.classList.remove('active'));let te=document.getElementById(`ttab-${tab}`),ve=document.getElementById(`tv-${tab}`);te.classList.add(`active-${tab}`);te.classList.add('tab-pop');setTimeout(()=>te.classList.remove('tab-pop'),300);ve.classList.add('active');reanimarElemento(ve);let sec=document.getElementById('section-tiendas');if(sec){sec.classList.remove('zona-legal','zona-pack','zona-illegal');sec.classList.add(`zona-${tab}`);}};
window.cambiarEventoTab=function(tab){reproducirSonido('tab');document.querySelectorAll('.evento-tab').forEach(t=>t.classList.remove('active-arena','active-camara'));document.querySelectorAll('.evento-view').forEach(v=>v.classList.remove('active'));let te=document.getElementById(`etab-${tab}`),ve=document.getElementById(`ev-${tab}`);te.classList.add(`active-${tab}`);te.classList.add('tab-pop');setTimeout(()=>te.classList.remove('tab-pop'),300);ve.classList.add('active');reanimarElemento(ve);if(tab==='camara')renderizarCamaraPublica();};
window.cambiarPerfilTab=function(tab){reproducirSonido('tab');document.querySelectorAll('.perfil-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.perfil-view').forEach(v=>v.classList.remove('active'));const b=document.getElementById(`ptab-${tab}`),v=document.getElementById(`pv-${tab}`);if(b){b.classList.add('active');b.classList.add('tab-pop');setTimeout(()=>b.classList.remove('tab-pop'),300);}if(v){v.classList.add('active');reanimarElemento(v);}if(tab==='ficha')renderizarTitulosYTemas();if(tab==='carnet')renderizarPanelCarnet();};

/* ═══ LOGIN ═══ */
window.ingresarAlSistema=function(){let id=document.getElementById('login-nombre').value.trim().toLowerCase().replace(/[.#$\[\]\s]/g,"");if(!id){mostrarNotificacion("Introduce un Operador ID.","error","🆔");return;}userSesion=id;sessionStorage.setItem('silph_user_sesion',id);if(!baseDatos.jugadores[id]){baseDatos.jugadores[id]={dinero:4000,pf:10,comprasDisponibles:MAX_COMPRAS,ultimaRecarga:Date.now(),inventario:[{uid:"init",nombre:"Mochila Inicial"}],lockeStatus:'jugando',tipoMedallas:'medallas',numMedallas:0,torneos:0,diarioLogs:[{timestamp:"Inicio",texto:"Sistema iniciado."}],vidasTotales:20,vidasActuales:20,cementerio:[],sacrificios:[],ultimoHackeo:0,tracker:crearTrackerDesdeRutas((baseDatos.lockeActivo&&baseDatos.lockeActivo.rutasDefinidas)||[])};}else{let u=baseDatos.jugadores[id];if(!u.inventario)u.inventario=[{uid:"init",nombre:"Mochila Inicial"}];if(!u.diarioLogs)u.diarioLogs=[{timestamp:"Inicio",texto:"Sistema iniciado."}];if(!u.cementerio)u.cementerio=[];if(!u.sacrificios)u.sacrificios=[];if(!u.ultimoHackeo)u.ultimoHackeo=0;if(u.vidasTotales===undefined)u.vidasTotales=20;if(u.vidasActuales===undefined)u.vidasActuales=20;if(!u.tracker)u.tracker=crearTrackerDesdeRutas((baseDatos.lockeActivo&&baseDatos.lockeActivo.rutasDefinidas)||[]);}guardarBD();reproducirSonido('puerta_abrir');document.getElementById('login-screen').classList.add('fade-out');setTimeout(()=>{document.getElementById('login-screen').style.display='none';document.getElementById('app-shell').style.display='block';document.getElementById('app-shell').classList.add('fade-in');},180);const bA=document.getElementById('nav-admin');if(bA)bA.style.display=(id==="srwiwa")?"flex":"none";actualizarComprasPorTiempo();cargarDatosPerfilEnDOM();refrescarPantallaGamer();actualizarBannerAlertasVisuales();renderizarArenaPublica();renderizarCamaraPublica();actualizarBarraVidasDesdeDB();actualizarHeroStrip();aplicarTemaLocke();};
window.cerrarSesionOperador=function(){reproducirSonido('puerta_cerrar');userSesion=null;sessionStorage.removeItem('silph_user_sesion');document.getElementById('app-shell').style.display='none';document.getElementById('login-screen').style.display='flex';document.getElementById('login-screen').classList.remove('fade-out');document.getElementById('login-nombre').value='';const bA=document.getElementById('nav-admin');if(bA)bA.style.display="none";cerrarDrawer();};
function actualizarComprasPorTiempo(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],ahora=Date.now(),tr=ahora-u.ultimaRecarga,hoy=new Date().toDateString();if(!u.comprasHoy||u.comprasHoy._fecha!==hoy){u.comprasHoy={_fecha:hoy};}if(tr>=MS_EN_6_HORAS){let cg=Math.floor(tr/MS_EN_6_HORAS);u.comprasDisponibles=Math.min(MAX_COMPRAS,(u.comprasDisponibles||0)+cg);u.ultimaRecarga=u.ultimaRecarga+(cg*MS_EN_6_HORAS);u.comprasHoy._global=Math.max(0,(u.comprasHoy._global||0)-cg);guardarBD();return true;}return false;}
/* Comprobar la recarga de compras cada 6h de forma periódica, sin necesidad de recargar la página */
setInterval(function(){
  if(!userSesion||!baseDatos.jugadores[userSesion])return;
  if(actualizarComprasPorTiempo()){
    refrescarPantallaGamer();
    renderInitializeLoaders();
  }
},60000);
const ACTIVIDAD_PALETA=['#1e9e73','#c99a2e','#8e4fc7','#3e6fa6','#b8602e','#ec4899','#06b6d4','#84cc16','#d8293f','#5b52c7','#14b8a6','#eab308'];
function colorParaJugador(id){
    let s=(id||'?').toUpperCase(),h=0;
    for(let i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0;}
    return ACTIVIDAD_PALETA[h%ACTIVIDAD_PALETA.length];
}
function formatoTiempoRelativoActividad(ts){
    const m=/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(ts||'');
    if(!m)return ts||'';
    const d=new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5],+m[6]);
    const diff=Math.max(0,Math.floor((Date.now()-d.getTime())/1000));
    if(diff<60)return 'justo ahora';
    if(diff<3600)return `hace ${Math.floor(diff/60)} min`;
    if(diff<86400)return `hace ${Math.floor(diff/3600)} h`;
    if(diff<172800)return 'ayer';
    return `${m[1]}/${m[2]}`;
}
function _parsearTimestampActividad(ts){
    const m=/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(ts||'');
    if(!m)return 0;
    return new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5],+m[6]).getTime();
}
function renderizarActividadGlobalInicio(){
    let ab=document.getElementById('inicio-actividad');
    if(!ab)return;
    let feed=baseDatos.actividadGlobal||[];
    let rec=feed.slice(-15).reverse();
    if(!rec.length){
        ab.innerHTML='<div class="actividad-empty">Sin actividad reciente.</div>';
        return;
    }
    ab.innerHTML=rec.map((l,idx)=>{
        const jugador=(l.jugador||'?').toUpperCase();
        const color=colorParaJugador(l.jugador);
        const inicial=jugador.slice(0,2);
        const txt=l.texto||'';
        let tipoClase='';
        if(txt.includes('💀')||txt.includes('RIP'))tipoClase='es-muerte';
        else if(txt.includes('prohibido')||txt.includes('☢️')||txt.includes('🟣'))tipoClase='es-ilegal';
        else if(txt.toLowerCase().includes('pack'))tipoClase='es-pack';
        else if(txt.includes('Adquirió'))tipoClase='es-legal';
        const esMuyReciente=(Date.now()-_parsearTimestampActividad(l.timestamp))<30000;
        const animClase=idx===0?' nueva-entrada-anim':'';
        return `<div class="actividad-fila ${tipoClase}${esMuyReciente?' muy-reciente':''}${animClase}" style="border-left-color:${color}">
            <div class="actividad-avatar" style="background:${color}22;color:${color};border-color:${color}66">${escaparHTML(inicial)}</div>
            <div class="actividad-cuerpo">
                <div class="actividad-cabecera"><span class="actividad-jugador" style="color:${color}">${escaparHTML(jugador)}</span><span class="actividad-tiempo">${escaparHTML(formatoTiempoRelativoActividad(l.timestamp))}</span></div>
                <div class="actividad-texto">${escaparHTML(l.texto)}</div>
            </div>
        </div>`;
    }).join('');
    actualizarPulsoRedInicio();
    actualizarTickerInicio();
}
function actualizarPulsoRedInicio(){
    let elIcon=document.getElementById('pulso-mercado-icon'),elTxt=document.getElementById('pulso-mercado-texto'),elRec=document.getElementById('pulso-recarga-texto');
    if(!elIcon||!elTxt||!elRec)return;
    let ev=(baseDatos&&baseDatos.eventoSistema)||"normal";
    let cfg=({
        normal:{icon:'🟢',txt:'Estable',bg:'rgba(30,158,115,.1)'},
        rebajas:{icon:'📉',txt:'Rebajas −25%',bg:'rgba(30,158,115,.1)'},
        inflacion:{icon:'⚠️',txt:'Inestable +50%',bg:'rgba(216,41,63,.1)'},
        bonus_pf:{icon:'🪙',txt:'Bono PF x2',bg:'rgba(201,154,46,.1)'}
    })[ev]||{icon:'🟢',txt:'Estable',bg:'rgba(30,158,115,.1)'};
    elIcon.textContent=cfg.icon;elIcon.style.background=cfg.bg;elTxt.textContent=cfg.txt;
    if(userSesion&&baseDatos.jugadores[userSesion]){
        let u=baseDatos.jugadores[userSesion],rest=Math.max(0,(u.ultimaRecarga||Date.now())+MS_EN_6_HORAS-Date.now());
        if(rest<=0){elRec.textContent='Disponible ahora';}
        else{let h=Math.floor(rest/3600000),m=Math.floor((rest%3600000)/60000);elRec.textContent=`${h}h ${m}m`;}
    }else{elRec.textContent='--';}
}
/* Mantener vivo el pulso de la red aunque no llegue actividad nueva */
setInterval(function(){ if(document.getElementById('inicio-pulso-red'))actualizarPulsoRedInicio(); },30000);
let _tickerInicioIdx=0;
function generarMensajesTickerInicio(){
    let msgs=[];
    let feed=baseDatos.actividadGlobal||[];
    if(feed.length){
        let ult=feed[feed.length-1];
        msgs.push(`📰 Última actividad: ${(ult.jugador||'?').toUpperCase()} — ${formatoTiempoRelativoActividad(ult.timestamp)}`);
    }
    let estLegal=baseDatos.legalOpen!==false?'abierta':'cerrada';
    let estPack=baseDatos.packOpen!==false?'abierta':'cerrada';
    let estIleg=baseDatos.illegalOpen!==false?'abierta':'cerrada';
    msgs.push(`🛒 Redes: Legal ${estLegal} · Packs ${estPack} · Mercado Negro ${estIleg}`);
    let camp=(baseDatos.campeones&&baseDatos.campeones.torneos)?String(baseDatos.campeones.torneos).toUpperCase():null;
    if(camp)msgs.push(`🏆 Campeón de Torneos: ${camp}`);
    return msgs;
}
function actualizarTickerInicio(){
    let el=document.getElementById('inicio-ticker-texto');
    if(!el)return;
    let msgs=generarMensajesTickerInicio();
    if(!msgs.length){el.textContent='Sin novedades por ahora.';return;}
    _tickerInicioIdx=_tickerInicioIdx%msgs.length;
    el.textContent=msgs[_tickerInicioIdx];
    el.classList.remove('inicio-ticker-fade');void el.offsetWidth;el.classList.add('inicio-ticker-fade');
    _tickerInicioIdx++;
}
setInterval(function(){ if(document.getElementById('inicio-ticker-texto'))actualizarTickerInicio(); },4500);
setInterval(function(){
  let ab=document.getElementById('inicio-actividad');
  if(!ab)return;
  let feed=baseDatos.actividadGlobal||[];
  let rec=feed.slice(-15).reverse();
  let filas=ab.querySelectorAll('.actividad-fila');
  filas.forEach(function(fila,idx){
    let entry=rec[idx];
    if(!entry)return;
    let tEl=fila.querySelector('.actividad-tiempo');
    if(tEl)tEl.textContent=formatoTiempoRelativoActividad(entry.timestamp);
    let esReciente=(Date.now()-_parsearTimestampActividad(entry.timestamp))<30000;
    fila.classList.toggle('muy-reciente',esReciente);
  });
},60000);
/* Anima un contador numérico: flash verde si sube, rojo si baja. Solo lectura visual, no toca la lógica del dato. */
function animarValorNumerico(el,nuevoValor){
  if(!el)return;
  let anterior=parseFloat((el.textContent||'').replace(/[^\d.-]/g,''));
  let nuevoNum=parseFloat(String(nuevoValor).replace(/[^\d.-]/g,''));
  el.textContent=nuevoValor;
  if(isNaN(anterior)||isNaN(nuevoNum)||anterior===nuevoNum)return;
  let cls=nuevoNum>anterior?'val-pulse-up':'val-pulse-down';
  el.classList.remove('val-pulse-up','val-pulse-down');
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(()=>el.classList.remove(cls),320);
}
function refrescarPantallaGamer(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion];animarValorNumerico(document.getElementById('usr-dinero'),u.dinero);animarValorNumerico(document.getElementById('usr-pf'),u.pf);
  let _gb=document.getElementById('topbar-gacha-btn');
  if(_gb){if(jugadorBaneado(userSesion)){_gb.style.opacity='.4';_gb.style.filter='grayscale(1)';_gb.style.cursor='not-allowed';_gb.title='Baneado: '+(u.baneado.motivo||'');}else{_gb.style.opacity='';_gb.style.filter='';_gb.style.cursor='';_gb.title='';}}
  const _cHoy=u.comprasHoy&&u.comprasHoy._fecha===new Date().toDateString()?u.comprasHoy:{};
  const _usados=_cHoy._global||0;
  const _ilUsados=_cHoy._illegal||0;
  const _restGlob=Math.max(0,MAX_COMPRAS-_usados);
  const _ilStr=_ilUsados>=1?' · 🟣0/1':' · 🟣1/1';
  animarValorNumerico(document.getElementById('usr-compras'),`${_restGlob}/${MAX_COMPRAS}${_ilStr}`);
  actualizarHeroStrip();
  let va=u.vidasActuales!==undefined?u.vidasActuales:(u.vidasTotales||20),vt=u.vidasTotales||20;
  let tv=document.getElementById('usr-vidas-top');if(tv)animarValorNumerico(tv,`${va}/${vt}`);let ib=document.getElementById('lista-inventario');ib.innerHTML='';let items=u.inventario?u.inventario.filter(i=>i.uid!=="init"):[];if(!items.length){ib.innerHTML='<span style="color:var(--txt-muted);font-size:11px;font-family:var(--font-display)">Vacía</span>';}else{items.forEach(i=>{let descHtml=i.desc?`<div class="mochila-tag-desc">🎁 ${escaparHTML(i.desc)}</div>`:'';ib.innerHTML+=`<div class="mochila-tag${i.desc?' mochila-tag-pack':''}" title="Adquirido: ${escaparHTML(i.fecha)}${i.desc?' — Contiene: '+escaparHTML(i.desc):''}"><div style="display:flex;flex-direction:column;gap:3px;min-width:0"><span>${escaparHTML(i.icon)||'📦'} ${escaparHTML(i.nombre)}</span>${descHtml}</div><button class="btn-usar" onclick="consumirObjetoMochilaGamer('${i.uid}','${escaparHTML(i.nombre)}','${escaparHTML(i.icon)||'📦'}')">Usar</button></div>`;});}renderInitializeLoaders();renderizarActividadGlobalInicio();}

/* ═══ TIENDAS ═══ */
