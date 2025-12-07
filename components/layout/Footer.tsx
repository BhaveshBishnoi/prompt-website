import { Sparkles } from "lucide-react";

// Footer
export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ReadyPrompt</span>
          </div>
          <p className="text-gray-400">
            The ultimate marketplace for AI prompts. Discover, create, and
            monetize.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Browse Prompts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Submit Prompt
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Guidelines
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400">
          © 2024 ReadyPrompt. All rights reserved. Made with ❤️ for AI
          enthusiasts.
        </p>
      </div>
    </div>
  </footer>
);
