import { ArrowRight } from "lucide-react";

// CTA Section
export const CTASection = () => (
  <div className="py-20 bg-linear-to-r from-emerald-600 to-green-600">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to Supercharge Your AI Workflow?
      </h2>
      <p className="text-xl text-emerald-50 mb-12">
        Join thousands of professionals using ReadyPrompt to work smarter and
        faster.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
          <span>Get Started Free</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white rounded-xl font-semibold border-2 border-white hover:bg-white hover:text-emerald-600 transition-all">
          View Pricing
        </button>
      </div>
    </div>
  </div>
);
