import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { damageInputs } from "../schemas/damageInputs";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

export type NewDamageInput = InferInsertModel<typeof damageInputs>;
export type DamageInputRow = InferSelectModel<typeof damageInputs>;

export const createDamageInput = async (data: NewDamageInput) => {
  const created = await db.insert(damageInputs).values(data).returning();
  return created[0];
};

/**
 * Get one damage input by sessionId
 */
export const getDamageInputBySession = async (sessionId: number) => {
  const [row] = await db
    .select()
    .from(damageInputs)
    .where(eq(damageInputs.sessionId, sessionId));

  return row ?? null;
};

/**
 * Get one damage input by id
 */
export const getDamageInputById = async (id: number) => {
  const [row] = await db
    .select()
    .from(damageInputs)
    .where(eq(damageInputs.id, id));

  return row ?? null;
};

/**
 * Get all damage inputs
 */
export const getAllDamageInputs = async () => {
  return await db.select().from(damageInputs);
};

/**
 * Delete the damage input of a given session
 */
export const deleteDamageInputBySession = async (sessionId: number) => {
  await db.delete(damageInputs).where(eq(damageInputs.sessionId, sessionId));
};

/**
 * Delete by ID
 */
export const deleteDamageInputById = async (id: number) => {
  await db.delete(damageInputs).where(eq(damageInputs.id, id));
};

/**
 * Update
 */
export async function updateDamageInput(
  id: number,
  updates: Partial<NewDamageInput>
) {
  const [row] = await db
    .update(damageInputs)
    .set(updates)
    .where(eq(damageInputs.id, id))
    .returning();

  return row;
}
