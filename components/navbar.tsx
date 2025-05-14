"use client";
import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import * as React from "react";
import { FaWallet } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { MdLeaderboard } from "react-icons/md";

export const SubHeader = () => {
  const pathname = usePathname();

  const [selected] = React.useState(
    pathname === "/home" ? "top-up" : pathname.replace("/", ""),
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs
        aria-label="Options"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0",
          cursor: "w-full bg-sky-400",
          tab: "max-w-fit px-3 h-12 transition-colors duration-200",
          tabContent:
            "group-data-[selected=true]:text-white hover:text-white transition-colors duration-200",
        }}
        color="primary"
        selectedKey={selected}
        variant="underlined"
      >
        <Tab
          key="top-up"
          href={"/top-up"}
          title={
            <div className="flex items-center space-x-2">
              <FaWallet />
              <span>Top Up</span>
            </div>
          }
        />
        <Tab
          key="check-transaction"
          href={"/check-transaction"}
          title={
            <div className="flex items-center space-x-2">
              <BiReceipt />
              <span>Check Transaction</span>
            </div>
          }
        />
        <Tab
          key="leaderboard"
          href={"/leaderboard"}
          title={
            <div className="flex items-center space-x-2">
              <MdLeaderboard />
              <span>Leaderboard</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
