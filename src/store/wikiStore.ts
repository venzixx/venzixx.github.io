import { FEATS_DATABASE } from '../data/featsData';
import { CLASSES_DATABASE } from '../data/classesData';
import { ANIME_CLASSES_DATABASE } from '../data/animeClassesData';

export interface InfoboxRow {
  label: string;
  value: string;
  isHeader?: boolean;
}

export interface InfoboxData {
  title: string;
  imagePlaceholder?: string;
  rows: InfoboxRow[];
}

export interface WikiPage {
  slug: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastModified: string;
}

export interface ParsedWikiPage {
  infobox: InfoboxData | null;
  cleanContent: string;
}

// Function to parse the Markdown content and extract the Fandom Infobox table at the top
export function parseWikiContent(content: string): ParsedWikiPage {
  const lines = content.split('\n');
  let inTable = false;
  const tableLines: string[] = [];
  let tableEndIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|')) {
      inTable = true;
      tableLines.push(line);
      tableEndIndex = i;
    } else if (inTable) {
      break;
    }
  }

  // Check if we found a table and it is an Infobox
  const isInfobox = tableLines.length > 0 && tableLines[0].toLowerCase().includes('infobox');

  if (isInfobox) {
    const titleMatch = tableLines[0].match(/\|[^:]*:\s*([^|]+)/);
    const title = titleMatch ? titleMatch[1].trim() : 'Infobox';
    
    const rows: InfoboxRow[] = [];
    let imagePlaceholder: string | undefined;

    // Skip header line (index 0) and separator line (index 1)
    for (let i = 2; i < tableLines.length; i++) {
      const line = tableLines[i];
      // Split by '|', filter out empty strings from boundaries
      const parts = line.split('|').map(p => p.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      if (parts.length === 1) {
        const val = parts[0];
        if (val.startsWith('**') && val.endsWith('**')) {
          rows.push({ label: '', value: val.replace(/\*\*/g, ''), isHeader: true });
        } else {
          rows.push({ label: '', value: val });
        }
      } else if (parts.length >= 2) {
        const label = parts[0].replace(/\*\*/g, '');
        const value = parts[1];
        if (label.toLowerCase() === 'image') {
          imagePlaceholder = value;
        } else {
          rows.push({ label, value });
        }
      }
    }

    const cleanContent = lines.slice(tableEndIndex + 1).join('\n').trim();
    return {
      infobox: { title, imagePlaceholder, rows },
      cleanContent
    };
  }

  return {
    infobox: null,
    cleanContent: content
  };
}

// Convert a page title to a URL-friendly slug
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper to preprocess wiki markdown, converting [[Page Title]] or [[Page Title|Display]] to ReactMarkdown hashes
export function preprocessMarkdown(text: string): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_, p1) => {
    const parts = p1.split('|');
    const target = parts[0].trim();
    const display = parts[1] ? parts[1].trim() : target;
    const slug = slugify(target);
    return `[${display}](#/page/${slug})`;
  });
}

function generateBackgroundFeatsContent(): string {
  const bgFeats = FEATS_DATABASE.filter(f => f.type === 'Background');
  
  let md = `| Infobox: Background Feats |
| --- | --- |
| Image | [Symbol: An open pocketwatch reflecting two different worlds] |
| **Acquisition** | Character Creation Only |
| **Maximum Limit** | 1 per character |
| **Upgradable** | No |
| **Effect Type** | Passive bonuses & starting traits |

**Background Feats** represent the unique training, profession, or state of mind your character possessed on Earth before being summoned, or the immediate adaptation trait gifted by the portal.

> [!IMPORTANT]
> Background feats can **only** be selected at Level 1 (Character Creation). Once selected, you cannot swap them, and you cannot gain more background feats later in the campaign.

## Contents
* [[#Rules & Restrictions]]
* [[#Seeded Background Feats]]

## Rules & Restrictions
Every summoned player selects exactly **one** background feat at character creation. You cannot gain more background feats later.

## Seeded Background Feats
`;

  bgFeats.forEach((feat, index) => {
    md += `\n### ${index + 1}. ${feat.name}\n`;
    md += `* **Description**: ${feat.description}\n`;
    md += `* **Benefit**: ${feat.benefit}\n`;
  });

  md += `\nCategories: Feats | Rules | Backgrounds`;
  return md;
}

function generateGeneralFeatsContent(): string {
  const generalFeats = FEATS_DATABASE.filter(f => f.type === 'General');
  
  const categories: Record<string, typeof generalFeats> = {
    'Combat': [],
    'Magic': [],
    'Mobility': [],
    'Defense': [],
    'Utility': []
  };
  
  generalFeats.forEach(f => {
    if (categories[f.category]) {
      categories[f.category].push(f);
    }
  });

  let md = `| Infobox: General Feats |
| --- | --- |
| Image | [Icon: A shield and sword crossed under a burning star] |
| **Acquisition** | Level 4, 8, 12, 16, 19 |
| **Categories** | Combat, Magic, Mobility, Defense, Utility |
| **Requirements** | Varied (Stats / Level / Other Feats) |

General feats are talents and abilities that players can select instead of an Ability Score Increase (ASI) at levels 4, 8, 12, 16, and 19.

Here is the categorized database of standard campaign feats:

## Contents
* [[#Combat Feats]]
* [[#Magic Feats]]
* [[#Mobility Feats]]
* [[#Defense Feats]]
* [[#Utility Feats]]

`;

  Object.keys(categories).forEach(cat => {
    md += `\n## ${cat} Feats\n`;
    const list = categories[cat];
    if (list.length === 0) {
      md += `*No feats registered in this category.*\n`;
    } else {
      list.forEach(feat => {
        md += `\n### ${feat.name}\n`;
        if (feat.prerequisites) {
          md += `* **Prerequisite**: *${feat.prerequisites}*\n`;
        } else {
          md += `* **Prerequisite**: *None*\n`;
        }
        md += `* **Description**: ${feat.description}\n`;
        md += `* **Benefit**: ${feat.benefit}\n`;
      });
    }
    md += `\n---\n`;
  });

  md += `\nCategories: Feats | Magic | Combat | Guides`;
  return md;
}

