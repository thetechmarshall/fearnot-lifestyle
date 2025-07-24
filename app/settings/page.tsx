import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <UserProfile />
    </main>
  );
}