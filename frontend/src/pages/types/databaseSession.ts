export type DatabaseSession = {
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

  killedMonsters: {
    count: number;
    name: string;
    hitPoints: number;
    experience: number;
  }[];
  lootedItems: { count: number; name: string; npcValue: number }[];
};
