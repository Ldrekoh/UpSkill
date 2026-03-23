ALTER TABLE "bookings" ADD COLUMN "mentor_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "token_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "reviewer_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "mentor_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "booking_id" uuid;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_mentor_id_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mentor_id_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE no action ON UPDATE no action;