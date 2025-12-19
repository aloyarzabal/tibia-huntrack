import {
  pgTable,
  serial,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { sessions } from "./sessions";

export const damageInputs = pgTable("damage_inputs", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessions.id, { onDelete: "cascade" }),

  receivedDamage: integer("received_damage").notNull(),
  maxDps: integer("max_dps").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  damageTypes: jsonb("damage_types")
    .notNull()
    .$type<{ name: string; amount: number; percentage: number }[]>(),
  damageSources: jsonb("damage_sources")
    .notNull()
    .$type<{ name: string; amount: number; percentage: number }[]>(),
});
