import { createAccount, login, getUser } from "@/services/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export const useCreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async () => {
    try {
      await createAccount({ username: username, password: password });

      toast.success(`Your new account create successfully`, {
        position: "bottom-left",
      });
      setUsername("");
      setPassword("");
      navigate("/log-in");
    } catch (error) {
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

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ username: username, password: password });

      // Store the token in local storage
      localStorage.setItem("token", response.token);
      console.log(response.user);

      toast(`Welcome back, ${username}`, {
        position: "bottom-left",
      });

      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error(error);
      let errorMessage = "Failed to login";

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
  return { username, setUsername, setPassword, password, handleLogin };
};

export const useGetUser = () => {
  const { setUser } = useAuth();

  const handleGetUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleGetUser };
};
