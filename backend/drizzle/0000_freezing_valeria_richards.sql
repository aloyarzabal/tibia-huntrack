CREATE TABLE "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"vocation" varchar(50) NOT NULL,
	"world" varchar(50) NOT NULL,
	"level" integer NOT NULL,
	"sex" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"balance" varchar(50),
	"damage" varchar(50),
	"damage_per_hour" varchar(50),
	"healing" varchar(50),
	"healing_per_hour" varchar(50),
	"loot" varchar(50),
	"raw_xp_gain" varchar(50),
	"supplies" varchar(50),
	"xp_gain" varchar(50),
	"killed_monsters" jsonb,
	"looted_items" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;