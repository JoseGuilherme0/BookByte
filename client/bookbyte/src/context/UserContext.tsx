"use client";

import { createContext, useEffect, useState } from "react";

interface ContextProps {
  children: React.ReactNode;
}

interface UserType {
  id: number;
  email: string;
  username: string;
  userImg: string;
  bgImg: string;
}

interface UserContextType {
  user: UserType | undefined;
  setUser: (newState: UserType | undefined) => void;
}

const initialValue: UserContextType = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

export const UserContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const userJSON = localStorage.getItem("bookbyte:user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
