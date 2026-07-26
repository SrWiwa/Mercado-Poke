window.aplicarFiltroCategoriaLegal=function(){filtroCategoriaGlobal=document.getElementById('filtro-categoria-legal').value;renderInitializeLoaders();};
function renderInitializeLoaders(){renderTienda('legal','contenedor-legal-view',baseDatos.legalOpen);renderTienda('pack','contenedor-pack-view',baseDatos.packOpen);renderTienda('illegal','contenedor-hacker-view',baseDatos.illegalOpen);}
/* Recuerda el stock mostrado la última vez de cada producto, para poder animar solo lo que cambió realmente */
let _stockAnteriorTienda={};
function renderTienda(tipo,cid,abierta){let box=document.getElementById(cid);if(!box)return;box.innerHTML='';if(abierta===false){box.innerHTML=`<div class="tienda-cerrada-box"><div class="tienda-cerrada-icon">🔒</div><div class="tienda-cerrada-txt">Red Cerrada temporalmente</div></div>`;return;}let prods=baseDatos.productos.filter(p=>{let ok=p.tienda===tipo;if(tipo==='legal'&&filtroCategoriaGlobal!=="")ok=ok&&p.cat===filtroCategoriaGlobal;return ok;});if(!prods.length){box.innerHTML=`<div style="text-align:center;color:var(--txt-muted);padding:40px;font-family:var(--font-display);font-size:12px;letter-spacing:1px;text-transform:uppercase">Sin artículos disponibles</div>`;return;}let ev=baseDatos.eventoSistema||"normal",html='<div class="items-grid">';prods.forEach(p=>{let esI=p.tienda==='illegal',pf=p.precio,bonoPf=p.pf||0,cp='';if(!esI){if(ev==='rebajas'){pf=Math.round(p.precio*0.75);cp='color:var(--neon-legal);';}else if(ev==='inflacion'){pf=Math.round(p.precio*1.50);cp='color:#e2646f;';}if(ev==='bonus_pf')bonoPf=(p.pf||0)*2;}let tc=esI?`${p.precioPf} PF`:`${pf} P₠`;let dH=p.desc?`<div class="item-descripcion">${escaparHTML(p.desc)}</div>`:'',eH=p.estrategia?`<div class="item-estrategia">💡 ${escaparHTML(p.estrategia)}</div>`:'',cH=p.cat?`<div class="item-categoria-tag">${escaparHTML(p.cat)}</div>`:'',pH=(!esI&&bonoPf>0)?`<div class="item-pf-bonus">+${bonoPf} PF</div>`:'';let benfH=esI&&p.beneficio?`<div style="font-size:10px;color:var(--neon-ilegal);background:rgba(142,79,199,.06);border:1px solid rgba(142,79,199,.15);border-left:3px solid var(--neon-ilegal);padding:5px 8px;border-radius:0 var(--r-sm) var(--r-sm) 0;margin-bottom:4px;line-height:1.3">✅ ${escaparHTML(p.beneficio)}</div>`:'';let castH=esI&&p.castigo?`<div style="font-size:10px;color:#e2646f;background:rgba(216,41,63,.05);border:1px solid rgba(216,41,63,.15);border-left:3px solid #e2646f;padding:5px 8px;border-radius:0 var(--r-sm) var(--r-sm) 0;margin-bottom:4px;line-height:1.3">⚠️ ${escaparHTML(p.castigo)}</div>`:'';let hoyStr=new Date().toDateString();
      let u_=(userSesion&&baseDatos.jugadores[userSesion])||{};
      let cHoy_=u_.comprasHoy||{};
      if(cHoy_._fecha!==hoyStr)cHoy_={};
      // Pool global (legal+pack comparten 3 créditos/día); illegal tiene su propio contador
      let coste_=tipo==='pack'?2:1;
      let usados_=cHoy_._global||0;
      let ilUsados_=cHoy_._illegal||0;
      let limAlc=tipo==='illegal'?(ilUsados_>=1):(usados_+coste_>MAX_COMPRAS);
      let dis=p.stock<=0||limAlc?'disabled':'';
      let restGlobal=Math.max(0,MAX_COMPRAS-usados_);
      let bt=p.stock<=0?'⛔ AGOTADO':limAlc
        ?(tipo==='illegal'?`🚫 ILEGAL USADA (${ilUsados_}/1)`:`🚫 SIN CRÉDITOS (${usados_}/${MAX_COMPRAS})`)
        :(tipo==='illegal'?`ADQUIRIR · ${tc} 🟣 (${ilUsados_}/1)`:`ADQUIRIR · ${tc} [${restGlobal} crédito${restGlobal!==1?'s':''}]`);let stockClase=p.stock<=0?'stock-agotado':(p.stock<=2?'urgent':(p.stock<=4?'low':'ok'));let stockTexto=p.stock<=0?'AGOTADO':(p.stock<=2?`¡Últimas ${p.stock}!`:`Stock: ${p.stock}`);html+=`<div class="item-card ${p.stock<=0?'agotado':''}" data-pid="${p.id}"><div>${cH}<div class="item-emoji">${escaparHTML(p.icon)}</div><div class="item-nombre">${p.qty&&p.qty>1?"x"+p.qty+" ":""}${escaparHTML(p.nombre)}</div>${dH}${eH}${benfH}${castH}</div><div><div class="item-precio-row"><div class="item-precio" style="${cp}">${tc}</div><span class="stock-badge-v2 ${stockClase}" data-stock="${p.stock}">${stockTexto}</span></div>${pH}<button class="btn-comprar" ${dis} onclick="comprarObjetoGamer(${p.id})">${bt}</button></div></div>`;});html+='</div>';box.innerHTML=html;box.querySelectorAll('.item-card').forEach((c,i)=>{
    let pid=c.getAttribute('data-pid'),badge=c.querySelector('.stock-badge-v2'),stockNuevo=badge?parseFloat(badge.getAttribute('data-stock')):NaN;
    if(pid!==null&&!isNaN(stockNuevo)&&_stockAnteriorTienda.hasOwnProperty(pid)&&_stockAnteriorTienda[pid]!==stockNuevo){
      let subio=stockNuevo>_stockAnteriorTienda[pid];
      badge.classList.add(subio?'val-pulse-up':'val-pulse-down');
      setTimeout(()=>badge.classList.remove('val-pulse-up','val-pulse-down'),320);
    }else if(!_stockAnteriorTienda.hasOwnProperty(pid)){
      c.style.opacity='0';c.style.animation=`feedSlideIn .35s ease ${Math.min(i*40,400)}ms forwards`;
    }
    if(pid!==null)_stockAnteriorTienda[pid]=stockNuevo;
  });}
