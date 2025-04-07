import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCreateVocabulary } from '@/hooks/use-vocabulary';
import { IVocabulary } from '@/services/vocab';
import { toast } from 'sonner';

export function CreateVocabPopover({
  addVocabulary,
}: {
  addVocabulary: (vocabulary: IVocabulary) => void;
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
    try {
      const vocabulary = await handleCreateVocabulary();
      addVocabulary(vocabulary);
      setName('');
      setDefinition('');
      setPronunciation('');
      toast.success('Vocabulary created successfully', {
        position: 'bottom-left',
      });
    } catch (error) {
      toast.error(`Failed to create vocabulary: ${error}`, {
        position: 'bottom-left',
      });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create Vocabulary</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Vocabulary</SheetTitle>
          <SheetDescription>
            Create a new vocabulary to your profile here. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4 px-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='definition' className='text-right'>
              Definition
            </Label>
            <Input
              id='definition'
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='pronunciation' className='text-right'>
              Pronun
            </Label>
            <Input
              id='pronunciation'
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className='col-span-3'
            />
          </div>

          <SheetClose asChild>
            <Button type='submit' onClick={createVocabulary}>
              Save changes
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
