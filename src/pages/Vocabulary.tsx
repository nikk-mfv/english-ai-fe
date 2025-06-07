import { Pagination } from "@/components/pagination";
import { CreateVocabPopover } from "@/containers/vocabulary/create-vocab-popover";
import { VocabDetail } from "@/containers/vocabulary/vocab-detail";
import { useGetVocabulary, useDeleteVocabulary } from "@/hooks/use-vocabulary";
import { IVocabulary } from "@/services/vocab";
import { useState } from "react";
import { Delete } from "@/components/delete";

function Vocabulary() {
  const { vocabulary, setVocabulary, totalPages, handleGetVocabulary } =
    useGetVocabulary();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMoreVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) => [vocabulary, ...old]);
    handleGetVocabulary();
  };

  const handleRemoveVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) => old.filter((word) => word.iD !== vocabulary.iD));
  };

  const handleEditVocabulary = (vocabulary: IVocabulary) => {
    setVocabulary((old) =>
      old.map((word) => (word.iD === vocabulary.iD ? vocabulary : word))
    );
  };

  const { handleDeleteVocabulary } = useDeleteVocabulary();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold text-center">Your vocabulary</h1>

      <div className="flex justify-center">
        <button className="btn" onClick={openModal}>
          Add Vocabulary
        </button>
      </div>

      {isModalOpen && (
        <CreateVocabPopover
          addVocabulary={(vocab) => {
            handleAddMoreVocabulary(vocab);
          }}
          closeModal={closeModal}
        />
      )}

      {vocabulary.length === 0 ? (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center">
            No vocabulary found
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vocabulary.map((word) => (
              <VocabDetail
                key={word.iD}
                vocabulary={word}
                removeVocabulary={handleRemoveVocabulary}
                editVocabulary={handleEditVocabulary}
              >
                <>
                  <Delete<IVocabulary>
                    object={word}
                    refetch={handleGetVocabulary}
                    handleDelete={handleDeleteVocabulary}
                  />
                </>
              </VocabDetail>
            ))}
          </div>
        </div>
      )}
      <Pagination total={totalPages} onChange={handleGetVocabulary} />
    </div>
  );
}

export default Vocabulary;
