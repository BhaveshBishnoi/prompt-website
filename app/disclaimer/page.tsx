import React from "react";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>

          <p className="text-gray-600 mb-4">
            The prompts and content provided on PromptHub are for informational
            and illustrative purposes only. Results from AI systems may vary and
            we do not guarantee outcomes.
          </p>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              No Professional Advice
            </h2>
            <p className="text-gray-600">
              Content on this site is not professional, medical, legal, or
              financial advice. Consult a professional for specific advice.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Third-party Content & Tools
            </h2>
            <p className="text-gray-600">
              We may link to third-party services (AI models, tools). We
              aren&apos;t responsible for content, privacy, or policies of those
              services.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">No Warranties</h2>
            <p className="text-gray-600">
              The service is provided &quot;as is&quot; without warranty of any
              kind.
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