function generateInnateTechniquesContent(): string {
  return `| Infobox: Innate Techniques |
| --- | --- |
| Image | [Icon: A raw crystal channeling positive and negative forces] |
| **System** | Custom Powers |
| **Primary Attribute** | Determined by power theme |
| **Cursed Energy Pool** | Level + INT Modifier |
| **DM Review** | Required for balancing |

When you are summoned to the Summoned Realms, your soul manifests a unique **Innate Technique**. This technique forms the core of your combat identity and magic abilities.

## Contents
* [[#How Techniques Work]]
* [[#Stat Scaling & Roles]]

## How Techniques Work
Unlike standard D&D, players in this campaign are not constrained by traditional class spells. Instead, you design a custom **Innate Technique** corresponding to your character's backstory, personality, or an anime power (e.g. fire generation, shadow summon, kinetic absorption).
* Your technique requires Cursed Energy (CE) to cast.
* Your Cursed Energy pool equals **Level + Intelligence Modifier** (minimum of 1).
* You must cooperate with the Dungeon Master to balance active spell slots, DCs, and range calculations.

## Stat Scaling & Roles
Your six core D&D stats govern how your Cursed Energy, techniques, and combat role function:

### Strength (STR)
* **Primary Focus**: Melee physical damage, heavy weapon mastery, kinetic force.
* **Core Role**: Melee DPS. Scales blunt impacts, physical throw ranges, and allows breaking of physical barriers.

### Dexterity (DEX)
* **Primary Focus**: Reflexes, speed, armor class scaling, projectile pathing.
* **Core Role**: Ranged DPS / High Mobility. Powers web-slinging, wall-running, and high-speed blink step dashes.

### Constitution (CON)
* **Primary Focus**: Hit point pools, defense blocks, health recovery.
* **Core Role**: Tanking / Healing. Scales maximum health reserves, active barrier defense absorptions, and healing recovery multipliers.

### Intelligence (INT)
* **Primary Focus**: Magic potency, barrier geometry formulas, cursed energy pools.
* **Core Role**: Magic DPS / AoE Control. Governs spell slot progression, spell save DCs, and Domain Expansions.

### Wisdom (WIS)
* **Primary Focus**: Spiritual perception, rune scanning, illusion detection.
* **Core Role**: Scout / Sensory Buffs. Powers scanning targets for weaknesses, sensing magical portals, and resists mental curses.

### Charisma (CHA)
* **Primary Focus**: Aura projection, summoning pacts, binding vows.
* **Core Role**: Shikigami Summoning / Buffing. Scales your summoned beasts' action modifiers and improves the value of active Binding Vows.

Categories: Classes | Rules | Guides`;
}

function generateClassesPageContent(): string {
  let md = `| Infobox: Classes & Subclasses |
| --- | --- |
| Image | [Icon: Glowing runes representing various character class archetypes] |
| **System** | Fluid Archetypes |
| **Classes Count** | ${CLASSES_DATABASE.length} |
| **Subclasses Count** | ${CLASSES_DATABASE.reduce((acc, c) => acc + c.subclasses.length, 0)} |
| **Custom Innate Techniques** | Pre-approved by DM |

Unlike standard D&D where class features are strictly locked, this campaign utilizes **Fluid Archetypes** determined by your stats and your chosen **Innate Technique**. Here you can find the comprehensive compendium of all starting classes and subclasses.

## Contents
* [[#How Classes Work]]
* [[#Stat Scaling & Roles]]
* [[#Master Classes Database]]
`;

  // Add all classes to contents
  CLASSES_DATABASE.forEach(c => {
    md += `* [[#${c.name}]]\n`;
  });

  md += `
## How Classes Work
When you are summoned, your soul manifests a unique class archetype and an **Innate Technique**. Your core D&D stats govern how your abilities scale. See [[Stats & Scaling]] for details on stat allocations.

## Stat Scaling & Roles
Your six core D&D stats govern how your Cursed Energy, techniques, and combat role function:

### Strength (STR)
* **Primary Focus**: Melee physical damage, heavy weapon mastery, kinetic force.
* **Core Role**: Melee DPS. Scales blunt impacts, physical throw ranges, and allows breaking of physical barriers.

### Dexterity (DEX)
* **Primary Focus**: Reflexes, speed, armor class scaling, projectile pathing.
* **Core Role**: Ranged DPS / High Mobility. Powers web-slinging, wall-running, and high-speed blink step dashes.

### Constitution (CON)
* **Primary Focus**: Hit point pools, defense blocks, health recovery.
* **Core Role**: Tanking / Healing. Scales maximum health reserves, active barrier defense absorptions, and healing recovery multipliers.

### Intelligence (INT)
* **Primary Focus**: Magic potency, barrier geometry formulas, cursed energy pools.
* **Core Role**: Magic DPS / AoE Control. Governs spell slot progression, spell save DCs, and Domain Expansions.

### Wisdom (WIS)
* **Primary Focus**: Spiritual perception, rune scanning, illusion detection.
* **Core Role**: Scout / Sensory Buffs. Powers scanning targets for weaknesses, sensing magical portals, and resists mental curses.

### Charisma (CHA)
* **Primary Focus**: Aura projection, summoning pacts, binding vows.
* **Core Role**: Shikigami Summoning / Buffing. Scales your summoned beasts' action modifiers and improves the value of active Binding Vows.

---

## Master Classes Database
Below are all the classes available for players, along with their specialized subclasses:
`;

  CLASSES_DATABASE.forEach(c => {
    md += `\n### ${c.name}\n`;
    md += `* **Primary Stat**: **${c.primaryStat}**\n`;
    md += `* **Hit Die**: **${c.hitDie}**\n`;
    md += `* **Description**: ${c.description}\n`;
    md += `\n#### Subclasses of ${c.name}:\n`;
    
    c.subclasses.forEach(sub => {
      md += `- **${sub.name}**: ${sub.description} *(Key Feature: ${sub.keyFeature})*\n`;
    });
    
    md += `\n---\n`;
  });

  md += `\nCategories: Classes | Rules | Guides`;
  return md;
}

