export interface ParsedMonsterData {
  hitPoints: number;
  experience: number;
  bestiaryLevel: string;
  creatureClass: string;
  isBoss: boolean;

  physicalDmg: number | null;
  earthDmg: number | null;
  fireDmg: number | null;
  deathDmg: number | null;
  energyDmg: number | null;
  holyDmg: number | null;
  iceDmg: number | null;
  hpDrainDmg: number | null;
  drownDmg: number | null;
}
