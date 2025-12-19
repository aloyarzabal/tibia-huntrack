CREATE TABLE "items" (
	"name" varchar PRIMARY KEY NOT NULL,
	"npc_value" integer NOT NULL,
	"sell_to" varchar,
	"imbuements" jsonb,
	"outfits" jsonb,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "monsters" (
	"name" varchar PRIMARY KEY NOT NULL,
	"hit_points" integer NOT NULL,
	"experience" integer NOT NULL,
	"bestiary_level" varchar NOT NULL,
	"creature_class" varchar NOT NULL,
	"is_boss" boolean NOT NULL,
	"physical_dmg" integer,
	"earth_dmg" integer,
	"fire_dmg" integer,
	"death_dmg" integer,
	"energy_dmg" integer,
	"holy_dmg" integer,
	"ice_dmg" integer,
	"hp_drain_dmg" integer,
	"drown_dmg" integer,
	"updated_at" timestamp DEFAULT now()
);
