import React from "react";
import Navbar from "../components/LandingPageComponents/Navbar";

const AppLayout = ({ showNavbar=false , children }) => {
  return (
    <div className="min-h-screen bg-base-100">
      {showNavbar && <Navbar />}
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AppLayout;
