"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import InitiativeCard from "@/components/InitiativeCard";
import {
  initiativesData,
  INITIATIVE_CATEGORIES,
  INITIATIVE_METRICS,
  type InitiativeCategory,
} from "@/data/initiativesData";

export default function InitiativesClientView() {
  const [selectedCategory, setSelectedCategory] =
    useState<InitiativeCategory>("All");

  const filteredInitiatives = useMemo(() => {
    if (selectedCategory === "All") return initiativesData;
    return initiativesData.filter(
      (item) => item.category === selectedCategory,
    );
  }, [selectedCategory]);

  return (
    <>
      {/* Impact Metric Strip */}
      <section className="border-b border-white/8 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {INITIATIVE_METRICS.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs text-white/50 tracking-wider uppercase mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow py-16 bg-transparent">
        <div className="container mx-auto px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {INITIATIVE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === "All"
                  ? initiativesData.length
                  : initiativesData.filter((i) => i.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                    cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40
                    ${
                      isActive
                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10"
                    }
                  `}
                >
                  {category}
                  <span
                    className={`ml-1.5 text-[10px] tabular-nums ${
                      isActive ? "text-black/60 font-bold" : "text-white/40"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-20">
            {filteredInitiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </div>

          {/* Fallback if category has no items */}
          {filteredInitiatives.length === 0 && (
            <div className="text-center py-16 text-white/40">
              <p>No initiatives found under this category.</p>
            </div>
          )}
        </div>

        {/* Ecosystem Call-To-Action */}
        <section className="py-20 border-t border-white/8 bg-black/40 backdrop-blur-md">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-3">
              Get Involved
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-5 text-white tracking-tight">
              Ready to Accelerate Your Startup?
            </h2>
            <p className="text-base sm:text-lg text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you are an aspiring student founder looking to validate an
              idea, a student wanting to write for Startup Scoop, or an E-Cell
              collaborator looking to sign the E-10 charter, our ecosystem is open.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/conceptio-form"
                className="bg-white text-black px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Pitch in Conceptio
              </Link>
              <Link
                href="/blog"
                className="bg-white/[0.05] border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-200"
              >
                Read Startup Scoop
              </Link>
              <Link
                href="/ipc"
                className="bg-white/[0.05] border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-200"
              >
                Explore Policy (IPC)
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
