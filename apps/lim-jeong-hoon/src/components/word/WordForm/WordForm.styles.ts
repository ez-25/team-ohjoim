import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const wordFormStyles = cva(
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

export const formRowStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "grid grid-cols-1",
      sizing: "",
      spacing: "gap-4",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      formLayout: {
        single: "grid-cols-1",
        double: "grid-cols-2",
        responsive: "grid-cols-1 md:grid-cols-2",
      },
    },
    defaultVariants: {
      formLayout: "single",
    },
  }
);

export const formActionsStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-end items-center",
      sizing: "",
      spacing: "gap-3 pt-6",
      visual: "border-t border-gray-200",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const formTitleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-6",
      visual: "",
      typography: "text-2xl font-bold text-gray-900",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);