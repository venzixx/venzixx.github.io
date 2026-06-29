export interface Subclass {
  name: string;
  description: string;
  keyFeature: string;
}

export interface CharacterClass {
  name: string;
  primaryStat: string;
  hitDie: string;
  description: string;
  subclasses: Subclass[];
}

export const CLASSES_DATABASE: CharacterClass[] = [
  {
    name: "Mageblade",
    primaryStat: "STR & INT",
    hitDie: "d10",
    description: "Frontline combatants who channel active spell slots directly into physical weapon strikes.",
    subclasses: [
      { name: "Spell-Slasher", description: "Focuses on explosive elemental releases.", keyFeature: "Elemental Imbue" },
      { name: "Aegis Guard", description: "Uses magic to reinforce armor and shields.", keyFeature: "Warded Shielding" },
      { name: "Rift Weaver", description: "Blinks short distances during weapon attacks.", keyFeature: "Flash-Step Strike" }
    ]
  },
  {
    name: "Occultist",
    primaryStat: "INT",
    hitDie: "d8",
    description: "Manipulators of dark cursed energy, barriers, and domain pocket dimensions.",
    subclasses: [
      { name: "Domain Specialist", description: "Refines spatial dimensions to trap enemies.", keyFeature: "Domain Expansion" },
      { name: "Cursed Speaker", description: "Uses voice to enforce absolute commands.", keyFeature: "Vocal Curse" },
      { name: "Barrier Architect", description: "Erects complex defensive curtains.", keyFeature: "Automated Veil" }
    ]
  },
  {
    name: "Acrobat",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "Highly mobile skirmishers specializing in wall-running, ropes, and evasive maneuvers.",
    subclasses: [
      { name: "Spider-Slinger", description: "Uses ropes and grapple webs for momentum.", keyFeature: "Web Swing" },
      { name: "Blade Dancer", description: "Flows through combat, dodging opportunity attacks.", keyFeature: "Graceful Flurry" },
      { name: "Vault Master", description: "Slides under massive targets for vital hits.", keyFeature: "Underbelly Strike" }
    ]
  },
  {
    name: "Shadow Assassin",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "Stalkers who merge into shadows to execute high-damage sneak attacks.",
    subclasses: [
      { name: "Nightstalker", description: "Turns invisible in dim light conditions.", keyFeature: "Shadow Merge" },
      { name: "Poison Master", description: "Imbues blades with toxic custom venoms.", keyFeature: "Toxic Dagger" },
      { name: "Soul Reaper", description: "Absorbs lifeforce from fallen enemies.", keyFeature: "Death Harvest" }
    ]
  },
  {
    name: "Wind Runner",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "Combatants who harness air currents to maximize speed and arrow damage.",
    subclasses: [
      { name: "Zephyr Bow", description: "Fires curved wind arrows that ignore cover.", keyFeature: "Gale Shot" },
      { name: "Hurricane Striker", description: "Blades create razor wind shockwaves.", keyFeature: "Wind Blade" },
      { name: "Sky Dancer", description: "Gains permanent gliding and fall resistance.", keyFeature: "Feather Descent" }
    ]
  },
  {
    name: "Void Warden",
    primaryStat: "WIS",
    hitDie: "d10",
    description: "Protectors who manipulate spatial portals to redirect attacks and control space.",
    subclasses: [
      { name: "Gatekeeper", description: "Opens portals that redirect enemy attacks.", keyFeature: "Portal Deflection" },
      { name: "Abyss Guard", description: "Infuses shields with gravity suction pools.", keyFeature: "Singularity Pull" },
      { name: "Void Walker", description: "Teleports allies across the battlefield.", keyFeature: "Warp Swap" }
    ]
  },
  {
    name: "Blood Channeller",
    primaryStat: "CON",
    hitDie: "d12",
    description: "Fighters who sacrifice their own HP to deal massive necrotic damage.",
    subclasses: [
      { name: "Sanguine Reaver", description: "Siphons health from wounded targets.", keyFeature: "Blood Feast" },
      { name: "Crimson Tank", description: "Gains defensive buffs when low on health.", keyFeature: "Desperate Armor" },
      { name: "Hemomancer", description: "Hardens blood into ranged projectiles.", keyFeature: "Blood Spikes" }
    ]
  },
  {
    name: "Cyber-Mage",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Summoned tech geniuses who combine modern programming with magical circle codes.",
    subclasses: [
      { name: "Nanite Weaver", description: "Commands tiny glowing magic drones.", keyFeature: "Drone Support" },
      { name: "Matrix Hacker", description: "Alters code properties of enemy gear.", keyFeature: "Gear Glitch" },
      { name: "Overclocker", description: "Injects digital haste buffs into spell casts.", keyFeature: "Haste Protocol" }
    ]
  },
  {
    name: "Soul Binder",
    primaryStat: "CHA",
    hitDie: "d8",
    description: "Summoners who form deep spiritual pacts with extra-planar beasts.",
    subclasses: [
      { name: "Beast Master", description: "Summons a permanent high-level spectral pet.", keyFeature: "Spectral Companion" },
      { name: "Spectre Lord", description: "Commands a horde of small undead minions.", keyFeature: "Grave Swarm" },
      { name: "Avatar Vessel", description: "Permits the summon beast to share their body.", keyFeature: "Beast Fusion" }
    ]
  },
  {
    name: "Chrono-Weaver",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Mages who manipulate timelines to undo mistakes and accelerate allies.",
    subclasses: [
      { name: "Time Bender", description: "Rerolls rolls by reversing time locally.", keyFeature: "Time Slip" },
      { name: "Temporal Knight", description: "Accelerates their own combat speed.", keyFeature: "Double Take" },
      { name: "Chrono Medic", description: "Heals allies by rewinding their physical state.", keyFeature: "Rewind Health" }
    ]
  },
  {
    name: "Ironclad Vanguard",
    primaryStat: "STR",
    hitDie: "d12",
    description: "The ultimate heavy armored guardians who hold choke points.",
    subclasses: [
      { name: "Bastion", description: "Locks down position, becoming unmovable.", keyFeature: "Fortress Stance" },
      { name: "Juggernaut", description: "Charges forward, breaking enemy formations.", keyFeature: "Shield Charge" },
      { name: "Bulwark Defender", description: "Creates a warded wall that blocks spells.", keyFeature: "Aegis Wall" }
    ]
  },
  {
    name: "Beast-Changer",
    primaryStat: "WIS",
    hitDie: "d10",
    description: "Summons who shape-shift into powerful mutated beasts.",
    subclasses: [
      { name: "Apex Ursine", description: "Shifts into a massive armored bear.", keyFeature: "Grizzly Armor" },
      { name: "Rift Raptor", description: "Shifts into a high-speed flying bird.", keyFeature: "Raptor Strike" },
      { name: "Viper Shadow", description: "Shifts into a venomous shadow snake.", keyFeature: "Toxic Bite" }
    ]
  },
  {
    name: "Holy Crusader",
    primaryStat: "WIS & STR",
    hitDie: "d10",
    description: "Paladins of Aethelgard who channel sun energy to heal and smite.",
    subclasses: [
      { name: "Sun Smiter", description: "Imbues swings with radiant fire damage.", keyFeature: "Solar Smite" },
      { name: "Light Bringer", description: "Emits a healing aura that restores HP.", keyFeature: "Healing Radiance" },
      { name: "Oath Sentinel", description: "Wards allies, absorbing damage for them.", keyFeature: "Sacred Shield" }
    ]
  },
  {
    name: "Necromantic Lord",
    primaryStat: "INT",
    hitDie: "d8",
    description: "Occult spellcasters who command the legions of the dead.",
    subclasses: [
      { name: "Plaguebringer", description: "Spreads rotting debuffs across enemies.", keyFeature: "Rot Cloud" },
      { name: "Death Commander", description: "Buffs stats of summoned skeletons.", keyFeature: "Legion Command" },
      { name: "Lich Disciple", description: "Consumes souls to extend their own life.", keyFeature: "Soul Harvest" }
    ]
  },
  {
    name: "Rune Blacksmith",
    primaryStat: "STR",
    hitDie: "d10",
    description: "Forge masters who craft and imprint magical runes onto weapons.",
    subclasses: [
      { name: "Rune Weaponist", description: "Imprints active combat runes onto blades.", keyFeature: "Blazing Rune" },
      { name: "Anvil Guardian", description: "Imprints defensive shields with runes.", keyFeature: "Barrier Rune" },
      { name: "Mana Smelter", description: "Imbues catalyst cores with magic boost runes.", keyFeature: "Catalytic Rune" }
    ]
  },
  {
    name: "Rift Strider",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "High-speed skirmishers who step in and out of dimensional pockets.",
    subclasses: [
      { name: "Void Blade", description: "Strikes target and blinks to safety.", keyFeature: "Flicker Slash" },
      { name: "Planar Runner", description: "Steps through walls and physical objects.", keyFeature: "Phase Walk" },
      { name: "Dimensional Archer", description: "Fires arrows from pocket dimensions.", keyFeature: "Astral Arrow" }
    ]
  },
  {
    name: "Chaos Sorcerer",
    primaryStat: "CHA",
    hitDie: "d6",
    description: "Wild mages whose spells trigger unpredictable magic surges.",
    subclasses: [
      { name: "Surge Adept", description: "Triggers positive random wild surges.", keyFeature: "Chaos Surge" },
      { name: "Dice Roller", description: "Rerolls damage dice with random elements.", keyFeature: "Elemental Gamble" },
      { name: "Anomaly Mage", description: "Alters gravity and status targets randomly.", keyFeature: "Rift Anomaly" }
    ]
  },
  {
    name: "Sniper Archer",
    primaryStat: "DEX",
    hitDie: "d8",
    description: "Long-range shooters who deal massive damage with single bow shots.",
    subclasses: [
      { name: "Dead-Eye", description: "Doubles range and ignores cover.", keyFeature: "Focus Shot" },
      { name: "Trap Setter", description: "Deploys hidden slowing and freeze traps.", keyFeature: "Decoy Trap" },
      { name: "Piercer", description: "Arrows pierce through multiple enemies.", keyFeature: "Line Shot" }
    ]
  },
  {
    name: "Weapon Master",
    primaryStat: "STR & DEX",
    hitDie: "d10",
    description: "Martial masters who switch weapons dynamically mid-combat.",
    subclasses: [
      { name: "Blade Master", description: "Specializes in dual-wield flurries.", keyFeature: "Steel Tempest" },
      { name: "Vanguard Lancer", description: "Specializes in polearms and charge attacks.", keyFeature: "Spear Thrust" },
      { name: "Colossus Smasher", description: "Specializes in heavy double-handed hammers.", keyFeature: "Shockwave Slam" }
    ]
  },
  {
    name: "Elementalist",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Spellcasters who control the classic forces of nature.",
    subclasses: [
      { name: "Fire Mage", description: "Channels massive fire burns and AoE explosions.", keyFeature: "Fireball Blast" },
      { name: "Ice Caller", description: "Creates walls of ice and freezes ground.", keyFeature: "Frost Prison" },
      { name: "Storm Lord", description: "Strikes targets with chain lightning.", keyFeature: "Lightning Surge" }
    ]
  },
  {
    name: "Bardic Muse",
    primaryStat: "CHA",
    hitDie: "d8",
    description: "Summoned artists who use sound and magic to inspire allies.",
    subclasses: [
      { name: "Battle Singer", description: "Sings war chants that buff weapon hits.", keyFeature: "Valor Chord" },
      { name: "Dirge Weaver", description: "Plays sorrowful chords that debuff enemies.", keyFeature: "Melancholy Song" },
      { name: "Sound Architect", description: "Hardens sound waves into shields.", keyFeature: "Sonic Shield" }
    ]
  },
  {
    name: "Cleric of Light",
    primaryStat: "WIS",
    hitDie: "d8",
    description: "Priests who restore health and shield their team with solar halos.",
    subclasses: [
      { name: "Life Domain", description: "Maximizes healing output on spells.", keyFeature: "Supreme Recovery" },
      { name: "Sun Domain", description: "Burns undead and fiends with solar rays.", keyFeature: "Sunbeam Smite" },
      { name: "Protection Domain", description: "Reduces damage taken by adjacent allies.", keyFeature: "Warded Aura" }
    ]
  },
  {
    name: "Oathbreaker Knight",
    primaryStat: "STR & CHA",
    hitDie: "d10",
    description: "Dark paladins who break holy oaths to gain shadow smites.",
    subclasses: [
      { name: "Hell Knight", description: "Imbues blades with demonic fire.", keyFeature: "Hellfire Strike" },
      { name: "Dread Lord", description: "Radiates an aura of absolute terror.", keyFeature: "Aura of Fear" },
      { name: "Abyss Blade", description: "Absorbs damage and releases it as force.", keyFeature: "Vengeful Retribution" }
    ]
  },
  {
    name: "Poison Alchemist",
    primaryStat: "INT",
    hitDie: "d8",
    description: "Scientists who concoct poisons and acids during combat.",
    subclasses: [
      { name: "Venomist", description: "Coats allies' blades in poison.", keyFeature: "Venom Vial" },
      { name: "Acid Bomber", description: "Throws bombs that melt armor scales.", keyFeature: "Corrosive Splash" },
      { name: "Plague Doctor", description: "Cures debuffs and applies gas masks.", keyFeature: "Antidote Spray" }
    ]
  },
  {
    name: "Gravity Manipulator",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Mages who alter gravity vector forces around targets.",
    subclasses: [
      { name: "Float Master", description: "Causes targets to float helplessly.", keyFeature: "Reverse Gravity" },
      { name: "Crush Lord", description: "Increases gravity weight to pin enemies.", keyFeature: "Gravitational Slam" },
      { name: "Orbit Warden", description: "Creates an orbit barrier that repels objects.", keyFeature: "Repel Shield" }
    ]
  },
  {
    name: "Dream Walker",
    primaryStat: "CHA",
    hitDie: "d8",
    description: "Espionage specialists who manipulate sleep and dreams.",
    subclasses: [
      { name: "Nightmare Lord", description: "Triggers terrifying mental illusions.", keyFeature: "Nightmare Curse" },
      { name: "Sleep Weaver", description: "Puts groups of enemies into deep sleep.", keyFeature: "Lullaby Fog" },
      { name: "Dream Shaper", description: "Creates solid constructs out of dream dust.", keyFeature: "Phantasm Shield" }
    ]
  },
  {
    name: "Spell Thief",
    primaryStat: "DEX & INT",
    hitDie: "d8",
    description: "Sneaky fighters who steal and copy enemy spells.",
    subclasses: [
      { name: "Spell Snatcher", description: "Intercepts and steals a spell as a reaction.", keyFeature: "Spell Counter-Steal" },
      { name: "Mana Drainer", description: "Absorbs targets' spell slots on weapon hit.", keyFeature: "Mana Siphon" },
      { name: "Trickster Mage", description: "Uses stolen spells to trigger decoys.", keyFeature: "Mirror Copy" }
    ]
  },
  {
    name: "Pyromancer",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Fire mages obsessed with combustion, burn logs, and ash.",
    subclasses: [
      { name: "Blaze Lord", description: "Spreads continuous fire damage.", keyFeature: "Burn Stack" },
      { name: "Explosive Expert", description: "Spells deal double damage to objects.", keyFeature: "Blast Wave" },
      { name: "Cinder Ward", description: "Surrounds themselves with fire shields.", keyFeature: "Flame Cloak" }
    ]
  },
  {
    name: "Frost Sentinel",
    primaryStat: "CON & INT",
    hitDie: "d10",
    description: "Defenders who use ice shielding and freezing waves.",
    subclasses: [
      { name: "Glacier Shield", description: "Forms ice walls that absorb damage.", keyFeature: "Glacial Wall" },
      { name: "Frost Knight", description: "Melee strikes slow enemy speed by half.", keyFeature: "Chilling Strike" },
      { name: "Blizzard Core", description: "Creates a freezing blizzard aura.", keyFeature: "Winter Aura" }
    ]
  },
  {
    name: "Storm Chaser",
    primaryStat: "DEX & INT",
    hitDie: "d8",
    description: "Spellcasters who ride lightning waves and summon storms.",
    subclasses: [
      { name: "Volt Rider", description: "Teleports as lightning after casting.", keyFeature: "Lightning Dash" },
      { name: "Chain Striker", description: "Fires lightning that jumps targets.", keyFeature: "Chain Bolt" },
      { name: "Tempest Caller", description: "Summons wind gusts that push enemies.", keyFeature: "Wind Vortex" }
    ]
  },
  {
    name: "Curse Weaver",
    primaryStat: "INT",
    hitDie: "d8",
    description: "Witches who place debilitating dark curses on enemies.",
    subclasses: [
      { name: "Hexer", description: "Applies stat reduction curses.", keyFeature: "Hex Sigil" },
      { name: "Decay Lord", description: "Curses target to receive double damage.", keyFeature: "Decay Mark" },
      { name: "Voodoo Master", description: "Links two targets to share damage.", keyFeature: "Shared Pain" }
    ]
  },
  {
    name: "Spirit Shaman",
    primaryStat: "WIS",
    hitDie: "d8",
    description: "Nature priests who summon tribal animal spirits.",
    subclasses: [
      { name: "Wolf Guide", description: "Summons a wolf spirit that trips targets.", keyFeature: "Spirit Pack" },
      { name: "Bear Spirit", description: "Summons a bear spirit that taunts.", keyFeature: "Guardian Bear" },
      { name: "Falcon Eye", description: "Summons a falcon spirit that scouts.", keyFeature: "Spirit Vision" }
    ]
  },
  {
    name: "Zenith Monk",
    primaryStat: "DEX & WIS",
    hitDie: "d8",
    description: "Unarmed martial artists who focus mana energy inside their fists.",
    subclasses: [
      { name: "Wind Fist", description: "Unarmed hits push targets 15ft away.", keyFeature: "Gale Palm" },
      { name: "Shadow Hand", description: "Melee attacks bypass physical armor.", keyFeature: "Phase Strike" },
      { name: "Iron Body", description: "Reduces all incoming physical hits.", keyFeature: "Zenith Ward" }
    ]
  },
  {
    name: "Rift Hunter",
    primaryStat: "DEX & STR",
    hitDie: "d10",
    description: "Bounty hunters specialized in hunting summoned beasts.",
    subclasses: [
      { name: "Mage Slayer", description: "Gains advantage on saves against spells.", keyFeature: "Spellbreaker" },
      { name: "Tracker", description: "Traces targets through planar portals.", keyFeature: "Planar Trace" },
      { name: "Trapper", description: "Locks targets in metal dimensional clamps.", keyFeature: "Rift Trap" }
    ]
  },
  {
    name: "Dragon Disciple",
    primaryStat: "STR & CHA",
    hitDie: "d10",
    description: "Fighters who transform their skin into scale armor.",
    subclasses: [
      { name: "Red Dragon", description: "Breathes fire and gains fire immunity.", keyFeature: "Flame Breath" },
      { name: "Blue Dragon", description: "Breathes lightning and gains speed.", keyFeature: "Storm Breath" },
      { name: "Green Dragon", description: "Breathes poison and gas blocks.", keyFeature: "Acid Breath" }
    ]
  },
  {
    name: "Star Herald",
    primaryStat: "INT & WIS",
    hitDie: "d6",
    description: "Astrologers who call down meteorites and solar stars.",
    subclasses: [
      { name: "Meteorite Caller", description: "Summons fire rock falls from the sky.", keyFeature: "Comet Strike" },
      { name: "Sun Priest", description: "Blinds enemies with bright solar stars.", keyFeature: "Solar Blindness" },
      { name: "Moon Weaver", description: "Quiets combat, silencing all nearby spells.", keyFeature: "Lunar Silence" }
    ]
  },
  {
    name: "Telepathic Mind",
    primaryStat: "INT",
    hitDie: "d6",
    description: "Psychics who attack the brains of their targets directly.",
    subclasses: [
      { name: "Mind Breaker", description: "Deals massive psychic damage.", keyFeature: "Mind Blast" },
      { name: "Shield Weaver", description: "Protects team minds against magic.", keyFeature: "Mental Shield" },
      { name: "Mind Controller", description: "Forces a target to move or drop gear.", keyFeature: "Puppeteer" }
    ]
  },
  {
    name: "Mirage Illusionist",
    primaryStat: "INT & CHA",
    hitDie: "d6",
    description: "Tricksters who create solid mirror clones to absorb hits.",
    subclasses: [
      { name: "Clone Master", description: "Creates three fake mirror decoys.", keyFeature: "Mirror Image" },
      { name: "Invisibilist", description: "Turns the entire team invisible briefly.", keyFeature: "Group Veil" },
      { name: "Terror Dreamer", description: "Shows target their worst fear.", keyFeature: "Phantasm Fright" }
    ]
  },
  {
    name: "Aegis Defender",
    primaryStat: "CON & STR",
    hitDie: "d12",
    description: "Defensive anchors who protect allies behind heavy shields.",
    subclasses: [
      { name: "Tower Wall", description: "Blocks all physical arrows behind them.", keyFeature: "Tower Defense" },
      { name: "Guardian Angel", description: "Intercepts attacks and absorbs damage.", keyFeature: "Taunting Shield" },
      { name: "Bastion Vanguard", description: "Gains health shields when hitting.", keyFeature: "Impact Shield" }
    ]
  },
  {
    name: "Jester of Fate",
    primaryStat: "CHA & DEX",
    hitDie: "d8",
    description: "Fighters who gamble on card pulls and dice rolls to strike.",
    subclasses: [
      { name: "Wild Card", description: "Throws cards that explode with elements.", keyFeature: "Card Throw" },
      { name: "Dice Gambler", description: "Rolls a d6 to trigger random buffs.", keyFeature: "Lucky Roll" },
      { name: "Fate Binder", description: "Forces the DM to reroll a natural 20.", keyFeature: "Fate Intercept" }
    ]
  },
  {
    name: "Forge Master",
    primaryStat: "STR & INT",
    hitDie: "d10",
    description: "Blacksmiths who construct mechanical weapons in combat.",
    subclasses: [
      { name: "Turret Builder", description: "Constructs automated firing turrets.", keyFeature: "Turret Deploy" },
      { name: "Armor Smith", description: "Adds temporary metal plating to armor.", keyFeature: "Plate Weld" },
      { name: "Goliath Smith", description: "Summons a giant metal combat fist.", keyFeature: "Goliath Fist" }
    ]
  },
  {
    name: "Void Reaver",
    primaryStat: "STR & WIS",
    hitDie: "d10",
    description: "Rift soldiers who consume mana and magic spells.",
    subclasses: [
      { name: "Mana Eater", description: "Gains HP when countering enemy spells.", keyFeature: "Spell Devour" },
      { name: "Rift Blade", description: "Sword strikes deal void damage.", keyFeature: "Void Edge" },
      { name: "Void Siphon", description: "Drains movement speed from targets.", keyFeature: "Phase Siphon" }
    ]
  }
];
