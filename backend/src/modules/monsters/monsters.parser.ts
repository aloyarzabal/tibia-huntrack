import { ParsedMonsterData } from "./monsters.types";

/** Extrae un campo del infobox */
function extractInfoboxField(wikitext: string, field: string): string | null {
  const regex = new RegExp(`\\|\\s*${field}\\s*=\\s*([^\\n\\r]*)`, "i");
  const match = wikitext.match(regex);
  if (!match || !match[1]) return null;
  return match[1].trim();
}

/** Extrae número limpio (HP, EXP, etc.) */
function extractNumber(value: string | null): number {
  if (!value) return 0;
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

/** Extrae modificadores de daño tipo "110%" o "-10%" */
function extractDmgMod(wikitext: string, field: string): number | null {
  const raw = extractInfoboxField(wikitext, field);
  if (!raw) return null;

  const match = raw.match(/-?\d+/);
  return match ? Number(match[0]) : null;
}

/** Extrae habilidades limpias */
function extractAbilities(text: string | null): string[] | null {
  if (!text) return null;

  const abilities = text
    .split(/<br\s*\/?>|\n|,/i)
    .map((a) => a.replace(/\[\[|\]\]/g, "").trim())
    .filter((a) => a && !/damage/i.test(a) && !/healing/i.test(a));

  return abilities.length ? abilities : null;
}

/** Parser principal */
export function parseMonsterWikitext(wikitext: string): ParsedMonsterData {
  return {
    hitPoints: extractNumber(extractInfoboxField(wikitext, "hp")),

    experience: extractNumber(extractInfoboxField(wikitext, "exp")),

    bestiaryLevel: extractInfoboxField(wikitext, "bestiarylevel") ?? "Unknown",

    creatureClass: extractInfoboxField(wikitext, "bestiaryclass") ?? "Unknown",

    isBoss: /yes|true/i.test(extractInfoboxField(wikitext, "isboss") ?? ""),

    physicalDmg: extractDmgMod(wikitext, "physicalDmgMod"),
    earthDmg: extractDmgMod(wikitext, "earthDmgMod"),
    fireDmg: extractDmgMod(wikitext, "fireDmgMod"),
    deathDmg: extractDmgMod(wikitext, "deathDmgMod"),
    energyDmg: extractDmgMod(wikitext, "energyDmgMod"),
    holyDmg: extractDmgMod(wikitext, "holyDmgMod"),
    iceDmg: extractDmgMod(wikitext, "iceDmgMod"),
    hpDrainDmg: extractDmgMod(wikitext, "hpDrainDmgMod"),
    drownDmg: extractDmgMod(wikitext, "drownDmgMod"),
  };
}
