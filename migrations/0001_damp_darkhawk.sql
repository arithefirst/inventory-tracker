ALTER TABLE "item" ALTER COLUMN "custom_data" SET DEFAULT 'null'::jsonb;--> statement-breakpoint
ALTER TABLE "item" ALTER COLUMN "custom_data" DROP NOT NULL;