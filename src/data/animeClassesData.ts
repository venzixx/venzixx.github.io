export interface AnimeSubclass {
  name: string;
  description: string;
  keyFeature: string;
}

export interface AnimeClass {
  name: string;
  animeOrigin: string;
  primaryStat: string;
  hitDie: string;
  description: string;
  subclasses: AnimeSubclass[];
}

export const ANIME_CLASSES_DATABASE: AnimeClass[] = [
  {
    name: "Elder Lich",
    animeOrigin: "Overlord",
    primaryStat: "INT & CHA",
    hitDie: "d8",
    description: "Skeletal magic users who manipulate high-tier necromancy, negative energy, and command undead legions.",
    subclasses: [
      { name: "Grave Lord", description: "Commands armies of skeletons and death knights with buffed stats.", keyFeature: "Undead Command" },
      { name: "Abyssal Mage", description: "Casts high-tier elemental and death spells.", keyFeature: "Tenth-Tier Magic" },
      { name: "Ruler of Death", description: "Emits a passive aura of fear and despair that slows enemies.", keyFeature: "Despair Aura V" }
    ]
  },
  {
    name: "World Champion",
    animeOrigin: "Overlord",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "Top-tier warriors with supreme martial skills, spatial cuts, and invulnerable defenses.",
    subclasses: [
      { name: "Spatial Slasher", description: "Slices through space to ignore enemy armor.", keyFeature: "World Break" },
      { name: "Dimensional Knight", description: "Creates dimensional barriers to block spells.", keyFeature: "Planar Deflection" },
      { name: "Aegis Duelist", description: "Performs auto-counters when successfully parrying hits.", keyFeature: "Auto-Counter" }
    ]
  },
  {
    name: "Slime Reincarnate",
    animeOrigin: "Tensura (Slime Isekai)",
    primaryStat: "CON & INT",
    hitDie: "d12",
    description: "Summons reborn in a gelatinous body, capable of absorbing spells, items, and mimicking enemies.",
    subclasses: [
      { name: "Predator", description: "Devours enemies to absorb their skills and gain temporary HP.", keyFeature: "Gluttony Devour" },
      { name: "Sage Vessel", description: "Possesses an internal voice that analyzes targets and calculates spell hits.", keyFeature: "Great Sage" },
      { name: "Demon Slime", description: "Channels chaotic aura to petrify surrounding lower-level enemies.", keyFeature: "Chaos Aura" }
    ]
  },
  {
    name: "True Oni / Kijin",
    animeOrigin: "Tensura (Slime Isekai)",
    primaryStat: "STR & INT",
    hitDie: "d10",
    description: "Ogre warriors evolved into noble magic-swordsmen with blazing flame and black lightning techniques.",
    subclasses: [
      { name: "Flame Oni", description: "Imbues sword cuts with active fire bursts and explosions.", keyFeature: "Flare Haze" },
      { name: "Storm Kijin", description: "Fires black lightning arcs that jump targets.", keyFeature: "Dark Thunder" },
      { name: "Aura General", description: "Commanding aura that increases ally attack rolls.", keyFeature: "Commander's Haki" }
    ]
  },
  {
    name: "Enchanter",
    animeOrigin: "Log Horizon",
    primaryStat: "INT & WIS",
    hitDie: "d6",
    description: "Support tacticians who connect mana channels between teammates, transfer spell slots, and redirect threat.",
    subclasses: [
      { name: "Mana Linker", description: "Shares spell slots and Cursed Energy with allies.", keyFeature: "Karma Drive" },
      { name: "Tactician", description: "Calculates enemy movements to give allies advantage.", keyFeature: "Keystroke Analysis" },
      { name: "Pulse Caster", description: "Sends electric signals that interrupt enemy casting.", keyFeature: "Mind Shock" }
    ]
  },
  {
    name: "Swashbuckler",
    animeOrigin: "Log Horizon",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "Dual-wielding duelists who maintain continuous pressure and land consecutive critical strikes.",
    subclasses: [
      { name: "Dual Fencer", description: "Performs consecutive weapon strikes at high speed.", keyFeature: "Sword Dance" },
      { name: "Dread Blade", description: "Gains attack power when targets are focused on other allies.", keyFeature: "Hate Exploitation" },
      { name: "Acrobatic Step", description: "Creates illusory mirror clones while dodging.", keyFeature: "Phantom Mirage" }
    ]
  },
  {
    name: "Cursed Sorcerer",
    animeOrigin: "Jujutsu Kaisen",
    primaryStat: "INT",
    hitDie: "d8",
    description: "Occult magic users manipulating negative emotional energy to execute Innate Techniques.",
    subclasses: [
      { name: "Limitless Adept", description: "Alters space, creating a passive shield that slows incoming arrows.", keyFeature: "Infinity Barrier" },
      { name: "Ten Shadows", description: "Summons spectral Shikigami beasts out of their shadow.", keyFeature: "Shikigami Call" },
      { name: "Shrine Carver", description: "Launches slashing blades at melee and range.", keyFeature: "Cleave & Dismantle" }
    ]
  },
  {
    name: "God-Class Magician",
    animeOrigin: "Mushoku Tensei",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Elemental spellcasters who cast giant climate-altering spells without verbal chants.",
    subclasses: [
      { name: "Quagmire", description: "Casts earth and mud spells to slow enemy movements.", keyFeature: "Chantless Casting" },
      { name: "Storm King", description: "Summons massive thunderstorms over a 60ft area.", keyFeature: "Cumulonimbus" },
      { name: "North Blade", description: "Hardens mana around their skin, forming protective armor.", keyFeature: "Magic Armor" }
    ]
  }
];
