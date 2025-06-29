import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const mainLayoutStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex flex-col",
      sizing: "min-h-screen max-w-md mx-auto",
      spacing: "",
      visual: "bg-gradient-to-br from-gray-50 to-blue-50",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const mainContentStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex-1 flex flex-col",
      sizing: "",
      spacing: "pb-16", // 하단 네비게이션 공간 확보
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);

export const pageContainerStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "flex-1",
      sizing: "",
      spacing: "p-6",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      containerVariant: {
        default: "p-6",
        tight: "p-4",
        loose: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      containerVariant: "default",
    },
  }
);

export const bottomNavContainerStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "fixed bottom-0 left-0 right-0",
      sizing: "max-w-md mx-auto",
      spacing: "",
      visual: "",
      typography: "",
      interactive: "",
      behavior: "",
    } satisfies TailwindClassCategories,
  })
);