"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { PerspectiveSelector } from "@/components/sections/PerspectiveSelector";
import { QuickStats } from "@/components/sections/QuickStats";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { GamesTeaser } from "@/components/sections/GamesTeaser";
import { LivePollWidget } from "@/components/sections/LivePollWidget";
import { OnboardingTour, EarthIntro, IceMeltSticky } from "@/components/shared";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen the intro before (in session)
    const introSeen = sessionStorage.getItem("greenland-intro-seen");
    if (introSeen) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    sessionStorage.setItem("greenland-intro-seen", "true");
  };

  return (
    <>
      {/* 3D Earth Intro Animation */}
      <AnimatePresence>
        {showIntro && !hasSeenIntro && (
          <EarthIntro onComplete={handleIntroComplete} skipEnabled={true} />
        )}
      </AnimatePresence>

      {/* Onboarding Experience */}
      <OnboardingTour />

      {/* Hero Section - 100vh */}
      <HeroSection />

      {/* Perspective Selector - 60vh */}
      <PerspectiveSelector />

      {/* Quick Stats - 80vh */}
      <QuickStats />

      {/* Journey Preview - 100vh */}
      <JourneyPreview />

      {/* Games Teaser - 80vh */}
      <GamesTeaser />

      {/* Live Poll Widget - 60vh */}
      <LivePollWidget />

      {/* Viral Element: Ice Melt Counter - appears after 5 seconds */}
      <IceMeltSticky />
    </>
  );
}
