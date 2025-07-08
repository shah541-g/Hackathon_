import React from "react";
import { Cpu, Server, Edit3, Rocket } from "lucide-react";

const features = [
  {
    title: "Real Backend Logic",
    description:
      "Not just static HTML — PromptStack builds full-stack apps with working APIs, auth, DB, and business logic.",
    icon: <Cpu size={32} className="text-secondary" />,
  },
  {
    title: "Auto Deploy in Seconds",
    description:
      "Your app is deployed to Vultr with working infrastructure in just a few clicks. No DevOps needed.",
    icon: <Rocket size={32} className="text-secondary" />,
  },
  {
    title: "Live Natural Language Updates",
    description:
      "Need changes? Just prompt it. PromptStack updates your live project without touching code.",
    icon: <Edit3 size={32} className="text-secondary" />,
  },
  {
    title: "Full Code Ownership",
    description:
      "You get complete access to your source code, version control, and deployment history.",
    icon: <Server size={32} className="text-secondary" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-base-100 text-primary py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          What Makes <span className="text-secondary">PromptStack</span> Different?
        </h2>
        <p className="text-base-content max-w-2xl mx-auto mb-12 text-lg">
          We're not another static site builder. PromptStack generates real full-stack SaaS apps, ready for production.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl text-secondary font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
