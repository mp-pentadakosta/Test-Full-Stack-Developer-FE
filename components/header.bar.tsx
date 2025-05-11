"use client";

import { User } from "@heroui/user";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Dropdown, DropdownItem, useDisclosure } from "@heroui/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import * as React from "react";
import { Avatar } from "@heroui/avatar";
import { DropdownMenu, DropdownTrigger } from "@heroui/dropdown";

import { useGlobalFunctionsUser } from "@/global/global.function.user";
import { SidebarNavbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export const HeaderBar = () => {
  const globalFunctionsUser = useGlobalFunctionsUser();

  const { isOpen, onOpenChange, onClose } = useDisclosure();

  const pathName = usePathname();

  useEffect(() => {
    onClose();
  }, [pathName]);

  return (
    <div
      className={`flex flex-row w-full justify-between lg:justify-end items-center bg-header px-4 drop-shadow-md py-2 lg:py-1`}
    >
      <div className={`lg:hidden flex flex-row`} onClick={onOpenChange}>
        <div className={`flex flex-row justify-center items-center`}>
          <IoMenu size={25} />
        </div>
      </div>
      <Image
        alt={"logo"}
        className={`lg:hidden flex`}
        height={30}
        src={siteConfig.logo}
        width={30}
      />
      {globalFunctionsUser?.userProfile?.avatar ? (
        <Avatar
          key={"key-avatar"}
          alt={"Qyra Pentadakosta"}
          className={`lg:hidden`}
          name={"Qyra Pentadakosta"}
          src={globalFunctionsUser?.userProfile?.avatar ?? ""}
        />
      ) : null}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            key={"key-user"}
            avatarProps={{
              src: globalFunctionsUser?.userProfile?.avatar ?? "",
              name: globalFunctionsUser?.userProfile?.name ?? "",
              alt: globalFunctionsUser?.userProfile?.name ?? "",
              key: globalFunctionsUser?.userProfile?.name ?? "",
            }}
            className={`hidden lg:flex flex-row gap-4 p-2`}
            description={
              globalFunctionsUser?.userProfile?.role?.toLowerCase() ?? ""
            }
            name={globalFunctionsUser?.userProfile?.name ?? ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">Qyra Pentadakosta</p>
          </DropdownItem>
          <DropdownItem key="profile" href={"/profile"}>
            Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" href={"/logout"}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Drawer
        hideCloseButton={true}
        isOpen={isOpen}
        placement={"left"}
        size={"xs"}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          <SidebarNavbar fromHeader={true} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
