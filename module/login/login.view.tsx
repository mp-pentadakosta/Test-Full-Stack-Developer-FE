"use client";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import * as React from "react";
import { Button } from "@heroui/button";
import Lottie from "lottie-react";
import Image from "next/image";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons";

import homeLottie from "../../public/lottie/home.json";

import { LoginService } from "@/module/login/login.service";

export default function LoginView() {
  const { login, loading } = LoginService();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`flex flex-row w-full h-full`}>
      <div className={`w-full h-full absolute -z-0 opacity-30`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={"bg"}
          className={`w-full h-full`}
          src={"/img/background.jpg"}
        />
      </div>
      {
        <div className="hidden lg:flex lg:flex-row basis-3/5">
          <Lottie animationData={homeLottie} loop={true} />
        </div>
      }
      <div className="lg:basis-2/5 w-full content-center pb-36 px-5 lg:px-0">
        <div className={`flex flex-row items-center justify-center`}>
          <Image
            alt={"logo"}
            className={``}
            height={200}
            src={"/img/Tengkuang.PNG"}
            width={200}
          />
        </div>
        <Form
          className="gap-4 lg:px-10 xl:px-40 items-center"
          validationBehavior="native"
          onReset={() => {}}
          onSubmit={async (e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            await login(data.phoneNumber as string, data.password as string);
          }}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid phone number"
            label="Phone Number"
            labelPlacement="outside"
            name="phoneNumber"
            placeholder="Enter your phone number"
            type="text"
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
          />

          <div className="flex gap-2">
            <Button color={"primary"} isLoading={loading} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
