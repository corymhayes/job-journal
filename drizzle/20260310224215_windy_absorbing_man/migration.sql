CREATE TYPE "status" AS ENUM('Applied', 'Recruiter Screen', 'Initial Interview', 'Technical Interview', 'Final Interview', 'Offer', 'Rejected', 'Withdrawn');--> statement-breakpoint
CREATE TYPE "work_style" AS ENUM('Remote', 'Onsite', 'Hybrid');--> statement-breakpoint
CREATE TABLE "application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company" varchar(100) NOT NULL,
	"job" varchar(100) NOT NULL,
	"status" "status" DEFAULT 'Applied'::"status",
	"work_style" "work_style",
	"application_url" varchar(255),
	"date_applied" date DEFAULT now() NOT NULL,
	"date_response" date
);
