import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const bottomNavStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-around items-center",
      sizing: "h-16",
      spacing: "px-4 py-2",
      visual: "bg-white border-t border-gray-200 shadow-lg",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const navItemStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col items-center justify-center",
      sizing: "flex-1",
      spacing: "py-1",
      visual: "rounded-lg",
      typography: "text-xs font-medium",
      interactive: "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
      behavior: "transition-all duration-200 transform active:scale-95",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      navVariant: {
        default: "text-gray-600",
        active: "text-blue-600 bg-blue-50",
      },
    },
    defaultVariants: {
      navVariant: "default",
    },
  }
);

export const navIconStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "w-6 h-6",
      spacing: "mb-1",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "transition-colors duration-200",
    } satisfies TailwindClassCategories,
  })
);

export const navLabelStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "",
      visual: "",
      typography: "text-xs font-medium",
      interactive: "",
      behavior: "transition-colors duration-200",
    } satisfies TailwindClassCategories,
  })
);