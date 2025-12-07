import { Check, Search, Upload, Zap } from "lucide-react";

// How It Works Section
export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description:
        "Explore thousands of AI prompts across different categories or search for specific use cases.",
    },
    {
      icon: Check,
      title: "Choose Your Prompt",
      description:
        "Select from free community prompts or premium verified prompts for professional work.",
    },
    {
      icon: Zap,
      title: "Use in Any AI Tool",
      description:
        "Copy and use prompts in ChatGPT, Claude, Gemini, or any other AI chatbot instantly.",
    },
    {
      icon: Upload,
      title: "Create & Earn",
      description:
        "Submit your own prompts, get verified by admins, and earn from your premium prompts.",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">Get started in minutes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-linear-to-r from-emerald-300 to-transparent -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
