import { post } from "@/core/api";
import { ConvertModelSession } from "@/domain/model/model.session";

class AuthRepository {
  constructor() {}

  public async login(data: { phoneNumber: string; password: string }) {
    const resp = await post("/auth/login", data);

    return ConvertModelSession.toModelSession(resp);
  }

  public async register(data: {
    phoneNumber: string;
    password: string;
    fullName: string;
    email: string;
  }) {
    return await post("/auth/register", data);
  }
}

export default new AuthRepository();
