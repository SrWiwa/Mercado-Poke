# Silph Co – Estructura de Archivos

```
silph-co/
├── index.html              ← HTML principal (estructura + layout, sin CSS ni JS)
├── css/
│   └── styles.css          ← Todo el CSS (variables, componentes, animaciones)
└── js/
    ├── app.js              ← JS completo (por si quieres un solo archivo)
    │
    ├── 01-firebase-core.js ← Imports Firebase, config, constantes globales, estado
    ├── 02-sonido.js        ← Motor de audio (Web Audio API, efectos de sonido)
    ├── 03-radio.js         ← Sistema de radio sincronizada
    ├── 04-tipos.js         ← Calculadora de tipos + Consultor por generación
    ├── 05-hall-of-fame.js  ← Hall of Fame, mejor Pokémon del locke
    ├── 06-db-items.js      ← DB_ITEMS, DB_PACKS, motor de generación de tienda
    ├── 07-locke-museo.js   ← Locke activo, Nuevo Locke, Hero Strip, Museo
    ├── 08-ui-core.js       ← Notificaciones, Select custom, DOMContentLoaded,
    │                          Drawer, Firebase onValue, Navegación, Login, Actividad
    ├── 09-tiendas.js       ← Render de tiendas (legal/packs/ilegal), compras
    ├── 10-perfil-vida.js   ← HP Bar, Sacrificio, Diario, Log Admin, Perfil
    ├── 11-tracker-rutas.js ← Tracker de rutas + Mapa SVG serpentino
    ├── 12-ruletas.js       ← Sistema de ruletas
    ├── 13-titulos-carnet.js← Títulos/Rangos + Carnet de Entrenador (SVG)
    ├── 14-temas-perfil.js  ← Temas desbloqueables, Banner, Gacha, Red
    ├── 15-arena-camara.js  ← Arena de apuestas (duelos + encuestas), Cámara
    ├── 16-admin.js         ← Panel de Admin completo
    └── 17-pvp-editor-rutas.js ← PvP ELO, Editor de Rutas (Modo Dios)
```

## Cómo funciona

El `index.html` carga:
1. `css/styles.css` via `<link rel="stylesheet">`
2. `js/app.js` via `<script type="module" src="js/app.js">`

**app.js** es una copia del JS completo — funciona tal cual, igual que el HTML monolítico original.

Los archivos numerados `01-*.js` a `17-*.js` son los mismos módulos divididos por función. Si en algún momento quieres migrar a módulos ES independientes, ya tienes los bloques identificados, pero **requiere refactorizar los imports de Firebase** en cada archivo que los necesite.

## Archivos de edición rápida

| Quieres editar...      | Archivo                    |
|------------------------|----------------------------|
| Colores/variables CSS  | `css/styles.css`           |
| Items de la tienda     | `js/06-db-items.js`        |
| Lógica de tiendas      | `js/09-tiendas.js`         |
| HP Bar / Sacrificio    | `js/10-perfil-vida.js`     |
| Arena / Apuestas       | `js/15-arena-camara.js`    |
| Panel Admin            | `js/16-admin.js`           |
| Editor de rutas        | `js/17-pvp-editor-rutas.js`|
| Hall of Fame           | `js/05-hall-of-fame.js`    |
| Carnet SVG             | `js/13-titulos-carnet.js`  |
