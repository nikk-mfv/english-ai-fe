import {
  createVocabulary,
  deleteVocabulary,
  getVocabulary,
  IVocabulary,
  updateVocabulary,
} from '@/services/vocab';
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

export const useDeleteVocabulary = () => {
  const handleDeleteVocabulary = async (id: number) => {
    try {
      await deleteVocabulary(id);
      toast('Vocabulary deleted successfully', {
        position: 'bottom-left',
      });
    } catch (error) {
      toast.error(`Failed to delete vocabulary: ${error}`, {
        position: 'bottom-left',
      });
    }
  };

  return {
    handleDeleteVocabulary,
  };
};

export const useUpdateVocabulary = () => {
  const handleUpdateVocabulary = async (
    id: number,
    vocabulary: Pick<IVocabulary, 'name' | 'definition' | 'pronunciation'>
  ) => {
    try {
      await updateVocabulary(id, vocabulary);
      toast('Vocabulary updated successfully', {
        position: 'bottom-left',
      });
    } catch (error) {
      toast.error(`Failed to update vocabulary: ${error}`, {
        position: 'bottom-left',
      });
    }
  };

  return {
    handleUpdateVocabulary,
  };
};
