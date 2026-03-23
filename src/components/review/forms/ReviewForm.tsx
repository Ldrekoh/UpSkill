"use client";

import { useState } from "react";
import { createReview } from "@/server/Reviews";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRatingInput } from "../StarRatingInput";
import { Loader2, MessageSquareQuote } from "lucide-react";

export function ReviewForm({
  bookingId,
  onSuccess,
}: {
  bookingId: string;
  onSuccess?: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const result = await createReview({
      bookingId,
      rating,
      comment,
    });

    if (result.success) {
      toast.success("Review published! Thank you.");
      if (onSuccess) onSuccess();
    } else {
      toast.error(result.message);
    }
    setIsPending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-[3rem] bg-surface border border-outline-variant/10 shadow-xl space-y-8 max-w-md mx-auto"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
          <MessageSquareQuote size={24} />
        </div>
        <h2 className="text-2xl font-headline font-black italic tracking-tight">
          How was the workshop?
        </h2>
        <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
          Your feedback helps the mentor grow and guides other learners.
        </p>
      </div>

      {/* Star Selection */}
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-outline">
          Overall Rating
        </p>
        <StarRatingInput value={rating} onChange={setRating} />
        <span className="text-sm font-bold text-amber-600">
          {rating === 5
            ? "Exceptional!"
            : rating >= 4
              ? "Great session"
              : "Good"}
        </span>
      </div>

      {/* Comment Section */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline ml-4">
          Your thoughts (Optional)
        </label>
        <Textarea
          placeholder="What did you like most about this workshop? Any tips for future learners?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px] rounded-3xl bg-surface-container-low border-none p-5 focus:ring-primary placeholder:italic"
        />
      </div>

      <Button
        disabled={isPending}
        className="w-full h-16 bg-on-surface text-surface hover:bg-primary hover:text-white rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-[0.98]"
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Publish Review"}
      </Button>

      <p className="text-center text-[10px] text-outline italic">
        This review will be public on the mentor&apos;s profile.
      </p>
    </form>
  );
}
