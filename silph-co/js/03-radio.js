/* ═══ RADIO ═══ */
let radioAudioEl=null,radioCancionActualId=null,radioUltimoAnunciadoId=null,radioIntervaloSync=null,radioInteraccionPendiente=false;
let radioVolumen=parseFloat(localStorage.getItem('silph_radio_volumen'));
if(isNaN(radioVolumen))radioVolumen=0.45;
let radioSilenciada=(localStorage.getItem('silph_radio_silenciada')==='true');
function mulberry32(s){return function(){s|=0;s=(s+0x6D2B79F5)|0;let t=Math.imul(s^(s>>>15),1|s);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296;};}
function ordenAleatorioConSemilla(lista,sem){let r=mulberry32(sem),c=lista.slice();for(let i=c.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]];}return c;}
function obtenerListaCanciones(){if(!baseDatos.radio||!baseDatos.radio.canciones)return[];return Object.keys(baseDatos.radio.canciones).map(id=>({id,...baseDatos.radio.canciones[id]})).filter(c=>c.url&&c.duracion>0);}
function calcularPistaActual(){const canciones=obtenerListaCanciones();if(!canciones.length)return null;const dur=canciones.reduce((a,c)=>a+c.duracion,0);if(dur<=0)return null;const sem=baseDatos.radio.semillaOrden||1,ini=baseDatos.radio.inicioEpoch||Date.now();let t=Math.max(0,(Date.now()-ini)/1000);const np=Math.floor(t/dur),pos=t%dur;const orden=ordenAleatorioConSemilla(canciones,sem+np*7919);let ac=0;for(const c of orden){if(pos<ac+c.duracion)return{cancion:c,offset:pos-ac};ac+=c.duracion;}return{cancion:orden[orden.length-1],offset:0};}
function mostrarToastRadioCancion(nombre){
    const cont=document.getElementById('toast-container');
    if(!cont)return;
    const texto=`Suena ahora: "${nombre}"`;
    const el=document.createElement('div');
    el.className='toast tipo-radio';
    el.innerHTML=`<span class="toast-icon">📻</span><div style="min-width:0;flex:1"><div class="toast-titulo">Radio Pokeinomana</div><div class="radio-now-playing-wrap"><span class="rnp-item rnp-static">${escaparHTML(texto)}</span></div></div>`;
    cont.appendChild(el);
    requestAnimationFrame(()=>{
        requestAnimationFrame(()=>el.classList.add('show'));
        const wrap=el.querySelector('.radio-now-playing-wrap'),item=wrap&&wrap.querySelector('.rnp-item');
        if(item&&item.scrollWidth>wrap.clientWidth+2){
            const dur=Math.max(7,item.scrollWidth/26);
            wrap.innerHTML=`<div class="radio-now-playing-track marquee" style="animation-duration:${dur}s"><span class="rnp-item">${escaparHTML(texto)}</span><span class="rnp-item">${escaparHTML(texto)}</span></div>`;
        }
    });
    setTimeout(()=>{el.classList.remove('show');el.classList.add('hide');setTimeout(()=>el.remove(),350);},6000);
}
function anunciarCancionRadioSiEsNueva(cancion){
    if(!cancion||radioUltimoAnunciadoId===cancion.id)return;
    radioUltimoAnunciadoId=cancion.id;
    mostrarToastRadioCancion(cancion.nombre);
}
function actualizarEstadoBadgeRadio(activa,sinCanciones){
    const b=document.getElementById('radio-estado-badge');
    if(!b)return;
    if(sinCanciones){b.textContent='📻 Sin canciones';b.className='radio-estado-badge radio-estado-off';return;}
    if(activa){b.textContent='🔴 En vivo';b.className='radio-estado-badge radio-estado-on';}
    else{b.textContent='⏸ Apagada';b.className='radio-estado-badge radio-estado-off';}
}
function inicializarAudioRadio(){
    if(radioAudioEl)return;
    radioAudioEl=document.getElementById('radio-player');
    if(!radioAudioEl)return;
    radioAudioEl.volume=radioSilenciada?0:radioVolumen;
    radioAudioEl.addEventListener('ended',function(){radioCancionActualId=null;sincronizarRadio();});
    radioAudioEl.addEventListener('playing',function(){const ec=document.getElementById('radio-ecualizador');if(ec)ec.classList.add('sonando');});
    radioAudioEl.addEventListener('pause',function(){const ec=document.getElementById('radio-ecualizador');if(ec)ec.classList.remove('sonando');});
}
function dispararReintentoRadioTrasInteraccion(){
    if(radioInteraccionPendiente)return;
    radioInteraccionPendiente=true;
    const reintentar=()=>{
        radioInteraccionPendiente=false;
        document.removeEventListener('click',reintentar);
        document.removeEventListener('touchstart',reintentar);
        document.removeEventListener('keydown',reintentar);
        radioCancionActualId=null;
        sincronizarRadio();
    };
    document.addEventListener('click',reintentar,{once:true});
    document.addEventListener('touchstart',reintentar,{once:true});
    document.addEventListener('keydown',reintentar,{once:true});
}
function reproducirAudioDesdeOffset(url, offset, cancion) {
    if (!radioAudioEl) return;
    // Limpiar listeners anteriores para no acumularlos
    radioAudioEl.oncanplay = null;
    radioAudioEl.onerror = null;

    radioAudioEl.src = url;
    radioAudioEl.load();

    radioAudioEl.oncanplay = function() {
        radioAudioEl.oncanplay = null;
        // Calcular offset actualizado por el tiempo que tardó en cargar
        const pistaActual = calcularPistaActual();
        const offsetReal = pistaActual ? pistaActual.offset : offset;
        try { radioAudioEl.currentTime = offsetReal; } catch(e) {}
        const promesa = radioAudioEl.play();
        if (promesa !== undefined) {
            promesa.then(() => {
                anunciarCancionRadioSiEsNueva(cancion);
            }).catch(() => {
                // Autoplay bloqueado por el navegador: reintentar en la próxima interacción del usuario
                dispararReintentoRadioTrasInteraccion();
            });
        } else {
            anunciarCancionRadioSiEsNueva(cancion);
        }
    };
    radioAudioEl.onerror = function() {
        radioCancionActualId = null; // forzar reintento en próxima sync (sin volver a anunciar la misma canción)
    };
}

