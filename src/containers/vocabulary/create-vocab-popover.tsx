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
    <>
      <button
        className='btn'
        onClick={() => {
          const modal = document.getElementById(
            'create-vocabulary-modal'
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Create Vocabulary
      </button>
      <dialog id='create-vocabulary-modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Create Vocabulary</h3>
          <div className='py-4'>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Name</legend>
              <input
                type='text'
                className='input input-neutral'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Definition</legend>
              <input
                type='text'
                className='input input-neutral'
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
              />
            </fieldset>

            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Pronunciation</legend>
              <input
                type='text'
                className='input input-neutral'
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
              />
            </fieldset>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn' onClick={createVocabulary}>
                Create
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