function generateAnimeClassesPageContent(): string {
  let md = `| Infobox: Anime Classes |
| --- | --- |
| Image | [Icon: A glowing portal displaying various anime runes] |
| **Origins** | Overlord, Tensura, Log Horizon, JJK, Mushoku Tensei |
| **Classes Count** | ${ANIME_CLASSES_DATABASE.length} |
| **Subclasses Count** | ${ANIME_CLASSES_DATABASE.reduce((acc, c) => acc + c.subclasses.length, 0)} |
| **System** | Reincarnation & Summon Archetypes |

These specialized classes represent legendary character archetypes from popular anime and isekai universes, molded by the Goddess of the Rift for summoned players.

## Contents
* [[#Summoning Reincarnations]]
`;

  ANIME_CLASSES_DATABASE.forEach(c => {
    md += `* [[#${c.name} (${c.animeOrigin})]]\n`;
  });

  md += `
## Summoning Reincarnations
Players who choose an Anime Class are summoned with core soul attributes corresponding to characters from these legendary worlds. These classes scale with your D&D stats and allow you to manifest signature abilities (such as *Predator*, *World Break*, or *Infinity Barrier*).

---
`;

  ANIME_CLASSES_DATABASE.forEach(c => {
    md += `\n## ${c.name} (${c.animeOrigin})\n`;
    md += `* **Primary Stat**: **${c.primaryStat}**\n`;
    md += `* **Hit Die**: **${c.hitDie}**\n`;
    md += `* **Description**: ${c.description}\n`;
    md += `\n### Subclasses of ${c.name}:\n`;
    
    c.subclasses.forEach(sub => {
      md += `- **${sub.name}**: ${sub.description} *(Key Feature: ${sub.keyFeature})*\n`;
    });
    
    md += `\n---\n`;
  });

  md += `\nCategories: Anime Classes | Classes | Lore | Rules`;
  return md;
}

