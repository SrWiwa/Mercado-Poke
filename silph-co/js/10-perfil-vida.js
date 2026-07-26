/* ═══ HP BAR ═══ */
window.actualizarBarraVidas=function(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],ini=parseInt(document.getElementById('perf-vidas-iniciales').value)||20,act=(u.vidasActuales!==undefined)?u.vidasActuales:ini;_renderBarra(act,ini);};
function actualizarBarraVidasDesdeDB(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],ini=u.vidasTotales||20,act=(u.vidasActuales!==undefined)?u.vidasActuales:ini;let inp=document.getElementById('perf-vidas-iniciales');if(inp)inp.value=ini;_renderBarra(act,ini);let top=document.getElementById('usr-vidas-top');if(top)top.textContent=`${act}/${ini}`;}
function _renderBarra(act,ini){let f=document.getElementById('perf-vida-barra-fill'),d=document.getElementById('perf-vidas-display'),pl=document.getElementById('perf-vida-pct');if(!f||!d)return;let pct=ini>0?Math.max(0,Math.min(100,(act/ini)*100)):0;f.style.width=pct+'%';f.className='hp-fill';if(act<=0){f.classList.add('cero');d.style.color='var(--gris-600)';}else if(pct>50){f.classList.add('alta');d.style.color='var(--neon-legal)';}else if(pct>25){f.classList.add('media');d.style.color='var(--amarillo)';}else{f.classList.add('baja');d.style.color='#e2646f';}d.textContent=`${act} / ${ini}`;if(pl)pl.textContent=Math.round(pct)+'%';}

