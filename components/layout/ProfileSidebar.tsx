"use client";

import Link from "next/link";

export default function ProfileSidebar({
  user,
}: {
  user?: { name?: string; email?: string };
}) {
  return (
    <aside className="w-72 p-4 border rounded-md">
      <div className="mb-4">
        <div className="text-lg font-semibold">{user?.name ?? "Guest"}</div>
        <div className="text-sm text-muted-foreground">
          {user?.email ?? "No email"}
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link href="/account">Account</Link>
        <Link href="/purchases">Purchases</Link>
        <Link href="/favorites">Favorites</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}
