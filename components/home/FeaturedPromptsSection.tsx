"use client";
import { ArrowRight, Crown, Star } from "lucide-react";
import { useState } from "react";

// Featured Prompts Section
export const FeaturedPromptsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const prompts = [
    {
      title: "SEO Meta Description Generator",
      description:
        "Create compelling meta descriptions that boost click-through rates and improve search rankings.",
      category: "SEO",
      price: "Free",
      rating: 4.8,
      downloads: "12.5K",
      isPremium: false,
    },
    {
      title: "Full-Stack Code Review Assistant",
      description:
        "Comprehensive code review prompts for React, Node.js, Python, and more with best practices.",
      category: "Development",
      price: "$9.99",
      rating: 4.9,
      downloads: "8.2K",
      isPremium: true,
    },
    {
      title: "Email Marketing Campaign Creator",
      description:
        "Generate high-converting email sequences for any business or product launch.",
      category: "Marketing",
      price: "$14.99",
      rating: 4.7,
      downloads: "15.3K",
      isPremium: true,
    },
    {
      title: "Blog Content Strategy Planner",
      description:
        "Plan and outline comprehensive blog strategies with SEO optimization and content calendars.",
      category: "Content",
      price: "Free",
      rating: 4.6,
      downloads: "9.8K",
      isPremium: false,
    },
    {
      title: "Social Media Ad Copy Master",
      description:
        "Create scroll-stopping ad copy for Facebook, Instagram, LinkedIn, and Twitter campaigns.",
      category: "Marketing",
      price: "$12.99",
      rating: 4.9,
      downloads: "11.2K",
      isPremium: true,
    },
    {
      title: "Business Plan Generator Pro",
      description:
        "Generate detailed business plans, financial projections, and market analysis for investors.",
      category: "Business",
      price: "$19.99",
      rating: 4.8,
      downloads: "6.5K",
      isPremium: true,
    },
  ];

  return (
    <div
      id="prompts"
      className="py-20 bg-linear-to-br from-gray-50 to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Prompts
          </h2>
          <p className="text-xl text-gray-600">
            Hand-picked prompts to accelerate your work
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "free", "premium", "trending"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveCategory(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === filter
                  ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {prompt.category}
                  </span>
                  {prompt.isPremium && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {prompt.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {prompt.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {prompt.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({prompt.downloads})
                    </span>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      prompt.isPremium ? "text-emerald-600" : "text-gray-900"
                    }`}
                  >
                    {prompt.price}
                  </span>
                </div>

                <button className="w-full py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <span>{prompt.isPremium ? "Buy Now" : "Use Free"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
            View All Prompts
          </button>
        </div>
      </div>
    </div>
  );
};
