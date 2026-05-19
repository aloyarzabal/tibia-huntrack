export type EnrichedLootedItems = {
  count: number;
  name: string;
  npcValue: number;
  sellTo: string[] | null;
  imbuements: string[] | null;
  outfits: string[] | null;
  primaryType: string;
};

export type EnrichedKilledMonsters = {
  count: number;
  name: string;
  bestiaryLevel: string;
  creatureClass: string;
  deathDmg: number;
  drownDmg: number;
  earthDmg: number;
  energyDmg: number;
  experience: number;
  fireDmg: number;
  hitPoints: number;
  holyDmg: number;
  hpDrainDmg: number;
  iceDmg: number;
  isBoss: boolean;
  physicalDmg: number;
  updatedAt: string;
};

export type EnrichedDatabaseSession = {
  id: number;
  characterId: number;
  characterLevel: number;
  createdAt: string;

  sessionDate: Date;
  sessionHour: string;
  sessionLength: string;

  rawXpGain: number;
  rawXpHour: number;
  xpGain: number;
  xpHour: number;

  loot: number;
  supplies: number;
  balance: number;
  damage: number;
  damagePerHour: number;
  healing: number;
  healingPerHour: number;

  killedMonsters: EnrichedKilledMonsters[];
  lootedItems: EnrichedLootedItems[];
};
