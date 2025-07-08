import React from "react";
import { Code, Lightbulb, Briefcase } from "lucide-react";

const audience = [
  {
    title: "Developers",
    icon: <Code size={32} className="text-secondary" />,
    description:
      "Skip the boilerplate and focus on logic. Build production-ready apps faster with AI at your side.",
  },
  {
    title: "Indie Hackers",
    icon: <Lightbulb size={32} className="text-secondary" />,
    description:
      "Launch ideas quickly, validate faster, and iterate using nothing but prompts.",
  },
  {
    title: "Entrepreneurs",
    icon: <Briefcase size={32} className="text-secondary" />,
    description:
      "Turn concepts into working SaaS platforms without hiring a full dev team.",
  },
];

const AudienceSection = () => {
  return (
    <section className="bg-base-200 py-20 px-6 text-primary">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Who is <span className="text-secondary">PromptStack</span> Built For?
        </h2>
        <p className="text-base-content max-w-xl mx-auto mb-12 text-lg">
          Whether you write code, validate products, or fund new ideas — PromptStack is your launchpad.
        </p>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {audience.map((item, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl text-secondary font-semibold mb-2">{item.title}</h3>
              <p className="text-base-content text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
