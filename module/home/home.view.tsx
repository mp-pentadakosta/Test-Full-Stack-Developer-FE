"use client";
import {
  Card,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { CardBody, CardFooter, CardHeader } from "@heroui/card";
import Lottie from "lottie-react";
import * as React from "react";
import { Image } from "@heroui/image";
import log from "loglevel";

import dashboardLottie from "../../public/lottie/dashboard.json";

import ChartComponent from "@/components/chart.component";
import { HomeService } from "@/module/home/home.service";

export default function HomeView() {
  const list = [
    {
      title: "Orange",
      img: "https://heroui.com/images/card-example-4.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://heroui.com/images/card-example-4.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://heroui.com/images/card-example-4.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://heroui.com/images/card-example-4.jpeg",
      price: "$5.30",
    },
  ];

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  const { dataChart } = HomeService();

  return (
    <div className={`flex flex-col gap-4`}>
      <div className={`flex flex-row gap-4`}>
        <Card
          className={`hidden md:flex max-w-80 xl:max-w-96 md:max-h-56 lg:max-h-60 xl:max-h-96`}
        >
          <CardBody>
            <Lottie animationData={dashboardLottie} loop={true} />
          </CardBody>
        </Card>
        <Card className={`w-full md:max-h-[500px]`}>
          <CardBody>
            <div className="p-2 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2">
              {list.map((item, index) => (
                <Card
                  key={index}
                  isPressable
                  shadow="sm"
                  onPress={() => log.info("item pressed")}
                >
                  <CardBody className="overflow-visible p-0">
                    <Image
                      alt={item.title}
                      className="w-full object-cover h-[140px]"
                      radius="lg"
                      shadow="sm"
                      src={item.img}
                      width="100%"
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">{item.price}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className={`w-full md:max-h-[500px] px-1 py-2 md:px-2 md:py-4`}>
        <CardBody>
          <div className={`max-h-[360px] w-full`}>
            {ChartComponent(dataChart, "Month")}
          </div>
        </CardBody>
      </Card>
      <Card className={`w-full md:max-h-[500px] px-1 py-2 md:px-2 md:py-4`}>
        <CardHeader>
          <p className="text-sm font-semibold">Team Members</p>
        </CardHeader>
        <CardBody>
          <div className={`max-h-[360px] w-full`}>
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