// Seed data
const SEED_PAGES: WikiPage[] = [
  {
    slug: 'main-page',
    title: 'Main Page',
    category: 'Home',
    tags: ['welcome', 'rules', 'campaign'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: The Summoned Realms |
| --- | --- |
| Image | [Campaign Logo: Isekai Magic Portal] |
| **System** | D&D 5e (Homebrew) |
| **Campaign Theme** | Magician Summoning (Isekai) |
| **Primary Scaling** | Attribute-based Skills |
| **Level Limit** | 20 |
| **Magic Level** | High |

Welcome to the **Summoned Realms Wiki**, the central database for our custom Dungeons & Dragons 5e homebrew campaign. 

In this campaign, normal people from Earth are suddenly summoned to a parallel fantasy realm. However, rather than arriving empty-handed, they awaken as **Magicians** or specialized fighters, gifted with unique powers. Each summon has an [[Innate Techniques|Innate Technique]] of their choosing, which shapes their entire fighting style and scales according to their core stats.

## Contents
* [[Character Creation]] — Step-by-step instructions on rolling your hero.
* [[Races]] — Adaptability templates and racial feats.
* [[Stats & Scaling]] — How strength, dexterity, and intelligence impact your abilities.
* [[Background Feats]] — Essential starting feats representing your background.
* [[Feats]] — The master list of 100+ feats categorized by playstyle.
* [[Innate Techniques]] — How custom powers work and scale with stats.
* [[Classes]] — The master list of 42 homebrew classes and 126 subclasses.
* [[Anime Classes]] — Playable classes and subclasses from popular anime.
* [[Weapons & Gear]] — Homebrew weapon rules and items.
* [[Alignment]] — How good, neutral, and evil alignments govern reputation.
* [[Kingdoms & Lore]] — Roll a d4 to see where your group spawns!

## The World Rules
Unlike typical D&D, classes are fluid. Your abilities are directly defined by your **Innate Technique** and your core statistics:
* **Magic Potency**: Governed by [[Stats & Scaling|Intelligence]].
* **Physical Prowess**: Governed by [[Stats & Scaling|Strength]].
* **Mobility & Reflexes**: Governed by [[Stats & Scaling|Dexterity]].
* **Hybrid Classes**: Splitting points creates hybrid archetypes like the **Mageblade** (STR + INT).

> "You were summoned not to fit into this world's boxes, but to break them with your own rules." — Archmage Valthor (to the Summons)

Categories: Home | Rules | System`
  },
  {
    slug: 'character-creation',
    title: 'Character Creation',
    category: 'Guides',
    tags: ['guide', 'creation', 'steps'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: Character Creation |
| --- | --- |
| Image | [Symbol: An empty character sheet glowing with golden magic] |
| **Phase** | Phase 1: Setup |
| **Core Method** | 4d6 Roll / Standard Array |
| **Technique Type** | Chosen Innate Technique |
| **Starting Feats** | 1 Background Feat |
| **Initial Level** | Level 1 |

Welcome to the step-by-step beginner's guide to creating your summoned character in the Summoned Realms campaign. Follow these simple steps to build your hero.

## Contents
* [[#Step 1: Roll or Assign Your Stats]]
* [[#Step 2: Prioritize Stats for Your Build]]
* [[#Step 3: Define Your Innate Technique]]
* [[#Step 4: Pick a Starting Background Feat]]
* [[#Step 5: Equip Weapons & Gear]]

---

## Step 1: Roll or Assign Your Stats
Your character is defined by six core stats: **Strength (STR)**, **Dexterity (DEX)**, **Constitution (CON)**, **Intelligence (INT)**, **Wisdom (WIS)**, and **Charisma (CHA)**. 

### Method A: Rolling Dice (The 4d6 Method)
This is the most popular method for determining stats:
1. Roll **four 6-sided dice (d6)**.
2. Remove the **lowest** number.
3. **Add the remaining three numbers** together. This gives you a score between 3 and 18.
4. *Example:* You roll: 6, 4, 3, and 1. You remove the 1 (lowest). Your score is \`6 + 4 + 3 = 13\`.
5. Repeat this process **six times** so you have six numbers (e.g. 15, 14, 13, 12, 10, 8). 
6. Assign these numbers to your six core stats.

### Method B: The Standard Array
If you prefer not to roll, you can use these six preset numbers: **15, 14, 13, 12, 10, and 8**. Assign one number to each of your stats.

### What do the scores mean?
* **8 - 9**: Below Average (a weak point)
* **10 - 11**: Average Human
* **12 - 15**: Exceptional (highly skilled)
* **16 - 19**: Superhuman
* **20 - 22**: God-like Peak (22 is the absolute maximum limit)

### Modifiers: The Real Numbers
Your score determines your **Ability Modifier**. This is the number you actually add to your dice rolls during the game.
* Score of **8-9** = \`-1\` modifier
* Score of **10-11** = \`+0\` modifier
* Score of **12-13** = \`+1\` modifier
* Score of **14-15** = \`+2\` modifier
* Score of **16-17** = \`+3\` modifier
* Score of **18-19** = \`+4\` modifier
* Score of **20-21** = \`+5\` modifier
* Score of **22** = \`+6\` modifier

---

## Step 2: Prioritize Stats for Your Build
Which stats should you put your highest numbers into? This depends on your preferred character archetype. Review [[Classes & Techniques]] for more info:

| Archetype | Highest Stats | Dump Stats (Lowest) | Role & Strategy |
| --- | --- | --- | --- |
| **The Juggernaut** | **STR**, **CON** | INT, CHA | Heavy frontline tank and heavy weapon dealer. Absorbs damage and hits extremely hard. |
| **The Spellcaster** | **INT**, **CON** | STR | Casts powerful cursed energy spells, summons portals, and refines Domain Expansions. |
| **The Agile Skirmisher** | **DEX**, **WIS** | STR | Highly mobile assassin or wall-crawler. Relies on speed, high Armor Class (AC), and dodge steps. |
| **The Mageblade** | **STR**, **INT** | CHA | Battle-mage hybrid. Imbues sword strikes with active spell slots. |
| **The Commander** | **CHA**, **DEX** | STR | Summons spectral Shikigami beasts and binds them to attack allies or enemies. |

---

## Step 3: Define Your Innate Technique
When you are summoned, your soul manifests a unique **Innate Technique**. Unlike standard D&D, this can be custom-made:
* Work with the Dungeon Master to write down your technique.
* Align it with the stats you chose in **Step 2**. If you want a fire-based summon spell, prioritize Charisma. If you want a physical speed technique, prioritize Dexterity.

---

## Step 4: Pick a Starting Background Feat
Your character gets exactly **one** free [[Background Feats|Background Feat]] at Level 1:
* This represents your previous life on Earth (e.g. \`Medical Resident\`, \`High-School Athlete\`, \`The Gamer\`).
* Choose a feat that complements your archetype. For example, \`Martial Arts Hobbyist\` is great for physical fighters, while \`Tech Specialist\` is excellent for puzzle solvers.
* **Homebrew Note**: If none of the background feats fit your character's Earth job or concept, talk to the Dungeon Master! You can design a custom background feat tailored to your backstory, subject to DM approval.
* **Important**: You can never change this feat or get another background feat later!

---

## Step 5: Equip Weapons & Gear
Choose one starting weapon or spell catalyst from [[Weapons & Gear]] and pack basic traveler's supplies. You are now ready to begin your journey in the Summoned Realms!

Categories: Guides | Character Creation | Rules`
  },
  {
    slug: 'stats-scaling',
    title: 'Stats & Scaling',
    category: 'Rules',
    tags: ['rules', 'stats', 'scaling'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: Stats & Archetypes |
| --- | --- |
| Image | [Icon: A balance scale comparing a glowing sword and a magic rune] |
| **Primary Stats** | Strength, Dexterity, Intelligence |
| **Hybrid Builds** | Mageblade, Monk-Catalyst |
| **Stat Points Cap** | 20 (base) |
| **Scaling Factors** | Core Techniques, Weapon damage |

Your ability scores are not just passive numbers—they actively shape your abilities and decide what techniques you can execute.

## Contents
* [[#Strength (STR)]]
* [[#Intelligence (INT)]]
* [[#Dexterity (DEX)]]
* [[#Hybrid Scaling (Mageblade)]]

## Strength (STR)
Governs heavy physical damage, melee mastery, and heavy armor compliance.
* **Melee Weapon Damage**: Adds to all STR-based weapon attacks.
* **Technique Scaling**: Supports techniques that involve shockwaves, earth rupture, gravity control over one's own body, or dense muscle armor.
* **Archetype**: *Berserker*, *Juggernaut*, *Martial Vanguard*.

## Intelligence (INT)
Governs spell slot progression, spell save DC, and magical knowledge.
* **Magic Potency**: Adds to spell attack rolls and magic damage.
* **Technique Scaling**: Controls techniques like elemental summoning, barrier creation, mental illusion, or *Cursed Energy* manipulation.
* **Archetype**: *Grand Sorcerer*, *JJK-style Occultist*.

## Dexterity (DEX)
Governs movement speed, initiative, acrobatics, and ranged attacks.
* **Mobility**: Directly improves dodge chance (AC) and physical reflexes.
* **Technique Scaling**: Scaled for high-speed techniques, shadow-stepping, wall-crawling, or web-slinging (*Spider-Man style*).
* **Archetype**: *Shadow Assassin*, *Web-Slinger*, *Wind Runner*.

## Hybrid Scaling (Mageblade)
By balancing stats, you unlock advanced hybrid archetypes:
* **Mageblade (STR + INT)**: Allows you to channel spell slots directly into physical sword strikes. Your attack scales with both stats.
* **Acrobatic Trickster (DEX + INT)**: Casts spells while wall-running or performing high-speed maneuvers.

Categories: Rules | Stats | Combat`
  },
  {
    slug: 'background-feats',
    title: 'Background Feats',
    category: 'Feats',
    tags: ['feats', 'background', 'creation'],
    lastModified: new Date().toLocaleDateString(),
    content: generateBackgroundFeatsContent()
  },
  {
    slug: 'feats',
    title: 'Feats',
    category: 'Feats',
    tags: ['feats', 'combat', 'magic', 'utility'],
    lastModified: new Date().toLocaleDateString(),
    content: generateGeneralFeatsContent()
  },
  {
    slug: 'innate-techniques',
    title: 'Innate Techniques',
    category: 'Classes',
    tags: ['classes', 'techniques', 'scaling'],
    lastModified: new Date().toLocaleDateString(),
    content: generateInnateTechniquesContent()
  },
  {
    slug: 'classes',
    title: 'Classes',
    category: 'Classes',
    tags: ['classes', 'archetypes', 'subclasses'],
    lastModified: new Date().toLocaleDateString(),
    content: generateClassesPageContent()
  },
  {
    slug: 'weapons-gear',
    title: 'Weapons & Gear',
    category: 'Gear',
    tags: ['weapons', 'gear', 'items'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: Weapons & Catalysts |
| --- | --- |
| Image | [Icon: A heavy iron broadsword and a crystal spell catalyst] |
| **Types** | Physical Weapons, Magical Catalysts |
| **Customization** | Rune Inlays |
| **Primary Stats** | STR (Physical), DEX (Ranged), INT (Catalysts) |
| **Scaling Mechanics** | Stat modifiers add to attack & damage |

Summons have access to traditional physical weapons as well as specialized magical catalysts that channel their Innate Techniques.

## Contents
* [[#Melee Weapons]]
* [[#Ranged & Finesse Weapons]]
* [[#Magical Catalysts]]

## Melee Weapons
Melee weapons scale primarily with **Strength (STR)**.
* **Colossal Greatsword**: Deals 2d6 + STR slashing damage. Requires STR 15 to wield. Hits deal double damage to structural objects or barriers.
* **Spiked Mace**: Deals 1d8 + STR bludgeoning damage. On a critical hit, the target must make a CON saving throw or be Stunned until the start of your next turn.
* **Katana**: Deals 1d8 + STR (or DEX) slashing damage. Finesse, versatile (1d10).

## Ranged & Finesse Weapons
Ranged and finesse weapons scale primarily with **Dexterity (DEX)**.
* **Recurve Bow**: Deals 1d8 + DEX piercing damage. Range 150/600 ft.
* **Throwing Daggers**: Deals 1d4 + DEX piercing damage. Finesse, light, thrown (range 20/60 ft.). When thrown from stealth, you deal an additional 1d6 sneak attack damage.

## Magical Catalysts
Magical Catalysts do not deal physical damage, but they increase spell efficiency and scale with **Intelligence (INT)**.
* **Orb of Focus**: Adds +1 to spell attack rolls. Once per short rest, you can restore one expended 1st-level spell slot.
* **Crystalline Staff**: Increases the save DC of your spells by +1.
* **Rune Grimoire**: Allows you to store one spell of 1st or 2nd level inside. You can cast this stored spell once per long rest without expending a spell slot.

Categories: Gear | Combat | Rules`
  },
  {
    slug: 'races',
    title: 'Races',
    category: 'Races',
    tags: ['races', 'racial-feats', 'creation'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: Races & Racial Feats |
| --- | --- |
| Image | [Icon: A DNA helix merging into glowing fantasy runes] |
| **Summoning Origin** | Goddess's Crucible |
| **Available Races** | Human, Elf, Dwarf, Beast-Kin, Construct |
| **Racial Feats Cost** | 2 Ability Score Points (ASI Trade) |
| **Stat Modifiers** | Included automatically on body form |

In this campaign, you do not select standard D&D fantasy races. When you are summoned from Earth, the Goddess of the Rift molds your physical form to survive the Summoned Realms.

## Contents
* [[#Available Races]]
* [[#Racial Feats]]

## Available Races

### 1. Summoned Human
Summoned from Earth, you retain your human spirit but gain high adaptability.
* **Stat Bonuses**: +1 to all six ability scores.
* **Adapative Talent**: You gain 1 extra General Feat of your choice at Level 1.

### 2. Rift Elf
Your body is infused with ambient rift mana, rendering you swift, slender, and magically sensitive.
* **Stat Bonuses**: +2 Dexterity, +1 Intelligence.
* **Racial Traits**: Darkvision (60 ft.), Advantage on saving throws against being Charmed, and magic cannot put you to sleep.

### 3. Obsidian Dwarf
Your muscle and bone structure are compressed with heavy obsidian volcanic force.
* **Stat Bonuses**: +2 Constitution, +1 Strength.
* **Racial Traits**: Poison Resistance (advantage on saves and half damage), proficiency with heavy armor.

### 4. Beast-Kin
Your soul is merged with local forest beast spirits, granting you raw animalistic features (claws, tails, ears).
* **Stat Bonuses**: +2 Strength (or Dexterity), +1 Wisdom.
* **Racial Traits**: Base movement speed increases to 40 feet, and your claws deal 1d6 + STR (or DEX) slashing damage on unarmed strikes.

### 5. Construct Summon
Your soul is bound to a mechanical automaton body built of stone, gearworks, and mana cores.
* **Stat Bonuses**: +2 Constitution, +1 Intelligence.
* **Racial Traits**: Immune to poison damage, you do not need to eat, drink, breathe, or sleep.

---

## Racial Feats
When your character gains an Ability Score Increase (ASI) at level 4, 8, 12, 16, or 19, you can choose to trade your **2 stat points** to buy one of these powerful racial feats:

### Human Feats
* **Earthling Ingenuity**: Once per short rest, when you fail an Intelligence-based check or tool check, you can reroll it with advantage.
* **Adrenaline Rush**: When your health drops below 25% of your maximum HP, you immediately gain one extra Bonus Action that you can use on your current turn.

### Elf Feats
* **Mana Phase**: As a bonus action, you can teleport up to 30 feet to an unoccupied space you can see. Once you use this, you must finish a short or long rest.
* **Glow Sight**: You can see invisible creatures and hidden portals within 15 feet of you.

### Dwarf Feats
* **Volcanic Blood**: You gain resistance to Fire damage. Additionally, when a creature hits you with a melee attack, you can use your reaction to deal 2d6 fire damage back to them.
* **Stony Stance**: You cannot be knocked Prone or pushed against your will by physical attacks or spells.

### Beast-Kin Feats
* **Primal Senses**: You gain proficiency in Perception and Survival. You also have advantage on Initiative rolls.
* **Apex Predator**: You deal an extra 1d6 damage on your attacks when you attack a target from a higher elevation or from hiding.

### Construct Feats
* **Overclock**: Once per long rest, you can activate your mana core as a bonus action. For 1 minute, your movement speed is doubled, and you gain a +2 bonus to AC.
* **Integrated Armor**: Your metal plating hardens. You gain a permanent +1 bonus to your Armor Class (AC).

Categories: Races | Rules | Character Creation`
  },
  {
    slug: 'alignment',
    title: 'Alignment',
    category: 'Rules',
    tags: ['rules', 'alignment', 'morality'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: Moral Alignment |
| --- | --- |
| Image | [Icon: A balance scale weighing a burning star against dark smoke] |
| **Primary Axes** | Good vs. Evil / Lawful vs. Chaotic |
| **NPC Interactions** | Scales based on Alignment choice |
| **Goddess Reactions** | Reacts to extreme evil alignments |
| **System** | Roleplay guidelines & Reputation |

Alignment represents your character's moral code, outlook on life, and how they behave towards the inhabitants of the Summoned Realms.

## Contents
* [[#Good vs. Bad (Evil)]]
* [[#Lawful vs. Chaotic]]
* [[#Reputation & Kingdom Reaction]]

## Good vs. Bad (Evil)

### Good
* **Definition**: You value life, show compassion, and use your summoned power to protect the native citizens of the realms.
* **In-Game Play**: Helping villagers, refusing rewards from the poor, fighting monsters to protect settlements.

### Neutral
* **Definition**: You are pragmatic. Your primary concern is the safety of your group of friends and finding a way back to Earth. You do good when it is convenient but don't go out of your way to be a martyr.
* **In-Game Play**: Focusing on quests that offer portal clues, staying out of local wars.

### Evil (Bad)
* **Definition**: You are selfish and power-hungry. You view your summoning as a license to act without Earth consequences, using your Innate Technique to exploit or control others.
* **In-Game Play**: Demanding extreme prices for help, using curses on villagers, or abandoning teammates for loot.
* > [!WARNING]
  * > The Goddess of the Rift watches all summons. If a player acts with extreme cruelty, the Goddess's favor decreases, which can result in divine penalties or hexes.

---

## Lawful vs. Chaotic

### Lawful
* **Definition**: You believe in order, laws, and the promises you make. You respect the Goddess's rules and the governing authorities of the kingdoms.

### Neutral
* **Definition**: You judge situations on a case-by-case basis. You follow laws that make sense but aren't afraid to break minor rules if they block your goals.

### Chaotic
* **Definition**: You value absolute personal freedom. You act on whim, emotion, or instinct. You despise rulers, kings, and authority figures.

---

## Reputation & Kingdom Reaction
Your alignment directly scales your reputation:
* **Lawful Good** summons gain instant favor with Aethelgard (The Radiant Empire) but are hated in Shadowfen.
* **Chaotic Evil** summons gain black market access in Shadowfen but will be hunted on sight in Aethelgard.

Categories: Rules | Guides | Character Creation`
  },
  {
    slug: 'kingdoms',
    title: 'Kingdoms & Lore',
    category: 'Lore',
    tags: ['lore', 'kingdoms', 'spawning'],
    lastModified: new Date().toLocaleDateString(),
    content: `| Infobox: The Summoned Kingdoms |
| --- | --- |
| Image | [Map: Four kingdoms bordering a giant glowing energy rift] |
| **Summoning Origin** | Goddess's Throne Room |
| **Destination Roll** | 1d4 Die Roll |
| **Spawn Rule** | Spawns in rolled location immediately |
| **Number of Kingdoms** | 4 |

Before being sent to the surface, the Goddess of the Rift makes the group of friends roll a **d4** (four-sided die). The outcome of this roll determines the kingdom you spawn and reside in.

## Contents
* [[#The Summoning Ritual]]
* [[#The Kingdom Roll Table]]
* [[#Kingdom Details]]

## The Summoning Ritual
1. **The Goddess's Crucible**: The Goddess creates your character sheet (Stats, Race, Feats, and Innate Technique).
2. **The Kingdom Roll**: One player rolls a **d4** on behalf of the group of friends.
3. **The Spawning Gate**: The portal opens, and the entire group spawns together at the starting tavern of the rolled kingdom.

---

## The Kingdom Roll Table

| d4 Roll | Spawn Kingdom | Vibe & Environment | Starting Advantage |
| --- | --- | --- | --- |
| **1** | [[#1. Aethelgard]] | Radiant Castle, Holy Knights, Safe | +1 starting potion of healing |
| **2** | [[#2. Ironcrest]] | Volcanic Peaks, Steam-Tech, Industrial | Free basic shield or tool kit |
| **3** | [[#3. Whisperwind]] | Mystical Woodlands, Elves, Nature | Advantage on survival checks in forests |
| **4** | [[#4. Shadowfen]] | Gothic Swamps, Necromancers, Rogue | Access to shadow market items |

---

## Kingdom Details

### 1. Aethelgard (The Radiant Empire)
* **Vibe**: A classic high-fantasy kingdom of holy light, grand stone castles, and towering cathedrals.
* **Government**: Rulership by Emperor Aethelred and the Sun Church.
* **Environment**: Safe, patrolled roads, fertile plains. Very welcoming to lawful and good summons.

### 2. Ironcrest (The Volcanic Keep)
* **Vibe**: A massive industrial mountain kingdom powered by steam, geothermal heat, and magma forge works.
* **Government**: A council of Dwarf Guildmasters.
* **Environment**: Smoke-filled skies, underground caverns, volcanic slopes. Rich in metals, gems, and tech blueprints.

### 3. Whisperwind (The Forest Sanctum)
* **Vibe**: A wild, ancient forest region untouched by stone cities. Homes are built on giant tree branches.
* **Government**: The Druid High Circle.
* **Environment**: Giant redwoods, glowing mushrooms, hidden magical ruins. Full of dangerous beasts and ancient magic.

### 4. Shadowfen (The Dark Hollows)
* **Vibe**: A foggy, gothic swamp territory where the law of kings does not reach.
* **Government**: A syndicate of rogue summoners, dark occultists, and crime lords.
* **Environment**: Murky waters, poisonous vapors, ancient ruins. Dangerous for beginners, but offers forbidden spells and powerful dark gear.

Categories: Lore | Rules | Guides`
  },
  {
    slug: 'anime-classes',
    title: 'Anime Classes',
    category: 'Classes',
    tags: ['classes', 'anime', 'subclasses', 'reincarnation'],
    lastModified: new Date().toLocaleDateString(),
    content: generateAnimeClassesPageContent()
  }
];

const WIKI_STORAGE_KEY = 'dnd_isekai_wiki_pages';

export function getWikiPages(): WikiPage[] {
  const data = localStorage.getItem(WIKI_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(SEED_PAGES));
    return SEED_PAGES;
  }
  try {
    let loaded = JSON.parse(data) as WikiPage[];
    
    // Explicitly clean up / remove 'jujutsu-sorcerer' from local storage if present
    const hadJJK = loaded.some(p => p.slug === 'jujutsu-sorcerer');
    if (hadJJK) {
      loaded = loaded.filter(p => p.slug !== 'jujutsu-sorcerer');
    }

    // Force update feats and background-feats to the new database versions
    const featsPage = loaded.find(p => p.slug === 'feats');
    const bgFeatsPage = loaded.find(p => p.slug === 'background-feats');
    const classesPage = loaded.find(p => p.slug === 'classes');
    const techniquesPage = loaded.find(p => p.slug === 'innate-techniques');
    const creationPage = loaded.find(p => p.slug === 'character-creation');
    const racesPage = loaded.find(p => p.slug === 'races');
    const alignmentPage = loaded.find(p => p.slug === 'alignment');
    const kingdomsPage = loaded.find(p => p.slug === 'kingdoms');
    const mainPage = loaded.find(p => p.slug === 'main-page');
    const animePage = loaded.find(p => p.slug === 'anime-classes');
    
    // Explicit clean up of old classes-techniques slug if present
    const hadOldClasses = loaded.some(p => p.slug === 'classes-techniques');
    if (hadOldClasses) {
      loaded = loaded.filter(p => p.slug !== 'classes-techniques');
    }

    const needsFeatsUpdate = !featsPage || !featsPage.content.includes('Giant Slayer');
    const needsBgUpdate = !bgFeatsPage || !bgFeatsPage.content.includes('Hobbyist Chef');
    const needsClassesUpdate = !classesPage || !classesPage.content.includes('Void Warden');
    const needsTechniquesUpdate = !techniquesPage || !techniquesPage.content.includes('Innate Technique');
    const needsCreationUpdate = !creationPage || creationPage.content.includes('seeded background feats');
    const needsRacesUpdate = !racesPage || !racesPage.content.includes('Construct Summon');
    const needsAlignmentUpdate = !alignmentPage || !alignmentPage.content.includes('moral alignment');
    const needsKingdomsUpdate = !kingdomsPage || !kingdomsPage.content.includes('Summoned Kingdoms');
    const needsMainUpdate = !mainPage || !mainPage.content.includes('Innate Techniques');
    const needsAnimeUpdate = !animePage || animePage.category !== 'Classes' || !animePage.content.includes('Elder Lich');

    let updated = hadJJK || hadOldClasses || needsFeatsUpdate || needsBgUpdate || needsClassesUpdate || needsTechniquesUpdate || needsCreationUpdate || needsRacesUpdate || needsAlignmentUpdate || needsKingdomsUpdate || needsMainUpdate || needsAnimeUpdate;

    if (needsFeatsUpdate) {
      const freshFeatsSeed = SEED_PAGES.find(p => p.slug === 'feats');
      if (freshFeatsSeed) {
        loaded = loaded.filter(p => p.slug !== 'feats');
        loaded.push(freshFeatsSeed);
      }
    }

    if (needsBgUpdate) {
      const freshBgSeed = SEED_PAGES.find(p => p.slug === 'background-feats');
      if (freshBgSeed) {
        loaded = loaded.filter(p => p.slug !== 'background-feats');
        loaded.push(freshBgSeed);
      }
    }

    if (needsClassesUpdate) {
      const freshClassesSeed = SEED_PAGES.find(p => p.slug === 'classes');
      if (freshClassesSeed) {
        loaded = loaded.filter(p => p.slug !== 'classes');
        loaded.push(freshClassesSeed);
      }
    }

    if (needsTechniquesUpdate) {
      const freshTechniquesSeed = SEED_PAGES.find(p => p.slug === 'innate-techniques');
      if (freshTechniquesSeed) {
        loaded = loaded.filter(p => p.slug !== 'innate-techniques');
        loaded.push(freshTechniquesSeed);
      }
    }

    if (needsCreationUpdate) {
      const freshCreationSeed = SEED_PAGES.find(p => p.slug === 'character-creation');
      if (freshCreationSeed) {
        loaded = loaded.filter(p => p.slug !== 'character-creation');
        loaded.push(freshCreationSeed);
      }
    }

    if (needsRacesUpdate) {
      const freshRacesSeed = SEED_PAGES.find(p => p.slug === 'races');
      if (freshRacesSeed) {
        loaded = loaded.filter(p => p.slug !== 'races');
        loaded.push(freshRacesSeed);
      }
    }

    if (needsAlignmentUpdate) {
      const freshAlignmentSeed = SEED_PAGES.find(p => p.slug === 'alignment');
      if (freshAlignmentSeed) {
        loaded = loaded.filter(p => p.slug !== 'alignment');
        loaded.push(freshAlignmentSeed);
      }
    }

    if (needsKingdomsUpdate) {
      const freshKingdomsSeed = SEED_PAGES.find(p => p.slug === 'kingdoms');
      if (freshKingdomsSeed) {
        loaded = loaded.filter(p => p.slug !== 'kingdoms');
        loaded.push(freshKingdomsSeed);
      }
    }

    if (needsMainUpdate) {
      const freshMainSeed = SEED_PAGES.find(p => p.slug === 'main-page');
      if (freshMainSeed) {
        loaded = loaded.filter(p => p.slug !== 'main-page');
        loaded.push(freshMainSeed);
      }
    }

    if (needsAnimeUpdate) {
      const freshAnimeSeed = SEED_PAGES.find(p => p.slug === 'anime-classes');
      if (freshAnimeSeed) {
        loaded = loaded.filter(p => p.slug !== 'anime-classes');
        loaded.push(freshAnimeSeed);
      }
    }

    for (const seed of SEED_PAGES) {
      if (!loaded.some(p => p.slug === seed.slug)) {
        loaded.push(seed);
        updated = true;
      }
    }
    if (updated) {
      localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(loaded));
    }
    return loaded;
  } catch (e) {
    console.error('Failed to parse wiki pages from localStorage, resetting to seeds', e);
    localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(SEED_PAGES));
    return SEED_PAGES;
  }
}

export function saveWikiPages(pages: WikiPage[]) {
  localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(pages));
}

export function saveWikiPage(page: Omit<WikiPage, 'lastModified'>): WikiPage[] {
  const pages = getWikiPages();
  const index = pages.findIndex(p => p.slug === page.slug);
  const updatedPage: WikiPage = {
    ...page,
    lastModified: new Date().toLocaleDateString()
  };

  if (index >= 0) {
    pages[index] = updatedPage;
  } else {
    pages.push(updatedPage);
  }

  saveWikiPages(pages);
  return pages;
}

export function deleteWikiPage(slug: string): WikiPage[] {
  const pages = getWikiPages().filter(p => p.slug !== slug);
  saveWikiPages(pages);
  return pages;
}

export function searchWikiPages(pages: WikiPage[], query: string): WikiPage[] {
  const term = query.toLowerCase().trim();
  if (!term) return pages;

  return pages.filter(p => {
    return (
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  });
}
