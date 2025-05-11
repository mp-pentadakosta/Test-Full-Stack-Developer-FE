export interface ModelSession {
  code: string;
  message: string;
  result: ResultModelSession;
}

export interface ResultModelSession {
  accessToken: string;
  refreshToken: string;
}

export class ConvertModelSession {
  public static toModelSession(json: string): ModelSession {
    return JSON.parse(json);
  }
}
