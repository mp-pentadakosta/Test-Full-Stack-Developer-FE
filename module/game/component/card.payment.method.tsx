"use client";

import { Card } from "@heroui/react";
import { CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

export default function CardPaymentMethod() {
  return (
    <Card className="bg-gray-700 text-white rounded-xl w-[260px] cursor-pointer">
      <CardBody className="p-4">
        <div className="flex justify-center mb-4">
          <Image
            alt="LinkAja"
            height={180}
            src="https://images.seeklogo.com/logo-png/39/1/quick-response-code-indonesia-standard-qris-logo-png_seeklogo-391791.png"
            width={180}
          />
        </div>
        <div className="border-t border-dashed border-gray-400 my-2" />
        <div className="text-sm italic text-center text-gray-300">
          Automatic Process
        </div>
      </CardBody>
    </Card>
  );
}
