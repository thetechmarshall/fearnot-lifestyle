"use client";

import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { UserResource } from "@clerk/types";

export default function CustomProfile() {
  const { user } = useUser();
  const [address, setAddress] = useState(
    (user?.publicMetadata?.deliveryAddress as string) || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await user?.update({
        publicMetadata: {
          deliveryAddress: address,
        },
      } as Partial<UserResource>);
      toast.success("Address saved!");
    } catch (error) {
      toast.error("Failed to save address:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold">Delivery Address</h2>
      <Input
        placeholder="Enter your delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Address"}
      </Button>
    </div>
  );
}
