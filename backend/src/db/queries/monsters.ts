import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { monsters } from "../schemas/monsters";

const db = drizzle(process.env.DATABASE_URL!);

export type NewMonster = InferInsertModel<typeof monsters>;

export const insertMonster = async (monsterData: NewMonster) => {
  return await db.insert(monsters).values(monsterData);
};

export const getMonsterByName = async (name: string) => {
  const found = await db.select().from(monsters).where(eq(monsters.name, name));
  return found[0];
};

export const updateMonster = async (
  name: string,
  data: Partial<NewMonster>
) => {
  return await db.update(monsters).set(data).where(eq(monsters.name, name));
};
