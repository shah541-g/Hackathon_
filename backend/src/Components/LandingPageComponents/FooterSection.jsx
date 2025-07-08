import React from "react";
import { Mail, Twitter, Github } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6 border-t border-base-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        {/* Branding */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-primary">PromptStack</h3>
          <p className="text-base-content">
            AI-native platform to build & deploy real SaaS apps from prompts. No
            templates — just working products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-2 text-primary">Explore</h4>
          <ul className="space-y-1">
            <li>
              <a className="link text-base-content link-hover text-base-content/80">
                Features
              </a>
            </li>
            <li>
              <a className="link text-base-content link-hover text-base-content/80">
                Use Cases
              </a>
            </li>
            <li>
              <a className="link text-base-content link-hover text-base-content/80">
                Waitlist
              </a>
            </li>
            <li>
              <a className="link text-base-content link-hover text-base-content/80">
                Docs (coming soon)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="font-bold mb-2 text-primary">Stay Connected</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover flex items-center gap-2 text-base-content"
              >
                <Twitter size={16} className="text-base-content/35" />
                <p className="text-base-content">Twitter</p>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yourrepo"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover flex items-center gap-2 text-base-content"
              >
                <Github size={16}  className="text-base-content/35" />
                 <p className="text-base-content">GitHub</p>
              </a>
            </li>
            <li>
              <a
                href="mailto:support@promptstack.com"
                className="link link-hover flex items-center gap-2 text-base-content"
              >
                <Mail size={16}  className="text-base-content/35" />
                 <p className="text-base-content">Email Us</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-primary">PromptStack</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
