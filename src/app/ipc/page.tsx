// /app/ipc/page.tsx or /pages/ipc.tsx
"use client";
import React, { useState, useMemo } from "react";
// Assuming you have these components:
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import custom components and data
import { HeroBanner } from "@/components/HeroBanner";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { StepDetailCard } from "@/components/StepDetailCard";
import { BenefitsSection } from "@/components/BenifitsSection";
import { STEPS } from "@/data/ipc-config";


export default function InnovationPolicyConsortiumPage() {


  // Set the initial active tab to the first 'round' step (Case Study Submission)
  const [activeRoundId, setActiveRoundId] = useState<number>(
    STEPS[1]?.id || 2
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <HeroBanner />

      <div className="pt-12 md:pt-20">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <section className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              {/* Event Summary and Key Stats */}
              <div className="mb-10 p-6 rounded-2xl bg-slate-900/50 ring-1 ring-slate-800 shadow-xl">
                <h1 className="text-4xl font-extrabold text-white">
                  Innovation Policy Consortium (IPC)
                </h1>

                <p className="mt-3 text-slate-300 text-lg leading-relaxed border-b border-slate-700 pb-4">
                  The Innovation Policy Consortium (IPC) is a national innovation initiative  by the
                  Entrepreneurship Cell, MIT Manipal This consortium aims to bring together E-Cells and student policy teams from premier colleges across the country to collaboratively address pressing challenges within India’s business and startup ecosystem.
                </p>

                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 shadow-lg">
                    <div className="text-sm text-slate-400">Main Goal</div>
                    <div className="text-xl font-bold text-blue-400">

                      Policy Recommendation Document
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 shadow-lg">
                    <div className="text-sm text-slate-400">Eligibility</div>
                    <div className="text-xl font-bold">
                      Open only to college E-Cells and entrepreneurship-driven student organizations.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 shadow-lg">
                    <div className="text-sm text-slate-400">Final Venue</div>
                    <div className="text-xl font-bold">
                      MIT Manipal
                    </div>
                  </div>
                </div>
              </div>

              {/* Objectives Section */}
              <section className="mt-8 space-y-6">
                <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-600 pb-2">
                  Objectives of IPC
                </h2>

                <ul className="list-disc ml-5 space-y-2 text-slate-300 p-6 bg-slate-900/40 rounded-xl shadow-xl ring-1 ring-slate-800">
                  <li>To create a platform for inter-E-Cell collaboration and policy-level dialogue</li>
                  <li>To identify and address real-world challenges faced by student-led startups.</li>
                  <li>To enable E-Cells to contribute meaningfully to the national startup ecosystem through informed policymaking</li>
                  <li>To present a unified, well-researched “Bharat Yuva Innovation Policy Recommendation 2026” to government representatives at MES 2026</li>
                </ul>
              </section>

              <BenefitsSection />

              {/* Competition Phases Tabbed Section */}
              <section id="timeline-section" className="mt-12">
                <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-600 pb-2">
                  Competition Phases
                </h2>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-6 p-2 bg-slate-800 rounded-xl shadow-inner ring-1 ring-slate-700">
                  {STEPS.map((round) => (
                    <button
                      key={round.id}
                      onClick={() => setActiveRoundId(round.id)}
                      className={`px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${activeRoundId === round.id
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                          : "bg-transparent text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                      {round.title.split(":")[0].trim()}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div>
                  {STEPS.map((step) => {
                    if (step.id === activeRoundId) {
                      return (
                        <div key={step.id} className="animate-fade-in">
                          <StepDetailCard step={step} />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                <p className="text-sm text-slate-400 mt-6 pt-4 border-t border-slate-700/50">
                  The IPC will be conducted in multiple stages, combining research, review, discussion, and final policy presentation .
                </p>
              </section>
            </div>

            {/* Sidebar */}
            <TimelineSidebar />
          </section>
        </main>

        {/* <Footer /> */}

        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
}