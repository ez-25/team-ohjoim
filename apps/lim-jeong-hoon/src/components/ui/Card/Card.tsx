'use client';

import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import {
  cardContentStyles,
  cardFooterStyles,
  cardHeaderStyles,
  cardStyles,
  cardTitleStyles
} from "./Card.styles";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardStyles({ 
          cardVariant: variant,
          cardPadding: padding 
        }),
        className
      )}
      {...props}
    />
  )
);

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderStyles(), className)}
      {...props}
    />
  )
);

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleStyles(), className)}
      {...props}
    />
  )
);

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentStyles(), className)}
      {...props}
    />
  )
);

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterStyles(), className)}
      {...props}
    />
  )
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardFooter, CardHeader, CardTitle };
