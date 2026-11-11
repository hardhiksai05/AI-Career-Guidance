"use client";

import React from "react";
import { PremiumLoadingScreen } from "@/components/ui/PremiumLoadingScreen";

interface CareerInsightsLoaderProps {
  isAnalyzing?: boolean;
}

export const CareerInsightsLoader: React.FC<CareerInsightsLoaderProps> = ({
  isAnalyzing = false,
}) => {
  return (
    <PremiumLoadingScreen
      preset="recommendations"
      heading={isAnalyzing ? "Calibrating AI Recommendations" : "Preparing Your Career Insights"}
      statusMessages={
        isAnalyzing
          ? [
              "Synthesizing curriculum competencies...",
              "Evaluating industry role alignments...",
              "Computing multi-factor compatibility scores...",
              "Generating personalized milestone recommendations...",
            ]
          : undefined
      }
    />
  );
};
