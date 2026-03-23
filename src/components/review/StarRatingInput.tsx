"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform active:scale-90 hover:scale-110"
        >
          <Star
            size={32}
            className={cn(
              "transition-colors duration-200",
              (hover || value) >= star
                ? "fill-amber-400 text-amber-400"
                : "text-outline-variant opacity-30",
            )}
          />
        </button>
      ))}
    </div>
  );
}
