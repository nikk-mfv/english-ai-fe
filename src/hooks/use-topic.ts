import { createTopic, getTopics, ITopic } from "@/services/topic";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ChangeEvent } from "react";

export const useCreateTopic = (handleGetTopics: () => void) => {
  const [name, setName] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleCreateTopic = async () => {
    try {
      await createTopic({ name: name, userId: 1 });
      setName("");
      toast(`New topic create successfully`, {
        position: "bottom-left",
      });

      // Call the handleGetTopics function to refresh the topics list
      await handleGetTopics();
    } catch (error) {
      toast.error(`Failed create new topic: ${error}`, {
        position: "bottom-left",
      });
    }
  };
  return { name, handleCreateTopic, handleInputChange };
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
