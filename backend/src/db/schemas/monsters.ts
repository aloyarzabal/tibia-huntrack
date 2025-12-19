import {
  pgTable,
  timestamp,
  integer,
  boolean,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const monsters = pgTable("monsters", {
  name: varchar("name").primaryKey(),
  hitPoints: integer("hit_points").notNull(),
  experience: integer("experience").notNull(),
  bestiaryLevel: varchar("bestiary_level").notNull(),
  creatureClass: varchar("creature_class").notNull(),
  isBoss: boolean("is_boss").notNull(),
  physicalDmg: integer("physical_dmg"),
  earthDmg: integer("earth_dmg"),
  fireDmg: integer("fire_dmg"),
  deathDmg: integer("death_dmg"),
  energyDmg: integer("energy_dmg"),
  holyDmg: integer("holy_dmg"),
  iceDmg: integer("ice_dmg"),
  hpDrainDmg: integer("hp_drain_dmg"),
  drownDmg: integer("drown_dmg"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
