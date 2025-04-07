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

  return (
    <div className='flex flex-col gap-4 mx-auto max-w-4xl p-4'>
      <h1 className='text-2xl font-bold'>You vocabulary</h1>

      <CreateVocabPopover addVocabulary={handleAddMoreVocabulary} />

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
              refetchVocabulary={handleGetVocabulary}
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
