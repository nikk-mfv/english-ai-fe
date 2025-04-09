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
      <button className='btn btn-error btn-soft btn-xs' onClick={submit}>
        Delete
      </button>
    </div>
  );
}
