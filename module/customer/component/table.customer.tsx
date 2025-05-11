import { Button } from "@heroui/button";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import React from "react";
import { User } from "@heroui/user";
import { Chip } from "@heroui/chip";
import { FiEye } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";

import { ListDatumModelListData } from "@/domain/model/model.customer";
import DateTimeUtils from "@/utils/date.time.utils";

export const TableCustomer = (data: {
  isLoading: boolean;
  page: number;
  listData: ListDatumModelListData[];
  getList: (nextPage: number) => void;
  headerTable: { uid: string; name: string }[];
  openEdit: (id: number) => void;
  goToDetail: (id: number) => void;
  goDelete: (id: number) => void;
}) => {
  const renderCell = React.useCallback(
    (item: ListDatumModelListData, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof ListDatumModelListData];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: item.avatar ?? "",
                name: item.name,
                size: "sm",
              }}
              name={item.name}
            />
          );
        case "dob":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.dob
                  ? DateTimeUtils.stringToStringDDMMMYYYY(item.dob)
                  : "-"}
              </p>
            </div>
          );
        case "phoneNumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.phoneNumber}</p>
              <p className="text-bold text-sm text-default-400">{item.email}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={item.role === "ADMIN" ? "primary" : "success"}
              size="sm"
              variant="flat"
            >
              {item.role}
            </Chip>
          );
        case "action":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FiEye
                    onClick={() => {
                      return data.goToDetail(item.id);
                    }}
                  />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <RiEditLine
                    onClick={() => {
                      return data.openEdit(item.id);
                    }}
                  />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdOutlineDeleteForever
                    onClick={() => {
                      return data.goDelete(item.id);
                    }}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  ) as (item: ListDatumModelListData, columnKey: React.Key) => React.ReactNode;

  return (
    <Table
      isHeaderSticky
      isStriped
      aria-label="Example table with client side sorting"
      bottomContent={
        <div className="flex w-full justify-center">
          <Button
            isDisabled={data.isLoading}
            variant="flat"
            onPress={() => data.getList(data.page)}
          >
            {data.isLoading && <Spinner color="white" size="sm" />}
            Load More
          </Button>
        </div>
      }
      classNames={{
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[100px]",
      }}
      selectionMode={"single"}
    >
      <TableHeader columns={data.headerTable}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "action" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          <div>
            <h1>Data tidak di temukan</h1>
          </div>
        }
        isLoading={data.isLoading}
        items={data.listData}
        loadingContent={<Spinner />}
      >
        {(item: ListDatumModelListData) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
