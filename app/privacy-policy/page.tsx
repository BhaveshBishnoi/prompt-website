import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-6">
            This Privacy Policy describes how PromptHub (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses
            your personal information when you use our website and services.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Information We Collect
            </h2>
            <p className="text-gray-600">
              We may collect information you provide directly (e.g., account
              registration, contact form) and technical information (e.g.,
              cookies, usage data).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              How We Use Your Information
            </h2>
            <p className="text-gray-600">
              We use data to provide and improve the service, process
              transactions, communicate with you, and for security and
              analytics.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Sharing & Disclosure
            </h2>
            <p className="text-gray-600">
              We do not sell personal information. We may share data with
              service providers, payment processors, and where required by law.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Security</h2>
            <p className="text-gray-600">
              We take reasonable measures to protect personal information, but
              no method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Your Choices</h2>
            <p className="text-gray-600">
              You can access or update your account information; opt out of
              marketing communications; or request deletion of your account.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
