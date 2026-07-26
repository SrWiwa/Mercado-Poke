import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAgN5I8-o1WpWXfRq96FZXCF8ELmdC-ghw",
    authDomain: "tienda-pokeinomanos.firebaseapp.com",
    databaseURL: "https://tienda-pokeinomanos-default-rtdb.firebaseio.com",
    projectId: "tienda-pokeinomanos",
    storageBucket: "tienda-pokeinomanos.firebasestorage.app",
    messagingSenderId: "481043703231",
    appId: "1:481043703231:web:070be712b4b8d85d81ad0a"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const CAMARA_CATEGORIAS = {
    comun:{label:'Objetos Comunes',coste:2,icon:'🧴',badgeClass:'cat-comun'},
    competitivo:{label:'Obj. Competitivos',coste:5,icon:'🏆',badgeClass:'cat-competitivo'},
    evolucion:{label:'Evoluciones',coste:7,icon:'🔥',badgeClass:'cat-evolucion'},
    megaevolucion:{label:'Megaevoluciones',coste:10,icon:'✨',badgeClass:'cat-megaevolucion'},
    pokemon:{label:'Pokémon/Fósiles',coste:20,icon:'🐉',badgeClass:'cat-pokemon'}
};
const baseDatosInicial=[
    {id:101,tienda:'legal',cat:'EV/IV',nombre:'Hierro',precio:1000,pf:2,stock:10,icon:'🧪'},
    {id:102,tienda:'legal',cat:'EV/IV',nombre:'Proteína',precio:1000,pf:2,stock:10,icon:'🧪'},
    {id:103,tienda:'legal',cat:'Bayas',nombre:'Baya Atania',precio:80,pf:1,stock:12,icon:'🫐'},
    {id:104,tienda:'legal',cat:'Bayas',nombre:'Baya Oran',precio:90,pf:1,stock:12,icon:'🍊'},
    {id:105,tienda:'legal',cat:'Poké Balls',nombre:'Buceo Ball',precio:200,pf:2,stock:8,icon:'🌐'},
    {id:106,tienda:'legal',cat:'Poké Balls',nombre:'Nivel Ball',precio:250,pf:3,stock:8,icon:'🟡'},
    {id:107,tienda:'legal',cat:'Objetos de Exploración',nombre:'Cuerda Huida',precio:120,pf:1,stock:8,icon:'🪢'},
    {id:108,tienda:'legal',cat:'Objetos de Exploración',nombre:'Repelente',precio:70,pf:1,stock:20,icon:'🧴'},
    {id:109,tienda:'legal',cat:'Objetos de Combate (X)',nombre:'X Defensa',precio:600,pf:2,stock:6,icon:'🔴'},
    {id:110,tienda:'legal',cat:'Objetos de Combate (X)',nombre:'X Velocidad',precio:700,pf:3,stock:6,icon:'🔵'},
    {id:111,tienda:'legal',cat:'Objetos Competitivos',nombre:'Banda Focus',precio:2500,pf:3,stock:4,icon:'🎗️'},
    {id:112,tienda:'legal',cat:'Objetos Competitivos',nombre:'Gafas Elegidas',precio:5000,pf:3,stock:4,icon:'🕶️'},
    {id:201,tienda:'pack',cat:'Pack Especial',nombre:'Pack Balls',precio:750,pf:11,stock:99,icon:'📦',desc:'2 Buceo Ball + 2 Nivel Ball',estrategia:'Incentiva estrategia de captura mixta.'},
    {id:202,tienda:'pack',cat:'Pack Especial',nombre:'Pack Exploración',precio:460,pf:7,stock:99,icon:'📦',desc:'2 Cuerda Huida + 4 Repelente',estrategia:'Reduce fricción de rutas largas.'},
    {id:203,tienda:'pack',cat:'Pack Especial',nombre:'Pack Combate Temprano',precio:1300,pf:11,stock:99,icon:'📦',desc:'2 X Defensa + 2 X Velocidad',estrategia:'Premia preparación.'},
    {id:204,tienda:'pack',cat:'Pack Especial',nombre:'Pack Supervivencia',precio:460,pf:7,stock:99,icon:'📦',desc:'3 Baya Oran + 3 Baya Atania',estrategia:'Ahorro pequeño pero constante.'},
    {id:205,tienda:'pack',cat:'Pack Especial',nombre:'Pack "Segundo Intento"',precio:2800,pf:6,stock:99,icon:'📦',desc:'1 Banda Focus + 1 Hierro',estrategia:'Supervivencia + mejora ligera.'},
    {id:301,tienda:'illegal',cat:'Hack de Sistema',nombre:'Escudo Poke',precioPf:5,stock:1,icon:'🛡️',desc:'Evita la muerte una vez.'},
    {id:302,tienda:'illegal',cat:'Hack de Sistema',nombre:'Captura Selectiva',precioPf:4,stock:1,icon:'🎯',desc:'Elige el Poke de una ruta.'},
    {id:303,tienda:'illegal',cat:'Hack de Sistema',nombre:'Licencia De Caza',precioPf:3,stock:1,icon:'📜',desc:'Permite repetir captura si huye.'},
    {id:304,tienda:'illegal',cat:'Hack de Sistema',nombre:'Falsificación De Registro',precioPf:5,stock:1,icon:'🪪',desc:'Sustituye 1 Poke clasificado.'},
    {id:305,tienda:'illegal',cat:'Hack de Sistema',nombre:'Plaza Fantasma',precioPf:6,stock:1,icon:'🪑',desc:'Sustituye plaza muerta en torneo.'},
    {id:306,tienda:'illegal',cat:'Hack de Sistema',nombre:'Evolución Forzada',precioPf:5,stock:1,icon:'💖',desc:'Evoluciona Pokes de amistad.'},
    {id:307,tienda:'illegal',cat:'Hack de Sistema',nombre:'Reconfiguración',precioPf:2,stock:1,icon:'🔄',desc:'Modifica movimientos post-líder.'},
    {id:308,tienda:'illegal',cat:'Hack de Sistema',nombre:'Modificación Genética',precioPf:4,stock:1,icon:'🧬',desc:'Cambia la habilidad del Poke.'},
    {id:309,tienda:'illegal',cat:'Hack de Sistema',nombre:'Alteración De Personalidad',precioPf:2,stock:1,icon:'🎭',desc:'Cambia la naturaleza.'},
    {id:310,tienda:'illegal',cat:'Hack de Sistema',nombre:'Resurrección Robada',precioPf:8,stock:1,icon:'🔮',desc:'Robas un Poke muerto de otro.'}
];
let baseDatos={productos:[],jugadores:{},intercambios:{},arena:{},camara:{},legalOpen:true,packOpen:true,illegalOpen:true,eventoSistema:"normal",radio:{canciones:{},semillaOrden:0,inicioEpoch:0,activada:false},actividadGlobal:[],adminLog:[]};
let userSesion=sessionStorage.getItem('silph_user_sesion')||null;
let filtroCategoriaGlobal="";
const MAX_COMPRAS=3,MS_EN_6_HORAS=6*60*60*1000;
const SACRIFICIO_VALORES={basura:{vidas:1,etiqueta:'Basura / Muy común'},normal:{vidas:2,etiqueta:'Normal / Utilidad media'},fuerte:{vidas:3,etiqueta:'Fuerte / Evolución final'},pseudo:{vidas:5,etiqueta:'Pseudo-legendario'},ultra:{vidas:6,etiqueta:'Ultraente'},legendario:{vidas:7,etiqueta:'Legendario / Singular'}};
function escaparHTML(str){if(!str)return '';return str.replace(/[&<>'"]/g,tag=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[tag]||tag));}

