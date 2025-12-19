CREATE TABLE "damage_inputs" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"received_damage" integer NOT NULL,
	"max_dps" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"damage_types" jsonb NOT NULL,
	"damage_sources" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "damage_inputs" ADD CONSTRAINT "damage_inputs_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;