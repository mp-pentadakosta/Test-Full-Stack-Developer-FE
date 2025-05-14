"use client";

import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button, Divider } from "@heroui/react";

import {
  ExchangeRate,
  ListDatumModelPrefixCode,
} from "@/domain/model/model.prefix.code";
import CurrencyUtils from "@/utils/currency.utils";

export default function CheckoutCard(data: {
  value?: ListDatumModelPrefixCode;
  name: string;
  image: string;
  selectedPaymentMethod: string;
  currency?: ExchangeRate;
}) {
  return (
    <Card className="w-96 bg-black text-white p-4 shadow-lg rounded-lg mt-44">
      <CardBody>
        {data.value && data.currency ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <Image
                alt="Mobile Legends"
                height={64}
                radius="sm"
                src={data.image}
                width={64}
              />
              <div>
                <h4 className="font-semibold">{data.name}</h4>
                <p className="text-sm text-gray-400">{data.value.name}</p>
              </div>
            </div>
            <div className="text-sm space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{data.selectedPaymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>
                  {data.currency.code}{" "}
                  {CurrencyUtils.exChangeCurrency({
                    value: data.value.price,
                    currentCurrency: data.currency.price,
                  }).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fee</span>
                <span>
                  {data.currency.code}{" "}
                  {CurrencyUtils.exChangeCurrency({
                    value: data.value.fee,
                    currentCurrency: data.currency.price,
                  }).toLocaleString()}
                </span>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>
                {data.currency.code}{" "}
                {CurrencyUtils.exChangeCurrency({
                  value: data.value.price + data.value.fee,
                  currentCurrency: data.currency.price,
                }).toLocaleString()}
              </span>
            </div>
            <Button
              fullWidth
              className="text-white font-medium"
              color="warning"
              radius="sm"
              type={"submit"}
            >
              👜 Order Now!
            </Button>
          </>
        ) : (
          <div className={`flex flex-col items-center justify-center h-32`}>
            No Product Selected
          </div>
        )}
      </CardBody>
    </Card>
  );
}
