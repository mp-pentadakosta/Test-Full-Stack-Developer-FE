export interface ModelListCountry {
  code: string;
  message: string;
  result: ResultModelListCountry;
}

export interface ResultModelListCountry {
  listData: ListDatumModelListCountry[];
}

export interface ListDatumModelListCountry {
  id: number;
  name: string;
  code: string;
  icon: string;
  currencyCode: string;
  createdAt: Date;
  updatedAt: Date;
}

// Converts JSON strings to/from your types
export class ConvertModelListCountry {
  public static toModelListCountry(json: string): ModelListCountry {
    return JSON.parse(json);
  }

  public static modelListCountryToJson(value: ModelListCountry): string {
    return JSON.stringify(value);
  }
}
