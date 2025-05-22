import { createAccount } from "@/services/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      await createAccount({ username: username, password: password });
      console.log(createAccount);
      toast(`Your new account create successfully`, {
        position: "bottom-left",
      });
      setUsername("");
      setPassword("");
      navigate("/log-in");
    } catch (error) {
      console.error(error);
      let errorMessage = "Failed to create your new account";

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
  return { username, setUsername, setPassword, password, handleCreateAccount };
};
