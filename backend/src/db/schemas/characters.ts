import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { sessions } from "./sessions";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  vocation: varchar("vocation", { length: 50 }).notNull(),
  world: varchar("world", { length: 50 }).notNull(),
  level: integer("level").notNull(),
  sex: varchar("sex", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const charactersRelations = relations(characters, ({ many }) => ({
//   sessions: many(sessions),
// }));
