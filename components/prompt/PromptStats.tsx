// components/prompts/PromptStats.tsx

import React from "react";
import { Zap, Crown, Star, CheckCircle, Download, Eye } from "lucide-react";
import type { Prompt } from "@/types/prompt";

interface Props {
  prompts: Prompt[];
}

export default function PromptStats({ prompts }: Props) {
  const stats = React.useMemo(() => {
    const totalDownloads = prompts.reduce(
      (sum, prompt) => sum + prompt.downloads,
      0
    );
    const totalViews = prompts.reduce((sum, prompt) => sum + prompt.views, 0);
    const totalRevenue = prompts.reduce((sum, prompt) => sum + prompt.price, 0);
    const avgRating =
      prompts.reduce((sum, prompt) => sum + prompt.rating, 0) / prompts.length;
    const premiumCount = prompts.filter((p) => p.premium).length;
    const freeCount = prompts.length - premiumCount;
    const verifiedCount = prompts.filter((p) => p.verified).length;

    return {
      totalDownloads,
      totalViews,
      totalRevenue,
      avgRating,
      premiumCount,
      freeCount,
      verifiedCount,
      totalPrompts: prompts.length,
    };
  }, [prompts]);

  const statCards = [
    {
      icon: Zap,
      label: "Total Prompts",
      value: stats.totalPrompts.toLocaleString(),
      change: "+12%",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Download,
      label: "Downloads",
      value: stats.totalDownloads.toLocaleString(),
      change: "+24%",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      change: "+18%",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Crown,
      label: "Premium Prompts",
      value: stats.premiumCount.toLocaleString(),
      change: "+8%",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Star,
      label: "Avg Rating",
      value: stats.avgRating.toFixed(1),
      change: "+0.2",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: CheckCircle,
      label: "Verified",
      value: stats.verifiedCount.toLocaleString(),
      change: "+15%",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-linear-to-r ${stat.color}`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
