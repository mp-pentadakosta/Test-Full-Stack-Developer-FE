import { useEffect, useState } from "react";

import { useGlobalFunctionsUser } from "@/global/global.function.user";
import { User } from "@/domain/model/mode.user";
import Toast from "@/core/toast";
import ProfileRepository from "@/domain/repository/profile.repository";

export const ProfileService = () => {
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string>("");

  const [name, setName] = useState("");

  const globalFunctionsUser = useGlobalFunctionsUser();

  const updateProfile = async (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    dob: Date;
    avatar: string;
    address: string;
  }) => {
    setLoadingUpdateProfile(true);
    try {
      await ProfileRepository.updateProfile({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        dob: data.dob,
        avatar: data.avatar,
      });
      await globalFunctionsUser?.getUserProfile();
      setLoadingUpdateProfile(false);
    } catch (e: any) {
      Toast.callToastError(e.message);
      setLoadingUpdateProfile(false);
    }
  };

  const updatePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    setLoadingUpdatePassword(true);
    try {
      const resp = await ProfileRepository.updatePassword(data);

      setLoadingUpdatePassword(false);
      Toast.callToastSuccess(resp.message);
    } catch (e: any) {
      Toast.callToastError(e.message);
      setLoadingUpdatePassword(false);
    }
  };

  useEffect(() => {
    init().then((r) => r);
  }, [globalFunctionsUser?.userProfile, avatar]);

  const init = async () => {
    setUserData(globalFunctionsUser?.userProfile ?? null);
    setName(globalFunctionsUser?.userProfile?.name ?? "");
    setAvatar(globalFunctionsUser?.userProfile?.avatar ?? "");
  };

  return {
    userData,
    setUserData,
    name,
    updateProfile,
    loadingUpdateProfile,
    avatar,
    updatePassword,
    loadingUpdatePassword,
  };
};
