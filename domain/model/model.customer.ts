export interface ModelListData {
  code: string;
  message: string;
  result: ResultModelListData;
}

export interface ResultModelListData {
  listData: ListDatumModelListData[];
}

export interface ListDatumModelListData {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: null;
  avatar: null;
  gender: null;
  nik: null;
  imageIdentity: null;
  role: string;
  dob: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface ModelData {
  code: string;
  message: string;
  result: ResultModelData;
}

export interface ResultModelData {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: null;
  avatar: null;
  gender: null;
  nik: null;
  imageIdentity: null;
  role: string;
  dob: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export class ConvertModelListData {
  public static toModelListData(json: string): ModelListData {
    return JSON.parse(json);
  }

  public static toModelData(json: string): ModelData {
    return JSON.parse(json);
  }
}
