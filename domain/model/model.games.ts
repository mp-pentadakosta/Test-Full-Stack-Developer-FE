//=========================================================list===================================================

export interface ModelListGame {
  code: string;
  message: string;
  result: ResultModelListGame;
}

export interface ResultModelListGame {
  listData: ListDatumModelListGame[];
}

export interface ListDatumModelListGame {
  id: number;
  name: string;
  image: string;
  publisher: string;
  useServer: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

// Converts JSON strings to/from your types
export class ConvertModelListGame {
  public static toModelListGame(json: string): ModelListGame {
    return JSON.parse(json);
  }

  public static modelListGameToJson(value: ModelListGame): string {
    return JSON.stringify(value);
  }
}

//=========================================================detail===================================================

export interface ModelDetailGame {
  code: string;
  message: string;
  result: ResultModelDetailGame;
}

export interface ResultModelDetailGame {
  data: DataModelDetailGame;
}

export interface DataModelDetailGame {
  id: number;
  name: string;
  image: string;
  publisher: string;
  useServer: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

// Converts JSON strings to/from your types
export class ConvertModelDetailGame {
  public static toModelDetailGame(json: string): ModelDetailGame {
    return JSON.parse(json);
  }

  public static modelDetailGameToJson(value: ModelDetailGame): string {
    return JSON.stringify(value);
  }
}
