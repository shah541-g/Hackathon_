import React from "react";
import { useAuth } from "../Context/authContext";
import { logoutUser } from "../API/auth";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/LandingPageComponents/HeroSection";
import FeaturesSection from "../components/LandingPageComponents/FeaturesSection";
import AudienceSection from "../components/LandingPageComponents/AudienceSection";
import WaitlistSection from "../components/LandingPageComponents/WaitlistSection";
import FooterSection from "../components/LandingPageComponents/FooterSection";
import Navbar from "../components/LandingPageComponents/Navbar";

const LandingPage = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();         // Firebase logout
    setCurrentUser(null);       // Clear from context
    navigate("/login");         // Redirect to login
  };

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <AudienceSection/>
      <WaitlistSection/>
      <FooterSection/>
    </div>
  );
};

export default LandingPage;
