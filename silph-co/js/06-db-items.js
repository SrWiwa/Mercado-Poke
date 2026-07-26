var DB_ITEMS = [
  // Official English names. precio = per unit in Pokédollars.
  // The shop will display items with quantity (e.g. "x2 Great Ball").

  // ══ POKÉ BALLS ══════════════════════════════
  {n:'Poké Ball',        i:'🔴',cat:'Poké Balls', tier:0,gen:1,precio:200,  pf:0,rareza:1},
  {n:'Great Ball',       i:'🔵',cat:'Poké Balls', tier:1,gen:1,precio:600,  pf:0,rareza:2},
  {n:'Ultra Ball',       i:'⚫',cat:'Poké Balls', tier:3,gen:1,precio:1200, pf:0,rareza:3},
  {n:'Net Ball',         i:'🔵',cat:'Poké Balls', tier:2,gen:3,precio:1000, pf:1,rareza:2},
  {n:'Dive Ball',        i:'🌊',cat:'Poké Balls', tier:2,gen:3,precio:1000, pf:1,rareza:2},
  {n:'Nest Ball',        i:'🟢',cat:'Poké Balls', tier:1,gen:3,precio:1000, pf:1,rareza:2},
  {n:'Repeat Ball',      i:'🔁',cat:'Poké Balls', tier:3,gen:3,precio:1000, pf:1,rareza:3},
  {n:'Timer Ball',       i:'⏱️',cat:'Poké Balls', tier:3,gen:3,precio:1000, pf:1,rareza:3},
  {n:'Luxury Ball',      i:'✨',cat:'Poké Balls', tier:4,gen:3,precio:3000, pf:2,rareza:4},
  {n:'Premier Ball',     i:'⭐',cat:'Poké Balls', tier:4,gen:3,precio:200,  pf:2,rareza:4},
  {n:'Dusk Ball',        i:'🌑',cat:'Poké Balls', tier:4,gen:4,precio:1000, pf:1,rareza:3},
  {n:'Heal Ball',        i:'💊',cat:'Poké Balls', tier:1,gen:4,precio:300,  pf:1,rareza:2},
  {n:'Quick Ball',       i:'⚡',cat:'Poké Balls', tier:3,gen:4,precio:1000, pf:1,rareza:3},
  {n:'Friend Ball',      i:'💛',cat:'Poké Balls', tier:2,gen:2,precio:300,  pf:1,rareza:2},
  {n:'Heavy Ball',       i:'⚫',cat:'Poké Balls', tier:2,gen:2,precio:500,  pf:1,rareza:2},
  {n:'Dream Ball',       i:'💤',cat:'Poké Balls', tier:7,gen:5,precio:10000,pf:3,rareza:5},
  {n:'Beast Ball',       i:'🟡',cat:'Poké Balls', tier:7,gen:7,precio:10000,pf:4,rareza:5},
  {n:'Master Ball',      i:'🟣',cat:'Poké Balls', tier:8,gen:1,precio:999999,pf:5,rareza:5},

  // ══ MEDICINE ════════════════════════════════
  {n:'Potion',           i:'🧪',cat:'Medicine',   tier:0,gen:1,precio:300,  pf:0,rareza:1},
  {n:'Super Potion',     i:'🧴',cat:'Medicine',   tier:1,gen:1,precio:700,  pf:1,rareza:2},
  {n:'Hyper Potion',     i:'💉',cat:'Medicine',   tier:2,gen:1,precio:1200, pf:1,rareza:2},
  {n:'Max Potion',       i:'💊',cat:'Medicine',   tier:4,gen:1,precio:2500, pf:2,rareza:3},
  {n:'Fresh Water',      i:'💧',cat:'Medicine',   tier:1,gen:1,precio:400,  pf:1,rareza:1},
  {n:'Soda Pop',         i:'🥤',cat:'Medicine',   tier:1,gen:1,precio:600,  pf:1,rareza:1},
  {n:'Lemonade',         i:'🍋',cat:'Medicine',   tier:2,gen:1,precio:700,  pf:1,rareza:2},
  {n:'Moomoo Milk',      i:'🥛',cat:'Medicine',   tier:2,gen:2,precio:800,  pf:1,rareza:2},
  {n:'Ether',            i:'⚗️',cat:'Medicine',   tier:2,gen:1,precio:1200, pf:1,rareza:3},
  {n:'Max Ether',        i:'🫧',cat:'Medicine',   tier:4,gen:1,precio:2000, pf:2,rareza:3},
  {n:'Elixir',           i:'🔮',cat:'Medicine',   tier:4,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Max Elixir',       i:'💎',cat:'Medicine',   tier:6,gen:1,precio:4500, pf:3,rareza:4},
  {n:'Full Restore',     i:'✨',cat:'Medicine',   tier:5,gen:1,precio:3000, pf:2,rareza:4},
  {n:'Full Heal',        i:'🩹',cat:'Medicine',   tier:1,gen:1,precio:600,  pf:1,rareza:2},
  {n:'Antidote',         i:'💜',cat:'Medicine',   tier:0,gen:1,precio:100,  pf:0,rareza:1},
  {n:'Burn Heal',        i:'🔥',cat:'Medicine',   tier:0,gen:1,precio:250,  pf:0,rareza:1},
  {n:'Ice Heal',         i:'❄️',cat:'Medicine',   tier:0,gen:1,precio:250,  pf:0,rareza:1},
  {n:'Awakening',        i:'☕',cat:'Medicine',   tier:0,gen:1,precio:250,  pf:0,rareza:1},
  {n:'Parlyz Heal',      i:'⚡',cat:'Medicine',   tier:0,gen:1,precio:200,  pf:0,rareza:1},
  {n:'Revival Herb',     i:'🌿',cat:'Medicine',   tier:3,gen:2,precio:2800, pf:2,rareza:3},
  {n:'Energy Root',      i:'🌱',cat:'Medicine',   tier:2,gen:2,precio:800,  pf:1,rareza:2},
  {n:'Heal Powder',      i:'🌾',cat:'Medicine',   tier:1,gen:2,precio:450,  pf:1,rareza:2},

  // ══ VITAMINS ════════════════════════════════
  {n:'HP Up',            i:'❤️',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'Protein',          i:'💪',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'Iron',             i:'⚙️',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'Carbos',           i:'🦴',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'Calcium',          i:'🧬',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'Zinc',             i:'🔬',cat:'Vitamins',   tier:3,gen:1,precio:9800, pf:2,rareza:3},
  {n:'PP Up',            i:'⬆️',cat:'Vitamins',   tier:4,gen:1,precio:9800, pf:2,rareza:3},
  {n:'PP Max',           i:'⏫',cat:'Vitamins',   tier:6,gen:1,precio:9800, pf:3,rareza:4},
  {n:'Rare Candy',       i:'🍬',cat:'Vitamins',   tier:5,gen:1,precio:15000,pf:3,rareza:4},

  // ══ BATTLE ITEMS ════════════════════════════
  {n:'X Attack',         i:'⚔️',cat:'Battle Items',tier:0,gen:1,precio:500,  pf:1,rareza:2},
  {n:'X Defense',        i:'🛡️',cat:'Battle Items',tier:0,gen:1,precio:550,  pf:1,rareza:2},
  {n:'X Speed',          i:'💨',cat:'Battle Items',tier:0,gen:1,precio:350,  pf:0,rareza:1},
  {n:'X Sp. Atk',        i:'🔮',cat:'Battle Items',tier:1,gen:1,precio:500,  pf:1,rareza:2},
  {n:'X Sp. Def',        i:'🌀',cat:'Battle Items',tier:1,gen:1,precio:550,  pf:1,rareza:2},
  {n:'X Accuracy',       i:'🎯',cat:'Battle Items',tier:1,gen:1,precio:950,  pf:1,rareza:2},
  {n:'Guard Spec.',      i:'🔰',cat:'Battle Items',tier:2,gen:1,precio:700,  pf:1,rareza:2},
  {n:'Dire Hit',         i:'💥',cat:'Battle Items',tier:2,gen:1,precio:650,  pf:1,rareza:2},

  // ══ REPELS ══════════════════════════════════
  {n:'Repel',            i:'🌿',cat:'Repels',     tier:0,gen:1,precio:350,  pf:0,rareza:1},
  {n:'Super Repel',      i:'🍃',cat:'Repels',     tier:1,gen:1,precio:500,  pf:0,rareza:2},
  {n:'Max Repel',        i:'🌲',cat:'Repels',     tier:2,gen:1,precio:700,  pf:1,rareza:2},

  // ══ FIELD ITEMS ═════════════════════════════
  {n:'Escape Rope',      i:'🪢',cat:'Field Items', tier:0,gen:1,precio:550,  pf:0,rareza:1},
  {n:'Poke Doll',        i:'🪆',cat:'Field Items', tier:0,gen:1,precio:1000, pf:0,rareza:1},
  {n:'Honey',            i:'🍯',cat:'Field Items', tier:1,gen:4,precio:100,  pf:1,rareza:2},
  {n:'Amulet Coin',      i:'🪙',cat:'Field Items', tier:3,gen:2,precio:15000,pf:1,rareza:3},

  // ══ BERRIES ══════════════════════════════════
  {n:'Oran Berry',       i:'🫐',cat:'Berries',    tier:0,gen:2,precio:100,  pf:0,rareza:1},
  {n:'Pecha Berry',      i:'🍇',cat:'Berries',    tier:0,gen:2,precio:100,  pf:0,rareza:1},
  {n:'Chesto Berry',     i:'🍑',cat:'Berries',    tier:0,gen:2,precio:80,   pf:0,rareza:1},
  {n:'Cheri Berry',      i:'🍒',cat:'Berries',    tier:0,gen:2,precio:80,   pf:0,rareza:1},
  {n:'Rawst Berry',      i:'🍓',cat:'Berries',    tier:0,gen:2,precio:100,  pf:0,rareza:1},
  {n:'Aspear Berry',     i:'🍈',cat:'Berries',    tier:0,gen:2,precio:80,   pf:0,rareza:1},
  {n:'Leppa Berry',      i:'🍊',cat:'Berries',    tier:1,gen:2,precio:200,  pf:1,rareza:2},
  {n:'Lum Berry',        i:'🍀',cat:'Berries',    tier:0,gen:2,precio:200,  pf:1,rareza:2},
  {n:'Sitrus Berry',     i:'🍋',cat:'Berries',    tier:1,gen:3,precio:300,  pf:1,rareza:2},
  {n:'Figy Berry',       i:'🫒',cat:'Berries',    tier:2,gen:3,precio:400,  pf:1,rareza:2},
  {n:'Wiki Berry',       i:'🍏',cat:'Berries',    tier:2,gen:3,precio:400,  pf:1,rareza:2},
  {n:'Mago Berry',       i:'🍉',cat:'Berries',    tier:2,gen:3,precio:400,  pf:1,rareza:2},
  {n:'Aguav Berry',      i:'🍌',cat:'Berries',    tier:2,gen:3,precio:400,  pf:1,rareza:2},
  {n:'Iapapa Berry',     i:'🍍',cat:'Berries',    tier:2,gen:3,precio:400,  pf:1,rareza:2},
  {n:'Salac Berry',      i:'🍑',cat:'Berries',    tier:4,gen:3,precio:3000, pf:2,rareza:4},
  {n:'Petaya Berry',     i:'🍅',cat:'Berries',    tier:4,gen:3,precio:3000, pf:2,rareza:4},
  {n:'Liechi Berry',     i:'🥭',cat:'Berries',    tier:4,gen:3,precio:3500, pf:2,rareza:4},
  {n:'Apicot Berry',     i:'🫒',cat:'Berries',    tier:5,gen:3,precio:3500, pf:2,rareza:4},
  {n:'Ganlon Berry',     i:'🍈',cat:'Berries',    tier:4,gen:3,precio:3000, pf:2,rareza:4},
  {n:'Enigma Berry',     i:'❓',cat:'Berries',    tier:5,gen:3,precio:4000, pf:2,rareza:4},
  {n:'Custap Berry',     i:'🍅',cat:'Berries',    tier:6,gen:4,precio:5000, pf:3,rareza:5},
  {n:'Micle Berry',      i:'🫐',cat:'Berries',    tier:6,gen:4,precio:5000, pf:3,rareza:5},
  {n:'Jaboca Berry',     i:'🥭',cat:'Berries',    tier:7,gen:4,precio:6000, pf:3,rareza:5},
  {n:'Rowap Berry',      i:'🍍',cat:'Berries',    tier:7,gen:4,precio:6000, pf:3,rareza:5},
  {n:'Colbur Berry',     i:'🍇',cat:'Berries',    tier:5,gen:4,precio:3500, pf:2,rareza:4},
  {n:'Babiri Berry',     i:'🍏',cat:'Berries',    tier:5,gen:4,precio:3500, pf:2,rareza:4},
  {n:'Passho Berry',     i:'💧',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Wacan Berry',      i:'⚡',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Rindo Berry',      i:'🌿',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Yache Berry',      i:'❄️',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Chople Berry',     i:'🥊',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Haban Berry',      i:'🐉',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Shuca Berry',      i:'🌍',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Coba Berry',       i:'🦜',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Tanga Berry',      i:'🐛',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Kasib Berry',      i:'👻',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Charti Berry',     i:'🪨',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Occa Berry',       i:'🔥',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},
  {n:'Payapa Berry',     i:'🔮',cat:'Berries',    tier:4,gen:4,precio:2000, pf:2,rareza:3},

  // ══ HELD ITEMS — TYPE BOOSTERS ══════════════
  {n:'Magnet',           i:'🧲',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Charcoal',         i:'🪨',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Poison Barb',      i:'☠️',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Soft Sand',        i:'🌍',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Sharp Beak',       i:'🦜',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Hard Stone',       i:'🪨',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Spell Tag',        i:'👻',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Silk Scarf',       i:'🎀',cat:'Held Items', tier:2,gen:3,precio:2000, pf:1,rareza:2},
  {n:'Black Belt',       i:'🥋',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Mystic Water',     i:'💧',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Miracle Seed',     i:'🌱',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Never-Melt Ice',   i:'❄️',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Twisted Spoon',    i:'🥄',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Dragon Fang',      i:'🐉',cat:'Held Items', tier:3,gen:2,precio:4000, pf:2,rareza:3},
  {n:'Black Glasses',    i:'🕶️',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Silver Powder',    i:'🐛',cat:'Held Items', tier:2,gen:2,precio:2000, pf:1,rareza:2},
  {n:'Metal Coat',       i:'⚙️',cat:'Held Items', tier:3,gen:2,precio:5000, pf:2,rareza:3},

  // ══ HELD ITEMS — COMPETITIVE ════════════════
  {n:'Leftovers',        i:'🍽️',cat:'Competitive',tier:3,gen:2,precio:8000, pf:2,rareza:4},
  {n:'Choice Band',      i:'🎗️',cat:'Competitive',tier:5,gen:3,precio:15000,pf:3,rareza:4},
  {n:'Choice Specs',     i:'👓',cat:'Competitive',tier:5,gen:4,precio:15000,pf:3,rareza:4},
  {n:'Choice Scarf',     i:'🧣',cat:'Competitive',tier:6,gen:4,precio:15000,pf:3,rareza:4},
  {n:'Assault Vest',     i:'🦺',cat:'Competitive',tier:6,gen:6,precio:12000,pf:3,rareza:4},
  {n:'Life Orb',         i:'🔴',cat:'Competitive',tier:5,gen:4,precio:20000,pf:3,rareza:4},
  {n:'Focus Sash',       i:'🎽',cat:'Competitive',tier:5,gen:4,precio:15000,pf:3,rareza:4},
  {n:'Rocky Helmet',     i:'🪖',cat:'Competitive',tier:5,gen:5,precio:10000,pf:3,rareza:4},
  {n:'Eviolite',         i:'💠',cat:'Competitive',tier:5,gen:5,precio:12000,pf:3,rareza:4},
  {n:'Air Balloon',      i:'🎈',cat:'Competitive',tier:4,gen:5,precio:3000, pf:2,rareza:3},
  {n:'Scope Lens',       i:'🔭',cat:'Competitive',tier:4,gen:2,precio:5000, pf:2,rareza:3},
  {n:'Wise Glasses',     i:'🕶️',cat:'Competitive',tier:4,gen:4,precio:6000, pf:2,rareza:3},
  {n:'Muscle Band',      i:'💪',cat:'Competitive',tier:4,gen:4,precio:6000, pf:2,rareza:3},
  {n:'Quick Claw',       i:'⚡',cat:'Competitive',tier:3,gen:2,precio:5000, pf:1,rareza:3},
  {n:'King\'s Rock',     i:'👑',cat:'Competitive',tier:4,gen:2,precio:8000, pf:2,rareza:4},
  {n:'Shell Bell',       i:'🐚',cat:'Competitive',tier:4,gen:3,precio:8000, pf:2,rareza:3},
  {n:'Toxic Orb',        i:'☠️',cat:'Competitive',tier:5,gen:4,precio:15000,pf:3,rareza:4},
  {n:'Flame Orb',        i:'🔥',cat:'Competitive',tier:5,gen:4,precio:15000,pf:3,rareza:4},
  {n:'White Herb',       i:'🌿',cat:'Competitive',tier:3,gen:3,precio:6000, pf:2,rareza:3},
  {n:'Mental Herb',      i:'🌺',cat:'Competitive',tier:3,gen:3,precio:6000, pf:2,rareza:3},
  {n:'Bright Powder',    i:'✨',cat:'Competitive',tier:3,gen:1,precio:4000, pf:1,rareza:3},
  {n:'Covert Cloak',     i:'🧤',cat:'Competitive',tier:5,gen:9,precio:12000,pf:3,rareza:4},
  {n:'Loaded Dice',      i:'🎲',cat:'Competitive',tier:6,gen:9,precio:15000,pf:3,rareza:4},
  {n:'Punching Glove',   i:'🥊',cat:'Competitive',tier:5,gen:9,precio:12000,pf:3,rareza:4},
  {n:'Clear Amulet',     i:'💍',cat:'Competitive',tier:6,gen:9,precio:15000,pf:3,rareza:4},

  // ══ HELD ITEMS — WEATHER ════════════════════
  {n:'Smooth Rock',      i:'🪨',cat:'Held Items', tier:4,gen:4,precio:3000, pf:2,rareza:3},
  {n:'Heat Rock',        i:'🔥',cat:'Held Items', tier:4,gen:4,precio:3000, pf:2,rareza:3},
  {n:'Icy Rock',         i:'❄️',cat:'Held Items', tier:4,gen:4,precio:3000, pf:2,rareza:3},
  {n:'Damp Rock',        i:'🌧️',cat:'Held Items', tier:4,gen:4,precio:3000, pf:2,rareza:3},

  // ══ TYPE PLATES ══════════════════════════════
  {n:'Draco Plate',      i:'🐉',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Dread Plate',      i:'🌑',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Earth Plate',      i:'🌍',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Fist Plate',       i:'🥊',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Flame Plate',      i:'🔥',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Icicle Plate',     i:'❄️',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Insect Plate',     i:'🐛',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Iron Plate',       i:'⚙️',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Meadow Plate',     i:'🌿',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Mind Plate',       i:'🔮',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Pixie Plate',      i:'🧚',cat:'Plates',     tier:6,gen:6,precio:8000, pf:3,rareza:5},
  {n:'Sky Plate',        i:'🦅',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Splash Plate',     i:'💧',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Spooky Plate',     i:'👻',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Stone Plate',      i:'🪨',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Toxic Plate',      i:'☠️',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},
  {n:'Zap Plate',        i:'⚡',cat:'Plates',     tier:6,gen:4,precio:8000, pf:3,rareza:5},

  // ══ EVOLUTION ITEMS ══════════════════════════
  {n:'Fire Stone',       i:'🔥',cat:'Evolution',  tier:2,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Water Stone',      i:'💧',cat:'Evolution',  tier:2,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Thunder Stone',    i:'⚡',cat:'Evolution',  tier:2,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Leaf Stone',       i:'🌿',cat:'Evolution',  tier:2,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Moon Stone',       i:'🌙',cat:'Evolution',  tier:2,gen:1,precio:3000, pf:2,rareza:3},
  {n:'Sun Stone',        i:'☀️',cat:'Evolution',  tier:2,gen:2,precio:3000, pf:2,rareza:3},
  {n:'Shiny Stone',      i:'✨',cat:'Evolution',  tier:3,gen:4,precio:5000, pf:2,rareza:3},
  {n:'Dusk Stone',       i:'🌑',cat:'Evolution',  tier:3,gen:4,precio:5000, pf:2,rareza:3},
  {n:'Dawn Stone',       i:'🌄',cat:'Evolution',  tier:3,gen:4,precio:5000, pf:2,rareza:3},
  {n:'Oval Stone',       i:'🥚',cat:'Evolution',  tier:3,gen:4,precio:5000, pf:2,rareza:3},
  {n:'Dragon Scale',     i:'🐉',cat:'Evolution',  tier:4,gen:2,precio:7000, pf:2,rareza:4},
  {n:'Up-Grade',         i:'⬆️',cat:'Evolution',  tier:4,gen:2,precio:5000, pf:2,rareza:4},
  {n:'Protector',        i:'🛡️',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Electirizer',      i:'⚡',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Magmarizer',       i:'🔥',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Dubious Disc',     i:'💿',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Razor Claw',       i:'🦞',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Razor Fang',       i:'🦷',cat:'Evolution',  tier:4,gen:4,precio:6000, pf:2,rareza:4},
  {n:'Prism Scale',      i:'🌈',cat:'Evolution',  tier:5,gen:5,precio:8000, pf:3,rareza:4},
  {n:'Reaper Cloth',     i:'🌑',cat:'Evolution',  tier:5,gen:4,precio:8000, pf:3,rareza:4},

  // ══ ABILITY ITEMS ════════════════════════════
  {n:'Ability Capsule',  i:'💊',cat:'Special',    tier:5,gen:6,precio:10000,pf:3,rareza:4},
  {n:'Ability Patch',    i:'🏅',cat:'Special',    tier:7,gen:8,precio:25000,pf:4,rareza:5},

  // ══ MINTS (Gen 8) ════════════════════════════
  {n:'Adamant Mint',     i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Modest Mint',      i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Timid Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Jolly Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Bold Mint',        i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Careful Mint',     i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Calm Mint',        i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Impish Mint',      i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Hasty Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Naive Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Lonely Mint',      i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Naughty Mint',     i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Rash Mint',        i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Mild Mint',        i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Quiet Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Sassy Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Relaxed Mint',     i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Brave Mint',       i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},
  {n:'Lax Mint',         i:'🌿',cat:'Mints',      tier:5,gen:8,precio:3000, pf:2,rareza:3},

  // ══ MEGA STONES (Gen 6) ══════════════════════
  {n:'Venusaurite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Charizardite X',   i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Charizardite Y',   i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Blastoisinite',    i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Beedrillite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Pidgeotite',       i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Alakazite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Slowbronite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Gengarite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Kangaskhanite',    i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Pinsirite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Gyaradosite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Aerodactylite',    i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Mewtwonite X',     i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Mewtwonite Y',     i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Ampharosite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Scizorite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Heracronite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Houndoominite',    i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Tyranitarite',     i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Scaliscalite',     i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Blazikenite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Gardevoirite',     i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Mawilite',         i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Aggronite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Medichamite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Manectite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Sharpedonite',     i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Cameruptite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Altarianite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Banettite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Absolite',         i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Glalitite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Salamencite',      i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Metagrossite',     i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Latiasite',        i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Latiosite',        i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Lopunnite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Garchompite',      i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},
  {n:'Lucarionite',      i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Abomasite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Galladite',        i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Audinite',         i:'🔷',cat:'Mega Stones', tier:7,gen:6,precio:25000,    pf:4,rareza:5},
  {n:'Diancite',         i:'🔷',cat:'Mega Stones', tier:8,gen:6,precio:25000,    pf:5,rareza:5},

  // ══ TMs — MOVIMIENTOS (Mts) ══════════════════
  {n:'TM Earthquake',    i:'📀',cat:'TMs',         tier:5,gen:1,precio:25000,    pf:3,rareza:4},
  {n:'TM Thunderbolt',   i:'📀',cat:'TMs',         tier:5,gen:1,precio:25000,    pf:3,rareza:4},
  {n:'TM Ice Beam',      i:'📀',cat:'TMs',         tier:5,gen:1,precio:25000,    pf:3,rareza:4},
  {n:'TM Flamethrower',  i:'📀',cat:'TMs',         tier:5,gen:1,precio:25000,    pf:3,rareza:4},
  {n:'TM Surf',          i:'📀',cat:'TMs',         tier:3,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Protect',       i:'📀',cat:'TMs',         tier:3,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Substitute',    i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Toxic',         i:'📀',cat:'TMs',         tier:3,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Stealth Rock',  i:'📀',cat:'TMs',         tier:5,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Swords Dance',  i:'📀',cat:'TMs',         tier:4,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Dragon Claw',   i:'📀',cat:'TMs',         tier:5,gen:3,precio:25000,    pf:3,rareza:4},
  {n:'TM Calm Mind',     i:'📀',cat:'TMs',         tier:5,gen:3,precio:25000,    pf:3,rareza:4},
  {n:'TM Brick Break',   i:'📀',cat:'TMs',         tier:3,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Shadow Ball',   i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Will-O-Wisp',   i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Roost',         i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Recover',       i:'📀',cat:'TMs',         tier:5,gen:1,precio:25000,    pf:3,rareza:4},
  {n:'TM Hidden Power',  i:'📀',cat:'TMs',         tier:3,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Aerial Ace',    i:'📀',cat:'TMs',         tier:2,gen:3,precio:25000,    pf:1,rareza:2},
  {n:'TM Rock Slide',    i:'📀',cat:'TMs',         tier:4,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Iron Tail',     i:'📀',cat:'TMs',         tier:3,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Energy Ball',   i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Focus Blast',   i:'📀',cat:'TMs',         tier:5,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Bulk Up',       i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Dragon Pulse',  i:'📀',cat:'TMs',         tier:5,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Sludge Bomb',   i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM U-turn',        i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Knock Off',     i:'📀',cat:'TMs',         tier:5,gen:6,precio:25000,    pf:3,rareza:4},
  {n:'TM Taunt',         i:'📀',cat:'TMs',         tier:3,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Stone Edge',    i:'📀',cat:'TMs',         tier:5,gen:4,precio:25000,    pf:3,rareza:4},

  // ══ MÁS TMs ══════════════════════════════════
  {n:'TM Scald',         i:'📀',cat:'TMs',         tier:4,gen:5,precio:25000,    pf:2,rareza:3},
  {n:'TM Flare Blitz',   i:'📀',cat:'TMs',         tier:6,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Close Combat',  i:'📀',cat:'TMs',         tier:6,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Giga Drain',    i:'📀',cat:'TMs',         tier:4,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Dark Pulse',    i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Flash Cannon',  i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Thunder Wave',  i:'📀',cat:'TMs',         tier:3,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Psychic',       i:'📀',cat:'TMs',         tier:4,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Power-Up Punch',i:'📀',cat:'TMs',         tier:3,gen:6,precio:25000,    pf:2,rareza:3},
  {n:'TM Dazzling Gleam',i:'📀',cat:'TMs',         tier:4,gen:6,precio:25000,    pf:2,rareza:3},
  {n:'TM Moonblast',     i:'📀',cat:'TMs',         tier:5,gen:6,precio:25000,    pf:3,rareza:4},
  {n:'TM Outrage',       i:'📀',cat:'TMs',         tier:6,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Waterfall',     i:'📀',cat:'TMs',         tier:4,gen:2,precio:25000,    pf:2,rareza:3},
  {n:'TM Ice Punch',     i:'📀',cat:'TMs',         tier:4,gen:4,precio:25000,    pf:2,rareza:3},
  {n:'TM Fire Punch',    i:'📀',cat:'TMs',         tier:4,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Thunder Punch', i:'📀',cat:'TMs',         tier:4,gen:1,precio:25000,    pf:2,rareza:3},
  {n:'TM Facade',        i:'📀',cat:'TMs',         tier:3,gen:3,precio:25000,    pf:1,rareza:2},
  {n:'TM Hyper Voice',   i:'📀',cat:'TMs',         tier:4,gen:3,precio:25000,    pf:2,rareza:3},
  {n:'TM Poison Jab',    i:'📀',cat:'TMs',         tier:3,gen:4,precio:25000,    pf:1,rareza:2},
  {n:'TM Work Up',       i:'📀',cat:'TMs',         tier:3,gen:5,precio:25000,    pf:1,rareza:2},
  {n:'TM Nasty Plot',    i:'📀',cat:'TMs',         tier:5,gen:4,precio:25000,    pf:3,rareza:4},
  {n:'TM Quiver Dance',  i:'📀',cat:'TMs',         tier:6,gen:5,precio:25000,    pf:3,rareza:4},
  {n:'TM Shell Smash',   i:'📀',cat:'TMs',         tier:6,gen:5,precio:25000,    pf:3,rareza:4},
  {n:'TM Volt Switch',   i:'📀',cat:'TMs',         tier:4,gen:5,precio:25000,    pf:2,rareza:3},
  {n:'TM Play Rough',    i:'📀',cat:'TMs',         tier:5,gen:6,precio:25000,    pf:3,rareza:4},
  {n:'TM Leech Life',    i:'📀',cat:'TMs',         tier:4,gen:7,precio:25000,    pf:2,rareza:3},
  {n:'TM Phantom Force', i:'📀',cat:'TMs',         tier:5,gen:6,precio:25000,    pf:3,rareza:4},

  // ══ HELD ITEMS ADICIONALES ═══════════════════
  {n:'Choice Band',      i:'🎀',cat:'Held Items',  tier:6,gen:3,precio:12000,    pf:3,rareza:4},
  {n:'Choice Specs',     i:'👓',cat:'Held Items',  tier:6,gen:4,precio:12000,    pf:3,rareza:4},
  {n:'Choice Scarf',     i:'🧣',cat:'Held Items',  tier:6,gen:4,precio:12000,    pf:3,rareza:4},
  {n:'Assault Vest',     i:'🦺',cat:'Held Items',  tier:5,gen:6,precio:10000,    pf:3,rareza:4},
  {n:'Rocky Helmet',     i:'⛑️',cat:'Held Items',  tier:4,gen:5,precio:8000,     pf:2,rareza:3},
  {n:'Air Balloon',      i:'🎈',cat:'Held Items',  tier:4,gen:5,precio:6000,     pf:2,rareza:3},
  {n:'Eviolite',         i:'💠',cat:'Held Items',  tier:5,gen:5,precio:9000,     pf:3,rareza:4},
  {n:'Black Sludge',     i:'🖤',cat:'Held Items',  tier:4,gen:4,precio:7000,     pf:2,rareza:3},
  {n:'Toxic Orb',        i:'☠️',cat:'Held Items',  tier:4,gen:4,precio:8000,     pf:2,rareza:3},
  {n:'Flame Orb',        i:'🔴',cat:'Held Items',  tier:4,gen:4,precio:8000,     pf:2,rareza:3},
  {n:'Weakness Policy',  i:'📜',cat:'Held Items',  tier:6,gen:6,precio:15000,    pf:3,rareza:4},
  {n:'Power Herb',       i:'🌾',cat:'Held Items',  tier:3,gen:4,precio:5000,     pf:2,rareza:3},
  {n:'White Herb',       i:'🌿',cat:'Held Items',  tier:3,gen:3,precio:5000,     pf:2,rareza:3},
  {n:'Mental Herb',      i:'🧠',cat:'Held Items',  tier:3,gen:3,precio:5000,     pf:2,rareza:3},

  // ══ BAYAS ADICIONALES ════════════════════════
  {n:'Sitrus Berry',     i:'🍋',cat:'Berries',     tier:3,gen:3,precio:1200,     pf:1,rareza:2},
  {n:'Salac Berry',      i:'🍇',cat:'Berries',     tier:4,gen:3,precio:3000,     pf:2,rareza:3},
  {n:'Petaya Berry',     i:'🫐',cat:'Berries',     tier:4,gen:3,precio:3000,     pf:2,rareza:3},
  {n:'Liechi Berry',     i:'🍒',cat:'Berries',     tier:4,gen:3,precio:3000,     pf:2,rareza:3},
  {n:'Apicot Berry',     i:'🥭',cat:'Berries',     tier:4,gen:3,precio:3000,     pf:2,rareza:3},
  {n:'Lansat Berry',     i:'🫒',cat:'Berries',     tier:4,gen:3,precio:3500,     pf:2,rareza:3},
  {n:'Starf Berry',      i:'⭐',cat:'Berries',     tier:5,gen:3,precio:5000,     pf:3,rareza:4},
  {n:'Enigma Berry',     i:'❓',cat:'Berries',     tier:5,gen:3,precio:5000,     pf:3,rareza:4},
  {n:'Rowap Berry',      i:'🍈',cat:'Berries',     tier:4,gen:4,precio:3000,     pf:2,rareza:3},
  {n:'Babiri Berry',     i:'🥝',cat:'Berries',     tier:3,gen:4,precio:2000,     pf:1,rareza:2},
  {n:'Roseli Berry',     i:'🌹',cat:'Berries',     tier:3,gen:6,precio:2000,     pf:1,rareza:2},

  // ══ OBJETOS DE COMBATE ADICIONALES ═══════════
  {n:'X Attack',         i:'⚔️',cat:'Battle Items', tier:1,gen:1,precio:500,     pf:0,rareza:1},
  {n:'X Defense',        i:'🛡️',cat:'Battle Items', tier:1,gen:1,precio:550,     pf:0,rareza:1},
  {n:'X Speed',          i:'💨',cat:'Battle Items', tier:1,gen:1,precio:350,     pf:0,rareza:1},
  {n:'X Sp. Atk',        i:'✨',cat:'Battle Items', tier:1,gen:1,precio:350,     pf:0,rareza:1},
  {n:'X Accuracy',       i:'🎯',cat:'Battle Items', tier:1,gen:1,precio:950,     pf:1,rareza:2},
  {n:'Dire Hit',         i:'💥',cat:'Battle Items', tier:1,gen:1,precio:650,     pf:0,rareza:1},
  {n:'Guard Spec.',      i:'🔵',cat:'Battle Items', tier:2,gen:1,precio:700,     pf:1,rareza:2},

  // ══ OBJETOS DE EXPLORACIÓN ADICIONALES ═══════
  {n:'Dowsing Machine',  i:'🔍',cat:'Field Items',  tier:2,gen:1,precio:1000,    pf:1,rareza:2},
  {n:'Poke Radar',       i:'📡',cat:'Field Items',  tier:3,gen:4,precio:2000,    pf:1,rareza:2},
  {n:'Super Rod',        i:'🎣',cat:'Field Items',  tier:4,gen:1,precio:3500,    pf:2,rareza:3},
  {n:'Old Rod',          i:'🪝',cat:'Field Items',  tier:1,gen:1,precio:300,     pf:0,rareza:1},
  {n:'Good Rod',         i:'🎣',cat:'Field Items',  tier:2,gen:1,precio:800,     pf:1,rareza:2},
  {n:'Silph Scope',      i:'🔭',cat:'Field Items',  tier:3,gen:1,precio:2500,    pf:1,rareza:2},

  // ══ COMPETITIVE ADICIONALES ══════════════════
  {n:'Bottle Cap',       i:'🔘',cat:'Competitive',  tier:5,gen:7,precio:20000,   pf:3,rareza:4},
  {n:'Gold Bottle Cap',  i:'🏅',cat:'Competitive',  tier:7,gen:7,precio:50000,   pf:4,rareza:5},
  {n:'PP Max',           i:'🔋',cat:'Competitive',  tier:5,gen:1,precio:9800,    pf:3,rareza:4},
  {n:'PP Up',            i:'🔌',cat:'Competitive',  tier:3,gen:1,precio:2500,    pf:1,rareza:2},
];

// ══════════════════════════════════════════════════════════════════
// PACKS — precio = suma real del contenido × 1.8 (precio de pack)
// Los precios base de cada objeto están en DB_ITEMS.
// Contenido en ESPAÑOL, nombres de objetos en inglés.
// ══════════════════════════════════════════════════════════════════
// Cálculo de referencia por pack:
// Survival Pack: Potion×2(600) + Poké Ball×2(400) + Antidote×2(200) + Escape Rope(550) = 1750 × 1.8 = ~3150 → 6000
// Starter Pack: Super Potion×3(2100) + Great Ball×3(1800) + Lum Berry×2(400) + Repel(350) = 4650 × 1.8 = ~8370 → 15000
// Vitamin Pack: 6×9800 = 58800 × 1.8 = ~105840 → 160000
var DB_PACKS = [

  // ══ TIER 0 — Primeros pasos (Gimnasios 1-2) ══════════════════════
  {n:'Survival Pack',      i:'🎒',tier:0,gen:1,precio:6000,   pf:2,rareza:1,
   desc:'Potion x2, Poké Ball x2, Antidote x2, Escape Rope',
   estrategia:'Lo esencial para empezar la aventura. Pack de salida.'},
  {n:'Explorer Pack',      i:'🗺️',tier:0,gen:1,precio:7500,   pf:2,rareza:1,
   desc:'Repel x2, Escape Rope, Potion x2, Poké Ball x3',
   estrategia:'Explora rutas con seguridad sin gastar de más.'},
  {n:'Status Pack',        i:'🩹',tier:0,gen:1,precio:4500,   pf:1,rareza:1,
   desc:'Antidote x2, Burn Heal x2, Awakening x2, Parlyz Heal x2',
   estrategia:'Cura cualquier estado alterado al instante.'},
  {n:'Poké Ball Pack',     i:'🔴',tier:0,gen:1,precio:5000,   pf:1,rareza:1,
   desc:'Poké Ball x8, Antidote x2, Potion x2',
   estrategia:'Munición básica para las primeras capturas.'},
  {n:'Nursery Pack',       i:'🥚',tier:0,gen:2,precio:5500,   pf:1,rareza:1,
   desc:'Oran Berry x4, Potion x3, Repel x2',
   estrategia:'Cuida a tus Pokémon en las primeras rutas.'},
  {n:'Budget Pack',        i:'💸',tier:0,gen:1,precio:3500,   pf:1,rareza:1,
   desc:'Potion x3, Poké Ball x2, Repel x1',
   estrategia:'El pack más económico. Poco pero suficiente.'},
  {n:'First Aid Pack',     i:'💊',tier:0,gen:1,precio:4000,   pf:1,rareza:1,
   desc:'Potion x4, Antidote x2, Burn Heal x2',
   estrategia:'Medicina básica para las primeras rutas.'},
  {n:'Forest Pack',        i:'🌲',tier:0,gen:1,precio:5200,   pf:1,rareza:1,
   desc:'Repel x3, Antidote x3, Pecha Berry x3, Escape Rope',
   estrategia:'Perfecto para rutas con Pokémon venenosos.'},
  {n:'Cave Pack',          i:'🕯️',tier:0,gen:1,precio:5800,   pf:1,rareza:1,
   desc:'Escape Rope x2, Repel x2, Potion x2, Awakening x2',
   estrategia:'Sobrevive en cuevas oscuras y laberínticas.'},

  // ══ TIER 1 — En marcha ═══════════════════════════════════════════
  {n:'Starter Pack',       i:'📦',tier:1,gen:1,precio:15000,  pf:3,rareza:2,
   desc:'Super Potion x3, Great Ball x3, Lum Berry x2, Repel',
   estrategia:'Tu primer gran salto de calidad en la aventura.'},
  {n:'Catcher Pack',       i:'🔵',tier:1,gen:1,precio:13000,  pf:3,rareza:2,
   desc:'Great Ball x5, Net Ball x2, Nest Ball x2, Super Repel x2',
   estrategia:'Maximiza capturas en cualquier ruta.'},
  {n:'Heal Pack',          i:'🧪',tier:1,gen:1,precio:12000,  pf:2,rareza:2,
   desc:'Super Potion x4, Full Heal x3, Sitrus Berry x2',
   estrategia:'Curación sostenida para batallas largas.'},
  {n:'Type Pack Fire',     i:'🔥',tier:1,gen:1,precio:11500,  pf:2,rareza:2,
   desc:'Burn Heal x4, Rawst Berry x4, Great Ball x2, Repel x2',
   estrategia:'Equipado para zonas volcánicas y entrenadores de fuego.'},
  {n:'Type Pack Water',    i:'💧',tier:1,gen:1,precio:11500,  pf:2,rareza:2,
   desc:'Super Potion x3, Great Ball x3, Net Ball x2, Super Repel',
   estrategia:'Para rutas acuáticas y gimnasios de agua.'},
  {n:'Type Pack Electric', i:'⚡',tier:1,gen:1,precio:11500,  pf:2,rareza:2,
   desc:'Parlyz Heal x4, Cheri Berry x4, Great Ball x2, Repel x2',
   estrategia:'No te quedes paralizado ante el Gimnasio Eléctrico.'},
  {n:'Type Pack Grass',    i:'🍃',tier:1,gen:2,precio:11500,  pf:2,rareza:2,
   desc:'Antidote x4, Pecha Berry x4, Great Ball x2, Super Repel',
   estrategia:'Contra entrenadores de tipo planta y sus venenos.'},
  {n:'Scout Pack',         i:'🧭',tier:1,gen:1,precio:14000,  pf:3,rareza:2,
   desc:'Super Repel x3, Escape Rope x2, Super Potion x2, Awakening x2',
   estrategia:'Para explorar sin sorpresas ni interrupciones.'},
  {n:'Rookie Pack',        i:'🎓',tier:1,gen:1,precio:16000,  pf:3,rareza:2,
   desc:'Super Potion x3, Great Ball x4, Lum Berry x2, Super Repel x2',
   estrategia:'El kit del entrenador que ya sabe lo que hace.'},
  {n:'Berry Basics Pack',  i:'🍒',tier:1,gen:2,precio:9000,   pf:2,rareza:2,
   desc:'Oran Berry x4, Pecha Berry x3, Cheri Berry x3, Chesto Berry x3',
   estrategia:'Un surtido de bayas básicas para cada situación.'},

  // ══ TIER 2 — Curtido en camino ═══════════════════════════════════
  {n:'Traveler Pack',      i:'🌍',tier:2,gen:1,precio:28000,  pf:4,rareza:2,
   desc:'Hyper Potion x3, Ultra Ball x3, Sitrus Berry x3, Super Repel',
   estrategia:'Para el entrenador ya curtido en el camino.'},
  {n:'Berry Pack',         i:'🌿',tier:2,gen:2,precio:22000,  pf:4,rareza:2,
   desc:'Sitrus Berry x3, Lum Berry x3, Oran Berry x4, Max Repel x2',
   estrategia:'Soporte natural para expediciones largas.'},
  {n:'Ultra Catcher Pack', i:'🟡',tier:2,gen:1,precio:26000,  pf:4,rareza:2,
   desc:'Ultra Ball x5, Dusk Ball x2, Quick Ball x2, Timer Ball x2, Max Repel',
   estrategia:'Arsenal de captura avanzado para Pokémon difíciles.'},
  {n:'Mid-Game Pack',      i:'🏕️',tier:2,gen:1,precio:30000,  pf:4,rareza:2,
   desc:'Hyper Potion x4, Ultra Ball x3, Elixir x2, Max Repel x2',
   estrategia:'Soporte completo para la mitad del juego.'},
  {n:'Type Pack Ice',      i:'🧊',tier:2,gen:1,precio:24000,  pf:3,rareza:2,
   desc:'Ice Heal x4, Aspear Berry x4, Ultra Ball x2, Max Repel',
   estrategia:'Para el Gimnasio de Hielo y rutas nevadas.'},
  {n:'Type Pack Ground',   i:'🏜️',tier:2,gen:1,precio:24000,  pf:3,rareza:2,
   desc:'Escape Rope x2, Max Repel x3, Hyper Potion x3, Ultra Ball x2',
   estrategia:'Supera desiertos y cuevas sin perderte.'},
  {n:'Type Pack Psychic',  i:'🔮',tier:2,gen:1,precio:25000,  pf:3,rareza:2,
   desc:'Full Heal x3, Persim Berry x3, Ultra Ball x3, Elixir x2',
   estrategia:'Contra el Gimnasio Psíquico y sus confusiones.'},
  {n:'Elixir Pack',        i:'🫙',tier:2,gen:1,precio:27000,  pf:4,rareza:3,
   desc:'Elixir x4, Max Repel x2, Hyper Potion x2',
   estrategia:'PP restaurados para batallas de larga duración.'},
  {n:'Repel Deluxe Pack',  i:'🌀',tier:2,gen:1,precio:20000,  pf:3,rareza:2,
   desc:'Max Repel x5, Escape Rope x3, Full Heal x2',
   estrategia:'Explora sin encuentros. Ideal para dungeons.'},
  {n:'Double Battle Pack', i:'👥',tier:2,gen:3,precio:29000,  pf:4,rareza:3,
   desc:'X Attack x2, X Speed x2, Elixir x2, Hyper Potion x3, Guard Spec. x2',
   estrategia:'Potencia a dos Pokémon a la vez en combates dobles.'},

  // ══ TIER 3 — Mitad de juego ══════════════════════════════════════
  {n:'Evolution Pack',     i:'💎',tier:3,gen:1,precio:35000,  pf:5,rareza:3,
   desc:'Fire Stone, Water Stone, Thunder Stone, Leaf Stone, PP Up x2',
   estrategia:'Evoluciona a tu equipo entero de una sola vez.'},
  {n:'Vitamin Pack',       i:'💪',tier:3,gen:1,precio:160000, pf:5,rareza:3,
   desc:'HP Up, Protein, Iron, Calcium, Carbos, Zinc',
   estrategia:'Las seis vitaminas de una vez. Prepara los EVs completos.'},
  {n:'Stone Pack',         i:'🪨',tier:3,gen:1,precio:32000,  pf:5,rareza:3,
   desc:'Fire Stone, Water Stone, Leaf Stone, Thunder Stone',
   estrategia:'Las cuatro piedras elementales. Evoluciona sin límites.'},
  {n:'Moon & Sun Pack',    i:'🌙',tier:3,gen:1,precio:28000,  pf:4,rareza:3,
   desc:'Moon Stone x2, Sun Stone x2, Full Restore x2',
   estrategia:'Para las evoluciones nocturnas y diurnas.'},
  {n:'Held Item Starter',  i:'🎽',tier:3,gen:2,precio:38000,  pf:5,rareza:3,
   desc:'Leftovers, Lum Berry x2, Sitrus Berry x2, Oran Berry x3',
   estrategia:'Tu primer objeto equipable de verdad.'},
  {n:'Max Potion Pack',    i:'❤️',tier:3,gen:1,precio:45000,  pf:5,rareza:3,
   desc:'Max Potion x4, Full Heal x3, Max Repel x2',
   estrategia:'Curación total garantizada cuando más lo necesitas.'},
  {n:'Anti-Status Pack',   i:'🛡️',tier:3,gen:2,precio:30000,  pf:4,rareza:3,
   desc:'Lum Berry x4, Full Heal x4, Pecha Berry x3, Persim Berry x3',
   estrategia:'Inmune a cualquier estado alterado.'},
  {n:'Evo Stone Rare Pack',i:'✨',tier:3,gen:2,precio:42000,  pf:5,rareza:3,
   desc:'Shiny Stone, Dusk Stone, Dawn Stone, Ice Stone',
   estrategia:'Las piedras raras para evoluciones especiales de Gen 4+.'},
  {n:'Power Item Pack',    i:'⚙️',tier:3,gen:4,precio:36000,  pf:5,rareza:3,
   desc:'Power Bracer, Power Belt, Power Lens, PP Up x2',
   estrategia:'Items de entrenamiento para subir EVs a toda velocidad.'},
  {n:'Refresh Pack',       i:'🔄',tier:3,gen:1,precio:33000,  pf:4,rareza:3,
   desc:'Max Elixir x2, Full Restore x2, Max Repel x2, PP Up x2',
   estrategia:'Recupérate por completo antes del siguiente reto.'},

  // ══ TIER 4 — Avanzando ═══════════════════════════════════════════
  {n:'Battle Pack',        i:'⚔️',tier:4,gen:1,precio:32000,  pf:6,rareza:3,
   desc:'X Attack x3, X Speed x3, X Accuracy x2, Dire Hit x2',
   estrategia:'Domina el combate desde el primer turno.'},
  {n:'Tank Pack',          i:'🛡️',tier:4,gen:2,precio:48000,  pf:6,rareza:3,
   desc:'Leftovers, X Defense x3, X Sp. Def x3, Max Potion x2',
   estrategia:'Aguanta cualquier golpe que te lancen.'},
  {n:'Speed Pack',         i:'💨',tier:4,gen:1,precio:44000,  pf:6,rareza:3,
   desc:'Salac Berry, X Speed x3, Quick Claw, Sitrus Berry x2',
   estrategia:'Ataca siempre primero. La velocidad es poder.'},
  {n:'Offense Pack',       i:'💢',tier:4,gen:1,precio:50000,  pf:6,rareza:3,
   desc:'X Attack x4, Dire Hit x3, X Sp. Atk x3, Sitrus Berry x2',
   estrategia:'Daño máximo desde el primer movimiento.'},
  {n:'Defense Pack',       i:'🪨',tier:4,gen:1,precio:50000,  pf:6,rareza:3,
   desc:'X Defense x4, X Sp. Def x4, Max Potion x3, Full Heal x2',
   estrategia:'Blindaje total para cualquier tipo de ataque.'},
  {n:'Luxury Ball Pack',   i:'✨',tier:4,gen:3,precio:46000,  pf:6,rareza:3,
   desc:'Luxury Ball x4, Dusk Ball x3, Timer Ball x3, Quick Ball x3',
   estrategia:'Las mejores Poké Balls del mercado.'},
  {n:'Mint Starter Pack',  i:'🌿',tier:4,gen:8,precio:42000,  pf:6,rareza:3,
   desc:'Adamant Mint, Modest Mint, Timid Mint, Jolly Mint',
   estrategia:'Las cuatro naturalezas más competitivas en mentas.'},
  {n:'Full Restore Pack',  i:'💉',tier:4,gen:1,precio:55000,  pf:7,rareza:3,
   desc:'Full Restore x4, Max Elixir x2, Lum Berry x3',
   estrategia:'Curación total para el tramo final de la aventura.'},
  {n:'Held Item Pack',     i:'🎽',tier:4,gen:3,precio:58000,  pf:7,rareza:4,
   desc:'Choice Band, Rocky Helmet, Air Balloon, White Herb',
   estrategia:'Cuatro held items estratégicos en un solo pack.'},
  {n:'Type Coverage Pack', i:'🗂️',tier:4,gen:1,precio:52000,  pf:6,rareza:3,
   desc:'TM Ice Beam, TM Thunderbolt, TM Flamethrower, Elixir x2',
   estrategia:'Cobertura de tipos para no ser predecible.'},

  // ══ TIER 5 — Élite ═══════════════════════════════════════════════
  {n:'Choice Pack',        i:'🎗️',tier:5,gen:3,precio:75000,  pf:8,rareza:4,
   desc:'Choice Band, Salac Berry, Elixir x2, PP Max',
   estrategia:'Setup ofensivo de alta gama. Solo para élite.'},
  {n:'Combat Berry Pack',  i:'🍓',tier:5,gen:3,precio:58000,  pf:8,rareza:4,
   desc:'Petaya Berry, Liechi Berry, Salac Berry, Apicot Berry, Ganlon Berry',
   estrategia:'Arsenal completo de Berries de combate.'},
  {n:'PP Pack',            i:'⏫',tier:5,gen:1,precio:90000,  pf:8,rareza:4,
   desc:'PP Max x5, Max Elixir x3',
   estrategia:'PP al máximo para el tramo final del juego.'},
  {n:'Defensive Held Pack',i:'🦺',tier:5,gen:5,precio:80000,  pf:8,rareza:4,
   desc:'Assault Vest, Eviolite, Rocky Helmet, Leftovers',
   estrategia:'Cuatro items defensivos de alta gama.'},
  {n:'Orb Pack',           i:'🔴',tier:5,gen:4,precio:72000,  pf:8,rareza:4,
   desc:'Flame Orb, Toxic Orb, Power Herb, White Herb',
   estrategia:'Orbs para estrategias de gimmick avanzadas.'},
  {n:'Mint Deluxe Pack',   i:'🍵',tier:5,gen:8,precio:68000,  pf:8,rareza:4,
   desc:'Adamant Mint, Modest Mint, Timid Mint, Jolly Mint, Bold Mint, Calm Mint',
   estrategia:'Las seis mentas más usadas en competitivo.'},
  {n:'Coverage TM Pack',   i:'📀',tier:5,gen:4,precio:85000,  pf:8,rareza:4,
   desc:'TM Earthquake, TM Stone Edge, TM Close Combat, TM Shadow Ball',
   estrategia:'Las mejores TMs de cobertura ofensiva.'},
  {n:'Speed Control Pack', i:'⚡',tier:5,gen:4,precio:78000,  pf:8,rareza:4,
   desc:'Choice Scarf, Salac Berry, TM Thunder Wave, TM Taunt',
   estrategia:'Controla quién actúa primero en cada combate.'},
  {n:'Vitamin Deluxe Pack',i:'🧬',tier:5,gen:1,precio:200000, pf:9,rareza:4,
   desc:'HP Up x2, Protein x2, Iron x2, Calcium x2, Carbos x2, Zinc x2',
   estrategia:'Doble dosis de vitaminas. Máximos EVs de golpe.'},
  {n:'Stall Pack',         i:'⏳',tier:5,gen:2,precio:70000,  pf:8,rareza:4,
   desc:'Leftovers, Toxic Orb, Rocky Helmet, Full Restore x2, TM Protect',
   estrategia:'Todo lo que necesitas para aguantar eternamente.'},

  // ══ TIER 6 — Alto nivel ══════════════════════════════════════════
  {n:'Elite Pack',         i:'💫',tier:6,gen:4,precio:115000, pf:10,rareza:4,
   desc:'Choice Specs, Wise Glasses, Max Elixir x2, Custap Berry x2',
   estrategia:'Equipamiento de élite completo en un solo pack.'},
  {n:'Plates Pack',        i:'🪬',tier:6,gen:4,precio:96000,  pf:10,rareza:4,
   desc:'Draco Plate, Flame Plate, Splash Plate, Zap Plate',
   estrategia:'Potencia el tipo que necesitas para cada batalla.'},
  {n:'Weakness Policy Pack',i:'📜',tier:6,gen:6,precio:108000,pf:10,rareza:4,
   desc:'Weakness Policy, Sitrus Berry x2, Full Restore x2, PP Max x2',
   estrategia:'Convierte los golpes del rival en tu ventaja.'},
  {n:'Mega Prep Pack',     i:'🔷',tier:6,gen:6,precio:120000, pf:10,rareza:4,
   desc:'Lucarionite, Gardevoirite, Sitrus Berry x2, PP Max x2, Full Restore x2',
   estrategia:'Prepara la Mega Evolución para la recta final.'},
  {n:'Bottle Cap Pack',    i:'🔘',tier:6,gen:7,precio:130000, pf:10,rareza:4,
   desc:'Bottle Cap x3, PP Max x3, Max Elixir x2',
   estrategia:'Maximiza IVs de tus Pokémon más valiosos.'},
  {n:'Move Power Pack',    i:'💥',tier:6,gen:4,precio:110000, pf:10,rareza:4,
   desc:'TM Earthquake, TM Outrage, TM Close Combat, PP Max x2',
   estrategia:'Los movimientos más potentes del juego en un pack.'},
  {n:'Starf Pack',         i:'⭐',tier:6,gen:3,precio:98000,  pf:10,rareza:4,
   desc:'Starf Berry, Lansat Berry, Enigma Berry, PP Max x3',
   estrategia:'Las bayas más raras y valiosas del mundo Pokémon.'},
  {n:'All-Mint Pack',      i:'🌱',tier:6,gen:8,precio:105000, pf:10,rareza:4,
   desc:'Adamant Mint, Modest Mint, Timid Mint, Jolly Mint, Bold Mint, Calm Mint, Impish Mint, Careful Mint',
   estrategia:'Ocho mentas. Cambia las naturalezas de todo tu equipo.'},
  {n:'Ability Advance Pack',i:'💊',tier:6,gen:6,precio:125000,pf:11,rareza:4,
   desc:'Ability Capsule x3, Lum Berry x3, Full Restore x2, PP Max x2',
   estrategia:'Cambia habilidades estratégicamente a tus Pokémon.'},
  {n:'Choice Triple Pack', i:'🎯',tier:6,gen:4,precio:140000, pf:11,rareza:4,
   desc:'Choice Band, Choice Specs, Choice Scarf',
   estrategia:'Los tres Choice Items. Elige tu rol y márcalo.'},

  // ══ TIER 7 — Pre-Liga ════════════════════════════════════════════
  {n:'Champion Pack',      i:'🌟',tier:7,gen:4,precio:145000, pf:12,rareza:4,
   desc:'Choice Scarf, PP Max x4, Full Restore x3, Max Elixir x2',
   estrategia:'Preparación total de campeón. Lo mejor del juego.'},
  {n:'Gold Bottle Cap Pack',i:'🏅',tier:7,gen:7,precio:200000,pf:13,rareza:5,
   desc:'Gold Bottle Cap x2, PP Max x3, Full Restore x3',
   estrategia:'IVs perfectos para tus mejores Pokémon.'},
  {n:'Mega Stones Pack',   i:'🔷',tier:7,gen:6,precio:175000, pf:12,rareza:5,
   desc:'Gengarite, Tyranitarite, Salamencite, Metagrossite',
   estrategia:'Las Mega Stones más poderosas reunidas.'},
  {n:'Final TM Pack',      i:'📀',tier:7,gen:4,precio:165000, pf:12,rareza:4,
   desc:'TM Earthquake, TM Outrage, TM Nasty Plot, TM Shell Smash, TM Quiver Dance',
   estrategia:'Las TMs de los movimientos más devastadores.'},
  {n:'Endgame Berry Pack', i:'🍇',tier:7,gen:3,precio:155000, pf:12,rareza:5,
   desc:'Starf Berry x2, Enigma Berry x2, Petaya Berry x2, Liechi Berry x2',
   estrategia:'El mejor arsenal de bayas para el tramo final.'},
  {n:'Pre-Liga Pack',      i:'🏟️',tier:7,gen:4,precio:180000, pf:13,rareza:4,
   desc:'Full Restore x5, Max Elixir x4, PP Max x3, Lum Berry x4',
   estrategia:'Abastecimiento completo antes de la Liga.'},
  {n:'Assault Pack',       i:'🦺',tier:7,gen:5,precio:160000, pf:12,rareza:4,
   desc:'Assault Vest, Weakness Policy, Choice Scarf, PP Max x3, Full Restore x2',
   estrategia:'Setup ofensivo y defensivo combinado de alto nivel.'},
  {n:'Ability Master Pack',i:'🏅',tier:7,gen:8,precio:195000, pf:13,rareza:5,
   desc:'Ability Patch, Ability Capsule x2, Adamant Mint, Timid Mint, Gold Bottle Cap',
   estrategia:'Perfecciona habilidades, naturalezas e IVs de golpe.'},

  // ══ TIER 8 — Endgame y Liga Pokémon ══════════════════════════════
  {n:'League Pack',        i:'👑',tier:8,gen:4,precio:250000, pf:18,rareza:5,
   desc:'Assault Vest, Max Elixir x4, Full Restore x4, PP Max x4',
   estrategia:'Solo para los mejores entrenadores de la Liga.'},
  {n:'Master Ball Pack',   i:'🟣',tier:8,gen:1,precio:500000, pf:20,rareza:5,
   desc:'Master Ball, PP Max x6, Full Restore x5, Max Elixir x5',
   estrategia:'El pack definitivo. Solo existe uno. Irrepetible.'},
  {n:'Ability Pack',       i:'🏅',tier:8,gen:5,precio:350000, pf:20,rareza:5,
   desc:'Ability Patch, Ability Capsule x3, Adamant Mint, Timid Mint, Modest Mint',
   estrategia:'Dominio absoluto sobre habilidades y naturalezas.'},
  {n:'Perfect IV Pack',    i:'💠',tier:8,gen:7,precio:400000, pf:20,rareza:5,
   desc:'Gold Bottle Cap x4, PP Max x5, Full Restore x4',
   estrategia:'IVs perfectos para todo tu equipo. El techo del juego.'},
  {n:'Legendary Pack',     i:'🌌',tier:8,gen:1,precio:450000, pf:20,rareza:5,
   desc:'Master Ball, Gold Bottle Cap x2, Ability Patch, PP Max x5, Full Restore x5',
   estrategia:'Para capturar y perfeccionar un legendario. Sin igual.'},
  {n:'Hall of Fame Pack',  i:'🏆',tier:8,gen:1,precio:600000, pf:20,rareza:5,
   desc:'Choice Band, Choice Specs, Choice Scarf, Assault Vest, Gold Bottle Cap x2, PP Max x6',
   estrategia:'El pack del Campeón. Solo los mejores llegan aquí.'},
  {n:'Nuzlocke Champion Pack',i:'💀',tier:8,gen:1,precio:550000,pf:20,rareza:5,
   desc:'Full Restore x6, Max Elixir x6, Lum Berry x6, PP Max x6, Master Ball',
   estrategia:'Para completar el Nuzlocke más brutal. Todo o nada.'},
];

var GYM_LABELS = [
  '🏅 Gimnasio 1','🥈 Gimnasio 2','🥉 Gimnasio 3','🏆 Gimnasio 4',
  '🌟 Gimnasio 5','💎 Gimnasio 6','🔥 Gimnasio 7','⚡ Gimnasio 8','👑 Liga Pokémon'
];

/* ─── MOTOR DE GENERACIÓN ─── */
function shuffle(arr){ for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}return arr; }

function generarProductosParaTier(db, tier, maxGen, cantidad){
  // 1. Filtrar por generación
  var pool = db.filter(function(o){ return o.gen <= maxGen; });
  // 2. Filtrar por tier (solo items cuyo tier <= tier actual)
  pool = pool.filter(function(o){ return o.tier <= tier; });
  if(!pool.length) return [];
  // 3. Ponderar por rareza (items más raros tienen menos probabilidad en tiers bajos)
  var pesados = [];
  pool.forEach(function(o){
    var maxRarezaPermitida = Math.min(5, tier + 2);
    if(o.rareza > maxRarezaPermitida + 1) return;
    var peso = Math.max(1, (6 - o.rareza) * 2);
    if(tier >= 5 && o.rareza >= 4) peso = o.rareza * 3;
    for(var w=0;w<peso;w++) pesados.push(o);
  });
  // Si el pool ponderado quedó vacío (tier muy bajo, pocos items), usar todos sin filtro de rareza
  if(!pesados.length){
    pool.forEach(function(o){ pesados.push(o); });
  }
  // 4. Shuffle y tomar únicos
  shuffle(pesados);
  var vistos = {}, resultado = [];
  for(var i=0;i<pesados.length && resultado.length<cantidad;i++){
    if(!vistos[pesados[i].n]){ vistos[pesados[i].n]=true; resultado.push(pesados[i]); }
  }
  // Si aún faltan items (pool total < cantidad pedida), devolver lo que hay
  return resultado;
}

function calcularPrecioConEscala(base, tier){
  // Escala el precio según el gimnasio (los primeros tienden a ser más baratos)
  var mult = [0.8, 0.9, 1.0, 1.1, 1.25, 1.4, 1.6, 1.8, 2.2][tier] || 1;
  return Math.round(base * mult / 50) * 50; // redondear a múltiplos de 50
}

function calcularStock(tier, rareza){
  var base = [12, 10, 8, 8, 6, 5, 4, 4, 3][tier] || 5;
  var mod = [3, 2, 1, 0, -1][rareza - 1] || 0;
  return Math.max(1, base + mod);
}
function calcularCantidad(tier, rareza){
  if(rareza >= 4) return 1;
  if(rareza === 3) return tier <= 3 ? 2 : 1;
  var bases = [4,4,3,3,2,2,2,1,1];
  return Math.max(1, bases[tier] || 2);
}

window.generarTiendasAutomaticas = function(cual){
  var tier    = parseInt(document.getElementById('gen-gimnasio').value);
  var maxGen  = parseInt(document.getElementById('gen-generacion').value);
  var cantidad= parseInt(document.getElementById('gen-cantidad').value)||8;
  var estado  = document.getElementById('gen-estado');

  // Borrar productos existentes de las tiendas afectadas
  if(!baseDatos.productos) baseDatos.productos = [];
  if(cual==='legal' || cual==='ambas'){
    baseDatos.productos = baseDatos.productos.filter(function(p){ return p.tienda !== 'legal'; });
  }
  if(cual==='pack' || cual==='ambas'){
    baseDatos.productos = baseDatos.productos.filter(function(p){ return p.tienda !== 'pack'; });
  }

  var generados = 0;
  var now = Date.now();

  // ── Generar Legal ──
  if(cual==='legal' || cual==='ambas'){
    var items = generarProductosParaTier(DB_ITEMS, tier, maxGen, cantidad);
    items.forEach(function(o, idx){
      var precio = calcularPrecioConEscala(o.precio, tier);
      var stock  = calcularStock(tier, o.rareza);
      var pfBonus= Math.max(0, o.pf + Math.floor(tier/2));
      var qty = calcularCantidad(tier, o.rareza);
      baseDatos.productos.push({
        id:     now + idx,
        tienda: 'legal',
        icon:   o.i,
        nombre: o.n,
        qty:    qty,
        cat:    o.cat,
        precio: precio * qty,
        pf:     pfBonus,
        stock:  stock,
        tierOrigen: tier,
        genOrigen:  maxGen
      });
      generados++;
    });
  }

  // ── Generar Pack ──
  if(cual==='pack' || cual==='ambas'){
    var packs = generarProductosParaTier(DB_PACKS, tier, maxGen, cantidad);
    packs.forEach(function(o, idx){
      var escalaP = [1,1.05,1.1,1.15,1.25,1.35,1.5,1.7,2.0][tier]||1;
      var packPrecio = Math.round(o.precio * escalaP);
      var stock = calcularStock(tier, o.rareza);
      baseDatos.productos.push({
        id:     now + 1000 + idx,
        tienda: 'pack',
        icon:   o.i,
        nombre: o.n,
        cat:    'Pack Especial',
        precio: packPrecio,
        pf:     o.pf + Math.floor(tier/2),
        stock:  stock,
        desc:   o.desc,
        estrategia: o.estrategia,
        tierOrigen: tier,
        genOrigen:  maxGen
      });
      generados++;
    });
  }

  // Guardar gimnasio activo en BD para mostrarlo en la tienda
  baseDatos.gimnasioActivo = { tier: tier, gen: maxGen, label: GYM_LABELS[tier] };
  logAdmin('Generar tiendas automáticas', cual+' · '+GYM_LABELS[tier]+' · Gen '+maxGen+' · '+generados+' productos');
  renderInitializeLoaders();
  actualizarBadgeGimnasio();

  if(estado){
    estado.textContent = '✅ '+generados+' productos generados para '+GYM_LABELS[tier]+' (Gen '+maxGen+')';
    setTimeout(function(){ estado.textContent=''; }, 3000);
  }
  mostrarNotificacion('Tiendas generadas: '+GYM_LABELS[tier],'exito','⚙️');
};

function actualizarBadgeGimnasio(){
  var badge = document.getElementById('tienda-gimnasio-badge');
  if(!badge) return;
  var ga = baseDatos && baseDatos.gimnasioActivo;
  if(ga && ga.label){
    badge.textContent = ga.label + ' · Gen ' + ga.gen;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