window.comprarObjetoGamer=async function(id){
  if(!userSesion)return;
  if(jugadorBaneado(userSesion)){mostrarNotificacion(`🚫 Estás baneado de la Tienda. Motivo: ${baseDatos.jugadores[userSesion].baneado.motivo}`,'error','🚫');return;}
  let u=baseDatos.jugadores[userSesion],p=baseDatos.productos.find(x=>x.id===id),
      be=window.event&&window.event.target?window.event.target.closest('.item-card'):null;
  if(!p||p.stock<=0){mostrarNotificacion("Ese objeto ya no está disponible.","error","📦");return;}

  const _qty=p.qty&&p.qty>1?p.qty:1;
  const _nombreQty=_qty>1?'x'+_qty+' '+p.nombre:p.nombre;

  // ── GASTOS DIARIOS ──────────────────────────────────────────────
  // Pool global de 3 créditos/día: Legal gasta 1, Pack gasta 2
  // Ilegalidades: contador propio independiente (1/día)
  const LABEL_TIENDA={legal:'Tienda Legal',pack:'Shop PF Pack',illegal:'Ilegalidades'};
  const hoy=new Date().toDateString();
  if(!u.comprasHoy)u.comprasHoy={};
  if(u.comprasHoy._fecha!==hoy)u.comprasHoy={_fecha:hoy};
  const tienda=p.tienda||'legal';
  const coste=tienda==='pack'?2:1;
  const usadosGlobal=u.comprasHoy._global||0;
  const usadosIllegal=u.comprasHoy._illegal||0;

  if(tienda==='illegal'){
    if(usadosIllegal>=1){
      mostrarNotificacion('Ya has usado tu ilegalidad de hoy. Límite: 1/día.','error','🟣');
      return;
    }
  } else {
    if(usadosGlobal+coste>MAX_COMPRAS){
      const restan=MAX_COMPRAS-usadosGlobal;
      mostrarNotificacion(`No tienes créditos suficientes. Te quedan ${restan}/${MAX_COMPRAS} y ${tienda==='pack'?'un Pack cuesta 2 créditos':'esto cuesta 1 crédito'}.`,'error','🛒');
      return;
    }
  }

  let ev=baseDatos.eventoSistema||"normal",pf=p.precio,bonoPf=p.pf||0;
  if(tienda!=='illegal'){
    if(ev==='rebajas')pf=Math.round(p.precio*0.75);
    else if(ev==='inflacion')pf=Math.round(p.precio*1.50);
    if(ev==='bonus_pf')bonoPf=(p.pf||0)*2;
  }

  const restanTras=tienda==='illegal'?0:Math.max(0,MAX_COMPRAS-usadosGlobal-coste);
  const limiteInfo=tienda==='illegal'
    ?`\nIlegalidad del día: 1/1 (única)`
    :`\nCréditos usados: ${usadosGlobal+coste}/${MAX_COMPRAS} — quedan ${restanTras} tras esta compra`;

  let tc=tienda==='illegal'?`${p.precioPf} PF`:`${pf} P₠`;
  let sc=tienda==='illegal'?'hacker':(tienda==='pack'?'pack_epico':'monedas');
  let descConfirm=`Coste: ${tc}${(tienda!=='illegal')&&bonoPf>0?`\n+${bonoPf} PF de bonificación`:''}${p.desc?`\n📋 ${p.desc}`:''}${tienda==='illegal'&&p.beneficio?`\n✅ ${p.beneficio}`:''}${tienda==='illegal'&&p.castigo?`\n⚠️ Castigo si detectado: ${p.castigo}`:''}${limiteInfo}`;
  let cf=await mostrarConfirmacion({icono:p.icon||'🛒',titulo:`¿Adquirir ${p.nombre}?`,descripcion:descConfirm,textoConfirmar:'Adquirir',tipo:tienda==='illegal'?'sacrificio':'normal',sonidoConfirmar:sc});
  if(!cf)return;

  let cont=p.desc?` Contiene: ${p.desc}.`:'';
  if(tienda==='illegal'){
    if(u.pf<p.precioPf){mostrarNotificacion("No tienes suficientes PF.","error","🔮");return;}
    u.pf-=p.precioPf;
    let contIlegal=(p.desc?` ${p.desc}.`:'')+(p.beneficio?` Beneficio: ${p.beneficio}.`:'')+(p.castigo?` Castigo potencial: ${p.castigo}.`:'');
    inyectarEntradaDiarioAutomatica(`Adquirió módulo prohibido: ${p.icon} '${p.nombre}' por ${p.precioPf} PF.${contIlegal}`);
  }else{
    if(u.dinero<pf){mostrarNotificacion("No tienes suficiente efectivo P₠.","error","💰");return;}
    u.dinero-=pf;u.pf+=bonoPf;
    inyectarEntradaDiarioAutomatica(`Adquirió: ${p.icon} ${_qty>1?'x'+_qty+' ':''}'${p.nombre}' por ${pf} P₠ (+${bonoPf} PF). Créditos usados: ${usadosGlobal+coste}/${MAX_COMPRAS}.${cont}`);
  }

  // Registrar compra del día
  if(tienda==='illegal'){
    u.comprasHoy._illegal=(u.comprasHoy._illegal||0)+1;
  } else {
    u.comprasHoy._global=(u.comprasHoy._global||0)+coste;
    u.comprasDisponibles=Math.max(0,(u.comprasDisponibles||0)-coste);
  }
  p.stock--;
  if(!u.inventario)u.inventario=[];
  u.inventario.push({uid:"item_"+Date.now()+Math.floor(Math.random()*100),nombre:_nombreQty,icon:p.icon,qty:_qty,desc:p.desc||'',beneficio:p.beneficio||'',castigo:p.castigo||'',tienda:tienda,fecha:new Date().toLocaleDateString()});
  _checkCompraTemaTienda(p.nombre);
  guardarBD();
  if(be){
    let flashClass=tienda==='illegal'?'flash-ilegal':(tienda==='pack'?'flash-pack':'flash-legal');
    be.classList.add(flashClass);
    setTimeout(()=>be.classList.remove(flashClass),650);
    // Texto flotante +PF / -dinero sobre la card
    let rect=be.getBoundingClientRect();
    if(tienda!=='illegal' && bonoPf>0){
      let pfEl=document.createElement('div');
      pfEl.className='pf-float-text pf-float-pf';
      pfEl.textContent='+'+bonoPf+' PF';
      pfEl.style.left=(rect.left+rect.width/2-20)+'px';
      pfEl.style.top=(rect.top+10)+'px';
      document.body.appendChild(pfEl);
      setTimeout(()=>pfEl.remove(),900);
    }
    if(tienda==='illegal'){
      let pfEl=document.createElement('div');
      pfEl.className='pf-float-text pf-float-pf';
      pfEl.textContent='-'+p.precioPf+' PF';
      pfEl.style.left=(rect.left+rect.width/2-20)+'px';
      pfEl.style.top=(rect.top+10)+'px';
      document.body.appendChild(pfEl);
      setTimeout(()=>pfEl.remove(),900);
    }
  }
  mostrarNotificacion(`Has adquirido ${p.nombre}.${cont}`,'exito',p.icon||'✅','Compra realizada',true);
  refrescarPantallaGamer();
};
window.consumirObjetoMochilaGamer=function(uid,nombre,icon){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion];if(!u.inventario)return;let i=u.inventario.findIndex(x=>x.uid===uid);if(i!==-1){let item=u.inventario[i];let desc=item.desc||'';u.inventario.splice(i,1);let esIlegal=item.tienda==='illegal';let parteDesc=desc?` Descripción: ${desc}.`:'';let parteBeneficio=esIlegal&&item.beneficio?` ✅ Beneficio: ${item.beneficio}.`:'';let parteCastigo=esIlegal&&item.castigo?` ⚠️ Castigo si detectado: ${item.castigo}.`:'';let entradaDiario=esIlegal?`🟣 Activó módulo prohibido: ${icon} '${nombre}'.${parteDesc}${parteBeneficio}${parteCastigo}`:(desc?`Utilizó el objeto ${icon} '${nombre}'. Contenido: ${desc}.`:`Utilizó el objeto ${icon} '${nombre}'. Consumido.`);inyectarEntradaDiarioAutomatica(entradaDiario);guardarBD();reproducirSonido('usar_objeto');mostrarNotificacion(`Has usado '${nombre}'.`,'exito',icon||'🎒',null,true);}};

