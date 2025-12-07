// components/Header.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User as UserIcon,
  LogOut,
  Settings,
  Sparkles,
  Upload,
  BookOpen,
  Crown,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("Logged out successfully");
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (session?.user?.email) {
      return session.user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center select-none">
            <Link
              onClick={() => setIsMenuOpen(false)}
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                ReadyPrompt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/prompts"
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Prompts
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Categories
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <Crown className="w-4 h-4" />
              Pricing
            </Link>
            <Link
              href="/create"
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Create Prompt
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : !isAuthenticated ? (
              <>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Create Prompt Button for Authenticated Users */}
                <Link href="/create">
                  <Button
                    variant="outline"
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Submit Prompt
                  </Button>
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm border-2 border-emerald-300 hover:border-emerald-400 hover:shadow-md transition-all"
                  >
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User avatar"}
                        width={40}
                        height={40}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fade-in overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-4 border-b border-gray-100 bg-linear-to-r from-emerald-50 to-green-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                            {session?.user?.image ? (
                              <Image
                                src={session.user.image}
                                alt={session.user.name || "User avatar"}
                                width={48}
                                height={48}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              getUserInitials()
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {session?.user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {session?.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link href="/dashboard">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium">Dashboard</span>
                          </button>
                        </Link>

                        <Link href="/my-prompts">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span className="font-medium">My Prompts</span>
                          </button>
                        </Link>

                        <Link href="/profile">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors"
                          >
                            <UserIcon className="w-4 h-4" />
                            <span className="font-medium">Profile</span>
                          </button>
                        </Link>

                        <Link href="/settings">
                          <button
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-3 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span className="font-medium">Settings</span>
                          </button>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-emerald-50"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/prompts"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all font-medium"
              >
                <Search className="w-5 h-5" />
                Browse Prompts
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/categories"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all font-medium"
              >
                <BookOpen className="w-5 h-5" />
                Categories
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/pricing"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all font-medium"
              >
                <Crown className="w-5 h-5" />
                Pricing
              </Link>
              <Link
                onClick={() => setIsMenuOpen(false)}
                href="/create"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-all font-medium"
              >
                <Upload className="w-5 h-5" />
                Create Prompt
              </Link>

              {/* Mobile Auth Section */}
              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200">
                {isLoading ? (
                  <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : !isAuthenticated ? (
                  <>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href="/signin"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-center h-12 border-2 font-semibold"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href="/signup"
                      className="w-full"
                    >
                      <Button className="w-full justify-center h-12 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg font-semibold">
                        Get Started Free
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {/* User Info Card */}
                    <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                          {session?.user?.image ? (
                            <Image
                              src={session.user.image}
                              alt={session.user.name || "User avatar"}
                              width={56}
                              height={56}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getUserInitials()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {session?.user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {session?.user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Menu Items */}
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      <Sparkles className="w-5 h-5 mr-3" /> Dashboard
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/my-prompts");
                      }}
                    >
                      <BookOpen className="w-5 h-5 mr-3" /> My Prompts
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/profile");
                      }}
                    >
                      <UserIcon className="w-5 h-5 mr-3" /> Profile
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/settings");
                      }}
                    >
                      <Settings className="w-5 h-5 mr-3" /> Settings
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5 mr-3" /> Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