function sincronizarRadio(){
    inicializarAudioRadio();
    const pista=calcularPistaActual();
    const ec=document.getElementById('radio-ecualizador');
    if(!pista){
        if(ec)ec.classList.remove('sonando');
        if(radioAudioEl)radioAudioEl.pause();
        actualizarEstadoBadgeRadio(false,true);
        return;
    }
    const activadaGlobal=!!(baseDatos.radio&&baseDatos.radio.activada);
    if(!activadaGlobal){
        if(ec)ec.classList.remove('sonando');
        if(radioAudioEl)radioAudioEl.pause();
        radioCancionActualId=null;
        actualizarEstadoBadgeRadio(false,false);
        return;
    }
    actualizarEstadoBadgeRadio(true,false);
    if(!radioAudioEl)return;
    if(radioCancionActualId!==pista.cancion.id){
        radioCancionActualId=pista.cancion.id;
        reproducirAudioDesdeOffset(pista.cancion.url,pista.offset,pista.cancion);
    }else if(radioAudioEl.paused&&radioAudioEl.src){
        const p=radioAudioEl.play();
        if(p!==undefined)p.then(()=>{anunciarCancionRadioSiEsNueva(pista.cancion);}).catch(()=>{dispararReintentoRadioTrasInteraccion();});
    }else if(!radioAudioEl.paused&&Math.abs(radioAudioEl.currentTime-pista.offset)>4){
        try{radioAudioEl.currentTime=pista.offset;}catch(e){}
    }
}
window.conmutarRadioGlobal=function(estado){
    if(!userSesion||userSesion.toLowerCase()!=="srwiwa"){mostrarNotificacion("Acceso denegado.","error","🔒");return;}
    if(!baseDatos.radio)baseDatos.radio={canciones:{},semillaOrden:0,inicioEpoch:0,activada:false};
    baseDatos.radio.activada=estado;
    if(estado){
        if(!baseDatos.radio.semillaOrden)baseDatos.radio.semillaOrden=Date.now();
        if(!baseDatos.radio.inicioEpoch)baseDatos.radio.inicioEpoch=Date.now();
    }
    guardarBD();
    reproducirSonido(estado?'exito':'cerrar');
    mostrarNotificacion(estado?"Radio activada para todos los oyentes.":"Radio desactivada para todos.","exito","📡");
};
window.ajustarVolumenRadio=function(v){radioVolumen=Math.max(0,Math.min(1,parseFloat(v)));localStorage.setItem('silph_radio_volumen',String(radioVolumen));if(radioVolumen>0&&radioSilenciada){radioSilenciada=false;localStorage.setItem('silph_radio_silenciada','false');}if(radioAudioEl)radioAudioEl.volume=radioSilenciada?0:radioVolumen;let ic=document.getElementById('radio-icono-vol');if(ic)ic.textContent=radioSilenciada||radioVolumen===0?'🔇':(radioVolumen<0.5?'🔉':'🔊');};
window.alternarSilencioRadio=function(){radioSilenciada=!radioSilenciada;localStorage.setItem('silph_radio_silenciada',String(radioSilenciada));if(radioAudioEl)radioAudioEl.volume=radioSilenciada?0:radioVolumen;let ic=document.getElementById('radio-icono-vol');if(ic)ic.textContent=radioSilenciada?'🔇':(radioVolumen<0.5?'🔉':'🔊');};
window.subirCancionesRadio=async function(fileList){if(!userSesion||userSesion.toLowerCase()!=="srwiwa"){mostrarNotificacion("Acceso denegado.","error","🔒");return;}let archivos=Array.from(fileList||[]);if(!archivos.length)return;let cajaEstado=document.getElementById('radio-subida-estado');for(const file of archivos){if(!file.type.startsWith('audio/'))continue;if(cajaEstado)cajaEstado.textContent=`Subiendo "${file.name}"...`;try{const ruta=`radio/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`,ar=storageRef(storage,ruta);await uploadBytes(ar,file);const url=await getDownloadURL(ar);const dur=await new Promise(res=>{let a=new Audio();a.preload='metadata';a.onloadedmetadata=()=>res(a.duration||180);a.onerror=()=>res(180);a.src=url;});let nid='song_'+Date.now()+Math.floor(Math.random()*1000);if(!baseDatos.radio)baseDatos.radio={canciones:{},semillaOrden:0,inicioEpoch:0,activada:false};if(!baseDatos.radio.canciones)baseDatos.radio.canciones={};baseDatos.radio.canciones[nid]={nombre:file.name.replace(/\.[^/.]+$/,''),url,duracion:Math.round(dur),ruta};if(!baseDatos.radio.semillaOrden)baseDatos.radio.semillaOrden=Date.now();if(!baseDatos.radio.inicioEpoch)baseDatos.radio.inicioEpoch=Date.now();guardarBD();}catch(err){mostrarNotificacion(`Error al subir "${file.name}".`,"error","⚠️");}}if(cajaEstado)cajaEstado.textContent='';logAdmin('Subir canciones radio',archivos.map(f=>f.name).join(', '));reproducirSonido('exito');mostrarNotificacion("Canciones añadidas a Radio Pokeinomana.","exito","📻");renderizarListaRadioAdmin();};
window.eliminarCancionRadio=async function(id){if(!userSesion||userSesion.toLowerCase()!=="srwiwa")return;let cf=await mostrarConfirmacion({icono:'🗑️',titulo:'Eliminar canción',descripcion:'Se borrará también el archivo de Firebase Storage.',textoConfirmar:'Eliminar',tipo:'peligro'});if(!cf)return;let c=baseDatos.radio.canciones[id];if(c&&c.ruta){try{await deleteObject(storageRef(storage,c.ruta));}catch(e){}}let nombreCancion=c?c.nombre:id;delete baseDatos.radio.canciones[id];logAdmin('Eliminar canción radio',nombreCancion);mostrarNotificacion("Canción eliminada.","info","🗑️");renderizarListaRadioAdmin();};
window.reiniciarOrdenRadio=function(){if(!userSesion||userSesion.toLowerCase()!=="srwiwa")return;if(!baseDatos.radio)baseDatos.radio={canciones:{},semillaOrden:0,inicioEpoch:0,activada:false};baseDatos.radio.semillaOrden=Date.now();baseDatos.radio.inicioEpoch=Date.now();logAdmin('Reiniciar orden radio','');reproducirSonido('exito');mostrarNotificacion("Orden reiniciado para todos los oyentes.","exito","🔀");};
function renderizarListaRadioAdmin(){let box=document.getElementById('radio-admin-lista');if(!box)return;let canciones=obtenerListaCanciones();if(!canciones.length){box.innerHTML='<div style="color:var(--txt-muted);font-size:11px;text-align:center;padding:14px;font-family:var(--font-display)">Sin canciones subidas todavía.</div>';return;}box.innerHTML='';canciones.forEach(c=>{let m=Math.floor(c.duracion/60),s=String(Math.round(c.duracion%60)).padStart(2,'0');box.innerHTML+=`<div class="admin-item-card"><button class="btn-del-item" onclick="eliminarCancionRadio('${c.id}')">✕</button><div style="color:var(--txt-primary);font-size:12px;font-weight:600">🎵 ${escaparHTML(c.nombre)}</div><div style="font-size:10px;color:var(--txt-muted);margin-top:3px;font-family:var(--font-display)">${m}:${s}</div></div>`;});}

