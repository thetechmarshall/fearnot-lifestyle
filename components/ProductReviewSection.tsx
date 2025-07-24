"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Review } from "@/sanity.types";

// interface Review {
//   name?: string;
//   rating?: number;
//   comment?: string;
//   date?: string;
// }

interface LocalReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  productId: string;
  reviews: Review[];
}

export default function ProductReviewSection({ productId, reviews }: Props) {
  const { user } = useUser();
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);
  const [allReviews, setAllReviews] = useState<LocalReview[]>(
    reviews.map(({ name, rating, comment, date }) => ({
      name: name ?? "Anonymous",
      rating: rating ?? 0,
      comment: comment ?? "",
      date: date ?? new Date().toISOString(),
    }))
  );

  const [visibleCount, setVisibleCount] = useState(5);

  const averageRating = useMemo(() => {
    if (allReviews.length === 0) return 0;
    const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
    return total / allReviews.length;
  }, [allReviews]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        productId,
        name: user?.fullName || user?.username || "Anonymous",
        rating: form.rating,
        comment: form.comment.trim(),
      }),
    });

    if (res.ok) {
      const newReview: LocalReview = {
        name: user?.fullName || user?.username || "Anonymous",
        rating: form.rating,
        comment: form.comment.trim(),
        date: new Date().toISOString(),
      };

      setAllReviews([newReview, ...allReviews]);
      setForm({ rating: 5, comment: "" });
      toast.success("Review submitted successfully!");
    } else {
      toast.error("Failed to submit review. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-t border-b py-2 bg-white"
    >
      <AccordionItem value="reviews">
        <AccordionTrigger className="font-semibold flex justify-between">
          <div className="flex items-center gap-2">
            <span>Customer Reviews</span>
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({allReviews.length})</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="space-y-4">
          {allReviews.length > 0 ? (
            <div className="max-h-72 overflow-y-auto space-y-4 pr-2">
              {allReviews.slice(0, visibleCount).map((review, i) => (
                <div key={i} className="border-b pb-3">
                  <p className="font-medium">
                    {review.name}{" "}
                    <span className="text-gray-500 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.rating
                            ? "fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
              {visibleCount < allReviews.length && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleCount(visibleCount + 5)}
                  className="w-full mt-2"
                >
                  Show More
                </Button>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4">
              <div className="flex items-center gap-1">
                <p className="text-md font-semibold">Rating:</p>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 cursor-pointer ${
                      i < form.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setForm({ ...form, rating: i + 1 })}
                  />
                ))}
              </div>
              <Textarea
                name="comment"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Leave a review..."
                className="w-full px-3 py-2 rounded-md resize-none focus:shadow-none"
                required
              />
              <Button
                type="submit"
                disabled={loading || !form.comment.trim()}
                className="w-full font-semibold bg-darkColor/90 hover:bg-darkColor"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              Sign in to leave a review.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
