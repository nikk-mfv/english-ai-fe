import { CreateVocabPopover } from '@/containers/vocabulary/create-vocab-popover';
import { DeleteVocab } from '@/containers/vocabulary/delete-vocab';
import { VocabDetail } from '@/containers/vocabulary/vocab-detail';
import { VocabularyPagination } from '@/containers/vocabulary/vocal-pagination';
import { useGetVocabulary } from '@/hooks/use-vocabulary';
import { IVocabulary } from '@/services/vocab';

function Vocabulary() {
  const { vocabulary, setVocabulary, totalPages, handleGetVocabulary } =
    useGetVocabulary();

  const handleAddMoreVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) => [...old, vocabulary]);
  };

  const handleRemoveVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) => old.filter((word) => word.iD !== vocabulary.iD));
  };

  const handleEditVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) =>
      old.map((word) => (word.iD === vocabulary.iD ? vocabulary : word))
    );
  };

  return (
    <div className='flex flex-col gap-4 mx-auto max-w-4xl p-4'>
      <h1 className='text-2xl font-bold'>Your vocabulary</h1>

      <div>
        <CreateVocabPopover addVocabulary={handleAddMoreVocabulary} />
      </div>

      {totalPages > 1 && (
        <VocabularyPagination
          total={totalPages}
          onChange={handleGetVocabulary}
        />
      )}

      {vocabulary.length === 0 ? (
        <div className='flex flex-col gap-4'>
          <p className='text-muted-foreground text-center'>
            No vocabulary found
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {vocabulary.map((word) => (
            <VocabDetail
              key={word.name}
              vocabulary={word}
              removeVocabulary={handleRemoveVocabulary}
              editVocabulary={handleEditVocabulary}
            >
              <>
                <DeleteVocab
                  vocabulary={word}
                  refetchVocabulary={handleGetVocabulary}
                />
              </>
            </VocabDetail>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vocabulary;