/* ═══ SACRIFICIO ═══ */
window.abrirModalSacrificio=function(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],vt=u.vidasTotales||20,va=(u.vidasActuales!==undefined)?u.vidasActuales:vt;document.getElementById('sac-nombre-poke').value='';document.getElementById('sac-mote-poke').value='';document.getElementById('sac-categoria').value='';document.getElementById('sac-preview-vidas-box').classList.add('hidden');document.getElementById('sac-aviso-limite').style.display='none';document.getElementById('btn-confirmar-sacrificio').disabled=true;if(va>=vt)document.getElementById('sac-aviso-limite').style.display='block';refrescarSelectsPersonalizados();renderizarHistorialSacrificios();reproducirSonido('abrir');document.getElementById('sacrificio-modal-overlay').style.display='flex';};
window.cerrarModalSacrificio=function(){reproducirSonido('cerrar');document.getElementById('sacrificio-modal-overlay').style.display='none';};
window.actualizarPreviewSacrificio=function(){let cat=document.getElementById('sac-categoria').value,n=document.getElementById('sac-nombre-poke').value.trim(),pb=document.getElementById('sac-preview-vidas-box'),bc=document.getElementById('btn-confirmar-sacrificio'),av=document.getElementById('sac-aviso-limite');if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],vt=u.vidasTotales||20,va=(u.vidasActuales!==undefined)?u.vidasActuales:vt;if(va>=vt){av.style.display='block';pb.classList.add('hidden');bc.disabled=true;return;}av.style.display='none';if(!cat||!n){pb.classList.add('hidden');bc.disabled=true;return;}let datos=SACRIFICIO_VALORES[cat];if(!datos)return;let vr=Math.min(datos.vidas,vt-va),ex=vr<datos.vidas?` (cap: máx. ${vt})`:'';document.getElementById('sac-preview-nombre-txt').textContent=`${escaparHTML(n)} · ${datos.etiqueta}${ex}`;document.getElementById('sac-preview-numero-txt').textContent=`+${vr} ❤️`;pb.classList.remove('hidden');bc.disabled=false;};
window.confirmarSacrificio=async function(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let n=document.getElementById('sac-nombre-poke').value.trim(),m=document.getElementById('sac-mote-poke').value.trim(),cat=document.getElementById('sac-categoria').value;if(!n){mostrarNotificacion("Introduce el nombre del Pokémon.","error","🔥");return;}if(!cat){mostrarNotificacion("Selecciona la categoría de rareza.","error","🔥");return;}let u=baseDatos.jugadores[userSesion],vt=u.vidasTotales||20,va=(u.vidasActuales!==undefined)?u.vidasActuales:vt;if(va>=vt){mostrarNotificacion(`Ya tienes el máximo de ${vt} vidas.`,"error","⛔");return;}let datos=SACRIFICIO_VALORES[cat];if(!datos){mostrarNotificacion("Categoría inválida.","error","🔥");return;}let vg=Math.min(datos.vidas,vt-va),nv=va+vg,nc=m?`${n} "${m}"`:n;let cf=await mostrarConfirmacion({icono:'🔥',titulo:'Sacrificio Pokéinomano',descripcion:`Pokémon: ${nc}\nCategoría: ${datos.etiqueta}\nVidas obtenidas: +${vg} ❤️\nVidas tras el sacrificio: ${nv}/${vt}\n\n⚠️ Este Pokémon quedará eliminado permanentemente.`,textoConfirmar:'Ejecutar Sacrificio',tipo:'sacrificio',sonidoConfirmar:'revivir'});if(!cf)return;u.vidasActuales=nv;if(u.lockeStatus==='perdido'&&nv>0)u.lockeStatus='jugando';if(!u.sacrificios)u.sacrificios=[];let dobj=new Date(),ts=`${String(dobj.getDate()).padStart(2,'0')}/${String(dobj.getMonth()+1).padStart(2,'0')}/${dobj.getFullYear()} ${String(dobj.getHours()).padStart(2,'0')}:${String(dobj.getMinutes()).padStart(2,'0')}`;u.sacrificios.push({nombre:nc,categoria:datos.etiqueta,vidasObtenidas:vg,vidasTras:nv,timestamp:ts});inyectarEntradaDiarioAutomatica(`🔥 SACRIFICIO: '${nc}' [${datos.etiqueta}] ofrecido al Mercader. +${vg} ❤️. Vidas: ${nv}/${vt}.`);guardarBD();cerrarModalSacrificio();destellarPantalla('naranja');actualizarBarraVidasDesdeDB();renderizarTitulosYTemas();mostrarInfo({icono:'🔥',titulo:'Sacrificio completado',descripcion:`${nc} descansa en paz.\n❤️ Vidas: +${vg} → ${nv}`,textoConfirmar:'Aceptar'});};
function renderizarHistorialSacrificios(){let box=document.getElementById('sac-historial-lista');if(!box||!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion];box.innerHTML='';if(!u.sacrificios||!u.sacrificios.length){box.innerHTML='<div style="color:var(--txt-muted);font-size:11px;font-family:var(--font-display);padding:10px 0;font-style:italic">Ningún compañero sacrificado aún.</div>';return;}[...u.sacrificios].reverse().slice(0,8).forEach(s=>{box.innerHTML+=`<div class="sac-entry"><div class="sac-entry-ts">🕐 ${escaparHTML(s.timestamp)}</div><div style="display:flex;justify-content:space-between;align-items:center"><div><span style="color:var(--neon-sacrificio);font-weight:700;font-family:var(--font-display);font-size:11px">🔥 ${escaparHTML(s.nombre)}</span> <span style="color:var(--txt-muted);font-size:10px">· ${escaparHTML(s.categoria)}</span></div><div style="font-family:var(--font-display);font-size:12px;font-weight:900;color:var(--neon-sacrificio)">+${s.vidasObtenidas}❤️</div></div><div style="font-size:10px;color:var(--txt-muted);margin-top:2px">Vidas tras el canje: ${s.vidasTras}</div></div>`;});}
function actualizarEstadisticasSacrificioPanel(){let box=document.getElementById('sac-stats-mini-panel');if(!box||!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],t=u.sacrificios?u.sacrificios.length:0,v=u.sacrificios?u.sacrificios.reduce((a,s)=>a+(s.vidasObtenidas||0),0):0;box.innerHTML=`<div class="sac-chip">Sacrificios: <span>${t}</span></div><div class="sac-chip">Vidas recuperadas: <span>${v} ❤️</span></div>`;let btn=document.getElementById('btn-trigger-sacrificio');if(btn){let va=(u.vidasActuales!==undefined)?u.vidasActuales:(u.vidasTotales||20);let vt=u.vidasTotales||20;btn.disabled=(va>=vt);btn.title=va>=vt?`Ya tienes el máximo de ${vt} vidas`:'Sacrificar un Pokémon para recuperar vidas';}}

