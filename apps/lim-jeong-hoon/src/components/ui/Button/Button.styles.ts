import type { TailwindClassCategories } from "@/types/tailwind";
import { combineDefaultStyles } from "@/utils/tailwindHelper";
import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  combineDefaultStyles({
    default: {
      responsive: "",
      layout: "inline-flex justify-center items-center",
      sizing: "",
      spacing: "px-4 py-2",
      visual: "rounded-lg border-2 shadow-sm",
      typography: "font-semibold text-sm leading-none",
      interactive: "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      behavior: "transition-all duration-200 transform active:scale-95",
    } satisfies TailwindClassCategories,
  }),
  {
    variants: {
      buttonVariant: {
        primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
        secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500",
        ghost: "bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white border-transparent hover:from-red-600 hover:to-pink-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent hover:from-green-600 hover:to-emerald-700 focus:ring-green-500 shadow-lg hover:shadow-xl",
      },
      buttonSize: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
      },
      buttonLayout: {
        block: "w-full",
        inline: "w-auto",
        icon: "w-10 h-10 p-0",
      },
    },
    defaultVariants: {
      buttonVariant: "primary",
      buttonSize: "md",
      buttonLayout: "inline",
    },
  }
);