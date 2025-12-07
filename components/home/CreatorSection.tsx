import {
  Check,
  DollarSign,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

// Creator Section
export const CreatorSection = () => (
  <div
    id="create"
    className="py-20 bg-linear-to-br from-emerald-600 to-green-700 text-white"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">For Creators</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Turn Your Expertise Into Income
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Share your best AI prompts and earn money. Our platform helps you
            reach thousands of users looking for quality prompts.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "Submit unlimited prompts for free",
              "Get verified by our expert admin team",
              "Earn 70% revenue share on sales",
              "Build your creator profile and following",
              "Access analytics and insights",
            ].map((benefit, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          <button className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all">
            Start Creating Today
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <DollarSign className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">$2.5K</div>
            <div className="text-emerald-100">Avg Monthly Earnings</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
            <Users className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-emerald-100">Active Creators</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Star className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">4.8/5</div>
            <div className="text-emerald-100">Creator Satisfaction</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
            <TrendingUp className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">85%</div>
            <div className="text-emerald-100">Approval Rate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
