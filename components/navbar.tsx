"use client";
import Image from "next/image";
import * as React from "react";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { IoIosApps, IoIosArrowForward, IoMdLogOut } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";

export const SidebarNavbar = (props: { fromHeader: boolean }) => {
  const [route, setRoute] = useState<string>("/home");

  const [open, setOpen] = useState<boolean>(false);

  const pathName = usePathname();

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setRoute(pathName);
    setOpen(false);
  }, [pathName]);

  return (
    <div
      className={`${props.fromHeader ? "flex h-full flex-col bg-primary" : "hidden w-96 lg:flex h-full flex-col bg-primary"}`}
    >
      <div className={`flex flex-col justify-center items-center py-6 gap-6`}>
        <Image
          alt={"logo"}
          className={``}
          height={80}
          src={siteConfig.logo}
          width={80}
        />
        <Divider />
      </div>
      <div
        className={`px-3 gap-0.5 flex flex-col flex-grow max-h-[calc(100vh-300px)] overflow-y-auto`}
      >
        {siteConfig.navItems.map((item, index) => {
          return item.href === route ? (
            <div
              key={`${index}-1`}
              className={`px-2.5 py-2.5 cursor-pointer rounded-xl font-medium bg-primary-400`}
            >
              <Link
                className={`flex flex-row gap-4 text-gray-100`}
                href={item.href}
              >
                {item.icon}
                <div className={``}>{item.label}</div>
              </Link>
            </div>
          ) : item.child.length > 0 ? (
            <div key={`${index}-2`} className={`flex flex-col`}>
              <Link
                className={`flex flex-row justify-between items-center px-2.5 py-2.5 cursor-pointer rounded-xl hover:bg-primary-400`}
                onPress={toggle}
              >
                <div
                  className={`flex flex-row gap-4 text-gray-200 hover:text-gray-100`}
                >
                  <IoIosApps color={`#F3F4F6`} size={20} />
                  <div>{item.label}</div>
                </div>
                {open ? (
                  <IoIosArrowDown color={`#F3F4F6`} size={15} />
                ) : (
                  <IoIosArrowForward color={`#F3F4F6`} size={15} />
                )}
              </Link>
              {open ? (
                <div className={`flex flex-col gap-0.5 pt-0.5`}>
                  {item.child.map((child, indexChild) => {
                    return child.href === route ? (
                      <div
                        key={`${indexChild}-11`}
                        className={`px-2.5 py-1.5 cursor-pointer rounded-xl font-medium bg-primary-400`}
                      >
                        <Link
                          className={`flex flex-row gap-4 text-gray-100`}
                          href={child.href}
                        >
                          <div className={`pl-11`}>{child.label}</div>
                        </Link>
                      </div>
                    ) : (
                      <div
                        key={`${indexChild}-12`}
                        className={`px-2.5 py-1.5 cursor-pointer rounded-xl hover:bg-primary-400`}
                      >
                        <Link
                          className={`flex flex-row gap-4 font-medium text-gray-200 hover:text-gray-100`}
                          href={child.href}
                        >
                          <div className={`pl-11`}>{child.label}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <div
              key={`${index}-3`}
              className={`px-2.5 py-2.5 cursor-pointer rounded-xl hover:bg-primary-400`}
            >
              <Link
                className={`flex flex-row gap-4 font-medium text-gray-200 hover:text-gray-100`}
                href={item.href}
              >
                {item.icon}
                <div className={``}>{item.label}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-auto">
        <Divider />
        <div className={`px-3 py-5 cursor-pointer hover:bg-primary-600`}>
          <Link
            className={`flex flex-row gap-2 justify-center`}
            href={`/login`}
          >
            <IoMdLogOut color={`#F3F4F6`} size={25} />
            <div className={`text-gray-100`}>Logout</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
