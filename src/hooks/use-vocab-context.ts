import { useContext } from 'react';
import { VocabularyContext } from '@/contexts/VocabContext';

export const useVocabularyContext = () => {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error("useVocabularyContext must be used within VocabularyProvider");
  }
  return context;
};
