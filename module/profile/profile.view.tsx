"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider, Form, Spinner } from "@heroui/react";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Image } from "@heroui/image";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons";
import { DatePicker } from "@heroui/date-picker";
import { parseDate } from "@internationalized/date";

import { ProfileService } from "@/module/profile/profile.service";
import Base64Utils from "@/utils/base64.utils";

export default function ProfileView() {
  const [newPassword, setNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const toggleVisibilityOldPassword = () => setOldPassword(!oldPassword);
  const toggleVisibilityNewPassword = () => setNewPassword(!newPassword);

  const {
    userData,
    setUserData,
    name,
    updateProfile,
    loadingUpdateProfile,
    avatar,
    updatePassword,
    loadingUpdatePassword,
  } = ProfileService();

  return (
    <div className={`flex flex-col gap-4`}>
      <div className={`flex flex-row`}>
        <h1 className={`text-2xl font-semibold`}>Profile</h1>
      </div>
      <div
        className={`flex flex-col md:flex-row gap-4 justify-center items-center md:items-start`}
      >
        <Card
          isFooterBlurred
          className="border-none w-[300px] h-[300px]"
          radius="lg"
        >
          {avatar ? (
            <Image
              key={"Profile Image"}
              alt={userData?.name ?? ""}
              className="object-cover"
              height={300}
              loading={"lazy"}
              src={avatar}
              width={300}
            />
          ) : (
            <div
              className={`w-full h-full flex flex-col items-center justify-center`}
            >
              <Spinner />
            </div>
          )}
          <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className={`text-medium text-center text-gray-500`}>
              {name ?? ""}
            </p>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-lg">Edit Profile</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div
              className={`flex flex-col md:flex-row px-4 py-4 gap-10 md:gap-2`}
            >
              <div
                className={`flex flex-row basis-1/2 justify-center items-start`}
              >
                <Form
                  className="w-full max-w-xs flex flex-col gap-4"
                  validationBehavior="native"
                  onReset={() => {}}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let data = Object.fromEntries(
                      new FormData(e.currentTarget),
                    );

                    const submit: any = {
                      ...data,
                    };

                    let dataAvatar: string = "";

                    if (submit.avatar.name) {
                      dataAvatar = (await Base64Utils.convertToBase64(
                        data.avatar,
                        1,
                      )) as string;
                    }

                    updateProfile({
                      fullName: submit.username,
                      phoneNumber: submit.phoneNumber,
                      address: submit.address,
                      dob: submit.dob,
                      email: submit.email,
                      avatar: dataAvatar,
                    }).then((value) => value);
                  }}
                >
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                    value={userData?.name}
                    onChange={(e) => {
                      setUserData((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }));
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
                    value={userData?.email}
                    onChange={(e) => {
                      setUserData((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }));
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
                    value={userData?.phoneNumber}
                    onChange={(e) => {
                      setUserData((prevState) => ({
                        ...prevState,
                        phoneNumber: e.target.value,
                      }));
                    }}
                  />
                  <DatePicker
                    label="Birth date"
                    labelPlacement="outside"
                    name={"dob"}
                    value={
                      userData?.dob ? parseDate(userData?.dob ?? "") : null
                    }
                    onChange={(e) => {
                      if (e && e.year && e.month && e.day) {
                        setUserData((prevState) => ({
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
                    value={userData?.address ?? ""}
                    onChange={(e) => {
                      setUserData((prevState) => ({
                        ...prevState,
                        address: e.target.value,
                      }));
                    }}
                  />
                  <Input
                    accept="image/png, image/jpeg, image/jpg"
                    errorMessage="Please enter a valid avatar"
                    label="Avatar"
                    labelPlacement="outside"
                    name="avatar"
                    placeholder="Enter your avatar"
                    type="file"
                  />
                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      isLoading={loadingUpdateProfile}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
              <Divider className={`flex flex-col md:hidden`} />
              <div
                className={`flex flex-row basis-1/2 justify-center items-start`}
              >
                <Form
                  className="w-full max-w-xs flex flex-col gap-4"
                  validationBehavior="native"
                  onReset={() => {}}
                  onSubmit={(e) => {
                    e.preventDefault();
                    let data = Object.fromEntries(
                      new FormData(e.currentTarget),
                    );

                    const submit: any = {
                      ...data,
                    };

                    updatePassword({
                      oldPassword: submit.oldPassword,
                      newPassword: submit.newPassword,
                    }).then((value) => value);
                  }}
                >
                  <Input
                    isRequired
                    endContent={
                      <button
                        aria-label="toggle old password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityOldPassword}
                      >
                        {oldPassword ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    errorMessage={"Please enter a old password"}
                    label="Old Password"
                    labelPlacement={"outside"}
                    name={"oldPassword"}
                    placeholder="Enter your old password"
                    type={oldPassword ? "text" : "password"}
                  />

                  <Input
                    isRequired
                    endContent={
                      <button
                        aria-label="toggle new password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityNewPassword}
                      >
                        {newPassword ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    errorMessage={"Please enter a new password"}
                    label="New Password"
                    labelPlacement={"outside"}
                    name={"newPassword"}
                    placeholder="Enter your new password"
                    type={newPassword ? "text" : "password"}
                  />

                  <div className="flex gap-2">
                    <Button
                      color="primary"
                      isLoading={loadingUpdatePassword}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </CardBody>
          <Divider />
        </Card>
      </div>
    </div>
  );
}
