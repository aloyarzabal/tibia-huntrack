import { drizzle } from "drizzle-orm/node-postgres";
import { characters } from "../schemas/characters";
import { eq, InferInsertModel } from "drizzle-orm";

import "dotenv/config";
const db = drizzle(process.env.DATABASE_URL!);

type NewCharacter = InferInsertModel<typeof characters>;

export const addCharacter = async (
  name: string,
  sex: string,
  level: number,
  vocation: string,
  world: string
) => {
  const newCharacter: NewCharacter = { name, level, vocation, world, sex };
  console.log("Session: ", newCharacter);

  const inserted = await db.insert(characters).values(newCharacter).returning();

  return inserted[0];
};

export const deleteCharacterByID = async (charId: number) => {
  const deleted = await db
    .delete(characters)
    .where(eq(characters.id, charId))
    .returning();

  return deleted;
};

export const updateCharactersLevel = async (charId: number, level: number) => {
  const updated = await db
    .update(characters)
    .set({ level })
    .where(eq(characters.id, charId))
    .returning();

  return updated;
};

//TODO
export const updateCharactersInfo = async () => {};

export const getAllCharacters = async () => {
  return await db.select().from(characters);
};

export const getCharacterById = async (charId: number) => {
  const found = await db
    .select()
    .from(characters)
    .where(eq(characters.id, charId));

  return found;
};
