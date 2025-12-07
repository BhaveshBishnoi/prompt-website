import { ArrowRight, ChevronDown, Search, Star, Upload } from "lucide-react";

// Hero Section
export const HeroSection = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50 pt-16">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 rounded-full mb-8 animate-fade-in">
        <Star className="w-4 h-4 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-700">
          Over 10,000+ Premium Prompts
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Supercharge Your AI
        <span className="block bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          With Perfect Prompts
        </span>
      </h1>

      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
        Discover, create, and sell AI prompts for ChatGPT, Claude, and more. Get
        professional prompts for SEO, development, marketing, and business
        growth.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <button className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
          <span>Browse Free Prompts</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all flex items-center justify-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Submit Your Prompt</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts: marketing, coding, writing..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all shadow-lg"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-emerald-600">
            10K+
          </div>
          <div className="text-gray-600 mt-2">Prompts</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-emerald-600">
            50K+
          </div>
          <div className="text-gray-600 mt-2">Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-emerald-600">
            500+
          </div>
          <div className="text-gray-600 mt-2">Creators</div>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-8 h-8 text-emerald-600" />
    </div>
  </div>
);
