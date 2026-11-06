"use client";

import { memo } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  disabled?: boolean;
}

export const StarRating = memo(function StarRating({
  value,
  onChange,
  max = 5,
  disabled = false,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div
      role="radiogroup"
      aria-label="Star rating"
      className="flex gap-1.5 items-center"
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} of ${max} stars`}
          disabled={disabled}
          onClick={() => onChange(star)}
          className="p-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer hover:scale-110 transition-transform disabled:pointer-events-none"
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= value
                ? "text-amber-500 fill-amber-500"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
});
