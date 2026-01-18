"use client";

import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { PerspectiveSelector } from "@/components/sections/PerspectiveSelector";
import { QuickStats } from "@/components/sections/QuickStats";
import { JourneyPreview } from "@/components/sections/JourneyPreview";
import { GamesTeaser } from "@/components/sections/GamesTeaser";
import { LivePollWidget } from "@/components/sections/LivePollWidget";

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
