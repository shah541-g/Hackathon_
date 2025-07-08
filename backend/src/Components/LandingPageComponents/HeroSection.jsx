import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-base-100 text-base-content py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Build & Launch SaaS Apps <br className="hidden sm:block" />
          <span className="text-primary">From a Single Prompt</span>
        </h1>
        <p className="text-lg sm:text-xl mt-6 text-base-content/70 max-w-2xl mx-auto">
          PromptStack turns your ideas into production-ready full-stack apps with real backend logic, APIs, and dashboards — auto-deployed to Vultr in seconds.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link to={"/login"} className="btn btn-secondary">
            Join Early Access
          </Link>
          <button className="btn btn-outline btn-primary">
            See Example Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
