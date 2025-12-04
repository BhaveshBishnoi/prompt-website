// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Search,
  User,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // dummy auth state
  const isLoggedIn = false;
  const user = { name: "Bhavesh", image: "" };

  const navLinks = [
    { href: "/explore", label: "Explore" },
    { href: "/collections", label: "Collections" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 shrink-0 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  PromptMarket
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium -mt-0.5">
                  AI Prompt Marketplace
                </div>
              </div>
            </Link>

            {/* Center Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 group",
                    pathname?.startsWith(link.href)
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pathname?.startsWith(link.href) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg shadow-primary/30"></span>
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {!pathname?.startsWith(link.href) && (
                    <span className="absolute inset-0 bg-muted rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-muted relative group overflow-hidden"
                onClick={() => router.push("/search")}
                aria-label="Search"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Search className="w-4 h-4 relative z-10" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-muted relative group overflow-hidden"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                {mounted && theme === "dark" ? (
                  <Sun className="w-4 h-4 relative z-10 rotate-0 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-4 h-4 relative z-10 rotate-0 transition-transform duration-500 group-hover:-rotate-90" />
                )}
              </Button>

              {/* Desktop Auth/User */}
              <div className="hidden sm:flex items-center gap-2 ml-1">
                {!isLoggedIn ? (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-xl hover:bg-muted font-semibold"
                    >
                      <Link href="/signin">Sign in</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg shadow-primary/30 font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-all duration-300 group">
                        <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                          {user.image ? (
                            <AvatarImage src={user.image} alt={user.name} />
                          ) : (
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <span className="text-sm font-semibold hidden lg:block">
                          {user.name}
                        </span>
                        <ChevronDown className="w-4 h-4 hidden lg:block group-hover:translate-y-0.5 transition-transform duration-300" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-xl border-border/50 shadow-xl"
                    >
                      <DropdownMenuItem
                        onSelect={() => router.push("/dashboard")}
                        className="rounded-lg cursor-pointer"
                      >
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => router.push("/account")}
                        className="rounded-lg cursor-pointer"
                      >
                        Account Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => router.push("/create")}
                        className="rounded-lg cursor-pointer"
                      >
                        Create Prompt
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => {}}
                        className="rounded-lg cursor-pointer text-red-600 focus:text-red-600"
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:hidden rounded-xl hover:bg-muted"
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {open ? (
                  <X className="w-5 h-5 rotate-0 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 rotate-0 transition-transform duration-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "sm:hidden overflow-hidden transition-all duration-500 ease-in-out border-t border-border/50",
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-background/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "relative px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group",
                      pathname?.startsWith(link.href)
                        ? "text-white"
                        : "text-foreground"
                    )}
                    style={{
                      animationDelay: `${idx * 50}ms`,
                    }}
                  >
                    {pathname?.startsWith(link.href) && (
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"></span>
                    )}
                    {!pathname?.startsWith(link.href) && (
                      <>
                        <span className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </>
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              {!isLoggedIn ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl font-semibold border-border/50 hover:bg-muted"
                  >
                    <Link href="/signin">Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg shadow-primary/30 font-semibold"
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start rounded-xl font-semibold hover:bg-muted"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start rounded-xl font-semibold hover:bg-muted"
                  >
                    <Link href="/account">Account</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-xl font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => {}}
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
