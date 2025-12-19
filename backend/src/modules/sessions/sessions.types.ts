import * as sessionQueries from "../../db/queries/sessions";
import * as damageQueries from "../../db/queries/damageInputs";

export type PostDatabaseSession = Omit<
  sessionQueries.NewSessionInput,
  "id" | "createdAt"
>;

export type PostDatabaseDamage = Omit<
  damageQueries.NewDamageInput,
  "id" | "createdAt"
>;

export type EnrichedSession = {
  id: number;
  createdAt: Date;
  characterId: number;
  characterLevel: number | null;
  balance: number | null;
  damage: number | null;
  damagePerHour: number | null;
  healing: number | null;
  healingPerHour: number | null;
  loot: number | null;
  rawXpGain: number | null;
  rawXpHour: number | null;
  supplies: number | null;
  xpGain: number | null;
  xpHour: number | null;
  sessionLength: string;
  sessionDate: string;
  sessionHour: string;
  killedMonsters:
    | {
        count: number;
        name: string;
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
      }[]
    | {
        count: number;
        name: string;
      }[]
    | null;
  lootedItems:
    | {
        count: number;
        name: string;
        npcValue: number;
        sellTo: string[] | null;
        imbuements: string[] | null;
        outfits: string[] | null;
      }[]
    | {
        count: number;
        name: string;
      }[]
    | null;
};
