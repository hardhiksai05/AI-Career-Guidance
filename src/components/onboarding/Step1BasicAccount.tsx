"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserBasicInfo } from "@/types";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const step1Schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be under 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, underscores and hyphens allowed"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1Props {
  initialData: UserBasicInfo;
  onNext: (data: Step1FormData) => void;
}

export const Step1BasicAccount: React.FC<Step1Props> = ({ initialData, onNext }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      username: initialData.username || "",
      email: initialData.email || "",
      password: initialData.password || "",
      confirmPassword: initialData.confirmPassword || "",
    },
  });

  const passwordValue = watch("password") || "";

  // Password strength calculation
  const strength = useMemo(() => {
    let score = 0;
    if (passwordValue.length >= 8) score++;
    if (/[A-Z]/.test(passwordValue)) score++;
    if (/[0-9]/.test(passwordValue)) score++;
    if (/[^A-Za-z0-9]/.test(passwordValue)) score++;

    if (passwordValue.length === 0) return { label: "Empty", percent: 0, color: "bg-slate-700" };
    if (score <= 1) return { label: "Weak", percent: 25, color: "bg-rose-500" };
    if (score === 2) return { label: "Fair", percent: 50, color: "bg-amber-500" };
    if (score === 3) return { label: "Good", percent: 75, color: "bg-blue-500" };
    return { label: "Strong", percent: 100, color: "bg-emerald-500" };
  }, [passwordValue]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-white">Basic Account Information</h3>
        <p className="text-sm text-slate-400 mt-1">
          Set up your primary login credentials for the AI Career Guidance workspace.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Username"
          placeholder="alex_dev"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.username?.message}
          {...register("username")}
        />

        <Input
          label="Email Address"
          placeholder="alex@university.edu"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="space-y-2">
          <Input
            label="Password"
            placeholder="At least 8 chars, 1 uppercase & 1 number"
            isPassword
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register("password")}
          />

          {passwordValue.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Password strength:</span>
                <span className="font-semibold text-slate-200">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.percent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          placeholder="Repeat your password"
          isPassword
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center gap-2.5 text-xs text-purple-200">
        <ShieldCheck className="w-4 h-4 text-accent-cyan shrink-0" />
        <span>Your credentials will be handled securely via Firebase Authentication in Part 2.</span>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Student Info
        </Button>
      </div>
    </form>
  );
};

