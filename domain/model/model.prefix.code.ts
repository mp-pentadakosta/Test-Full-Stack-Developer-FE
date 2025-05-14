export interface ModelPrefixCode {
  code: string;
  message: string;
  result: ResultModelPrefixCode;
}

export interface ResultModelPrefixCode {
  exchangeRate: { [key: string]: ExchangeRate };
  listData: ListDatumModelPrefixCode[];
}

export interface ExchangeRate {
  price: number;
  code: string;
  id: string;
}

export interface ListDatumModelPrefixCode {
  id: number;
  gameId: number;
  code: string;
  icon: string;
  type: string;
  description: string;
  name: string;
  stock: number;
  price: number;
  fee: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export class ConvertModelPrefixCode {
  public static toModelPrefixCode(json: string): ModelPrefixCode {
    return JSON.parse(json);
  }

  public static modelPrefixCodeToJson(value: ModelPrefixCode): string {
    return JSON.stringify(value);
  }
}
