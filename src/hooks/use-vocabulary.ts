import { createVocabulary, getVocabulary, IVocabulary } from '@/services/vocab';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useCreateVocabulary = () => {
  const [name, setName] = useState('');
  const [definition, setDefinition] = useState('');
  const [pronunciation, setPronunciation] = useState('');

  const handleCreateVocabulary = async () => {
    try {
      await createVocabulary({
        name: name,
        definition: definition,
        pronunciation: pronunciation,
      });

      toast('Vocabulary created successfully', {
        description: `${name} has been created`,
        position: 'bottom-left',
      });
      setName('');
      setDefinition('');
      setPronunciation('');
    } catch (error) {
      toast.error(`Failed to create vocabulary: ${error}`, {
        position: 'bottom-left',
      });
    }
  };

  return {
    name,
    definition,
    pronunciation,
    handleCreateVocabulary,
    setName,
    setDefinition,
    setPronunciation,
  };
};

export const useGetVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);

  const handleGetVocabulary = async () => {
    try {
      const response = await getVocabulary();
      setVocabulary(response);
      console.log(response);
    } catch (error) {
      toast.error(`Failed to get vocabulary: ${error}`, {
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    handleGetVocabulary();
  }, []);

  return {
    vocabulary,
    handleGetVocabulary,
  };
};
