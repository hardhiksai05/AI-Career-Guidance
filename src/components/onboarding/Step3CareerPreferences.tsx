"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CareerPreferencesInfo } from "@/types";
import {
  CAREER_DOMAINS,
  PRIMARY_GOALS,
  LEARNING_STYLES,
  TARGET_OUTCOMES,
} from "@/lib/constants";
import {
  Sparkles,
  Target,
  BookOpen,
  Briefcase,
  Check,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
} from "lucide-react";

interface Step3Props {
  initialData: CareerPreferencesInfo;
  onNext: (data: CareerPreferencesInfo) => void;
  onBack: () => void;
}

export const Step3CareerPreferences: React.FC<Step3Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    initialData.domains.length > 0 ? initialData.domains : ["Artificial Intelligence"]
  );
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    initialData.primaryGoal || PRIMARY_GOALS[0]
  );
  const [preferredLearningStyle, setPreferredLearningStyle] = useState<string>(
    initialData.preferredLearningStyle || LEARNING_STYLES[0]
  );
  const [targetOutcome, setTargetOutcome] = useState<string>(
    initialData.targetOutcome || TARGET_OUTCOMES[1]
  );

  const [skillsList, setSkillsList] = useState<string[]>(
    initialData.targetSkills.length > 0
      ? initialData.targetSkills
      : ["Python", "PyTorch", "Next.js", "System Design"]
  );
  const [newSkillInput, setNewSkillInput] = useState("");
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const toggleDomain = (domain: string) => {
    if (domain === "Not Sure Yet") {
      setSelectedDomains(["Not Sure Yet"]);
      return;
    }

    const withoutNotSure = selectedDomains.filter((d) => d !== "Not Sure Yet");
    if (withoutNotSure.includes(domain)) {
      if (withoutNotSure.length === 1) {
        setErrorNotice("Please keep at least one interest selected.");
        return;
      }
      setSelectedDomains(withoutNotSure.filter((d) => d !== domain));
    } else {
      setErrorNotice(null);
      setSelectedDomains([...withoutNotSure, domain]);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (skillsList.includes(newSkillInput.trim())) {
      setNewSkillInput("");
      return;
    }
    setSkillsList([...skillsList, newSkillInput.trim()]);
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDomains.length === 0) {
      setErrorNotice("Please select at least one career domain or 'Not Sure Yet'.");
      return;
    }

    onNext({
      domains: selectedDomains,
      primaryGoal,
      targetSkills: skillsList,
      preferredLearningStyle,
      targetOutcome,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <h3 className="text-xl font-bold text-white">Career Preferences & Aspirations</h3>
        <p className="text-sm text-slate-400 mt-1">
          Select all career tracks you are intrigued by. You can select multiple areas.
        </p>
      </div>

      {errorNotice && (
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs">
          {errorNotice}
        </div>
      )}

      {/* Domain Pills Multi-select */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Career Domains (Select multiple)
        </label>
        <div className="flex flex-wrap gap-2">
          {CAREER_DOMAINS.map((domain) => {
            const isSelected = selectedDomains.includes(domain);
            return (
              <button
                type="button"
                key={domain}
                onClick={() => toggleDomain(domain)}
                className={`text-xs px-3.5 py-2 rounded-xl font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-accent-purple/20 border-accent-purple text-white shadow-glow-purple"
                    : "bg-[#0d1226] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-accent-cyan" />}
                <span>{domain}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Outcome Selector */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Immediate Target Milestone
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TARGET_OUTCOMES.map((outcome) => {
            const isSelected = targetOutcome === outcome;
            return (
              <button
                type="button"
                key={outcome}
                onClick={() => setTargetOutcome(outcome)}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-accent-cyan/20 border-accent-cyan text-white shadow-glow-cyan"
                    : "bg-[#0d1226] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {outcome}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Goal Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Primary Career Goal
        </label>
        <select
          value={primaryGoal}
          onChange={(e) => setPrimaryGoal(e.target.value)}
          className="w-full rounded-xl bg-[#0d1224]/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
        >
          {PRIMARY_GOALS.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Learning Style */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Preferred Learning Style
        </label>
        <select
          value={preferredLearningStyle}
          onChange={(e) => setPreferredLearningStyle(e.target.value)}
          className="w-full rounded-xl bg-[#0d1224]/80 border border-slate-700/70 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
        >
          {LEARNING_STYLES.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Skills student wants to develop */}
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          Key Skills You Want to Cultivate
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="e.g. Docker, LangChain, Kubernetes..."
            className="flex-1 rounded-xl bg-[#0d1224]/80 border border-slate-700/70 px-4 py-2 text-sm text-slate-100 outline-none focus:border-accent-purple"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleAddSkill}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {skillsList.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Review & Complete
        </Button>
      </div>
    </form>
  );
};

