"use client";

import { getCurrentUser } from "@/actions/user.actions";
import { User } from "@/types/user.type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await getCurrentUser();
      console.log(data, "user context");
      if (!error) {
        // API sometimes returns an object without a `data` field on errors
        // ensure we never set `undefined` into state — use `null` fallback
        setUser(data?.data ?? null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 

  return (
    <UserContext.Provider value={{user, isLoading, setUser, refetchUser:fetchUser}}>
      {children}
      </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  console.log(context, "context folder");
  if (context === undefined) {
    throw new Error("use user must be used within a user provider");
  }

  return context;
}
