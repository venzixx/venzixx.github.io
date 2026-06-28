export interface Feat {
  name: string;
  type: 'Background' | 'General';
  category: 'Combat' | 'Magic' | 'Mobility' | 'Defense' | 'Utility';
  prerequisites?: string;
  description: string;
  benefit: string;
}

export const FEATS_DATABASE: Feat[] = [
  // ================= BACKGROUND FEATS =================
  {
    name: "The Gamer",
    type: "Background",
    category: "Utility",
    description: "You see the fantasy world with a semi-transparent HUD showing stats and percentages.",
    benefit: "You gain a +1 bonus to Initiative. Once per long rest, you can use a bonus action to 'Scan' a target, revealing their current HP percentage and primary damage weakness (if any)."
  },
  {
    name: "High-School Athlete",
    type: "Background",
    category: "Mobility",
    description: "You possessed exceptional physical stamina and agility in your former life.",
    benefit: "Your speed increases by 5 feet. You gain proficiency in Athletics and Acrobatics. When making a running jump, the distance you cover increases by 5 feet."
  },
  {
    name: "Medical Resident",
    type: "Background",
    category: "Utility",
    description: "You have a deep understanding of human anatomy and emergency healing.",
    benefit: "You gain proficiency in Medicine. When you restore hit points to a creature using a healer's kit, spell, or potion, they recover an additional 1d4 hit points."
  },
  {
    name: "Tech Specialist",
    type: "Background",
    category: "Utility",
    description: "Your analytical mind quickly adapts to complex magical runes and technology.",
    benefit: "You gain proficiency in Investigation. You can use your Intelligence modifier instead of Wisdom when making Perception checks to find traps or hidden magic circles."
  },
  {
    name: "Martial Arts Hobbyist",
    type: "Background",
    category: "Combat",
    description: "You practiced karate, boxing, or kendo in your spare time on Earth.",
    benefit: "Your unarmed strikes deal 1d4 + Strength modifier bludgeoning damage. You can make an unarmed strike as a bonus action when you take the Attack action on your turn."
  },
  {
    name: "Office Worker (Stressed)",
    type: "Background",
    category: "Defense",
    description: "You survived years of extreme mental fatigue, late nights, and corporate pressure.",
    benefit: "You gain advantage on saving throws against being Charmed or Frightened. Once per day, you can shrug off one level of Exhaustion."
  },
  {
    name: "Street Smart",
    type: "Background",
    category: "Mobility",
    description: "You know how to read shady people and navigate dark back-alleys.",
    benefit: "You gain proficiency in Insight and Stealth. You have advantage on Dexterity (Stealth) checks when attempting to hide in urban environments."
  },
  {
    name: "Conspiracy Theorist",
    type: "Background",
    category: "Utility",
    description: "You were always searching for hidden truths; now you're finally vindicated.",
    benefit: "You gain advantage on saving throws against Illusions. Your passive Perception increases by +3."
  },
  {
    name: "Lucid Dreamer",
    type: "Background",
    category: "Defense",
    description: "You had complete mastery over your own mind during REM sleep.",
    benefit: "You cannot be put to sleep by magical means. You only require 4 hours of rest to gain the benefits of a full Long Rest."
  },
  {
    name: "Heavy Sleeper",
    type: "Background",
    category: "Defense",
    description: "Your body recovers at a rapid rate when you manage to get actual deep sleep.",
    benefit: "Whenever you spend Hit Dice during a short rest to recover hit points, you roll the dice with advantage."
  },
  {
    name: "Hobbyist Chef",
    type: "Background",
    category: "Utility",
    description: "You spent your weekends cooking premium dishes. Fantasy ingredients are a dream come true.",
    benefit: "During a short rest, you can prepare meals for up to 6 allies. Anyone who eats a meal gains temporary hit points equal to your level + 1d4."
  },
  {
    name: "History Buff",
    type: "Background",
    category: "Utility",
    description: "You were obsessed with historical lore. You analyze fantasy ruins with ease.",
    benefit: "You gain proficiency in History. You have advantage on checks made to identify or understand runes, ancient history, or ancient items in the Summoned Realms."
  },
  {
    name: "Former Actor",
    type: "Background",
    category: "Utility",
    description: "You spent time on stage, learning how to lie, project your voice, and mimic others.",
    benefit: "You gain proficiency in Deception and Performance. You can mimic the speech and accent patterns of a person you have heard talking for at least 1 minute."
  },
  {
    name: "Survivalist",
    type: "Background",
    category: "Utility",
    description: "You loved camping and wilderness survival guides. Finding food is second nature.",
    benefit: "You gain proficiency in Survival. You have advantage on Wisdom (Survival) checks to forage for food and fresh water in wild environments."
  },
  {
    name: "High-Stakes Gambler",
    type: "Background",
    category: "Utility",
    description: "You loved card houses and dice casinos. Luck follows you around.",
    benefit: "Once per day, when you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."
  },
  {
    name: "Night Owl",
    type: "Background",
    category: "Utility",
    description: "You functioned best at 3 AM. The night is your comfortable domain.",
    benefit: "You gain advantage on Wisdom (Perception) checks during the night or in dark conditions. Your passive Perception increases by +2 while in darkness."
  },

  // ================= GENERAL FEATS: COMBAT =================
  {
    name: "Heavy Strike",
    type: "General",
    category: "Combat",
    prerequisites: "STR 13+",
    description: "You use gravity, weight, and muscle to crush opponents.",
    benefit: "Before you make a melee attack with a heavy weapon, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage."
  },
  {
    name: "Crushing Blow",
    type: "General",
    category: "Combat",
    prerequisites: "Heavy Strike feat, STR 15+",
    description: "Your heavy attacks hit with enough kinetic impact to knock enemies down.",
    benefit: "Once per turn, when you hit a creature with a melee attack using the Heavy Strike feat, the target must succeed on a Strength saving throw (DC = 8 + Strength mod + proficiency) or be knocked Prone."
  },
  {
    name: "Giant Slayer",
    type: "General",
    category: "Combat",
    prerequisites: "STR 15+",
    description: "You specialize in taking down gargantuan beasts and bosses.",
    benefit: "Your melee attacks deal an extra 1d6 damage against creatures that are Large or larger. Additionally, you have advantage on saving throws to resist being knocked prone or shoved by Large+ creatures."
  },
  {
    name: "Blade Dancer I",
    type: "General",
    category: "Combat",
    prerequisites: "DEX 13+",
    description: "You flow through the battlefield like water, weaving through guards.",
    benefit: "When you make a melee weapon attack against a creature, you don't provoke opportunity attacks from that creature for the rest of your turn, whether the attack hits or not."
  },
  {
    name: "Blade Dancer II",
    type: "General",
    category: "Combat",
    prerequisites: "Blade Dancer I feat, DEX 15+",
    description: "Your combat dance becomes so rapid that you can strike multiple times in motion.",
    benefit: "When you use your action to Dash on your turn, you can make one melee weapon attack as a bonus action at any point during your movement."
  },
  {
    name: "Dual-Wield Mastery",
    type: "General",
    category: "Combat",
    description: "You are an expert in offensive dual-weapon styles.",
    benefit: "You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand. You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren't light."
  },
  {
    name: "Dual-Wield Whirlwind",
    type: "General",
    category: "Combat",
    prerequisites: "Dual-Wield Mastery feat, DEX 15+",
    description: "You spin in a circle of steel, cutting all nearby enemies.",
    benefit: "As an action, you can make a single melee attack roll against all hostile creatures within 5 feet of you, comparing the result to each target's AC. You roll damage separately for each creature hit."
  },
  {
    name: "Marksman",
    type: "General",
    category: "Combat",
    description: "You have dead-eye accuracy with bows and ranged projectiles.",
    benefit: "Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls. Ranged weapon attacks ignore half cover and three-quarters cover."
  },
  {
    name: "Sharp Shooter",
    type: "General",
    category: "Combat",
    prerequisites: "Marksman feat, DEX 15+",
    description: "You know how to target vital weak points from afar.",
    benefit: "Your ranged weapon attacks score a critical hit on a roll of 19 or 20. Additionally, when you score a critical hit with a ranged weapon, you roll the weapon's damage dice three times instead of twice."
  },
  {
    name: "Shield Basher",
    type: "General",
    category: "Combat",
    prerequisites: "Proficiency with Shields",
    description: "You use your shield as an offensive bludgeoning weapon.",
    benefit: "When you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you using your shield."
  },
  {
    name: "Shield Vanguard",
    type: "General",
    category: "Combat",
    prerequisites: "Shield Basher feat, CON 13+",
    description: "You intercept blows meant for your allies behind your shield.",
    benefit: "When a creature within 5 feet of you is targeted by an attack, you can use your reaction to interpose your shield, adding your shield's AC bonus (+2) to the target's AC for that attack."
  },
  {
    name: "Berserker Fury",
    type: "General",
    category: "Combat",
    prerequisites: "STR 13+",
    description: "You channel pain and rage into combat velocity.",
    benefit: "As a bonus action, you can enter a fury that lasts for 1 minute. While in this state, you gain temporary hit points equal to your character level at the start of each of your turns, and deal +2 damage on melee weapon attacks."
  },
  {
    name: "Death Defiance",
    type: "General",
    category: "Combat",
    prerequisites: "Berserker Fury feat, CON 15+",
    description: "Your absolute fury refuses to let your body collapse.",
    benefit: "While your Berserker Fury is active, if you take damage that would reduce you to 0 hit points, you can make a CON saving throw (DC = 5 + the damage taken). On a success, you drop to 1 hit point instead."
  },

  // ================= GENERAL FEATS: MAGIC =================
  {
    name: "Spell Sniper",
    type: "General",
    category: "Magic",
    prerequisites: "Ability to cast at least one spell",
    description: "You can fire concentrated spell bolts from extreme ranges.",
    benefit: "The range of your spells that require an attack roll is doubled. Your spell attacks ignore half cover and three-quarters cover."
  },
  {
    name: "Spell Cannon",
    type: "General",
    category: "Magic",
    prerequisites: "Spell Sniper feat, INT 15+",
    description: "You pack immense magical payload into a single spell blast.",
    benefit: "Once per long rest, when you cast a spell that requires a spell attack roll and hits, you can double all damage dice rolled for the spell."
  },
  {
    name: "Core Overload",
    type: "General",
    category: "Magic",
    prerequisites: "INT 13+",
    description: "You push your magical mana core past its safe limits to deal extra damage.",
    benefit: "When you cast a spell that deals damage, you can choose to deal maximum damage. When you do so, you take force damage equal to twice the spell's level which cannot be reduced."
  },
  {
    name: "Core Stabilization",
    type: "General",
    category: "Magic",
    prerequisites: "Core Overload feat, INT 15+",
    description: "You learn how to channel mana feedback safely, protecting your organs.",
    benefit: "You take only half damage from executing your Core Overload feat. Additionally, you gain resistance to Force damage."
  },
  {
    name: "Catalyst Shield",
    type: "General",
    category: "Magic",
    prerequisites: "Ability to cast spells",
    description: "You shape leftover magical energy into a barrier when casting.",
    benefit: "When you cast a spell of 1st level or higher, you gain temporary hit points equal to your Intelligence modifier + the spell's level."
  },
  {
    name: "Catalyst Dome",
    type: "General",
    category: "Magic",
    prerequisites: "Catalyst Shield feat, INT 15+",
    description: "You expand your catalyst shield to protect surrounding allies.",
    benefit: "When you gain temporary hit points from your Catalyst Shield, you can choose to distribute an equal amount of temporary hit points to all friendly creatures within 10 feet of you."
  },
  {
    name: "Quickened Mind",
    type: "General",
    category: "Magic",
    prerequisites: "INT 15+",
    description: "Your brain operates at hyper-speeds, allowing faster spell chanting.",
    benefit: "Once per long rest, when you cast a spell that has a casting time of 1 action, you can change the casting time to 1 bonus action for this casting."
  },
  {
    name: "Chrono-Acceleration",
    type: "General",
    category: "Magic",
    prerequisites: "Quickened Mind feat, INT 17+",
    description: "You bend time around your mind, casting two full spells in seconds.",
    benefit: "Once per day, when you use your Quickened Mind feat to cast a spell as a bonus action, you can cast another spell of 1st level or higher as your action (ignoring standard rules)."
  },
  {
    name: "Spellsword Attunement",
    type: "General",
    category: "Magic",
    prerequisites: "STR 12, INT 12",
    description: "You are a master of blending metal and magic catalysts.",
    benefit: "You can use a melee weapon as a spellcasting catalyst. When you cast a cantrip that has a casting time of 1 action, you can make one melee weapon attack as a bonus action."
  },
  {
    name: "Spellsword Master",
    type: "General",
    category: "Magic",
    prerequisites: "Spellsword Attunement feat, STR 14, INT 14",
    description: "You channel full spell slots directly through weapon cuts.",
    benefit: "When you hit a creature with a melee weapon attack, you can expend one spell slot to deal an extra 1d8 force damage per level of the spell slot spent, up to a maximum of 5d8."
  },
  {
    name: "Cursed Mark",
    type: "General",
    category: "Magic",
    prerequisites: "INT 13+",
    description: "You place a dark, cursed rune on an enemy.",
    benefit: "As a bonus action, you curse a target you can see within 30 feet. For 1 minute, your spells and weapon attacks deal an extra 1d6 psychic damage to this target."
  },
  {
    name: "Domain Adept",
    type: "General",
    category: "Magic",
    prerequisites: "INT 15+",
    description: "You refine the space boundary of your pocket dimension.",
    benefit: "Your Domain Expansion lasts for an additional 1 minute. Additionally, you can select one ally when casting Domain Expansion; they are immune to the domain's environmental effects."
  },

  // ================= GENERAL FEATS: MOBILITY =================
  {
    name: "Wall Runner",
    type: "General",
    category: "Mobility",
    prerequisites: "DEX 13+",
    description: "You can run up vertical surfaces and walls.",
    benefit: "On your turn, you can run up vertical walls as if they were flat ground, up to a distance equal to your movement speed, before falling."
  },
  {
    name: "Gravity Defier",
    type: "General",
    category: "Mobility",
    prerequisites: "Wall Runner feat, DEX 15+",
    description: "Your speed allows you to run on ceilings and stick upside down briefly.",
    benefit: "You can run on ceilings as if they were flat ground. If you end your turn on a vertical wall or ceiling, you can expend 1 Cursed Energy point (or spell slot) to stick to the surface until the start of your next turn."
  },
  {
    name: "Blink Step",
    type: "General",
    category: "Mobility",
    prerequisites: "DEX 15+ or INT 13+",
    description: "You teleport short distances rather than physically walking.",
    benefit: "You can use a bonus action to teleport up to 15 feet to an unoccupied space you can see. You can do this a number of times equal to your proficiency bonus per long rest."
  },
  {
    name: "Dimensional Flicker",
    type: "General",
    category: "Mobility",
    prerequisites: "Blink Step feat, DEX 17+",
    description: "You teleport out of the path of danger as a reaction.",
    benefit: "When you are targeted by an attack, you can use your reaction to teleport up to 10 feet to an unoccupied space you can see, potentially causing the attack to miss if you exit its range."
  },
  {
    name: "Acrobat",
    type: "General",
    category: "Mobility",
    prerequisites: "DEX 13+",
    description: "You are incredibly agile and flexible.",
    benefit: "You gain advantage on Acrobatics checks. You can stand up from being prone using only 5 feet of your movement speed."
  },
  {
    name: "Slide Master",
    type: "General",
    category: "Mobility",
    prerequisites: "Acrobat feat, DEX 15+",
    description: "You slide underneath massive targets, slicing their underbellies.",
    benefit: "You can move through the space of hostile creatures that are Large or larger. When you slide through their space, you do not provoke opportunity attacks, and your next attack against them deals +2d6 damage."
  },
  {
    name: "Shadow Stalker",
    type: "General",
    category: "Mobility",
    description: "You blend into shadows and dark spots easily.",
    benefit: "You can attempt to hide even when you are only lightly obscured by dim light, heavy rain, mist, or foliage."
  },
  {
    name: "Shadow Merge",
    type: "General",
    category: "Mobility",
    prerequisites: "Shadow Stalker feat, DEX 15+",
    description: "You melt completely into darkness, becoming invisible.",
    benefit: "While in dim light or darkness, you can use an action to become Invisible. The invisibility ends if you make an attack, cast a spell, or enter bright light."
  },
  {
    name: "Fleet Footed",
    type: "General",
    category: "Mobility",
    description: "Your summoning process optimized your leg muscles for pure speed.",
    benefit: "Your movement speed increases by 10 feet. When you take the Dash action, difficult terrain does not cost you extra movement for that turn."
  },

  // ================= GENERAL FEATS: DEFENSE =================
  {
    name: "Iron Skin",
    type: "General",
    category: "Defense",
    prerequisites: "CON 13+",
    description: "Your skin has hardened to resist physical weapon cuts.",
    benefit: "While you are not wearing heavy armor, you gain a +1 bonus to AC. Additionally, you reduce all bludgeoning, piercing, and slashing damage you take by 2."
  },
  {
    name: "Adamantine Carapace",
    type: "General",
    category: "Defense",
    prerequisites: "Iron Skin feat, CON 15+",
    description: "Your skin becomes as dense as adamantine metal.",
    benefit: "Any critical hit against you becomes a normal hit. Additionally, you gain resistance to slashing damage."
  },
  {
    name: "Second Wind",
    type: "General",
    category: "Defense",
    description: "You can dig deep into your stamina reserves to heal.",
    benefit: "On your turn, you can use a bonus action to regain hit points equal to 1d10 + your character level. Once you use this feat, you must finish a short or long rest before using it again."
  },
  {
    name: "Indomitable Will",
    type: "General",
    category: "Defense",
    prerequisites: "Second Wind feat, CON 13+",
    description: "Your mental grit lets you shake off status effects.",
    benefit: "When you fail a saving throw against being stunned, paralyzed, charmed, or frightened, you can spend your Second Wind use to reroll the saving throw, keeping the new result."
  },
  {
    name: "Eldritch Vigor",
    type: "General",
    category: "Defense",
    description: "You absorb magical residue from spent spells to heal your body.",
    benefit: "Whenever you expend a spell slot of 1st level or higher, you immediately recover hit points equal to twice the level of the spell slot spent."
  },
  {
    name: "Soul Anchor",
    type: "General",
    category: "Defense",
    description: "Your soul is locked in space, resisting magical displacement.",
    benefit: "You cannot be teleported, banished, or moved against your will by magical spells or portals unless you choose to fail the saving throw."
  },

  // ================= GENERAL FEATS: UTILITY =================
  {
    name: "Fast Learner",
    type: "General",
    category: "Utility",
    description: "You pick up magic formulas and martial weapons rapidly.",
    benefit: "You gain proficiency in two skills of your choice. Additionally, learning new tool proficiencies or languages takes you half the standard time."
  },
  {
    name: "Scholar of the Rift",
    type: "General",
    category: "Utility",
    prerequisites: "Fast Learner feat, INT 13+",
    description: "You analyze magical items and rift anomalies instantly.",
    benefit: "You can cast the Identify spell once per day without expending a spell slot or material components. You gain proficiency in Arcana; if already proficient, you double your proficiency bonus."
  }
];
