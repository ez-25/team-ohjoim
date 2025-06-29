'use client';

import { MainLayout } from "@/components/layouts";
import { Button, Card, CardContent } from "@/components/ui";
import { WordForm, WordList } from "@/components/word";
import type { Word } from "@/types/word";
import { useState } from 'react';

export default function WordsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingWord, setEditingWord] = useState<Word | undefined>();

  const headerActions = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setEditingWord(undefined);
        setShowAddForm(true);
      }}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      }
      className="text-white hover:bg-white/20"
    >
      추가
    </Button>
  );

  const handleWordEdit = (word: Word) => {
    setEditingWord(word);
    setShowAddForm(true);
  };

  const handleFormSuccess = () => {
    setShowAddForm(false);
    setEditingWord(undefined);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingWord(undefined);
  };

  return (
    <MainLayout 
      title="단어장" 
      headerActions={headerActions}
    >
      {showAddForm ? (
        <Card>
          <CardContent>
            <WordForm
              word={editingWord}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </CardContent>
        </Card>
      ) : (
        <WordList 
          onWordEdit={handleWordEdit}
          showStats={true}
        />
      )}
    </MainLayout>
  );
}