import React from "react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-deep-navy text-glacier-white">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
                <p className="text-glacier-white/70 mb-6">Last updated: January 18, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                    <p>
                        We do not collect any personally identifiable information (PII) from casual visitors.
                        If you interact with our live polls, your answers are stored anonymously to generate aggregate statistics.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">2. Cookies</h2>
                    <p>
                        We use essential cookies to remember your "Perspective" preference (US View, Climate View, etc.)
                        and to ensure the site functions correctly.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">3. Contact</h2>
                    <p>
                        If you have questions about this policy, please email us at akshay.kanthed007@gmail.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
