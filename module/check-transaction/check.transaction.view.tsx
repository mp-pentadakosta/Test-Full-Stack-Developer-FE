import { Image } from "@heroui/image";
import { Input } from "@heroui/input";

import { TransactionProgress } from "@/module/check-transaction/component/transaction.progress";
import CountDownTimerComponent from "@/module/check-transaction/component/count.down.timer.component";
import { CheckTransactionService } from "@/module/check-transaction/check.transaction.service";
import CurrencyUtils from "@/utils/currency.utils";
import { useSocket } from "@/hook/useSocket";

export const CheckTransactionView = (data: { inv?: string }) => {
  useSocket();
  const targetTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
  const { detailInvoice, setInputInvoice, inputInvoice, getDetailInvoice } =
    CheckTransactionService(data.inv);

  return data.inv ? (
    <div
      className={`flex flex-col items-center w-full h-full px-8 overflow-auto`}
    >
      <h1 className="text-2xl font-bold">Check Transaction</h1>
      <p className="text-gray-500">This is the check transaction page.</p>
      {detailInvoice ? (
        <div className={`flex flex-col w-full mt-8 px-8`}>
          <TransactionProgress
            activeStep={
              detailInvoice.orderInformation.statusPayment === "PAID" &&
              detailInvoice.orderInformation.statusTransaction === "PENDING"
                ? 1
                : detailInvoice.orderInformation.statusPayment === "PAID" &&
                    detailInvoice.orderInformation.statusTransaction ===
                      "PROCESSING"
                  ? 2
                  : detailInvoice.orderInformation.statusPayment === "PAID" &&
                      detailInvoice.orderInformation.statusTransaction ===
                        "SUCCESS"
                    ? 3
                    : 0
            }
          />
          <div className={`flex flex-col w-full mt-8`}>
            <CountDownTimerComponent targetTime={targetTime} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 text-white bg-neutral-900 mt-12 rounded-xl">
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-4">
                  <Image
                    alt="Game Image"
                    className="w-24 h-24 rounded-xl object-cover"
                    src={detailInvoice.gameInformation.image}
                  />
                  <div className="text-sm">
                    <p className="font-bold text-lg">Account Information</p>
                    <p>
                      Nickname : {detailInvoice.accountInformation.username}
                    </p>
                    <p>ID : {detailInvoice.accountInformation.idGameUser}</p>
                    {detailInvoice.accountInformation.serverGame ? (
                      <p>
                        Server : {detailInvoice.accountInformation.serverGame}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Rincian Pembayaran */}
                <div className="bg-gray-800 rounded-xl">
                  <div className="p-4 border-b border-gray-700 font-semibold">
                    Payment Details
                  </div>
                  <div className="p-4 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span>
                        {detailInvoice.orderInformation.currencyCode}{" "}
                        {CurrencyUtils.exChangeCurrency({
                          value: detailInvoice.orderInformation.price,
                          currentCurrency:
                            detailInvoice.orderInformation.priceExchange,
                        }).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee</span>
                      <span>
                        {detailInvoice.orderInformation.currencyCode}{" "}
                        {CurrencyUtils.exChangeCurrency({
                          value: detailInvoice.orderInformation.fee,
                          currentCurrency:
                            detailInvoice.orderInformation.priceExchange,
                        }).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#2d2926] px-4 py-3 border-t border-[#b89c81] flex justify-between font-bold text-lg text-[#b89c81] rounded-b-xl">
                    <span>Total</span>
                    <div className="flex items-center gap-2">
                      <span>
                        {detailInvoice.orderInformation.currencyCode}{" "}
                        {CurrencyUtils.exChangeCurrency({
                          value: detailInvoice.orderInformation.total,
                          currentCurrency:
                            detailInvoice.orderInformation.priceExchange,
                        }).toLocaleString()}
                      </span>
                      <button className="text-sm" title="Salin">
                        📋
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bagian Kanan - Info Pembayaran & QR */}
              <div className="space-y-4">
                <div className="text-sm space-y-2">
                  <p className="font-semibold">Payment Method</p>
                  <p className="text-lg font-bold">
                    {detailInvoice.orderInformation.paymentMethod}
                  </p>

                  <p>Nomor Invoice</p>
                  <div className="flex items-center gap-2 text-[#f7d6d6] font-mono text-sm">
                    <span>{data.inv}</span>
                    <button title="Salin">📋</button>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <div className={`flex flex-col items-center gap-2`}>
                      <span className="text-white px-3 py-1 text-medium rounded-full">
                        Payment Status
                      </span>
                      <span
                        className={`${detailInvoice.orderInformation.statusPayment === "PAID" ? "bg-green-600" : "bg-pink-600"} text-white px-3 py-1 text-xs rounded-full`}
                      >
                        {detailInvoice.orderInformation.statusPayment}
                      </span>
                    </div>
                    <div className={`flex flex-col items-center gap-2`}>
                      <span className="text-white px-3 py-1 text-medium rounded-full">
                        Transaction Status
                      </span>
                      <span
                        className={`${detailInvoice.orderInformation.statusTransaction === "SUCCESS" ? "bg-green-600" : detailInvoice.orderInformation.statusTransaction === "PROCESSING" ? "bg-yellow-500" : "bg-orange-400"} text-white px-3 py-1 text-xs rounded-full`}
                      >
                        {detailInvoice.orderInformation.statusTransaction}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    alt="QR Code"
                    height={300}
                    radius={"none"}
                    src="https://hexdocs.pm/qr_code/docs/qrcode.svg"
                    width={300}
                  />
                  <button className="bg-[#b89c81] text-black px-6 py-2 rounded-md text-sm font-semibold">
                    Download QR Code
                  </button>
                  <p className="text-xs text-gray-400">
                    Screenshot if the QR Code cannot be downloaded.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div
      className={`flex flex-col items-center w-full h-full px-8 overflow-auto`}
    >
      <h1 className="text-2xl font-bold">Check Transaction</h1>
      <p className="text-gray-500">This is the check transaction page.</p>
      <div className={`flex flex-col w-full mt-8 px-8`}>
        <div className={`flex flex-col w-full mt-8`}>
          <Input
            required
            classNames={{
              inputWrapper: "bg-gray-700 text-white",
              label: "text-white",
            }}
            label="Invoice Number"
            placeholder="Enter your invoice number"
            value={inputInvoice}
            variant="bordered"
            onChange={(event) => {
              setInputInvoice(event.currentTarget.value);
            }}
          />
          <div className={`flex flex-col w-full mt-8`}>
            <button
              className="bg-[#b89c81] text-black px-6 py-2 rounded-md text-sm font-semibold mt-4"
              onClick={() => {
                getDetailInvoice(inputInvoice);
              }}
            >
              Check Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
