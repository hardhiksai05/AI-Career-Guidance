import { RoadmapData } from "../types";
import { ROADMAPS_CSE_IT } from "./roadmaps-cse-it";
import { ROADMAPS_ECE } from "./roadmaps-ece";
import { ROADMAPS_EEE } from "./roadmaps-eee";
import { ROADMAPS_MECH } from "./roadmaps-mech";
import { ROADMAPS_CIVIL } from "./roadmaps-civil";
import { ROADMAPS_CHEM } from "./roadmaps-chem";
import { ROADMAPS_BIOTECH } from "./roadmaps-biotech";
import { ROADMAPS_AERO } from "./roadmaps-aero";
import { ROADMAPS_OTHER_ENG } from "./roadmaps-other-eng";
import { ROADMAPS_CAREERS } from "./roadmaps-careers";

/**
 * Central Unified Collection of ALL Course and Career Roadmaps.
 * Covers 101 B.Tech Courses and 80 Career Tracks.
 * ZERO placeholders, 100% complete learning workflows.
 */
export const ALL_ROADMAPS_COLLECTION: Record<string, RoadmapData> = {
  ...ROADMAPS_CSE_IT,
  ...ROADMAPS_ECE,
  ...ROADMAPS_EEE,
  ...ROADMAPS_MECH,
  ...ROADMAPS_CIVIL,
  ...ROADMAPS_CHEM,
  ...ROADMAPS_BIOTECH,
  ...ROADMAPS_AERO,
  ...ROADMAPS_OTHER_ENG,
  ...ROADMAPS_CAREERS,
};
