"use client";

import ScrollStack, {
  ScrollStackItem,
} from "@/components/ui/ScrollStack";

const events = [
  {
    title: "Opening Ceremony",
    description: "Keynotes, announcements, and the MES 2026 kickoff.",
    className:
      "bg-gradient-to-br from-blue-600/20 to-blue-800/40 border border-blue-500/30",
  },
  {
    title: "Startup Pitching",
    description: "Founders pitch to investors and industry leaders.",
    className:
      "bg-gradient-to-br from-purple-600/20 to-purple-800/40 border border-purple-500/30",
  },
  {
    title: "Workshops",
    description: "Hands-on sessions with experts and mentors.",
    className:
      "bg-gradient-to-br from-emerald-600/20 to-emerald-800/40 border border-emerald-500/30",
  },
  {
    title: "Networking Night",
    description: "Meet founders, VCs, and entrepreneurs.",
    className:
      "bg-gradient-to-br from-orange-600/20 to-orange-800/40 border border-orange-500/30",
  },
];

export default function EventScrollStack() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="text-center py-10"> {/* Changed from py-20 to py-10 */}
        <h2 className="text-4xl font-bold mb-4">Events at MES 2026</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A carefully curated lineup of talks, competitions, and networking.
        </p>
      </div>

      <ScrollStack 
        useWindowScroll={true}
        itemDistance={80}
        itemStackDistance={25}
        stackPosition="25%"
        baseScale={0.92}
        itemScale={0.02}
      >
        {events.map((event, index) => (
          <ScrollStackItem
            key={index}
            itemClassName={`${event.className} backdrop-blur-sm`}
          >
            <h3 className="text-3xl font-semibold mb-4">{event.title}</h3>
            <p className="text-slate-300 text-lg">{event.description}</p>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}