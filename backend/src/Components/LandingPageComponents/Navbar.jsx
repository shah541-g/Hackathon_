import React from "react";
import { Bolt } from "lucide-react";
import ThemeSelector from "../ThemeSelector";
// import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-base-100 shadow-md border-b border-base-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <Bolt className="size-7 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            PromptStack
          </h1>
        </div>

        {/* Theme Selector */}
        <ThemeSelector />
        {/* <h1>hello</h1> */}
      </div>
    </nav>
  );
};

export default Navbar;