/* ═══ DIARIO ═══ */
window.abrirOverlayDiarioNativo=function(){reproducirSonido('abrir');document.getElementById('diario-overlay-sistema').style.display='flex';redibujarHistorialDiario();};
window.cerrarOverlayDiarioNativo=function(){reproducirSonido('cerrar');document.getElementById('diario-overlay-sistema').style.display='none';};
function redibujarHistorialDiario(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],logs=document.getElementById('diario-historial-logs');logs.innerHTML='';let fil=u.diarioLogs?u.diarioLogs.filter(l=>l.timestamp!=="Inicio"):[];document.getElementById('diario-contador').textContent=`Registros: ${fil.length} / 1500`;if(!fil.length){logs.innerHTML='<span style="color:var(--txt-muted);font-size:12px;text-align:center;padding:20px;font-family:var(--font-display)">Bitácora vacía.</span>';return;}fil.forEach(log=>{logs.innerHTML+=`<div class="diario-entry"><div class="diario-entry-ts">📅 ${escaparHTML(log.timestamp)}</div><div class="diario-entry-txt">${escaparHTML(log.texto)}</div></div>`;});logs.scrollTop=logs.scrollHeight;}
window.guardarNuevaEntradaDiario=function(){let inp=document.getElementById('diario-input-texto'),c=inp.value.trim();if(!c){mostrarNotificacion("Escribe algo antes de guardar.","error","📖");return;}inyectarEntradaDiarioAutomatica(c);guardarBD();inp.value='';redibujarHistorialDiario();reproducirSonido('exito');mostrarNotificacion("Hito estampado en la bitácora.","exito","📖");};
function registrarActividadGlobal(jugadorId,txt,ts){
    if(!baseDatos.actividadGlobal)baseDatos.actividadGlobal=[];
    baseDatos.actividadGlobal.push({jugador:jugadorId,texto:txt,timestamp:ts});
    if(baseDatos.actividadGlobal.length>60)baseDatos.actividadGlobal=baseDatos.actividadGlobal.slice(-60);
}
/* ═══ LOG DE ACCIONES DE ADMIN ═══ */
function logAdmin(accion,detalle){
    if(!baseDatos.adminLog)baseDatos.adminLog=[];
    let d=new Date();
    let ts=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    baseDatos.adminLog.push({timestamp:ts,admin:userSesion||'?',accion:accion||'',detalle:detalle||''});
    if(baseDatos.adminLog.length>500)baseDatos.adminLog=baseDatos.adminLog.slice(-500);
    guardarBD();
    if(document.getElementById('dv-log')&&document.getElementById('dv-log').classList.contains('active'))renderizarLogAdmin();
}
window.logAdmin=logAdmin;

