import { createContext } from "react";

export type User = {
  userId: number;
  username: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);