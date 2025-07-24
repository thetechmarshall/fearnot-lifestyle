"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await subscribeToNewsletter(email);

    if (res.success) {
      toast.success("You've been subscribed!");
      setEmail("");
    } else {
      toast.error(res.error || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="font-semibold text-white mb-4">Newsletter</h3>
      <p className="text-white text-sm mb-4">
        Subscribe to our newsletter to receive updates and exclusive offers.
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white/90 text-darkColor font-semibold px-4 py-2 rounded-lg hover:bg-white transition-colors disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
