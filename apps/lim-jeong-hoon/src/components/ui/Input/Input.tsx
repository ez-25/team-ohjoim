'use client';

import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { inputContainerStyles, inputStyles, labelStyles, helperTextStyles } from "./Input.styles";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    helperText,
    error,
    success,
    size = "md",
    leftIcon,
    rightIcon,
    ...props 
  }, ref) => {
    const variant = error ? "error" : success ? "success" : "default";
    const helperVariant = error ? "error" : success ? "success" : "default";
    const message = error || success || helperText;

    return (
      <div className={inputContainerStyles()}>
        {label && (
          <label className={labelStyles()}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            className={cn(
              inputStyles({ 
                inputSize: size,
                inputVariant: variant 
              }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {message && (
          <span className={helperTextStyles({ helperVariant })}>
            {message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";