/* ═══ MODAL BAJA ═══ */
window.abrirModalBaja=function(){['baja-nombre','baja-mote','baja-lugar','baja-epitafio'].forEach(id=>document.getElementById(id).value='');document.getElementById('baja-motivo').value='Ruta';refrescarSelectsPersonalizados();reproducirSonido('abrir');document.getElementById('baja-modal-overlay').style.display='flex';};
window.cerrarModalBaja=function(){reproducirSonido('cerrar');document.getElementById('baja-modal-overlay').style.display='none';};
window.confirmarBaja=function(){let n=document.getElementById('baja-nombre').value.trim(),m=document.getElementById('baja-mote').value.trim(),mot=document.getElementById('baja-motivo').value,l=document.getElementById('baja-lugar').value.trim(),e=document.getElementById('baja-epitafio').value.trim();if(!n){mostrarNotificacion("El nombre del Pokémon es requerido.","error","💀");return;}if(!l){mostrarNotificacion("Indica el lugar o rival de la caída.","error","🗺️");return;}let u=baseDatos.jugadores[userSesion],va=(u.vidasActuales!==undefined)?u.vidasActuales:(u.vidasTotales||20);if(va>0)va--;u.vidasActuales=va;if(va<=0)u.lockeStatus='perdido';let nc=m?`${n} "${m}"`:n,rc=`[${mot}] ${l}`;if(!u.cementerio)u.cementerio=[];u.cementerio.push({nombre:nc,ruta:rc,epitafio:e||"Sin últimas palabras.",fecha:new Date().toLocaleDateString()});inyectarEntradaDiarioAutomatica(`💀 RIP: '${nc}' cayó ante ${rc}. Últimas palabras: "${e||'...'}"`);guardarBD();cerrarModalBaja();reproducirSonido('muerte');destellarPantalla('rojo');actualizarBarraVidasDesdeDB();renderizarTitulosYTemas();let _barraV=document.querySelector('.hp-barra-contenedor');if(_barraV){_barraV.classList.add('shake-vidas');setTimeout(()=>_barraV.classList.remove('shake-vidas'),350);}mostrarInfo({icono:'💀',titulo:nc,descripcion:`Ha caído ante ${rc}.\n❤️ Vidas restantes: ${va}`,tipo:'peligro',textoConfirmar:'Descanse en paz'});};

