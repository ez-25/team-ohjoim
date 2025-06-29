'use client';

import { cn } from "@/utils/cn";
import {
  headerActionsStyles,
  headerButtonStyles,
  headerLeftStyles,
  headerStyles,
  headerTitleStyles
} from "./Header.styles";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ 
  title, 
  subtitle,
  showBackButton = false, 
  onBackClick,
  actions,
  className 
}: HeaderProps) {
  return (
    <header className={cn(headerStyles(), className)}>
      <div className={headerLeftStyles()}>
        {showBackButton && (
          <button 
            onClick={onBackClick}
            className={headerButtonStyles()}
            aria-label="뒤로 가기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div className={headerTitleStyles()}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-white/80 -mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      
      {actions && (
        <div className={headerActionsStyles()}>
          {actions}
        </div>
      )}
    </header>
  );
}