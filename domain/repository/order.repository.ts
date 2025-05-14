import { get, post } from "@/core/api";
import { ConvertModelInvoiceDetail } from "@/domain/model/model.order";

class OrderRepository {
  public async addOrder(data: {
    gameId: string;
    currencyCode: string;
    username: string;
    idGameUser: string;
    serverGame?: string;
    paymentMethod: string;
    prefixCodeId: number;
    priceExchange: number;
    waNumber: string;
  }) {
    const resp = await post(`/order/add/${data.gameId}`, {
      currencyCode: data.currencyCode,
      username: data.username,
      idGameUser: data.idGameUser,
      serverGame: data.serverGame,
      paymentMethod: data.paymentMethod,
      prefixCodeId: data.prefixCodeId,
      priceExchange: data.priceExchange,
      waNumber: data.waNumber,
    });

    return JSON.parse(resp);
  }

  public async getOrderByInvoice(invoice: string) {
    const resp = await get(`/order/invoice/${invoice}`);

    return ConvertModelInvoiceDetail.toModelInvoiceDetail(resp);
  }
}

export default new OrderRepository();
