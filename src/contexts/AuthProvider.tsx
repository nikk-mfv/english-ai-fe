import { useState, ReactNode, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import { getUser } from "@/services/user";
import { toast } from "sonner";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    
    toast("You have been logged out", {
      position: "bottom-left",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        logout();
        toast.error("Session expired. Please log in again." + error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
