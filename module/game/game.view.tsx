import { Image } from "@heroui/image";
import {
  Button,
  Divider,
  Form,
  Modal,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { CardProductItem } from "@/module/game/component/card.product.item";
import { GameService } from "@/module/game/game.service";
import CheckoutCard from "@/module/game/component/checkout.card";
import CardPaymentMethod from "@/module/game/component/card.payment.method";

export const GameView = (data: { id: string }) => {
  const {
    detailGame,
    loadingGetPrefix,
    prefix,
    selectedPrefix,
    setSelectedPrefix,
    selectedCurrency,
    setSelectedPaymentMethod,
    selectedPaymentMethod,
    order,
    setValue,
    watch,
    validateOrder,
    handleSubmit,
    onError,
    loadingAddOrder,
    submitOrder,
  } = GameService({ id: data.id });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Form
      className="flex flex-col items-center w-full h-full"
      method={"post"}
      onSubmit={handleSubmit(() => {
        if (
          selectedCurrency &&
          selectedPrefix &&
          selectedPaymentMethod &&
          detailGame
        ) {
          const resp = validateOrder({
            currency: selectedCurrency.code,
            item: selectedPrefix.name,
            payment: selectedPaymentMethod,
            price: selectedPrefix.price,
            product: detailGame?.name,
            id: watch("id"),
            username: "",
            waNumber: watch("wa"),
            server: watch("server"),
            prefixId: selectedPrefix.id,
          });

          if (resp) {
            onOpen();
          }
        }
      }, onError)}
    >
      <div className="w-full flex items-center justify-center">
        <Image
          alt="banner"
          src="https://www.ourastore.com/_next/image?url=https%3A%2F%2Fcdn.ourastore.com%2Fee918fd3-1b77-498e-a995-a227dc9c633e.jpg&w=3840&q=100"
        />
      </div>
      <div
        className={`flex flex-col lg:flex-row gap-4 w-full items-start justify-start px-8 -mt-24 lg:px-80`}
      >
        <div
          className={`flex flex-col w-full items-center justify-center overflow-auto`}
        >
          <div className={`flex flex-row gap-6 w-full`}>
            <div className={`flex flex-col w-fit items-start justify-start`}>
              {detailGame ? (
                <Image
                  alt={detailGame?.name}
                  height={250}
                  radius={"lg"}
                  src={detailGame?.image}
                  width={240}
                />
              ) : null}
            </div>
            <div
              className={`flex flex-col w-full items-start justify-end mb-8`}
            >
              <div className={`flex flex-col w-full items-start justify-start`}>
                <div className={`font-semibold text-lg text-white`}>
                  {detailGame?.name}
                </div>
                <div className={`text-sm text-gray-300`}>
                  {detailGame?.publisher}
                </div>
              </div>
            </div>
          </div>
          <Divider className={`bg-gray-500 mt-4`} />
          <div
            className={`flex flex-col gap-4 w-full items-center justify-center mt-4`}
          >
            <Card className="w-full bg-gray-800 text-white">
              <CardHeader className="bg-gray-600 rounded-t-lg px-4 py-3 flex items-center">
                <div className="w-6 h-6 bg-yellow-700 text-white flex items-center justify-center rounded-sm font-bold mr-3">
                  1
                </div>
                <h3 className="text-md font-semibold">Input Account Data</h3>
              </CardHeader>
              <CardBody className="space-y-4 p-5">
                <div
                  className={`grid grid-cols-1 ${detailGame?.useServer ? "md:grid-cols-2" : ""} gap-4`}
                >
                  <Input
                    required
                    classNames={{
                      inputWrapper: "bg-gray-700 text-white",
                      label: "text-white",
                    }}
                    label="ID"
                    placeholder="Masukkan ID"
                    value={watch("id")}
                    variant="bordered"
                    onChange={(event) => {
                      setValue("id", event.currentTarget.value);
                    }}
                  />
                  {detailGame?.useServer ? (
                    <Input
                      required
                      classNames={{
                        inputWrapper: "bg-gray-700 text-white",
                        label: "text-white",
                      }}
                      label="Server"
                      placeholder="Masukkan Server"
                      value={watch("server")}
                      variant="bordered"
                      onChange={(event) => {
                        setValue("server", event.currentTarget.value);
                      }}
                    />
                  ) : null}
                </div>
              </CardBody>
            </Card>
            <Card className="w-full bg-gray-800 text-white">
              <CardHeader className="bg-gray-600 rounded-t-lg px-4 py-3 flex items-center">
                <div className="w-6 h-6 bg-yellow-700 text-white flex items-center justify-center rounded-sm font-bold mr-3">
                  2
                </div>
                <h3 className="text-md font-semibold">
                  Choose the amount of top-up
                </h3>
              </CardHeader>
              <CardBody className="space-y-4 p-5">
                {!loadingGetPrefix ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-7xl px-6 mx-auto">
                    {prefix.map((value, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedPrefix(value);
                            setValue("prefixId", value.id);
                          }}
                        >
                          <CardProductItem
                            currency={selectedCurrency}
                            value={value}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={`flex flex-col w-full items-center justify-center text-center`}
                  >
                    <Spinner />
                  </div>
                )}
              </CardBody>
            </Card>
            <Card className="w-full bg-gray-800 text-white">
              <CardHeader className="bg-gray-600 rounded-t-lg px-4 py-3 flex items-center">
                <div className="w-6 h-6 bg-yellow-700 text-white flex items-center justify-center rounded-sm font-bold mr-3">
                  3
                </div>
                <h3 className="text-md font-semibold">Payment Method</h3>
              </CardHeader>
              <CardBody className="space-y-4 p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => {
                      setSelectedPaymentMethod("QRIS");
                      setValue("paymentMethod", "QRIS");
                    }}
                  >
                    <CardPaymentMethod />
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="w-full bg-gray-800 text-white">
              <CardHeader className="bg-gray-600 rounded-t-lg px-4 py-3 flex items-center">
                <div className="w-6 h-6 bg-yellow-700 text-white flex items-center justify-center rounded-sm font-bold mr-3">
                  4
                </div>
                <h3 className="text-md font-semibold">Input Account Data</h3>
              </CardHeader>
              <CardBody className="space-y-4 p-5">
                <div className="grid grid-cols-1">
                  <Input
                    required
                    classNames={{
                      inputWrapper: "bg-gray-700 text-white",
                      label: "text-white",
                    }}
                    label="No. Whatsapp"
                    placeholder="Enter your Whatsapp number"
                    value={watch("wa")}
                    variant="bordered"
                    onChange={(event) => {
                      setValue("wa", event.currentTarget.value);
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="sticky top-6 w-full max-w-sm">
          <CheckoutCard
            currency={selectedCurrency}
            image={detailGame?.image ?? ""}
            name={detailGame?.name ?? ""}
            selectedPaymentMethod={selectedPaymentMethod}
            value={selectedPrefix}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full">
                <div
                  className={`flex flex-col items-center justify-center gap-2`}
                >
                  <div className={`text-lg font-semibold`}>Create Order</div>
                </div>
                <div className={`text-sm text-gray-400 text-center`}>
                  Make sure your account data and the product you choose are
                  valid and appropriate.
                </div>
              </ModalHeader>
              <ModalBody>
                <div className={`flex flex-row gap-8 w-full text-medium`}>
                  <div
                    className={`flex flex-col items-start justify-start gap-2`}
                  >
                    <div>Username</div>
                    <div>ID</div>
                    <div>Server</div>
                    <div>Item</div>
                    <div>Product</div>
                    <div>Payment</div>
                  </div>
                  <div
                    className={`flex flex-col items-start justify-start gap-2 font-semibold`}
                  >
                    <div>{order?.username}</div>
                    <div>{order?.id}</div>
                    <div>{order?.server}</div>
                    <div>{order?.item}</div>
                    <div>{order?.product}</div>
                    <div>{order?.payment}</div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={loadingAddOrder}
                  onPress={() => {
                    submitOrder().then(() => {
                      onClose();
                    });
                  }}
                >
                  Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Form>
  );
};
