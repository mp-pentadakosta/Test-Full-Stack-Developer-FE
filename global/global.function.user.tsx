"use client";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/domain/model/mode.user";
import ProfileRepository from "@/domain/repository/profile.repository";
import Toast from "@/core/toast";

export interface InterfaceGlobalUserContext {
  userProfile: User | null;
  getUserProfile: () => Promise<void>;
}

const GlobalUserContext = createContext<InterfaceGlobalUserContext | null>(
  null,
);

export function GlobalUserProvider({ children }: any) {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const greetUser = async () => {
    try {
      const resp = await ProfileRepository.getProfile();

      setUserProfile(resp.result.user);
    } catch (e: any) {
      Toast.callToastError(e.message);
    }
  };

  useEffect(() => {
    greetUser().then((value) => value);
  }, []);

  return (
    <GlobalUserContext.Provider
      value={{
        userProfile,
        getUserProfile: greetUser,
      }}
    >
      {children}
    </GlobalUserContext.Provider>
  );
}

export function useGlobalFunctionsUser() {
  return useContext(GlobalUserContext);
}
