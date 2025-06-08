import { createAccount, login, getUser } from "@/services/user";
import { useNavigate } from "react-router-dom";
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
  const { handleGetUser } = useGetUser()
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });

      // Store the token in local storage
      localStorage.setItem("token", response.token);

      toast(`Welcome back, ${username}`, {
        position: "bottom-left",
      });
      await handleGetUser()
      navigate("/");
    } catch (error) {
      toast.error('User name or password is not correct !!!', {
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
    } catch (error) {
      console.error(error);
    }
  };

  return { handleGetUser };
};
