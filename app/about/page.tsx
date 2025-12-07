import React from "react";
import { Sparkles, Target, Users, Heart, Zap, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About{" "}
            <span className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              ReadyPrompt
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Empowering creators and professionals with AI prompts
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-emerald-600" />
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At ReadyPrompt, we believe that AI should be accessible to everyone.
            Our mission is to democratize AI by providing a platform where users
            can discover, share, and monetize high-quality prompts for various
            AI tools like ChatGPT, Claude, and more.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We&rsquo;re building a community of creators who understand the
            power of well-crafted prompts and want to help others achieve better
            results with AI.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Users className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Community First
            </h3>
            <p className="text-gray-600">
              We prioritize our community of creators and users, fostering
              collaboration and knowledge sharing.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Heart className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Quality Prompts
            </h3>
            <p className="text-gray-600">
              Every prompt is reviewed to ensure it meets our high standards for
              effectiveness and clarity.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Zap className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We&rsquo;re constantly evolving our platform with new features and
              improvements based on user feedback.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Creator Success
            </h3>
            <p className="text-gray-600">
              We help creators monetize their expertise and build sustainable
              income from their prompt library.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ReadyPrompt was founded in 2024 by a team of AI enthusiasts who
            recognized the growing need for high-quality prompts. We saw that
            while AI tools were becoming more powerful, many users struggled to
            get the best results due to poorly crafted prompts.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            We started by creating our own prompt library and quickly realized
            that there was a massive opportunity to build a marketplace where
            prompt engineers could share their expertise and earn money.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, ReadyPrompt serves thousands of users worldwide, from
            freelancers and content creators to enterprise teams looking to
            maximize their AI productivity.
          </p>
        </div>
      </div>
    </div>
  );
}
