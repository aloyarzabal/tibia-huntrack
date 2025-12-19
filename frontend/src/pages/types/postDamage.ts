import type { DatabaseDamage } from "./databaseDamage";

export type PostDamage = Omit<DatabaseDamage, "id" | "createdAt" | "sessionId">;