/* ── Vista del Log de Admin (filtro + paginación) ── */
const LOG_ADMIN_POR_PAGINA=15;
let logAdminPaginaActual=1;
function renderizarLogAdmin(pagina){
    if(pagina)logAdminPaginaActual=pagina;
    let lista=document.getElementById('log-admin-lista');
    let vacio=document.getElementById('log-admin-vacio');
    let pagBox=document.getElementById('log-admin-paginacion');
    let selAccion=document.getElementById('log-filtro-accion');
    if(!lista||!vacio||!pagBox)return;
    let todos=baseDatos.adminLog||[];
    if(selAccion){
        let accionesUnicas=[...new Set(todos.map(l=>l.accion).filter(Boolean))].sort();
        let valActual=selAccion.value;
        selAccion.innerHTML='<option value="">— Todas las acciones —</option>'+accionesUnicas.map(a=>`<option value="${escaparHTML(a)}">${escaparHTML(a)}</option>`).join('');
        if(accionesUnicas.includes(valActual))selAccion.value=valActual;
        if(selAccion.__cselRefrescar)selAccion.__cselRefrescar();
    }
    let filtroAccion=selAccion?selAccion.value:'';
    let filtroTexto=(document.getElementById('log-filtro-texto')?.value||'').toLowerCase().trim();
    let logs=todos.slice().reverse();
    if(filtroAccion)logs=logs.filter(l=>l.accion===filtroAccion);
    if(filtroTexto)logs=logs.filter(l=>(l.detalle||'').toLowerCase().includes(filtroTexto)||(l.admin||'').toLowerCase().includes(filtroTexto)||(l.accion||'').toLowerCase().includes(filtroTexto));
    if(!logs.length){
        lista.innerHTML='';
        vacio.style.display='block';
        pagBox.innerHTML='';
        return;
    }
    vacio.style.display='none';
    let totalPaginas=Math.max(1,Math.ceil(logs.length/LOG_ADMIN_POR_PAGINA));
    if(logAdminPaginaActual>totalPaginas)logAdminPaginaActual=totalPaginas;
    if(logAdminPaginaActual<1)logAdminPaginaActual=1;
    let inicio=(logAdminPaginaActual-1)*LOG_ADMIN_POR_PAGINA;
    let pageItems=logs.slice(inicio,inicio+LOG_ADMIN_POR_PAGINA);
    lista.innerHTML=pageItems.map(l=>`<div class="admin-item-card" style="display:flex;flex-direction:column;gap:2px;padding:10px 12px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <span style="font-family:var(--font-display);font-size:10.5px;font-weight:700;color:var(--neon-packs);text-transform:uppercase;letter-spacing:.3px">${escaparHTML(l.accion)}</span>
          <span style="font-size:9.5px;color:var(--txt-muted);font-family:var(--font-display);white-space:nowrap">🕐 ${escaparHTML(l.timestamp)}</span>
        </div>
        <div style="font-size:11px;color:var(--txt-primary)">${escaparHTML(l.detalle||'—')}</div>
        <div style="font-size:9px;color:var(--txt-muted);font-family:var(--font-display)">👤 ${escaparHTML((l.admin||'?').toUpperCase())}</div>
      </div>`).join('');
    pagBox.innerHTML=`<button class="btn-admin" style="width:auto;padding:6px 14px" ${logAdminPaginaActual<=1?'disabled':''} onclick="renderizarLogAdmin(${logAdminPaginaActual-1})">← Anterior</button>
      <span style="font-family:var(--font-display);font-size:10px;color:var(--txt-secondary)">Página ${logAdminPaginaActual} / ${totalPaginas} · ${logs.length} registros</span>
      <button class="btn-admin" style="width:auto;padding:6px 14px" ${logAdminPaginaActual>=totalPaginas?'disabled':''} onclick="renderizarLogAdmin(${logAdminPaginaActual+1})">Siguiente →</button>`;
}
window.renderizarLogAdmin=renderizarLogAdmin;
function inyectarEntradaDiarioAutomatica(txt){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion],d=new Date();let ts=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;if(!u.diarioLogs)u.diarioLogs=[];u.diarioLogs.push({timestamp:ts,text:txt,texto:txt});registrarActividadGlobal(userSesion,txt,ts);}
function inyectarEntradaDiarioAutomaticaPara(uid,txt){if(!baseDatos.jugadores[uid])return;let u=baseDatos.jugadores[uid],d=new Date();let ts=`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;if(!u.diarioLogs)u.diarioLogs=[];u.diarioLogs.push({timestamp:ts,text:txt,texto:txt});registrarActividadGlobal(uid,txt,ts);}

/* ═══ PERFIL ═══ */
function cargarDatosPerfilEnDOM(){if(!userSesion||!baseDatos.jugadores[userSesion])return;let u=baseDatos.jugadores[userSesion];let n=document.getElementById('perfil-nombre-display');if(n)n.textContent=userSesion.toUpperCase();
  let _bb=document.getElementById('perfil-ban-banner'),_bm=document.getElementById('perfil-ban-motivo');
  if(_bb&&_bm){if(jugadorBaneado(userSesion)){_bb.style.display='block';_bm.textContent=`Motivo: ${u.baneado.motivo||'Sin especificar'} (${u.baneado.fecha||''})`;}else{_bb.style.display='none';}}
  document.getElementById('perf-locke-status').value=u.lockeStatus||'jugando';document.getElementById('perf-tipo-medallas').value=u.tipoMedallas||'medallas';document.getElementById('perf-num-medallas').value=u.numMedallas||0;document.getElementById('perf-txt-torneos').textContent=u.torneos||0;document.getElementById('perf-vidas-iniciales').value=u.vidasTotales||20;refrescarSelectsPersonalizados();renderizarInsigniasPerfil();cargarMejorPokemonEnPerfil();aplicarTemaLocke();renderizarBannerLocke();actualizarBadgeGimnasio();renderizarTitulosYTemas();if(document.getElementById('pv-tracker')&&document.getElementById('pv-tracker').classList.contains('active'))renderizarTracker();}

