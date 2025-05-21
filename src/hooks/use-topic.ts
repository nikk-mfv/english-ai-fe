import { createTopic, getTopics, ITopic, updateTopic } from "@/services/topic";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useCreateTopic = () => {
  const [name, setName] = useState("");

  const handleCreateTopic = async () => {
    try {
      await createTopic({ name: name, userId: 1 }); //TODO: get userId from auth
      toast(`New topic create successfully`, {
        position: "bottom-left",
      });
      setName("");
    } catch (error) {
      toast.error(`Failed create new topic: ${error}`, {
        position: "bottom-left",
      });
    }
  };
  return { name, setName, handleCreateTopic };
};

export function useGetTopics() {
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [totalTopics, setTotalTopics] = useState(0);

  const handleGetTopics = async (page?: number) => {
    try {
      const response = await getTopics(page || 1);
      setTopics(response.data.data);
      setTotalTopics(response.data.paging.total);
    } catch (error) {
      toast.error(`Failed get topics: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    handleGetTopics(1);
  }, []);

  return { topics, totalTopics, handleGetTopics, setTopics };
}

export const useUpdateTopic = () => {
  const handleUpdateTopic = async (id: number, topic: Pick<ITopic, "name">) => {
    try {
      await updateTopic(id, topic);
      toast(`Topic updated successfully`, {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error(`Failed to update topic: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  return { handleUpdateTopic };
};
