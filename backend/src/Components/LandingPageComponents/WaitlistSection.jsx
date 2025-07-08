import React, { useState } from "react";
import { Send } from "lucide-react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;
    // TODO: Replace with actual backend API or Firebase function
    console.log("Waitlist email submitted:", email);

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-base-100 text-primary py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Be Among the First to Try <span className="text-secondary">PromptStack</span>
        </h2>
        <p className="text-base-content mb-8 text-lg">
          Join our early access waitlist and get exclusive access to the future of AI-powered SaaS development.
        </p>

        {submitted ? (
          <p className="text-xl font-semibold text-white">✅ You're on the waitlist!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered input-primary w-full sm:max-w-xs"
            />
            <button type="submit" className="btn btn-secondary flex items-center gap-2">
              <Send size={16} />
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default WaitlistSection;
