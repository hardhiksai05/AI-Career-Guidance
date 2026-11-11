"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhyChooseUsSection } from "@/components/landing/WhyChooseUsSection";
import { CtaSection } from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#070913] text-slate-100 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />
      <WhyChooseUsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

