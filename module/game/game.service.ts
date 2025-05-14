import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { DataModelDetailGame } from "@/domain/model/model.games";
import GamesRepository from "@/domain/repository/games.repository";
import Toast from "@/core/toast";
import {
  ExchangeRate,
  ListDatumModelPrefixCode,
} from "@/domain/model/model.prefix.code";
import PrefixCodeRepository from "@/domain/repository/prefix.code.repository";
import { ModelAddOrder } from "@/domain/model/model.order";
import OrderRepository from "@/domain/repository/order.repository";

export const GameService = (data: { id: string }) => {
  const [detailGame, setDetailGame] = useState<DataModelDetailGame>();
  const [loadingGetDetail, setLoadingGetDetail] = useState(false);
  const [prefix, setPrefix] = useState<ListDatumModelPrefixCode[]>([]);
  const [loadingGetPrefix, setLoadingGetPrefix] = useState(false);
  const [selectedPrefix, setSelectedPrefix] =
    useState<ListDatumModelPrefixCode>();
  const [selectedCurrency, setSelectedCurrency] = useState<ExchangeRate>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [order, setOrder] = useState<ModelAddOrder>();
  const [loadingAddOrder, setLoadingAddOrder] = useState(false);

  const searchParams = useSearchParams();

  const codeFromUrl = searchParams.get("code");

  useEffect(() => {
    getGameDetail(data.id).then(() => {
      getCurrency().then((value) => {
        getPrefixCode(data.id, value).then(() => {});
      });
    });
  }, [codeFromUrl]);

  const getCurrency = async () => {
    const resp = localStorage.getItem("selectedCountryCode");

    if (resp) {
      return resp;
    }

    return "";
  };

  const getGameDetail = async (id: string) => {
    try {
      setLoadingGetDetail(true);
      const resp = await GamesRepository.getGameDetail(id);

      setDetailGame(resp.result.data);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoadingGetDetail(false);
    }
  };

  const getPrefixCode = async (idGame: string, currency: string) => {
    setLoadingGetPrefix(true);
    try {
      const resp = await PrefixCodeRepository.getPrefixCode(idGame);

      setPrefix(resp.result.listData);
      const selectedCurrencyData =
        resp.result.exchangeRate[currency.toLowerCase()];

      setSelectedCurrency(selectedCurrencyData);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoadingGetPrefix(false);
    }
  };

  const schema = yup
    .object({
      id: yup.string().required("ID is required"),
      wa: yup.string().required("No. WhatsApp is required"),
      paymentMethod: yup.string().required("Payment Method is required"),
      prefixId: yup.number().required("Prefix is required"),
      server: yup.string().optional(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema, {
      context: { useServer: detailGame?.useServer },
    }),
    defaultValues: {
      id: "",
      wa: "",
      paymentMethod: "",
      prefixId: 0,
      server: "",
    },
  });

  const onError = (data: any) => {
    Object.values(data).forEach((error: any) => {
      if (error?.message) {
        Toast.callToastError(error.message);
      }
    });
    if (detailGame?.useServer) {
      if (!watch("server")) {
        Toast.callToastError("Server is required");
      }
    }
  };

  const validateOrder = (data: ModelAddOrder) => {
    const checkUserId = checkIdUserGame(data.id);

    if (checkUserId) {
      setOrder({
        ...data,
        username: checkUserId.username,
      });

      return true;
    } else {
      Toast.callToastError("ID User Game not found");

      return false;
    }
  };

  const checkIdUserGame = (id?: string) => {
    if (id) {
      return {
        username: "qyra99",
      };
    }

    return null;
  };

  const submitOrder = async () => {
    try {
      setLoadingAddOrder(true);
      const resp = await OrderRepository.addOrder({
        username: order?.username || "",
        gameId: data.id,
        currencyCode: localStorage.getItem("selectedCountryCode") || "",
        idGameUser: order?.id || "",
        priceExchange: selectedCurrency?.price || 0,
        prefixCodeId: selectedPrefix?.id || 0,
        paymentMethod: selectedPaymentMethod,
        serverGame: order?.server,
        waNumber: order?.waNumber ?? "",
      });

      Toast.callToastSuccess("Order created successfully");
      setTimeout(() => {
        window.location.href = "/check-transaction/" + resp.result.data.invoice;
      }, 2000);
    } catch (e: any) {
      Toast.callToastError(e.message);
    } finally {
      setLoadingAddOrder(false);
    }
  };

  return {
    detailGame,
    loadingGetDetail,
    prefix,
    loadingGetPrefix,
    selectedPrefix,
    setSelectedPrefix,
    selectedCurrency,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    order,
    register,
    handleSubmit,
    errors,
    watch,
    control,
    reset,
    setValue,
    validateOrder,
    onError,
    loadingAddOrder,
    submitOrder,
  };
};
