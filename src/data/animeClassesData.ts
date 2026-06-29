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
  },
  {
    name: "Masked Rider",
    animeOrigin: "Kamen Rider",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "Transforming armor-clad heroes who channel mechanical insectoid strength and execute signature Rider Kicks.",
    subclasses: [
      { name: "Insectoid Form", description: "Focuses on agility and raw jump power for skyward attacks.", keyFeature: "Rider Kick" },
      { name: "Alchemist Driver", description: "Uses alchemical cards to swap element defenses mid-combat.", keyFeature: "Card Form Change" },
      { name: "Legendary Rider", description: "Summons final form armor that briefly boosts all stats.", keyFeature: "Final Form" }
    ]
  },
  {
    name: "Synergist",
    animeOrigin: "Arifureta",
    primaryStat: "INT & DEX",
    hitDie: "d8",
    description: "Alchemists who manufacture modern high-tech firearms and consume monster flesh to gain custom mutations.",
    subclasses: [
      { name: "Gun-Slinger", description: "Fires custom bullet casings loaded with explosive mana.", keyFeature: "Railgun Shot" },
      { name: "Abyss Eater", description: "Consumes enemy targets to absorb their resistances.", keyFeature: "Monster Devour" },
      { name: "Artifact Crafter", description: "Transmutes ground terrain into mechanical traps.", keyFeature: "Creation Magic" }
    ]
  },
  {
    name: "Sentai Warrior",
    animeOrigin: "Super Sentai / Gao",
    primaryStat: "STR & CHA",
    hitDie: "d10",
    description: "Colorful rangers who call upon spirit animals and combine energy to execute group combat finishes.",
    subclasses: [
      { name: "Gao Ranger", description: "Summons animal spirits to claw and bite targets.", keyFeature: "Gao Spirit Call" },
      { name: "Squad Leader", description: "Performs poses that inspire allies to gain extra attacks.", keyFeature: "Roll Call Buff" },
      { name: "Mecha Pilot", description: "Manifests a colossal mechanical summon for one round.", keyFeature: "Titan Summon" }
    ]
  },
  {
    name: "Spider Reincarnate",
    animeOrigin: "I'm A Spider, So What?",
    primaryStat: "DEX & INT",
    hitDie: "d6",
    description: "Gelatinous spider summons using extreme wall-speed, steel webs, poison glands, and ruinous evil eyes.",
    subclasses: [
      { name: "Thread Weaver", description: "Shoots steel threads that bind and slice targets.", keyFeature: "Steel Web" },
      { name: "Evil Eye Tyrant", description: "Forces a WIS save to rot target's flesh on sight.", keyFeature: "Ruin Evil Eye" },
      { name: "God-Arachne", description: "Steps through spatial tears to bypass obstacles.", keyFeature: "Spatial Step" }
    ]
  },
  {
    name: "Cure Fighter",
    animeOrigin: "Pretty Cure",
    primaryStat: "CHA & STR",
    hitDie: "d10",
    description: "Magical girls who deal heavy physical bludgeoning damage and shield teammates with radiant pink shields.",
    subclasses: [
      { name: "Cure Heart", description: "Blasts a beam of healing light that wipes poison status.", keyFeature: "Heart Shower" },
      { name: "Cure Puncher", description: "Melee punches deal bonus radiant damage.", keyFeature: "Radiant Strike" },
      { name: "Sparkle Protector", description: "Creates a warded wall that absorbs spell damage.", keyFeature: "Pink Barrier" }
    ]
  },
  {
    name: "Spirit Master",
    animeOrigin: "Soul Land (Douluo Dalu)",
    primaryStat: "INT & CHA",
    hitDie: "d8",
    description: "Warriors who summon a Martial Soul (tool or beast) and absorb Spirit Rings to gain specialized powers.",
    subclasses: [
      { name: "Blue Silver Emperor", description: "Summons grass vines that bind and poison enemies.", keyFeature: "Blue Silver Bind" },
      { name: "Clear Sky Hammer", description: "Wields a heavy hammer that breaks barriers and shields.", keyFeature: "Sky Hammer Strike" },
      { name: "White Tiger", description: "Fuses with a tiger beast, gaining claw attacks and physical defense.", keyFeature: "Tiger Aura" }
    ]
  },
  {
    name: "Divine Knight",
    animeOrigin: "Throne of Seal",
    primaryStat: "STR & WIS",
    hitDie: "d10",
    description: "Holy crusaders wielding massive dual swords, summoning divine mounts, and dealing radiant damage.",
    subclasses: [
      { name: "Retribution Knight", description: "Specializes in dual-blade rapid slashes.", keyFeature: "Twin Light Slashes" },
      { name: "Guardian Knight", description: "Focuses on shield bashes and physical blocks.", keyFeature: "Shield of Light" },
      { name: "Throne Summoner", description: "Summons a divine throne that grants total invulnerability for 1 round.", keyFeature: "Throne of Seal" }
    ]
  },
  {
    name: "Valkyrie Pilot",
    animeOrigin: "Honkai Impact 3rd",
    primaryStat: "DEX & INT",
    hitDie: "d8",
    description: "Armor-clad pilots wielding high-frequency scythes and channeling unstable Honkai energies.",
    subclasses: [
      { name: "Void Herrscher", description: "Fires spatial spear projectiles from golden portals.", keyFeature: "Void Spears" },
      { name: "Flame Scythe", description: "Swings a massive flame scythe that leaves fire paths.", keyFeature: "Vermilion Slash" },
      { name: "Reason Constructor", description: "Constructs custom laser drones and cybernetics.", keyFeature: "Cyber-Drone" }
    ]
  },
  {
    name: "Evil God Disciple",
    animeOrigin: "I'm An Evil God",
    primaryStat: "CHA & WIS",
    hitDie: "d8",
    description: "Cultivators who absorb targets' negative emotions to execute demonic sword styles and illusions.",
    subclasses: [
      { name: "Soul Stealer", description: "sword strikes deal bonus psychic and necrotic damage.", keyFeature: "Demonic Sword Art" },
      { name: "Illusion Master", description: "Releases a pink mist that charms surrounding targets.", keyFeature: "Pink Mist Mirage" },
      { name: "System Host", description: "Consumes points to copy a basic class feature from an ally.", keyFeature: "Source Point Swap" }
    ]
  },
  {
    name: "Vision Wielder",
    animeOrigin: "Genshin Impact",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Elemental fighters chosen by the gods who manipulate fire, wind, water, lightning, ice, grass, or stone.",
    subclasses: [
      { name: "Storm Swirler", description: "Spreads elemental status to all surrounding targets.", keyFeature: "Swirl Reaction" },
      { name: "Elemental Vaporizer", description: "Deals double damage when hitting wet or frozen targets.", keyFeature: "Melt/Vaporize" },
      { name: "Geo Shielder", description: "Creates crystal shield fragments when hitting targets.", keyFeature: "Crystallize Armor" }
    ]
  },
  {
    name: "Sage of High School",
    animeOrigin: "God of High School",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "Taekwondo martial artists executing recoil-free strikes and borrowing power from mythical figures.",
    subclasses: [
      { name: "Renewal Fighter", description: "Double-kick combos that ignore physical armor.", keyFeature: "Recoilless Kick" },
      { name: "Borrowed Power", description: "Summons the phantom image of the Monkey King to strike.", keyFeature: "Monkey King Summon" },
      { name: "Staff Master", description: "Expands a heavy steel staff to crush lines of targets.", keyFeature: "Yeouibong Expand" }
    ]
  },
  {
    name: "Einherjar Champion",
    animeOrigin: "Record of Ragnarok",
    primaryStat: "STR",
    hitDie: "d12",
    description: "Human duelists who form Volundr weapon bonds with Valkyries to directly slay divine targets.",
    subclasses: [
      { name: "Sky Vanguard", description: "Swings a massive halberd that shatters enemy armor.", keyFeature: "Sky Piercer" },
      { name: "Adam Copycat", description: "Uses reactions to perfectly copy and execute an enemy's physical attack.", keyFeature: "Eyes of the Lord" },
      { name: "Kojiro Scanner", description: "Scans targets to pre-dodge all incoming melee attacks.", keyFeature: "Thousand-Image Scan" }
    ]
  },
  {
    name: "Blank Gamer",
    animeOrigin: "No Game No Life",
    primaryStat: "INT & WIS",
    hitDie: "d6",
    description: "Tactical geniuses who enforce binding game rules and win combat by manipulating terms of battle.",
    subclasses: [
      { name: "Blank Tactician", description: "Enforces rules that restrict physical violence, converting fights into checks.", keyFeature: "Pledge Vow" },
      { name: "Imanity King", description: "Gains advantage on all charisma, bluff, and insight checks.", keyFeature: "Bluff Master" },
      { name: "Flugel Mage", description: "Fires massive mana beams that vaporize landscapes.", keyFeature: "Heaven's Strike" }
    ]
  },
  {
    name: "Ruin Lord",
    animeOrigin: "Apocalypse Bringer Mynoghra",
    primaryStat: "WIS & CHA",
    hitDie: "d8",
    description: "Monarchs of ruin who construct glitchy, buggy dark units and manipulate spatial terrain.",
    subclasses: [
      { name: "Slime Monarch", description: "Fires pixelated glitches that corrupt target armor.", keyFeature: "Glitch Infection" },
      { name: "RTS Commander", description: "Blinds enemies in a 30ft radius using shadow fog.", keyFeature: "Fog of War" },
      { name: "Grave Ruler", description: "Turns soil into ruined ash, slowing enemy movement.", keyFeature: "Ruined Lands" }
    ]
  },
  {
    name: "Reincarnated Genius",
    animeOrigin: "Petals of Reincarnation",
    primaryStat: "INT & STR",
    hitDie: "d8",
    description: "Summons who slice their past connection to awaken historical talents from Earth's greatest figures.",
    subclasses: [
      { name: "Newtonian Gravity", description: "Reverses local gravity pull to fling targets into the sky.", keyFeature: "Gravitation Action" },
      { name: "Nobunaga Gunner", description: "Manifests rifle barriers that volley fire.", keyFeature: "Three-Line Fire" },
      { name: "Kojiro Duelist", description: "Sword strikes hit three times simultaneously.", keyFeature: "Tsubame Gaeshi" }
    ]
  },
  {
    name: "King of Heroes",
    animeOrigin: "Fate / Nasuverse",
    primaryStat: "CHA & INT",
    hitDie: "d8",
    description: "Entities channeling golden treasure portals and projecting legendary noble phantasms.",
    subclasses: [
      { name: "Golden King", description: "Opens golden portals that fire broadswords and spears.", keyFeature: "Gate of Babylon" },
      { name: "Faker Projector", description: "Creates custom weapon copies and expands a pocket forge.", keyFeature: "Unlimited Blade Works" },
      { name: "Shadow Saber", description: "Fires dark energy beams from a corrupted broadsword.", keyFeature: "Excalibur Morgan" }
    ]
  },
  {
    name: "Tower Guard",
    animeOrigin: "Tyrant of the Tower Defense Game",
    primaryStat: "INT & WIS",
    hitDie: "d10",
    description: "Commanders deploying stone barricades, hiring archer mercenaries, and managing defenses.",
    subclasses: [
      { name: "Barricade Builder", description: "Erects heavy wooden wall barricades on the grid.", keyFeature: "Wall Placement" },
      { name: "Tactical Commander", description: "Increases defense stats of all adjacent allies.", keyFeature: "Heroic Buff" },
      { name: "Ironwall Guard", description: "Shield bashes targets to knock them back 10ft.", keyFeature: "Impact Shield" }
    ]
  },
  {
    name: "Aura Cultivator",
    animeOrigin: "Er Gen Verse",
    primaryStat: "INT & WIS",
    hitDie: "d8",
    description: "Xianxia practitioners channeling core Qi, forging elixir pills, and riding flying swords.",
    subclasses: [
      { name: "Qi Refiner", description: "Launches a flying sword to strike targets from 120ft away.", keyFeature: "Flying Sword" },
      { name: "Alchemical Sage", description: "Cooks custom pills that heal or temporarily buff stats.", keyFeature: "Pill Cooking" },
      { name: "Ancient Demon", description: "Points finger to sever the lifeforce link of targets.", keyFeature: "Karma Sever" }
    ]
  },
  {
    name: "Sin Knight",
    animeOrigin: "Seven Deadly Sins / Four Knights",
    primaryStat: "STR & CON",
    hitDie: "d12",
    description: "Knights carrying cursed mark sins, channeling elements and counter-attacks.",
    subclasses: [
      { name: "Dragon Sin", description: "Redirects double damage back at magic spell casters.", keyFeature: "Full Counter" },
      { name: "Lion Sin", description: "Releases a miniature sun that burns in a 15ft radius.", keyFeature: "Cruel Sun" },
      { name: "Fox Sin", description: "Siphons strength and dexterity points from targets on hit.", keyFeature: "Physical Snatch" }
    ]
  },
  {
    name: "Undead King",
    animeOrigin: "Mr. Zombie",
    primaryStat: "CON & STR",
    hitDie: "d12",
    description: "Zombies who regenerate limb damage, ignore pain filters, and bite to feed.",
    subclasses: [
      { name: "Glutton Zombie", description: "Fuses target flesh to increase size and health.", keyFeature: "Muscle Graft" },
      { name: "Bio-Hazard", description: "Spits acidic green saliva that eats away weapon metal.", keyFeature: "Acidic Spit" },
      { name: "Regen Monarch", description: "Restores HP automatically at the start of each turn.", keyFeature: "Undying Core" }
    ]
  },
  {
    name: "Fixer",
    animeOrigin: "Project Moon",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "City mercenaries using steam workshop gear and manifesting personal EGO armors.",
    subclasses: [
      { name: "Workshop Agent", description: "Attacks using custom steam-pressured blades.", keyFeature: "Steam Slash" },
      { name: "Ego Synchronizer", description: "Surrounds self in EGO armor, boosting AC by +3.", keyFeature: "Ego Burst" },
      { name: "Red Mist", description: "Swings a massive mimicry scythe to execute blood slashes.", keyFeature: "Mimicry Strike" }
    ]
  },
  {
    name: "Guild Slayer",
    animeOrigin: "Fairy Tail",
    primaryStat: "STR & INT",
    hitDie: "d10",
    description: "Mages who consume raw elements (fire, iron, wind) to replenish Cursed Energy and fire dragon breath.",
    subclasses: [
      { name: "Fire Dragon Slayer", description: "Breathes fire cones and consumes fire spells.", keyFeature: "Dragon Roar" },
      { name: "Iron Dragon Slayer", description: "Turns skin to iron, gaining resistance to bludgeoning/slashing.", keyFeature: "Iron Scales" },
      { name: "Sky Dragon Slayer", description: "Casts healing winds that restore HP to all adjacent allies.", keyFeature: "Healing Wind" }
    ]
  },
  {
    name: "Ether Gear",
    animeOrigin: "Edens Zero",
    primaryStat: "DEX & INT",
    hitDie: "d8",
    description: "Fighters who run ether line codes through their body to alter gravity vectors and overdrive speed.",
    subclasses: [
      { name: "Gravity Gear", description: "Alters gravity to float up walls or pull targets closer.", keyFeature: "Magimech Gravity" },
      { name: "Chronophage Speed", description: "Boosts speed to perform three attacks per action.", keyFeature: "Ether Overdrive" },
      { name: "Machina Soul", description: "Hacks and controls mechanical constructs or doors.", keyFeature: "Machine Interface" }
    ]
  },
  {
    name: "Gatekeeper",
    animeOrigin: "Gatekeeper of the Boundless Realm",
    primaryStat: "WIS & INT",
    hitDie: "d8",
    description: "Sentinels who guard rift portals, summon dimensional chains, and seal inter-dimensional threats.",
    subclasses: [
      { name: "Rift Lock", description: "Summons chains that anchor and restrain teleporting targets.", keyFeature: "Planar Chains" },
      { name: "Portal Master", description: "Opens portals that redirect spell projectiles.", keyFeature: "Warp Shift" },
      { name: "Void Vessel", description: "Releases a shockwave of negative void energy.", keyFeature: "Void Wave" }
    ]
  },
  {
    name: "Apprentice Mentor",
    animeOrigin: "My Female Apprentices are all Future Big Shots",
    primaryStat: "CHA & INT",
    hitDie: "d8",
    description: "Ancient masters who grant cheat cultivation techniques to allies and gain buffs when allies perform crits.",
    subclasses: [
      { name: "System Master", description: "Grants an ally a temporary +2 modifier to one stat.", keyFeature: "Cheat Grant" },
      { name: "Aura Shield", description: "Negates one attack completely using a master's shield.", keyFeature: "Absolute Defense" },
      { name: "Karma Connector", description: "Fuses mind link with an ally to share sight and stats.", keyFeature: "Disciple Link" }
    ]
  },
  {
    name: "Disaster Hunter",
    animeOrigin: "Return of the Disaster-Class Hero",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "Deity-slaying hunters executing extreme vengeance strikes using celestial weapons.",
    subclasses: [
      { name: "Zodiac Avenger", description: "Strikes with golden stars, dealing bonus force damage.", keyFeature: "Twelve Zodiac Strike" },
      { name: "Sun Bow", description: "Fires light arrows that bypass cover and shields.", keyFeature: "Gold Bow" },
      { name: "Divine Blacksmith", description: "Hits target weapons to temporarily break their attack scaling.", keyFeature: "Weapon Break" }
    ]
  },
  {
    name: "Max-Level Player",
    animeOrigin: "Solo Max-Level Newbie",
    primaryStat: "INT & DEX",
    hitDie: "d8",
    description: "Pro-gamers copying enemy moves, bypassing limits, and manipulating invisible game status blocks.",
    subclasses: [
      { name: "Pattern Copier", description: "Analyzes and copies a basic target skill on sight.", keyFeature: "Eyes of Truth" },
      { name: "Bug Abuser", description: "Accesses pocket inventory storage mid-combat as a reaction.", keyFeature: "Inventory Exploit" },
      { name: "Soul Slayer", description: "Infuses blade with dark shadows to deal necrotic cuts.", keyFeature: "Black Sword" }
    ]
  },
  {
    name: "Stick Wielder",
    animeOrigin: "Level 99+ Wooden Stick",
    primaryStat: "STR & CON",
    hitDie: "d12",
    description: "Fighters wielding a simple starter wooden stick upgraded to +99, dealing colossal bludgeoning damage.",
    subclasses: [
      { name: "Plus 99 Smasher", description: "Smashes stick down to trigger a 60ft shockwave crack.", keyFeature: "Dimension Splitter" },
      { name: "Wood Shield", description: "Uses wood grains to form an invulnerable shielding block.", keyFeature: "Invulnerable Splinter" },
      { name: "Stick Sweeper", description: "Swings stick in a circle, knocking all adjacent targets prone.", keyFeature: "Hurricane Swing" }
    ]
  },
  {
    name: "Rift Mage",
    animeOrigin: "Winter Moon",
    primaryStat: "INT & CHA",
    hitDie: "d6",
    description: "Sassy spellcasters using neon spell card projections to heal teammates and troll enemies.",
    subclasses: [
      { name: "Neon Healer", description: "Projects bright neon light circles that heal over time.", keyFeature: "Glamour Heal" },
      { name: "Troll Mage", description: "Taunts targets, forcing them to focus attacks on tank allies.", keyFeature: "Sassy Taunt" },
      { name: "Card Summoner", description: "Flings glowing cards that detonate into light bursts.", keyFeature: "Card Call" }
    ]
  }
];
