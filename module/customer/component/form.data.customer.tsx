import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { Form } from "@heroui/react";
import React, { useState } from "react";
import { parseDate } from "@internationalized/date";

import { ListDatumModelListData } from "@/domain/model/model.customer";

export interface InterfaceDataSetCustomer {
  id?: number | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  password: string;
  dob: string;
}

export const FormDataCustomer = (data: {
  data?: ListDatumModelListData | null;
  onClose: () => void;
  loadingAddData: boolean;
  onSubmit?: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [value, setValue] = useState<InterfaceDataSetCustomer>({
    id: data.data?.id,
    fullName: data.data?.name ?? "",
    phoneNumber: data.data?.phoneNumber ?? "",
    email: data.data?.email ?? "",
    address: data.data?.address ?? "",
    password: "",
    dob: data.data?.dob ?? "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form
      className="w-full"
      validationBehavior="native"
      onReset={() => {}}
      onSubmit={data.onSubmit}
    >
      <ModalHeader className="flex flex-col gap-1">
        {data.data ? "Edit Customer" : "Add Customer"}
      </ModalHeader>
      <ModalBody className={`w-full flex flex-col gap-4`}>
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="fullName"
          placeholder="Enter your username"
          type="text"
          value={value.fullName}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, fullName: e.target.value }));
          }}
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={value.email}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, email: e.target.value }));
          }}
        />

        <Input
          isRequired
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage={"Please enter a valid password"}
          label="Password"
          labelPlacement={"outside"}
          name={"password"}
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            return true;
          }}
        />

        <Input
          isRequired
          errorMessage="Please enter a valid phone number"
          label="Phone Number"
          labelPlacement="outside"
          name="phoneNumber"
          placeholder="Enter your phone number"
          type="text"
          value={value.phoneNumber}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, phoneNumber: e.target.value }));
          }}
        />
        <DatePicker
          label="Birth date"
          labelPlacement="outside"
          name={"dob"}
          value={value?.dob ? parseDate(value?.dob ?? "") : null}
          onChange={(e) => {
            if (e && e.year && e.month && e.day) {
              setValue((prevState) => ({
                ...prevState,
                dob: `${String(e.year).padStart(4, "0")}-${String(e.month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`,
              }));
            }
          }}
        />

        <Textarea
          isRequired
          errorMessage={"Please enter a address"}
          label="Address"
          labelPlacement={"outside"}
          name="address"
          placeholder="Enter your address"
          value={value.address}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, address: e.target.value }));
          }}
        />
      </ModalBody>
      <ModalFooter className={`flex flex-row justify-end w-full`}>
        <Button
          color="danger"
          variant="light"
          onPress={() => {
            return data.onClose();
          }}
        >
          Close
        </Button>
        <Button
          className={`text-white`}
          color="success"
          isLoading={data.loadingAddData}
          type={"submit"}
        >
          {data.data ? "Update" : "Add"}
        </Button>
      </ModalFooter>
    </Form>
  );
};
