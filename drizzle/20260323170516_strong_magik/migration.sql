ALTER TABLE "application" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "application" ALTER COLUMN "work_style" SET DEFAULT 'Remote'::"work_style";--> statement-breakpoint
ALTER TABLE "application" ALTER COLUMN "work_style" SET NOT NULL;