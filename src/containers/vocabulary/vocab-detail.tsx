import {
  useDeleteVocabulary,
  useUpdateVocabulary,
  useCreateVocabulary,
} from "@/hooks/use-vocabulary";
import { IVocabulary } from "@/services/vocab";
import { useState, useEffect } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { useGetTopics } from "@/hooks/use-topic";

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

  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>(
    vocabulary.topicIds && vocabulary.topicIds.length > 0
      ? vocabulary.topicIds
      : vocabulary.topics?.map((t) => t.iD) || []
  );
  const { topics } = useGetTopics();

  const { setTopicIds } = useCreateVocabulary();

  useEffect(() => {
    setTopicIds(selectedTopicIds);
  }, [selectedTopicIds, setTopicIds]);

  const cancelEdit = () => {
    setIsEditing(false);
    setNewVocabulary(vocabulary);
  };

  const edit = async () => {
    const updatedTopics = topics.filter((topic) =>
      selectedTopicIds.includes(topic.iD)
    );

    const updatedVocab: IVocabulary = {
      ...newVocabulary,
      topicIds: selectedTopicIds,
      topics: updatedTopics,
    };

    await handleUpdateVocabulary(vocabulary.iD, updatedVocab);
    setIsEditing(false);
    editVocabulary(updatedVocab);
    setNewVocabulary(updatedVocab);
  };

  const handleRemoveVocabulary = async () => {
    await handleDeleteVocabulary(vocabulary.iD);
    removeVocabulary(vocabulary);
  };

  return (
    <>
      <div className="card w-100 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="card-body">
          {isEditing ? (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  className="input input-neutral w-full"
                  value={newVocabulary.name}
                  onChange={(e) =>
                    setNewVocabulary({ ...newVocabulary, name: e.target.value })
                  }
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Definition</legend>
                <input
                  type="text"
                  className="input input-neutral w-full"
                  value={newVocabulary.definition}
                  onChange={(e) =>
                    setNewVocabulary({
                      ...newVocabulary,
                      definition: e.target.value,
                    })
                  }
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Example</legend>
                <input
                  type="text"
                  className="input input-neutral w-full"
                  value={newVocabulary.example}
                  onChange={(e) =>
                    setNewVocabulary({
                      ...newVocabulary,
                      example: e.target.value,
                    })
                  }
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pronunciation</legend>
                <input
                  type="text"
                  className="input input-neutral w-full"
                  value={newVocabulary.pronunciation}
                  onChange={(e) =>
                    setNewVocabulary({
                      ...newVocabulary,
                      pronunciation: e.target.value,
                    })
                  }
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Topics</legend>
                <MultiSelect
                  options={topics.map((t) => ({
                    label: t.name,
                    value: t.iD,
                  }))}
                  selected={selectedTopicIds}
                  setSelected={setSelectedTopicIds}
                />
              </fieldset>
            </>
          ) : (
            <>
              <h2 className="card-title">{vocabulary.name}</h2>
              <p>Definition: {vocabulary.definition}</p>
              <p>Example: {vocabulary.example}</p>
              <p>Pronunciation: {vocabulary.pronunciation}</p>
              <p>
                Topics:{" "}
                {(newVocabulary.topics || []).map((t) => t.name).join(", ") ||
                  "No topics"}
              </p>
            </>
          )}

          <div className="card-actions">
            {isEditing ? (
              <>
                <button
                  className="btn btn-error btn-xs btn-outline"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-xs btn-outline"
                  onClick={edit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-error btn-xs btn-outline"
                  onClick={handleRemoveVocabulary}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline btn-xs"
                  onClick={() => {
                    setSelectedTopicIds(
                      vocabulary.topicIds?.length
                        ? vocabulary.topicIds
                        : vocabulary.topics?.map((t) => t.iD) || []
                    );
                    setIsEditing(true);
                  }}
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
