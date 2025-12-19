import { getMonsterByName, insertMonster } from "../../db/queries/monsters";
import { fetchFromTibiaWikia } from "./monsters.fetcher";
import { parseMonsterWikitext } from "./monsters.parser";

export async function getMonsterData(name: string) {
  const cached = await getMonsterByName(name);
  if (cached) return cached;

  // Fetch (best effort)
  const raw = await fetchFromTibiaWikia(name);

  // Fallback if does not exist in Tibia Wikia
  if (!raw) {
    return {
      name,
      hitPoints: 0,
      experience: 0,
      bestiaryLevel: null,
      creatureClass: null,
      isBoss: false,
      physicalDmg: 0,
      earthDmg: 0,
      fireDmg: 0,
      deathDmg: 0,
      energyDmg: 0,
      holyDmg: 0,
      iceDmg: 0,
      hpDrainDmg: 0,
      drownDmg: 0,
    };
  }

  // Parse
  const parsed = parseMonsterWikitext(raw);

  // Save
  await insertMonster({
    name,
    ...parsed,
  });

  return {
    name,
    ...parsed,
  };
}

export async function enrichMonsters(
  rawMonsters: { name: string; count: number }[]
) {
  const result = [];

  for (const monster of rawMonsters) {
    const enriched = await getMonsterData(monster.name);

    result.push({ ...monster, ...enriched });
  }

  return result;
}
