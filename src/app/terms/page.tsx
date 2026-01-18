import React from "react";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-deep-navy text-glacier-white">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-heading font-bold mb-8">Terms of Use</h1>
                <p className="text-glacier-white/70 mb-6">Last updated: January 18, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">1. Educational Purpose</h2>
                    <p>
                        The content provided on Greenland: The Untold Story is for educational and informational
                        purposes only. While we strive for accuracy, data points represent snapshots in time.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">2. Intellectual Property</h2>
                    <p>
                        The code and design for this site are under the MIT License. Data visualizations may
                        rely on third-party sources as cited in our Methodology section.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">3. External Links</h2>
                    <p>
                        Our site contains links to external data sources. We are not responsible for the
                        content or privacy practices of these external websites.
                    </p>
                </section>
            </div>
        </div>
    );
}
