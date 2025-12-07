"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Download,
  Copy,
  Check,
  TrendingUp,
  Code,
  Briefcase,
  PenTool,
  MessageSquare,
  Mail,
  Zap,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const PromptsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Prompts", icon: Zap, count: 10234 },
    { id: "marketing", name: "Marketing", icon: TrendingUp, count: 2543 },
    { id: "development", name: "Development", icon: Code, count: 1892 },
    { id: "business", name: "Business", icon: Briefcase, count: 1456 },
    { id: "writing", name: "Content Writing", icon: PenTool, count: 3201 },
    { id: "social", name: "Social Media", icon: MessageSquare, count: 1543 },
    { id: "email", name: "Email Marketing", icon: Mail, count: 987 },
  ];

  const prompts = [
    {
      id: "1",
      title: "SEO Meta Description Generator",
      description:
        "Create compelling meta descriptions that boost click-through rates and improve search rankings for any webpage or blog post.",
      category: "marketing",
      content:
        "Write a compelling meta description for a [type of page] about [topic]. The description should be 150-160 characters, include the primary keyword '[keyword]', and entice users to click.",
      author: "Sarah Johnson",
      rating: 4.8,
      downloads: 12543,
      tags: ["SEO", "Marketing", "Meta Tags"],
      verified: true,
    },
    {
      id: "2",
      title: "React Component Code Review",
      description:
        "Comprehensive code review assistant for React components with best practices, performance tips, and security checks.",
      category: "development",
      content:
        "Review this React component and provide detailed feedback on:\n1. Code quality and best practices\n2. Performance optimization opportunities\n3. Security vulnerabilities\n4. Accessibility improvements\n5. TypeScript type safety\n\nComponent code:\n[paste your component code here]",
      author: "Michael Chen",
      rating: 4.9,
      downloads: 8234,
      tags: ["React", "Code Review", "Development"],
      verified: true,
    },
    {
      id: "3",
      title: "Business Plan Generator",
      description:
        "Generate detailed business plans with market analysis, financial projections, and strategic roadmaps for any business idea.",
      category: "business",
      content:
        "Create a comprehensive business plan for [business idea]. Include:\n- Executive Summary\n- Market Analysis\n- Target Audience\n- Competitive Analysis\n- Revenue Model\n- Marketing Strategy\n- Financial Projections (3 years)\n- Risk Analysis",
      author: "David Kumar",
      rating: 4.7,
      downloads: 6543,
      tags: ["Business", "Planning", "Strategy"],
      verified: true,
    },
    {
      id: "4",
      title: "Blog Post Outline Creator",
      description:
        "Create detailed, SEO-optimized blog post outlines with engaging hooks, structured sections, and clear CTAs.",
      category: "writing",
      content:
        "Create a detailed blog post outline for the topic: '[your topic]'\n\nInclude:\n1. Attention-grabbing headline (5 options)\n2. SEO meta description\n3. Introduction hook\n4. Main sections (H2) with subsections (H3)\n5. Key points for each section\n6. FAQ section\n7. Conclusion with CTA\n8. Target keyword suggestions",
      author: "Emily Rodriguez",
      rating: 4.6,
      downloads: 9876,
      tags: ["Blogging", "Content", "SEO"],
      verified: false,
    },
    {
      id: "5",
      title: "Instagram Caption Generator",
      description:
        "Generate engaging Instagram captions with relevant hashtags, emojis, and calls-to-action for maximum engagement.",
      category: "social",
      content:
        "Generate 5 engaging Instagram captions for [describe your post/image]. Include:\n- Hook in the first line\n- Relevant emojis\n- Call-to-action\n- 20-30 relevant hashtags (mix of popular and niche)\n- Keep it authentic and on-brand for [brand/business type]",
      author: "Alex Thompson",
      rating: 4.8,
      downloads: 11234,
      tags: ["Instagram", "Social Media", "Captions"],
      verified: true,
    },
    {
      id: "6",
      title: "Cold Email Outreach Template",
      description:
        "Craft personalized cold email templates that get responses. Perfect for sales, partnerships, and business development.",
      category: "email",
      content:
        "Write a cold email to [target person/company] for [purpose: partnership/sales/collaboration]. Include:\n\nSubject Line: [Create 3 options]\n\nEmail Body:\n- Personalized opener\n- Value proposition (what's in it for them)\n- Social proof or credibility\n- Clear and specific ask\n- Easy next step\n- Professional signature\n\nTone: [Professional/Friendly/Direct]",
      author: "James Wilson",
      rating: 4.7,
      downloads: 7654,
      tags: ["Email", "Sales", "Outreach"],
      verified: true,
    },
  ];

  const handleCopy = (promptId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(promptId);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CategoryIcon =
    categories.find((cat) => cat.id === selectedCategory)?.icon || Zap;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse{" "}
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AI Prompts
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of hand-crafted prompts for ChatGPT, Claude, and
            other AI tools
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search prompts: marketing, coding, writing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-base bg-white shadow-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
            />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters & Categories
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span
                        className={`text-sm ${
                          selectedCategory === category.id
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-emerald-600" />
                    Categories
                  </h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span
                          className={`text-sm ${
                            selectedCategory === category.id
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <CategoryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {categories.find((cat) => cat.id === selectedCategory)
                      ?.name || "All Prompts"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {filteredPrompts.length} prompts found
                  </p>
                </div>
              </div>
            </div>

            {/* Prompts Grid */}
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No prompts found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium capitalize">
                              {prompt.category}
                            </span>
                            {prompt.verified && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {prompt.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {prompt.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            By {prompt.author}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{prompt.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{prompt.downloads.toLocaleString()} uses</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {prompt.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Prompt Content */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-700 uppercase">
                            Prompt Template
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              handleCopy(prompt.id, prompt.content)
                            }
                            className="h-8 text-xs"
                          >
                            {copiedId === prompt.id ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                          {prompt.content}
                        </pre>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleCopy(prompt.id, prompt.content)}
                          className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white h-11"
                        >
                          {copiedId === prompt.id ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied to Clipboard
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Prompt
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptsPage;
