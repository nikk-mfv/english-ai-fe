import {
  useDeleteVocabulary,
  useUpdateVocabulary,
} from '@/hooks/use-vocabulary';
import { IVocabulary } from '@/services/vocab';
import { useState } from 'react';

type VocabularyProps = {
  vocabulary: IVocabulary;
  children: React.ReactNode;
  removeVocabulary: (vocabulary: IVocabulary) => void;
  editVocabulary: (vocabulary: IVocabulary) => void;
};

export function VocabDetail({
  vocabulary,
  removeVocabulary,
  editVocabulary,
}: VocabularyProps) {
  const [newVocabulary, setNewVocabulary] = useState<IVocabulary>(vocabulary);
  const { handleUpdateVocabulary } = useUpdateVocabulary();
  const { handleDeleteVocabulary } = useDeleteVocabulary();
  const [isEditing, setIsEditing] = useState(false);

  const cancelEdit = () => {
    setIsEditing(false);
    setNewVocabulary(vocabulary);
  };

  const edit = async () => {
    await handleUpdateVocabulary(vocabulary.iD, {
      name: newVocabulary.name,
      definition: newVocabulary.definition,
      pronunciation: newVocabulary.pronunciation,
    });
    setIsEditing(false);
    editVocabulary(newVocabulary);
  };

  const handleRemoveVocabulary = async () => {
    await handleDeleteVocabulary(vocabulary.iD);
    removeVocabulary(vocabulary);
  };

  return (
    <>
      <div className='card w-96 bg-base-100 card-xs shadow-sm'>
        <div className='card-body'>
          {isEditing ? (
            <>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Name</legend>
                <input
                  type='text'
                  className='input input-neutral'
                  value={newVocabulary.name}
                  onChange={(e) =>
                    setNewVocabulary({ ...newVocabulary, name: e.target.value })
                  }
                />
              </fieldset>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Definition</legend>
                <input
                  type='text'
                  className='input input-neutral'
                  value={newVocabulary.definition}
                  onChange={(e) =>
                    setNewVocabulary({
                      ...newVocabulary,
                      definition: e.target.value,
                    })
                  }
                />
              </fieldset>

              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Pronunciation</legend>
                <input
                  type='text'
                  className='input input-neutral'
                  value={newVocabulary.pronunciation}
                  onChange={(e) =>
                    setNewVocabulary({
                      ...newVocabulary,
                      pronunciation: e.target.value,
                    })
                  }
                />
              </fieldset>
            </>
          ) : (
            <>
              <h2 className='card-title'>{vocabulary.name}</h2>

              <p>{vocabulary.definition}</p>

              <p>{vocabulary.pronunciation}</p>
            </>
          )}

          <div className='card-actions'>
            {isEditing ? (
              <>
                <button
                  className='btn btn-error btn-xs btn-outline'
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className='btn btn-success btn-xs btn-outline'
                  onClick={edit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className='btn btn-error btn-xs btn-outline'
                  onClick={handleRemoveVocabulary}
                >
                  Delete
                </button>
                <button
                  className='btn btn-outline btn-xs'
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
