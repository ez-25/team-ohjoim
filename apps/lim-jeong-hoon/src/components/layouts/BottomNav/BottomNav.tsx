'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from "@/utils/cn";
import { 
  bottomNavStyles, 
  navItemStyles, 
  navIconStyles, 
  navLabelStyles 
} from "./BottomNav.styles";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: '홈',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    activeIcon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 005 10.414V19a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-8.586a1 1 0 00-.707-1.707l-7-7z" />
      </svg>
    ),
  },
  {
    href: '/words',
    label: '단어장',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    activeIcon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 3a1 1 0 000 2h6a1 1 0 100-2H9zM6 6a3 3 0 013-3h6a3 3 0 013 3v12a3 3 0 01-3 3H9a3 3 0 01-3-3V6z" />
      </svg>
    ),
  },
  {
    href: '/review',
    label: '복습',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    activeIcon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6 10a1 1 0 01-1 1H4a1 1 0 110-2h1a1 1 0 011 1zM12 14l1.25 1.25a.75.75 0 001.06 0L17 12.56a6 6 0 10-10 0l2.69 2.69a.75.75 0 001.06 0L12 14z" />
      </svg>
    ),
  },
  {
    href: '/stats',
    label: '통계',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    activeIcon: (
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM9 9a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V9zM15 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={bottomNavStyles()}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              navItemStyles({
                navVariant: isActive ? "active" : "default"
              })
            )}
          >
            <span className={navIconStyles()}>
              {isActive && item.activeIcon ? item.activeIcon : item.icon}
            </span>
            <span className={navLabelStyles()}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}