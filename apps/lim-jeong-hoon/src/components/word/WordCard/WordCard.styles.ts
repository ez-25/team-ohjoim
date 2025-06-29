import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const wordCardStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "p-6",
      visual: "bg-white rounded-xl border border-gray-200 shadow-sm",
      typography: "",
      interactive: "hover:shadow-md cursor-pointer",
      behavior: "transition-all duration-200 transform hover:scale-[1.02]",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      wordStatus: {
        unreviewed: "border-l-4 border-l-gray-400",
        reviewing: "border-l-4 border-l-blue-400",
        memorized: "border-l-4 border-l-green-400",
      },
      wordSize: {
        compact: "p-4",
        default: "p-6",
        expanded: "p-8",
      },
    },
    defaultVariants: {
      wordStatus: "unreviewed",
      wordSize: "default",
    },
  }
);

export const wordMainStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-start",
      sizing: "",
      spacing: "mb-4",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordTextStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-1",
      visual: "",
      typography: "text-xl font-bold text-gray-900",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordMeaningStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "mb-3",
      visual: "",
      typography: "text-base text-gray-600",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordExampleStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "block",
      sizing: "",
      spacing: "p-3",
      visual: "bg-gray-50 rounded-lg border-l-4 border-l-blue-200",
      typography: "text-sm text-gray-700 italic",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordMetaStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex justify-between items-center",
      sizing: "",
      spacing: "mt-4 pt-4",
      visual: "border-t border-gray-100",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const wordBadgeStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "inline-flex items-center",
      sizing: "",
      spacing: "px-2 py-1",
      visual: "rounded-full",
      typography: "text-xs font-medium",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      badgeType: {
        status: "",
        box: "bg-blue-100 text-blue-800",
        tag: "bg-purple-100 text-purple-800",
      },
      statusType: {
        unreviewed: "bg-gray-100 text-gray-800",
        reviewing: "bg-blue-100 text-blue-800",
        memorized: "bg-green-100 text-green-800",
      },
    },
    defaultVariants: {
      badgeType: "status",
      statusType: "unreviewed",
    },
  }
);