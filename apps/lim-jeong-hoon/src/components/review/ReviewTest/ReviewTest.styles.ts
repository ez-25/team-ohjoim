import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const reviewTestStyles = cva(
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

export const reviewStartStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col justify-center items-center text-center",
      sizing: "min-h-[400px]",
      spacing: "p-8",
      visual: "bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-300",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewCompleteStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "space-y-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewStatsStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "grid grid-cols-2",
      sizing: "",
      spacing: "gap-4 mb-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewStatCardStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col items-center",
      sizing: "",
      spacing: "p-4",
      visual: "bg-white rounded-lg border border-gray-200 shadow-sm",
      typography: "text-center",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);