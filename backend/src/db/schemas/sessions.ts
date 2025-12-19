import {
  pgTable,
  serial,
  integer,
  varchar,
  jsonb,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { characters } from "./characters";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),

  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  characterLevel: integer("character_level"),

  balance: integer("balance"),
  damage: integer("damage"),
  damagePerHour: integer("damage_per_hour"),
  healing: integer("healing"),
  healingPerHour: integer("healing_per_hour"),
  loot: integer("loot"),
  rawXpGain: integer("raw_xp_gain"),
  rawXpHour: integer("raw_xp_hour"),
  supplies: integer("supplies"),
  xpGain: integer("xp_gain"),
  xpHour: integer("xp_hour"),

  sessionLength: varchar("session_length", { length: 50 }).notNull(),
  sessionDate: date("session_date").notNull(),
  sessionHour: timestamp("session_hour", { mode: "string" }).notNull(),

  // Arrays JSONB
  killedMonsters:
    jsonb("killed_monsters").$type<{ count: number; name: string }[]>(),
  lootedItems: jsonb("looted_items").$type<{ count: number; name: string }[]>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   character: one(characters, {
//     fields: [sessions.characterId],
//     references: [characters.id],
//   }),
// }));
