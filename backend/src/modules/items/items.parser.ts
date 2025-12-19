import { ParsedItemData } from "./items.types";

/** Extrae texto de un campo del infobox tipo "| key = value" */
function extractInfoboxField(wikitext: string, field: string): string | null {
  const regex = new RegExp(`\\|\\s*${field}\\s*=\\s*([^\\n\\r]*)`, "i");
  const match = wikitext.match(regex);
  if (!match || !match[1]) return null;
  return match[1].trim();
}

/** Extrae todas las apariciones de enlaces wikitext [[X|Y]] → devuelve X o Y preferido */
function extractBracketLinks(text: string): string[] {
  if (!text) return [];
  const regex = /\[\[(.+?)(?:\|(.+?))?\]\]/g;
  const result: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const link = m[2] ?? m[1];
    if (link) result.push(link.trim());
  }
  return result;
}

/** Splitea por comas y limpia cada pieza */
function splitCommaList(text: string | null): string[] | null {
  if (!text) return null;
  const parts = text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts : null;
}

/**
 * Busca en una sección del wikitext ocurrencias del tipo:
 * "... are needed for [[Name1]]" o "needed for [[Name1]]"
 * Devuelve los links encontrados dentro de un cierto window (2k chars desde el trigger)
 */
function extractNeededForOutfits(wikitext: string): string[] | null {
  const triggers = ["are needed for", "is needed for", "needed for"];
  const found: string[] = [];

  for (const trig of triggers) {
    const idx = wikitext.toLowerCase().indexOf(trig);
    if (idx === -1) continue;

    // Fragmento MUY reducido (evita capturar imbuements que aparecen luego)
    const fragment = wikitext.slice(idx, idx + 600);

    const links = extractBracketLinks(fragment);

    for (let l of links) {
      // Normalización
      l = l
        .replace(/ Outfits Quest$/i, " Outfit")
        .replace(/ Outfits$/i, " Outfit")
        .replace(/ Quest$/i, "");

      // FILTRO: solo quedarse con cosas que realmente sean outfits
      if (!/Outfit$/i.test(l.trim())) continue;

      found.push(l.trim());
    }
  }

  return found.length ? Array.from(new Set(found)) : null;
}

/** Parser principal */
export function parseItemWikitext(wikitext: string): ParsedItemData {
  // npcValue (infobox)
  const npcValueRaw = extractInfoboxField(wikitext, "npcvalue");
  let npcValue = 0;
  if (npcValueRaw && !/n\/a/i.test(npcValueRaw)) {
    const digits = npcValueRaw.replace(/[^\d]/g, "");
    npcValue = digits ? Number(digits) : 0;
  }

  // sellTo: puede ser en formato [[Name]] o "Name, Name"
  const sellToRaw = extractInfoboxField(wikitext, "sellto");
  let sellTo: string[] | null = null;
  if (sellToRaw) {
    // primero intenta extraer links si los hay
    const links = extractBracketLinks(sellToRaw);
    if (links.length) sellTo = links;
    else sellTo = splitCommaList(sellToRaw);
  }

  // imbuements: primero infobox, si no --> buscar en cuerpo
  const imbuementsRaw = extractInfoboxField(wikitext, "imbuements");
  const imbuements = imbuementsRaw ? splitCommaList(imbuementsRaw) : null;

  // outfits: mirar infobox si existe (algunos objetos lo ponen ahí) o buscar frases "needed for"
  let outfits: string[] | null = null;
  // algunos wikis podrían listar outfits en un campo (poco común), pero principal es buscar needed for:
  outfits = extractNeededForOutfits(wikitext);

  return {
    npcValue,
    sellTo,
    imbuements,
    outfits,
  };
}
