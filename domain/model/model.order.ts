export interface ModelAddOrder {
  username: string;
  id: string;
  server?: string;
  item: string;
  product: string;
  payment: string;
  price: number;
  currency: string;
  waNumber: string;
  prefixId: number;
}

// ======================================================invoice-detail=========================================================

export interface ModelInvoiceDetail {
  code: string;
  message: string;
  result: ResultModelInvoiceDetail;
}

export interface ResultModelInvoiceDetail {
  data: DataModelInvoiceDetail;
}

export interface DataModelInvoiceDetail {
  accountInformation: AccountInformationModelInvoiceDetail;
  gameInformation: GameInformationModelInvoiceDetail;
  orderInformation: OrderInformationModelInvoiceDetail;
}

export interface AccountInformationModelInvoiceDetail {
  idGameUser: string;
  serverGame: string;
  username: string;
}

export interface GameInformationModelInvoiceDetail {
  name: string;
  image: string;
  publisher: string;
}

export interface OrderInformationModelInvoiceDetail {
  price: number;
  fee: number;
  total: number;
  paymentMethod: string;
  invoice: string;
  currencyCode: string;
  priceExchange: number;
  statusPayment: string;
  statusTransaction: string;
}

// Converts JSON strings to/from your types
export class ConvertModelInvoiceDetail {
  public static toModelInvoiceDetail(json: string): ModelInvoiceDetail {
    return JSON.parse(json);
  }

  public static modelInvoiceDetailToJson(value: ModelInvoiceDetail): string {
    return JSON.stringify(value);
  }
}
