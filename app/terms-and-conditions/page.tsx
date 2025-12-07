import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to PromptHub. By accessing or using our service, you agree
            to be bound by these Terms & Conditions.
          </p>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
            <p className="text-gray-600">
              You must follow all applicable laws and not misuse the service.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">User Content</h2>
            <p className="text-gray-600">
              You retain ownership of your content. By submitting content you
              grant PromptHub a license to operate and display it.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Payments</h2>
            <p className="text-gray-600">
              If payments are enabled, billing and refund policies will be
              provided at checkout. (currently not enabled)
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              We are not liable for indirect or consequential damages arising
              from use of the service.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Changes</h2>
            <p className="text-gray-600">
              We may update these terms; continued use constitutes acceptance of
              changes.
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
