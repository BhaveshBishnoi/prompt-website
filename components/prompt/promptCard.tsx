// File: components/prompt/promptCard.tsx
import React, { useState } from "react";
import {
  Check,
  Copy,
  Star,
  Download,
  Eye,
  Crown,
  Zap,
  Lock,
  Sparkles,
  Bookmark,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prompt } from "@/types/prompt";

type Props = {
  prompt: Prompt;
  onCopy: (text: string) => void;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
};

export default function PromptCard({
  prompt,
  onCopy,
  onFavorite,
  onShare,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    await onCopy(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(prompt.id);
  };

  const handleShare = () => {
    onShare?.(prompt.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getModelColor = (model: string) => {
    switch (model.toLowerCase()) {
      case "chatgpt-4":
        return "bg-purple-100 text-purple-800";
      case "claude-3":
        return "bg-orange-100 text-orange-800";
      case "gemini":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="group relative overflow-hidden border-2 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Premium Badge */}
      {prompt.premium && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-linear-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold rounded-full">
            <Crown className="w-3 h-3" />
            <span>Premium</span>
          </div>
        </div>
      )}

      {/* Featured Badge */}
      {prompt.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-linear-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="secondary" className="font-medium">
                {prompt.category}
              </Badge>
              {prompt.verified && (
                <Badge
                  variant="outline"
                  className="border-emerald-500 text-emerald-700"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge
                variant="outline"
                className={getDifficultyColor(prompt.difficulty)}
              >
                {prompt.difficulty}
              </Badge>
              <Badge
                variant="outline"
                className={getModelColor(prompt.aiModel)}
              >
                {prompt.aiModel}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
              {prompt.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${prompt.authorId}`}
                  />
                  <AvatarFallback>{prompt.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{prompt.author}</span>
              </div>
              <span>•</span>
              <span>{prompt.timeToComplete}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-600 mb-4 line-clamp-2">{prompt.description}</p>

        {/* Stats Bar */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">
                    {prompt.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-400">({prompt.reviews || 0})</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rating: {prompt.rating.toFixed(1)} stars</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{prompt.downloads.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Downloads: {prompt.downloads.toLocaleString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{prompt.views.toLocaleString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Views: {prompt.views.toLocaleString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {prompt.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{prompt.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Prompt Preview */}
        <div className="relative">
          <div
            className={`bg-gray-50 rounded-lg p-3 border ${
              isExpanded ? "" : "max-h-32 overflow-hidden"
            }`}
          >
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {isExpanded ? prompt.content : prompt.previewContent}
            </pre>
          </div>
          {!isExpanded && prompt.content.length > 200 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute bottom-2 right-2 text-xs text-emerald-600 font-medium hover:text-emerald-700"
            >
              Show more
            </button>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-0">
        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full">
          <Button
            onClick={handleCopy}
            className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </>
            )}
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFavorite}
                  className={
                    isFavorited
                      ? "text-rose-500 border-rose-200 bg-rose-50"
                      : ""
                  }
                >
                  <Bookmark
                    className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share prompt</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Price/Status */}
        <div className="flex items-center justify-between w-full">
          {prompt.premium ? (
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-500" />
              <span className="text-lg font-bold text-amber-600">
                ${prompt.price.toFixed(2)}
              </span>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Purchase
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="text-lg font-bold text-emerald-600">Free</span>
            </div>
          )}

          <span className="text-xs text-gray-500">
            Updated {new Date(prompt.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
