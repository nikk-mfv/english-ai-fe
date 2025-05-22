import {
  createTopic,
  getTopics,
  ITopic,
  updateTopic,
  deleteTopic,
} from "@/services/topic";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

export const useCreateTopic = () => {
  const [name, setName] = useState("");

  const handleCreateTopic = async () => {
    try {
      await createTopic({ name: name });

      toast(`New topic create successfully`, {
        position: "bottom-left",
      });
      setName("");
    } catch (error) {
      let errorMessage = "Failed to create new topic";

      // check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
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
      toast.success(`Topic updated successfully`, {
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

export const useDeleteTopic = () => {
  const handleDeleteTopic = async (id: number) => {
    try {
      await deleteTopic(id);
      toast(`Topic deleted successfully`, {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error(`Failed to delete topic: ${error}`, {
        position: "bottom-left",
      });
    }
  };

  return { handleDeleteTopic };
};
