import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const reviewCardStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "min-h-[400px]",
      spacing: "p-8",
      visual: "bg-white rounded-2xl border border-gray-200 shadow-lg",
      typography: "",
      interactive: "",
      behavior: "transition-all duration-300",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      reviewMode: {
        question: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200",
        answer: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200",
        result: "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200",
      },
    },
    defaultVariants: {
      reviewMode: "question",
    },
  }
);

export const reviewHeaderStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-center",
      sizing: "",
      spacing: "mb-8",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewProgressStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex items-center",
      sizing: "",
      spacing: "gap-2",
      visual: "",
      typography: "text-sm font-medium text-gray-600",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewContentStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col justify-center items-center text-center",
      sizing: "min-h-[200px]",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewWordStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-4",
      visual: "",
      typography: "text-4xl font-bold text-gray-900",
      interactive: "",
      behavior: "transition-all duration-300",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      wordSize: {
        large: "text-4xl",
        medium: "text-3xl",
        small: "text-2xl",
      },
    },
    defaultVariants: {
      wordSize: "large",
    },
  }
);

export const reviewMeaningStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-6",
      visual: "",
      typography: "text-xl text-gray-700",
      interactive: "",
      behavior: "transition-all duration-300",
    } satisfies TailwindClassCategories,
  })
);

export const reviewExampleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "p-4 mb-6",
      visual: "bg-white/50 rounded-lg border border-gray-200/50",
      typography: "text-base text-gray-600 italic",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewActionsStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-center items-center",
      sizing: "",
      spacing: "gap-4 mt-8",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const reviewInputStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "w-full",
      sizing: "",
      spacing: "mb-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);