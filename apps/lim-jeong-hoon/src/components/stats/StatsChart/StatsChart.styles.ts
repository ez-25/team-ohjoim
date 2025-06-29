import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const statsChartStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const chartContainerStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "w-full",
      spacing: "p-4",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      chartHeight: {
        small: "h-48",
        medium: "h-auto",
        large: "h-80",
      },
    },
    defaultVariants: {
      chartHeight: "medium",
    },
  }
);

export const chartTitleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-4",
      visual: "",
      typography: "text-lg font-semibold text-gray-900",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const chartLoadingStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-center items-center",
      sizing: "h-64",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const chartErrorStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col justify-center items-center",
      sizing: "h-64",
      spacing: "",
      visual: "bg-red-50 rounded-lg border border-red-200",
      typography: "text-center text-red-600",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);