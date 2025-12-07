import {
  ArrowRight,
  Briefcase,
  Code,
  MessageSquare,
  PenTool,
  Search,
  TrendingUp,
} from "lucide-react";

// Categories Section
export const CategoriesSection = () => {
  const categories = [
    {
      name: "Marketing",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      count: "2.5K",
    },
    {
      name: "Development",
      icon: Code,
      color: "from-purple-500 to-purple-600",
      count: "1.8K",
    },
    {
      name: "SEO",
      icon: Search,
      color: "from-green-500 to-green-600",
      count: "1.2K",
    },
    {
      name: "Content Writing",
      icon: PenTool,
      color: "from-pink-500 to-pink-600",
      count: "3.1K",
    },
    {
      name: "Business",
      icon: Briefcase,
      color: "from-orange-500 to-orange-600",
      count: "950",
    },
    {
      name: "Social Media",
      icon: MessageSquare,
      color: "from-cyan-500 to-cyan-600",
      count: "1.5K",
    },
  ];

  return (
    <div id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600">
            Find the perfect prompt for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 bg-linear-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.count} prompts available
              </p>
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
