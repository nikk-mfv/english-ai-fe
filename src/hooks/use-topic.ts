import { createTopic, getTopics, ITopic } from "@/services/topic";
import { useState, useEffect } from "react";
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

  const handleGetTopics = async () => {
    try {
      const response = await getTopics();
      setTopics(response.data);
    } catch (error) {
      toast.error(`Failed get topics: ${error}`, {
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    handleGetTopics();
  }, []);

  return { topics, handleGetTopics };
}
