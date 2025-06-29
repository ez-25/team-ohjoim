import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const inputContainerStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "relative w-full",
      sizing: "",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const inputStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "w-full",
      sizing: "",
      spacing: "px-4 py-3",
      visual: "bg-white border-2 border-gray-200 rounded-lg shadow-sm",
      typography: "text-base text-gray-900 placeholder:text-gray-400",
      interactive: "focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
      behavior: "transition-all duration-200",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      inputSize: {
        sm: "h-9 px-3 py-2 text-sm",
        md: "h-11 px-4 py-3 text-base",
        lg: "h-13 px-5 py-4 text-lg",
      },
      inputVariant: {
        default: "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10",
        error: "border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50",
        success: "border-green-300 focus:border-green-500 focus:ring-green-500/10 bg-green-50",
      },
    },
    defaultVariants: {
      inputSize: "md",
      inputVariant: "default",
    },
  }
);

export const labelStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-2",
      visual: "",
      typography: "text-sm font-medium text-gray-700",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const helperTextStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mt-1",
      visual: "",
      typography: "text-xs",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      helperVariant: {
        default: "text-gray-500",
        error: "text-red-600",
        success: "text-green-600",
      },
    },
    defaultVariants: {
      helperVariant: "default",
    },
  }
);