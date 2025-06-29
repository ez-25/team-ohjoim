import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const headerStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-center",
      sizing: "h-16",
      spacing: "px-6 py-3",
      visual: "bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg border-b border-blue-500/20",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const headerLeftStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex items-center",
      sizing: "",
      spacing: "gap-3",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const headerTitleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex items-center",
      sizing: "",
      spacing: "gap-2",
      visual: "",
      typography: "text-xl font-bold text-white",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const headerButtonStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "inline-flex items-center justify-center",
      sizing: "w-10 h-10",
      spacing: "",
      visual: "rounded-lg bg-white/10 backdrop-blur-sm border border-white/20",
      typography: "text-white",
      interactive: "hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50",
      behavior: "transition-all duration-200 transform active:scale-95",
    } satisfies TailwindClassCategories,
  })
);

export const headerActionsStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex items-center",
      sizing: "",
      spacing: "gap-2",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);