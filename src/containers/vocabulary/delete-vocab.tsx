import { Button } from '@/components/ui/button';
import { useDeleteVocabulary } from '@/hooks/use-vocabulary';
import { IVocabulary } from '@/services/vocab';

type VocabularyProps = {
  vocabulary: IVocabulary;
  refetchVocabulary: () => void;
};

export function DeleteVocab({
  vocabulary,
  refetchVocabulary,
}: VocabularyProps) {
  const { handleDeleteVocabulary } = useDeleteVocabulary();

  const submit = async () => {
    await handleDeleteVocabulary(vocabulary.iD);
    refetchVocabulary();
  };

  return (
    <div>
      <Button size='sm' variant='destructive' onClick={submit}>
        Delete
      </Button>
    </div>
  );
}
