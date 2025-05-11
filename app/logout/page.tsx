"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { removeICookies } from "@/utils/i.coocies";

export default function LogoutPage() {
  useEffect(() => {
    logout().then((r) => r);
  }, []);

  const router = useRouter();

  const logout = async () => {
    await removeICookies("token");
    router.replace("/login");
  };

  return <div className={`flex flex-col`} />;
}
