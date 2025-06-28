'use client'

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMoreButton?: boolean;
  onBackClick?: () => void;
  onMoreClick?: () => void;
}

export function Header({ 
  title, 
  showBackButton = false, 
  showMoreButton = false,
  onBackClick,
  onMoreClick 
}: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button 
            onClick={onBackClick}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      {showMoreButton && (
        <button 
          onClick={onMoreClick}
          className="p-1 hover:bg-blue-700 rounded transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="19" cy="12" r="1" fill="currentColor" />
            <circle cx="5" cy="12" r="1" fill="currentColor" />
          </svg>
        </button>
      )}
    </header>
  );
}