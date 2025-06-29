import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const cardStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "",
      visual: "bg-white rounded-xl border border-gray-200 shadow-sm",
      typography: "",
      interactive: "",
      behavior: "transition-all duration-200",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      cardVariant: {
        default: "hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        interactive: "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        flat: "shadow-none border-2",
      },
      cardPadding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      cardVariant: "default",
      cardPadding: "md",
    },
  }
);

export const cardHeaderStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-start",
      sizing: "",
      spacing: "pb-4 mb-4",
      visual: "border-b border-gray-100",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const cardTitleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "",
      visual: "",
      typography: "text-lg font-semibold text-gray-900",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const cardContentStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "",
      visual: "",
      typography: "text-gray-600",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const cardFooterStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-end items-center gap-2",
      sizing: "",
      spacing: "pt-4 mt-4",
      visual: "border-t border-gray-100",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);