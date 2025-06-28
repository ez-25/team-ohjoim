'use client';

import { useState } from 'react';
import { WordFilters } from "../../../types/word";
import { Header } from "../Header";

export function MainLayout() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState<WordFilters>({});

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleMoreClick = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    window.location.reload();
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      <Header 
        title="외우자영단어"
        showBackButton={false}
        showMoreButton={true}
        onBackClick={handleBackClick}
        onMoreClick={handleMoreClick}
      />
      
      <div className="p-4 space-y-4">
        example content here
      </div>
    </div>
  );
}