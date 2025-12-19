import { getItemByName, insertItem } from "../../db/queries/items";
import { fetchFromTibiaWikia } from "./items.fetcher";
import { parseItemWikitext } from "./items.parser";

export async function getItemData(name: string) {
  const cached = await getItemByName(name);
  if (cached) return cached;

  // Fetch (best effort)
  const raw = await fetchFromTibiaWikia(name);

  // Fallback if does not exist in Tibia Wikia
  if (!raw) {
    return {
      name,
      npcValue: 0,
      sellTo: null,
      imbuements: null,
      outfits: null,
    };
  }

  // Parse
  const parsed = parseItemWikitext(raw);

  // Save
  await insertItem({
    name,
    ...parsed,
  });

  return {
    name,
    ...parsed,
  };
}

export async function enrichItems(rawItems: { name: string; count: number }[]) {
  const result = [];
  for (const item of rawItems) {
    const enriched = await getItemData(item.name);
    result.push({ ...item, ...enriched });
  }
  return result;
}
