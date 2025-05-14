"use client";

import { Card, Spacer } from "@heroui/react";
import { CardBody } from "@heroui/card";

import {
  ExchangeRate,
  ListDatumModelPrefixCode,
} from "@/domain/model/model.prefix.code";
import CurrencyUtils from "@/utils/currency.utils";

export const CardProductItem = (data: {
  value: ListDatumModelPrefixCode;
  currency?: ExchangeRate;
}) => {
  return data.currency ? (
    <Card
      className="w-full lg:w-52 h-36 rounded-xl bg-gray-700 text-white shadow-md cursor-pointer
                 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 ease-in-out"
    >
      <CardBody className="p-4 overflow-hidden">
        <div className="flex flex-col space-y-2">
          <div className={`flex flex-col`}>
            <div className="text-white font-semibold text-sm">
              {data.value.name}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-yellow-400">
                {data.currency.code}{" "}
                {CurrencyUtils.exChangeCurrency({
                  value: data.value.price,
                  currentCurrency: data.currency.price,
                }).toLocaleString()}
              </span>
            </div>

            <div className="w-full h-[1px] bg-gray-600 my-2" />
            <Spacer />
          </div>

          <div className="flex justify-end">
            <div className="bg-white px-3 py-1 rounded flex items-center space-x-1 text-xs font-medium text-green-700">
              <span className="font-bold">Instant</span>
              <span>Delivery</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  ) : null;
};
