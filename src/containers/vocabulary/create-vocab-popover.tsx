import { useCreateVocabulary } from "@/hooks/use-vocabulary";
import { IVocabulary } from "@/services/vocab";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useGetTopics } from "@/hooks/use-topic";
import { MultiSelect } from "@/components/ui/multiSelect";
import axios from "axios";

export function CreateVocabPopover({
  name,
  definition,
  addVocabulary,
  closeModal,
}: {
  name?: string;
  definition?: string;
  addVocabulary: (vocabulary: IVocabulary) => void;
  closeModal: () => void;
}) {
  const { topics } = useGetTopics();
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  const {
    name: nameState,
    definition: definitionState,
    example,
    pronunciation,
    handleCreateVocabulary,
    setName,
    setDefinition,
    setExample,
    setPronunciation,
    setTopicIds,
  } = useCreateVocabulary();

  useEffect(() => {
    setTopicIds(selectedTopicIds);
  }, [selectedTopicIds, setTopicIds]);

  const createVocabulary = async () => {
    try {
      const vocabulary = await handleCreateVocabulary();
      addVocabulary(vocabulary);

      toast.success("Vocabulary created successfully", {
        position: "bottom-left",
      });

      setName("");
      setDefinition("");
      setExample("");
      setPronunciation("");

      closeModal();
    } catch (error) {
      let errorMessage = "Failed to create vocabulary";
      // check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      }
      toast.error(errorMessage, {
        position: "bottom-left",
      });

      closeModal();
    }
  };

  useEffect(() => {
    setName(name || "");
    setDefinition(definition || "");

    const modal = document.getElementById(
      "create-vocabulary-modal"
    ) as HTMLDialogElement;

    if (modal?.showModal && !modal.open) {
      modal.showModal();
    }
  }, [name, definition, setName, setDefinition]);

  return (
    <>
      <dialog id="create-vocabulary-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Vocabulary</h3>
          <div className="py-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input input-neutral w-full"
                value={nameState}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Definition</legend>
              <input
                type="text"
                className="input input-neutral w-full"
                value={definitionState}
                onChange={(e) => setDefinition(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Example</legend>
              <input
                type="text"
                className="input input-neutral w-full"
                value={example}
                onChange={(e) => setExample(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pronunciation</legend>
              <input
                type="text"
                className="input input-neutral w-full"
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
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
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={createVocabulary}>
                Create
              </button>
              <button className="btn btn-ghost ml-2" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
