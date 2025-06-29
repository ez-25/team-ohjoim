'use client';

import { cn } from "@/utils/cn";
import { BottomNav } from "../BottomNav";
import { Header } from "../Header";
import {
  bottomNavContainerStyles,
  mainContentStyles,
  mainLayoutStyles,
  pageContainerStyles
} from "./MainLayout.styles";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  headerActions?: React.ReactNode;
  containerVariant?: "default" | "tight" | "loose" | "none";
  className?: string;
}

export function MainLayout({ 
  children,
  title,
  showBackButton = false,
  onBackClick,
  headerActions,
  containerVariant = "default",
  className 
}: MainLayoutProps) {
  return (
    <div className={cn(mainLayoutStyles(), className)}>
      <Header
        title={title}
        showBackButton={showBackButton}
        onBackClick={onBackClick}
        actions={headerActions}
      />
      
      <div className={mainContentStyles()}>
        <div className={pageContainerStyles({ containerVariant })}>
          {children}
        </div>
      </div>

      <div className={bottomNavContainerStyles()}>
        <BottomNav />
      </div>
    </div>
  );
}