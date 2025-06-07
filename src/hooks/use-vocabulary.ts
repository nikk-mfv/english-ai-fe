import {
  createVocabulary,
  deleteVocabulary,
  getVocabulary,
  IVocabulary,
  updateVocabulary,
} from "@/services/vocab";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCreateVocabulary = () => {
  const [name, setName] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [topicIds, setTopicIds] = useState<number[]>([]);

  const handleCreateVocabulary = async () => {
    return createVocabulary({
      name: name,
      definition: definition,
      example: example,
      pronunciation: pronunciation,
      topicIds: topicIds || [],
    });
  };

  return {
    name,
    definition,
    example,
    pronunciation,
    topicIds,
    handleCreateVocabulary,
    setName,
    setDefinition,
    setExample,
    setPronunciation,
    setTopicIds,
  };
};

export const useGetVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleGetVocabulary = async (page?: number) => {
    try {
      const response = await getVocabulary(page || 1);
      setVocabulary(response.data || []);
      setTotalPages(response.paging.total);
    } catch (error) {
      toast.error(`Failed to get vocabulary: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    handleGetVocabulary(1);
  }, []);

  return {
    vocabulary,
    totalPages,
    handleGetVocabulary,
    setVocabulary,
  };
};

export const useDeleteVocabulary = () => {
  const handleDeleteVocabulary = async (id: number) => {
    try {
      await deleteVocabulary(id);
      toast("Vocabulary deleted successfully", {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error(`Failed to delete vocabulary: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  return {
    handleDeleteVocabulary,
  };
};

export const useUpdateVocabulary = () => {
  const handleUpdateVocabulary = async (
    id: number,
    vocabulary: Pick<IVocabulary, "name" | "definition" | "example" | "pronunciation" | "topicIds" >
  ) => {
    try {
      await updateVocabulary(id, vocabulary);
      toast("Vocabulary updated successfully", {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error(`Failed to update vocabulary: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  return {
    handleUpdateVocabulary,
  };
};
