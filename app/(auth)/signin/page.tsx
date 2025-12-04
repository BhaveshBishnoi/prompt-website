"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast"; // optional toast hook if you have it

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast ? useToast() : { toast: undefined };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // replace this with next-auth signIn('credentials', ...) or your API
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast?.({ title: "Signed in", description: "Redirecting..." });
        router.push("/dashboard");
      } else {
        toast?.({
          title: "Sign in failed",
          description: data?.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast?.({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-2">Sign in to your account</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use your email and password or continue with an OAuth provider.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <Link href="/(auth)/signup" className="text-sm text-primary">
              Create account
            </Link>
          </div>

          <div className="pt-2">
            <div className="text-xs text-muted-foreground">Or sign in with</div>
            <div className="mt-2 flex gap-2">
              {/* Add Provider buttons (Google/GitHub) — wire to your OAuth endpoints */}
              <Button
                variant="outline"
                onClick={() => {
                  /* signIn('google') */
                }}
              >
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  /* signIn('github') */
                }}
              >
                GitHub
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
