-- ALTER TABLE "items" ADD PRIMARY KEY ("name");--> statement-breakpoint
-- ALTER TABLE "items" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "primary_type" varchar;