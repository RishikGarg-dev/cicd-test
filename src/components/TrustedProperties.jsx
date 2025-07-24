// src/components/TrustedProperties.jsx
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
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Trusted Properties</h2>
      <p className="max-w-2xl text-center mx-auto mb-12">
        Rent confidently. Swiftly connects you with genuine listings, flexible options,
        and rewards that make moving smarter.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((f) => (
          <div key={f.title}
               className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
