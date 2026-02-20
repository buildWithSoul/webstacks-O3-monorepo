"use client";

import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { SbBlokData, storyblokEditable } from "@storyblok/react";

export interface StatItemBlok extends SbBlokData {
  prefix?: string;
  value: string;
  suffix?: string;
  description?: string;
}

interface StatItemProps {
  blok: StatItemBlok;
  variant?: "nested" | "metric";
}

export const StatItem: FC<StatItemProps> = ({ blok, variant = "nested" }) => {
  const { prefix, value, suffix, description } = blok;
  const isMetric = variant === "metric";

  const containerClasses = twMerge(
    "flex flex-col gap-(--gaps-18-16-16) p-(--gaps-16-12-12) max-w-59 w-full",
    isMetric ? "items-center" : "items-start border-t border-(--stroke-primary)"
  );

  const valueContainerClasses = twMerge(
    "flex items-baseline gap-1",
    isMetric ? "text-(--text-eyebrow-date)" : "text-(--text-headings)"
  );

  const metricClasses = isMetric ? "text-display-7xl" : "text-display-6xl";

  const descriptionClasses = twMerge(
    "uppercase font-medium",
    isMetric ? "text-(--text-body-dark) text-sm" : "text-(--text-headings) text-mono-sm"
  );

  return (
    <div {...storyblokEditable(blok)} className={containerClasses}>
      <div className={valueContainerClasses}>
        {prefix && <span className={metricClasses}>{prefix}</span>}
        <span className={metricClasses}>{value}</span>
        {suffix && <span className={metricClasses}>{suffix}</span>}
      </div>
      {description && <p className={descriptionClasses}>{description}</p>}
    </div>
  );
};