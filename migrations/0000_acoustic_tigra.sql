CREATE TABLE "item" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"image" text NOT NULL,
	"custom_data" jsonb NOT NULL
);
