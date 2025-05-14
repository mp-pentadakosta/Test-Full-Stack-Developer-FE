import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

import { DataModelInvoiceDetail } from "@/domain/model/model.order";
import Toast from "@/core/toast";
import OrderRepository from "@/domain/repository/order.repository";

export const CheckTransactionService = (inv?: string) => {
  const [detailInvoice, setDetailInvoice] = useState<DataModelInvoiceDetail>();
  const [loadingGetInvoice, setLoadingGetInvoice] = useState(false);
  const route = useRouter();
  const [inputInvoice, setInputInvoice] = useState<string>("");

  useEffect(() => {
    if (inv) {
      getDetailInvoice(inv).then(() => {
        const socket = io(process.env.BASE_URL || "http://localhost:3000");

        const eventName = `transaction-status-${inv}`;

        socket.on(eventName, (data) => {
          if (data.invoice === inv) {
            setDetailInvoice((prev) => {
              if (prev) {
                return {
                  ...prev,
                  orderInformation: {
                    ...prev.orderInformation,
                    statusPayment: data.status.statusPayment,
                    statusTransaction: data.status.statusTransaction,
                  },
                };
              }

              return prev;
            });
          }
        });

        return () => {
          socket.off(eventName);
          socket.disconnect();
        };
      });
    } else {
      route.replace("/check-transaction");
    }
  }, [inv]);

  const getDetailInvoice = async (invoice: string) => {
    setLoadingGetInvoice(true);
    try {
      const resp = await OrderRepository.getOrderByInvoice(invoice);

      setDetailInvoice(resp.result.data);
      route.replace(`/check-transaction/${invoice}`);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoadingGetInvoice(false);
    }
  };

  return {
    detailInvoice,
    loadingGetInvoice,
    inputInvoice,
    setInputInvoice,
    getDetailInvoice,
  };
};
