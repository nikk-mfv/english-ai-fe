import { createContext } from "react";

export type User = {
  userId: number;
  username: string;
  imageUrl?: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean,
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);