import { get, put } from "@/core/api";
import { ConvertModelUser } from "@/domain/model/mode.user";

class ProfileRepository {
  async getProfile() {
    const resp = await get("/user/me");

    return ConvertModelUser.toModelUser(resp);
  }

  async updateProfile(data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    dob: Date;
    avatar: string;
    address: string;
  }) {
    const resp = await put("/user/update", {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dob: data.dob,
      avatar: data.avatar,
      address: data.address,
    });

    return ConvertModelUser.toModelUser(resp);
  }

  async updatePassword(data: { oldPassword: string; newPassword: string }) {
    const resp = await put("/user/update/password", data);

    return JSON.parse(resp);
  }
}

export default new ProfileRepository();
