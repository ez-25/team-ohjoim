import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const wordListStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "space-y-4",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordListHeaderStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-center",
      sizing: "",
      spacing: "mb-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordListTitleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex items-center",
      sizing: "",
      spacing: "gap-3",
      visual: "",
      typography: "text-2xl font-bold text-gray-900",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordListEmptyStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col justify-center items-center",
      sizing: "min-h-[300px]",
      spacing: "p-8",
      visual: "bg-gray-50 rounded-xl border-2 border-dashed border-gray-300",
      typography: "text-center",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordListLoadingStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-center items-center",
      sizing: "min-h-[200px]",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordListErrorStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col justify-center items-center",
      sizing: "min-h-[200px]",
      spacing: "p-8",
      visual: "bg-red-50 rounded-xl border border-red-200",
      typography: "text-center text-red-600",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const statsRowStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "grid grid-cols-3",
      sizing: "",
      spacing: "gap-4 mb-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const statCardStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col items-center",
      sizing: "",
      spacing: "p-4",
      visual: "bg-white rounded-lg border border-gray-200 shadow-sm",
      typography: "text-center",
      interactive: "",
      behavior: "transition-all duration-200 hover:shadow-md",
    } satisfies TailwindClassCategories,
  })
);