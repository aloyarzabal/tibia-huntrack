import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { items } from "../schemas/items";

const db = drizzle(process.env.DATABASE_URL!);

export type NewItem = InferInsertModel<typeof items>;
export type ItemRow = InferSelectModel<typeof items>;

export const insertItem = async (itemData: NewItem) => {
  return await db.insert(items).values(itemData);
};

export const getItemByName = async (name: string) => {
  const found = await db.select().from(items).where(eq(items.name, name));
  return found[0];
};

export const updateItem = async (name: string, data: Partial<NewItem>) => {
  return await db.update(items).set(data).where(eq(items.name, name));
};
