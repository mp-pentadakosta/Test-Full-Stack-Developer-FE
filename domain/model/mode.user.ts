export interface ModelUser {
  code: string;
  message: string;
  result: ResultModelUser;
}

export interface ResultModelUser {
  user: User;
}

export interface User {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  gender?: string;
  nik?: string;
  dob?: string;
  role?: string;
}

export class ConvertModelUser {
  public static toModelUser(json: string): ModelUser {
    return JSON.parse(json);
  }

  public static modelUserToJson(value: ModelUser): string {
    return JSON.stringify(value);
  }
}
