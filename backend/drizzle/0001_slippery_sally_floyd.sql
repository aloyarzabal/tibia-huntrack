ALTER TABLE "sessions" ALTER COLUMN "balance" SET DATA TYPE integer USING "balance"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "damage" SET DATA TYPE integer USING "damage"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "damage_per_hour" SET DATA TYPE integer USING "damage_per_hour"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "healing" SET DATA TYPE integer USING "healing"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "healing_per_hour" SET DATA TYPE integer USING "healing_per_hour"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "loot" SET DATA TYPE integer USING "loot"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "raw_xp_gain" SET DATA TYPE integer USING "raw_xp_gain"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "supplies" SET DATA TYPE integer USING "supplies"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "xp_gain" SET DATA TYPE integer USING "xp_gain"::integer;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "raw_xp_hour" integer;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "xp_hour" integer;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "session_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "session_hour" timestamp NOT NULL;