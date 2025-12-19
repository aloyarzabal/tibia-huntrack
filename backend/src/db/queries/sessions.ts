import { drizzle } from "drizzle-orm/node-postgres";
import { sessions } from "../schemas/sessions";
import { damageInputs } from "../schemas/damageInputs";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

import "dotenv/config";
const db = drizzle(process.env.DATABASE_URL!);

export type NewSessionInput = InferInsertModel<typeof sessions>;
export type SelectSession = InferSelectModel<typeof sessions>;
export type SessionUpdate = Partial<InferInsertModel<typeof sessions>>;

// async createUser(userData: Omit<User, 'id'>): Promise<User> {
export const createSession = async (newSession: NewSessionInput) => {
  // CHIVATO;
  // console.log("Body en new session:", newSession);
  const inserted = await db.insert(sessions).values(newSession).returning();
  console.log("Session inserted: ", inserted[0]?.killedMonsters);

  return inserted[0];
};

export const getAllSessions = async () => {
  return await db.select().from(sessions);
};

export const getAllSessionsWithDamage = async () => {
  return await db
    .select({
      session: sessions,
      damage: damageInputs,
    })
    .from(sessions)
    .leftJoin(damageInputs, eq(damageInputs.sessionId, sessions.id));
};

export const getSessionById = async (sessionId: number) => {
  const found = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));
  return found[0];
};

export const deleteSessionById = async (sessionId: number) => {
  const deleted = await db.delete(sessions).where(eq(sessions.id, sessionId));
  return deleted;
};
