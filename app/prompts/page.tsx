"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  Star,
  Download,
  Sparkles,
  Crown,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PromptStats from "@/components/prompt/PromptStats";
import type { Prompt } from "@/types/prompt";
import { toast } from "sonner";
import PromptCard from "@/components/prompt/promptCard";

// Sample categories from your Prisma schema
const categories = [
  { id: "all", name: "All Categories", icon: "🌐", count: 2000 },
  { id: "marketing", name: "Marketing", icon: "📈", count: 450 },
  { id: "development", name: "Development", icon: "💻", count: 380 },
  { id: "business", name: "Business", icon: "💼", count: 320 },
  { id: "writing", name: "Content Writing", icon: "✍️", count: 280 },
  { id: "social", name: "Social Media", icon: "📱", count: 260 },
  { id: "education", name: "Education", icon: "🎓", count: 210 },
  { id: "design", name: "Design", icon: "🎨", count: 190 },
  { id: "productivity", name: "Productivity", icon: "⚡", count: 170 },
  { id: "finance", name: "Finance", icon: "💰", count: 140 },
];

const difficultyLevels = [
  { id: "all", label: "All Levels" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const aiModels = [
  { id: "all", label: "All Models" },
  { id: "chatgpt-4", label: "ChatGPT-4" },
  { id: "gpt-3.5", label: "GPT-3.5" },
  { id: "claude-3", label: "Claude 3" },
  { id: "gemini", label: "Gemini Pro" },
  { id: "midjourney", label: "Midjourney" },
  { id: "dall-e", label: "DALL-E 3" },
];

const sortOptions = [
  { id: "popular", label: "Most Popular", icon: TrendingUp },
  { id: "newest", label: "Newest", icon: Sparkles },
  { id: "rating", label: "Highest Rated", icon: Star },
  { id: "downloads", label: "Most Downloads", icon: Download },
  { id: "featured", label: "Featured", icon: Crown },
];

export default function PromptsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState("all");
  const [aiModel, setAiModel] = useState("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Load prompts from JSON
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch from public directory
        const response = await fetch("/data/prompts.json", {
          cache: "no-store", // Ensure fresh data
        });

        if (!response.ok) {
          throw new Error(
            `Failed to load prompts: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Validate the data structure
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: expected an array");
        }

        // Transform data to ensure it matches Prompt type
        const validatedPrompts = data.map((prompt: Prompt) => ({
          id: prompt.id || `prompt-${Math.random()}`,
          title: prompt.title || "Untitled Prompt",
          description: prompt.description || "",
          category: prompt.category || "uncategorized",
          content: prompt.content || "",
          previewContent:
            prompt.previewContent ||
            prompt.content?.substring(0, 200) + "..." ||
            "",
          author: prompt.author || "Unknown Author",
          authorId: prompt.authorId || "unknown",
          rating: typeof prompt.rating === "number" ? prompt.rating : 4.0,
          downloads:
            typeof prompt.downloads === "number" ? prompt.downloads : 0,
          views: typeof prompt.views === "number" ? prompt.views : 0,
          price: typeof prompt.price === "number" ? prompt.price : 0,
          isFree:
            typeof prompt.isFree === "boolean"
              ? prompt.isFree
              : prompt.price === 0,
          tags: Array.isArray(prompt.tags) ? prompt.tags : [],
          verified:
            typeof prompt.verified === "boolean" ? prompt.verified : false,
          createdAt: prompt.createdAt || new Date().toISOString(),
          updatedAt: prompt.updatedAt || new Date().toISOString(),
          aiModel: prompt.aiModel || "ChatGPT-4",
          language: prompt.language || "English",
          difficulty: prompt.difficulty || "Beginner",
          timeToComplete: prompt.timeToComplete || "5 minutes",
          featured:
            typeof prompt.featured === "boolean" ? prompt.featured : false,
          premium: typeof prompt.premium === "boolean" ? prompt.premium : false,
          reviews: typeof prompt.reviews === "number" ? prompt.reviews : 0,
          revenue: typeof prompt.revenue === "number" ? prompt.revenue : 0,
          salesCount:
            typeof prompt.salesCount === "number" ? prompt.salesCount : 0,
          status: prompt.status || "published",
          categorySlug:
            prompt.categorySlug ||
            prompt.category?.toLowerCase() ||
            "uncategorized",
          slug:
            prompt.slug ||
            prompt.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
            "untitled",
        }));

        setPrompts(validatedPrompts);
      } catch (err) {
        console.error("Error loading prompts:", err);
        setError(err instanceof Error ? err.message : "Failed to load prompts");
        // Set empty array if loading fails
        setPrompts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    const filtered = prompts.filter((prompt) => {
      const matchesSearch =
        !query ||
        prompt.title.toLowerCase().includes(query.toLowerCase()) ||
        prompt.description.toLowerCase().includes(query.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );

      const matchesCategory =
        activeCategory === "all" ||
        prompt.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesPrice =
        (showFreeOnly ? prompt.price === 0 : true) &&
        prompt.price >= priceRange[0] &&
        prompt.price <= priceRange[1];

      const matchesRating = prompt.rating >= rating;
      const matchesDifficulty =
        difficulty === "all" || prompt.difficulty.toLowerCase() === difficulty;
      const matchesAiModel =
        aiModel === "all" || prompt.aiModel.toLowerCase() === aiModel;
      const matchesVerified = showVerifiedOnly ? prompt.verified : true;
      const matchesFeatured = showFeaturedOnly ? prompt.featured : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesDifficulty &&
        matchesAiModel &&
        matchesVerified &&
        matchesFeatured
      );
    });

    // Sort prompts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "downloads":
          return b.downloads - a.downloads;
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "popular":
        default:
          return b.downloads + b.views - (a.downloads + a.views);
      }
    });

    return filtered;
  }, [
    prompts,
    query,
    activeCategory,
    priceRange,
    rating,
    difficulty,
    aiModel,
    showFreeOnly,
    showVerifiedOnly,
    showFeaturedOnly,
    sortBy,
  ]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Prompt copied to clipboard!");
    } catch (error: unknown) {
      toast.error("Unable to copy — please try manually", {
        description: String(error),
      });
    }
  };

  const handleFavorite = () => {
    toast.success("Added to favorites!");
  };

  const handleShare = (promptId: string) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/prompts/${promptId}`
    );
    toast.success("Link copied to clipboard!");
  };

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("all");
    setPriceRange([0, 50]);
    setRating(0);
    setDifficulty("all");
    setAiModel("all");
    setShowFreeOnly(false);
    setShowVerifiedOnly(false);
    setShowFeaturedOnly(false);
    setSortBy("popular");
  };

  const activeFiltersCount = [
    activeCategory !== "all",
    priceRange[0] > 0 || priceRange[1] < 50,
    rating > 0,
    difficulty !== "all",
    aiModel !== "all",
    showFreeOnly,
    showVerifiedOnly,
    showFeaturedOnly,
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <X className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Error Loading Prompts
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <p className="text-sm text-gray-500 mb-6">
              Make sure your prompts.json file exists at:{" "}
              <code>public/data/prompts.json</code>
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry Loading
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {prompts.length} Premium Prompts
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-emerald-600">
              AI Prompts
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-crafted prompts for developers, marketers, creators, and
            professionals. Supercharge your AI workflow with our curated
            collection.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-8">
          <PromptStats prompts={prompts} />
        </div>

        {/* Main Content with Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 ${isFiltersOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="sticky top-24 bg-white rounded-2xl border shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8"
                  >
                    Clear all
                  </Button>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <Label>Search Prompts</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search prompts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <Label>Categories</Label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${
                        activeCategory === cat.id
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {prompts.filter((p) => p.category === cat.id).length}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="free-only"
                    checked={showFreeOnly}
                    onCheckedChange={(checked) =>
                      setShowFreeOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="free-only" className="cursor-pointer">
                    Free prompts only
                  </Label>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Minimum Rating: {rating}+ stars</Label>
                <Slider
                  value={[rating]}
                  onValueChange={([value]) => setRating(value)}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <Label>Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                  {difficultyLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={level.id}
                        id={`difficulty-${level.id}`}
                      />
                      <Label
                        htmlFor={`difficulty-${level.id}`}
                        className="cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* AI Model */}
              <div className="space-y-3">
                <Label>AI Model</Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Filters */}
              <div className="space-y-3">
                <Label>Additional Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="verified-only"
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) =>
                        setShowVerifiedOnly(checked as boolean)
                      }
                    />
                    <Label htmlFor="verified-only" className="cursor-pointer">
                      Verified prompts only
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="featured-only"
                      checked={showFeaturedOnly}
                      onCheckedChange={(checked) =>
                        setShowFeaturedOnly(checked as boolean)
                      }
                    />
                    <Label htmlFor="featured-only" className="cursor-pointer">
                      Featured prompts only
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFiltersOpen(true)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredPrompts.length}
                    </span>{" "}
                    prompts found
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.id} value={option.id}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-1 border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-9 w-9 p-0"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-9 w-9 p-0"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompts Grid/List */}
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No prompts found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search terms to find what
                  you&apos;re looking for.
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onCopy={handleCopy}
                    onFavorite={handleFavorite}
                    onShare={handleShare}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredPrompts.length > 0 && (
              <div className="flex items-center justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? "default" : "outline"}
                      size="sm"
                      className="w-10 h-10 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
