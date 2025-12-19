export type PostSession = {
  characterId: number;
  characterLevel: number;

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

  killedMonsters: { count: number; name: string }[];
  lootedItems: { count: number; name: string }[];
};
