import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateVocabulary } from '@/hooks/use-vocabulary';

export function CreateVocabPopover({
  handleGetVocabulary,
}: {
  handleGetVocabulary: () => void;
}) {
  const {
    name,
    definition,
    pronunciation,
    handleCreateVocabulary,
    setName,
    setDefinition,
    setPronunciation,
  } = useCreateVocabulary();

  const createVocabulary = async () => {
    await handleCreateVocabulary();
    handleGetVocabulary();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Create new vocabulary</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Create new vocabulary</h4>
            <p className='text-sm text-muted-foreground'>
              Create a new vocabulary to start learning.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={name}
                className='col-span-2 h-8'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='definition'>Definition</Label>
              <Input
                id='definition'
                value={definition}
                className='col-span-2 h-8'
                onChange={(e) => setDefinition(e.target.value)}
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='pronunciation'>Pronunciation</Label>
              <Input
                id='pronunciation'
                value={pronunciation}
                className='col-span-2 h-8'
                onChange={(e) => setPronunciation(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={createVocabulary}>Create</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
