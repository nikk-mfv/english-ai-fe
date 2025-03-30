import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateVocabulary } from '@/hooks/use-vocabulary';
import { IVocabulary } from '@/services/vocab';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Terminal } from 'lucide-react';
import { useState } from 'react';

type VocabularyProps = {
  vocabulary: IVocabulary;
  children: React.ReactNode;
  refetchVocabulary: () => void;
};

export function VocabDetail({
  vocabulary,
  children,
  refetchVocabulary,
}: VocabularyProps) {
  const [newVocabulary, setNewVocabulary] = useState<IVocabulary>(vocabulary);
  const { handleUpdateVocabulary } = useUpdateVocabulary();

  const cancelEdit = () => {
    setNewVocabulary(vocabulary);
  };

  const save = async () => {
    await handleUpdateVocabulary(vocabulary.iD, {
      name: newVocabulary.name,
      definition: newVocabulary.definition,
      pronunciation: newVocabulary.pronunciation,
    });
    refetchVocabulary();
  };

  return (
    <Alert key={vocabulary.name}>
      <Terminal className='h-4 w-4' />
      <AlertTitle>{vocabulary.name}</AlertTitle>
      <AlertDescription>
        <div>
          <p>{vocabulary.definition}</p>
          <p>{vocabulary.pronunciation}</p>
        </div>

        <div className='flex gap-2'>
          {children}
          <Dialog>
            <DialogTrigger>Edit</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit: {vocabulary.name}</DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                  <Input
                    value={newVocabulary.name}
                    onChange={(e) => {
                      setNewVocabulary({
                        ...newVocabulary,
                        name: e.target.value,
                      });
                    }}
                  />
                  <Input
                    value={newVocabulary.definition}
                    onChange={(e) => {
                      setNewVocabulary({
                        ...newVocabulary,
                        definition: e.target.value,
                      });
                    }}
                  />
                  <Input
                    value={newVocabulary.pronunciation}
                    onChange={(e) => {
                      setNewVocabulary({
                        ...newVocabulary,
                        pronunciation: e.target.value,
                      });
                    }}
                  />
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={cancelEdit} size='sm' variant='outline'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button size='sm' onClick={save}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </AlertDescription>
    </Alert>
  );
}
