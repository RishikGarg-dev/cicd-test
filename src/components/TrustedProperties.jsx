import React from "react";

const features = [
  {
    title: "Verified Listings",
    icon: "✅",
    desc: "Only real, verified properties from trusted owners and agents.",
  },
  {
    title: "Furniture Rewards",
    icon: "🛋️",
    desc: "Leave behind good furniture? Earn rewards and help the next renter.",
  },
  {
    title: "Up‑to‑Day Rentals",
    icon: "📅",
    desc: "See only live, available listings — no outdated posts.",
  },
  {
    title: "Easy Clicks, Fast Moves",
    icon: "👍",
    desc: "Search, apply, and rent — all in just a few taps.",
  },
];

export default function TrustedProperties() {
  return (
    <section className="pt-4 pb-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">Trusted Properties</h2>
      <p className="max-w-2xl text-center mx-auto mb-10 text-gray-700">
        Rent confidently. Swiftly connects you with genuine listings, flexible options,
        and rewards that make moving smarter.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center transition hover:shadow-md"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
