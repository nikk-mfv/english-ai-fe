import { createTopic, getTopics, ITopic } from "@/services/topic";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";

export const useCreateTopic = () => {
  const [name, setName] = useState("");

  const handleCreateTopic = async () => {
    try {
      await createTopic({ name: name, userId: 1 });
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
  const [size, setSize] = useState(0);

  const handleGetTopics = async (page?: number) => {
    try {
      const response = await getTopics(page || 1);
      setTopics(response.data.data);
      setTotalTopics(response.data.totalItems);
      setSize(response.data.size);
    } catch (error) {
      toast.error(`Failed get topics: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    handleGetTopics(1);
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(totalTopics / size),
    [totalTopics, size]
  );

  return { topics, totalTopics, totalPages, handleGetTopics };
}
