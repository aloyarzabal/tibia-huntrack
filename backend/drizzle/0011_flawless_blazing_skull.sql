ALTER TABLE "items" ALTER COLUMN "sell_to" SET DATA TYPE jsonb USING sell_to::jsonb;
