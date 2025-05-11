"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthRepository from "@/domain/repository/auth.repository";
import { setICookies } from "@/utils/i.coocies";
import Toast from "@/core/toast";

export const LoginService = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (phoneNumber: string, password: string) => {
    try {
      setLoading(true);
      const resp = await AuthRepository.login({
        phoneNumber: phoneNumber,
        password: password,
      });

      await setICookies("token", resp.result.accessToken, 1);

      router.replace("/home");
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      Toast.callToastError(e.message);
    }
  };

  return {
    login,
    loading,
  };
};
