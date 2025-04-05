import { CreateVocabPopover } from '@/containers/my-words/create-vocab-popover';
import { DeleteVocab } from '@/containers/my-words/delete-vocab';
import { VocabDetail } from '@/containers/my-words/vocab-detail';
import { useGetVocabulary } from '@/hooks/use-vocabulary';

function MyWords() {
  const { vocabulary, handleGetVocabulary } = useGetVocabulary();

  return (
    <div className='flex flex-col gap-4 mx-auto max-w-4xl p-4'>
      <h1 className='text-2xl font-bold'>You vocabulary</h1>

      <CreateVocabPopover handleGetVocabulary={handleGetVocabulary} />

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
              <DeleteVocab
                vocabulary={word}
                refetchVocabulary={handleGetVocabulary}
              />
            </VocabDetail>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWords;
