import {
  pgTable,
  timestamp,
  integer,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  name: varchar("name").primaryKey(),
  npcValue: integer("npc_value").notNull(),
  sellTo: jsonb("sell_to").$type<string[]>(),
  imbuements: jsonb("imbuements").$type<string[]>(),
  outfits: jsonb("outfits").$type<string[]>(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
