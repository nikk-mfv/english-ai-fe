import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CreateVocabPopover } from '@/containers/my-words/create-vocab-popover';
import { useGetVocabulary } from '@/hooks/use-vocabulary';
import { Terminal } from 'lucide-react';

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
            <Alert key={word.name}>
              <Terminal className='h-4 w-4' />
              <AlertTitle>{word.name}</AlertTitle>
              <AlertDescription>
                <div>
                  <p>{word.definition}</p>
                  <p>{word.pronunciation}</p>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyWords;
