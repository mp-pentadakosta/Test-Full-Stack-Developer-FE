"use client";
import { useEffect, useState } from "react";

import CustomerRepository from "@/domain/repository/customer.repository";
import { ListDatumModelListData } from "@/domain/model/model.customer";
import Toast from "@/core/toast";
import { InterfaceDataSetCustomer } from "@/module/customer/component/form.data.customer";

export const CustomerService = () => {
  const [page, setPage] = useState(1);
  const [isLoadingGetData, setIsLoadingGetData] = useState(true);
  const [loadingAddData, setLoadingAddData] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [listData, setListData] = useState<ListDatumModelListData[]>([]);

  const getList = async (nextPage: number) => {
    setIsLoadingGetData(true);
    try {
      const resp = await CustomerRepository.getList(nextPage, 5);

      if (nextPage === 1) {
        setListData(resp.result.listData);
      } else {
        setListData([...listData, ...resp.result.listData]);
      }

      setPage((prev) => prev + 1);
      setIsLoadingGetData(false);
    } catch (e: any) {
      setIsLoadingGetData(false);
      Toast.callToastError(e.message);
    }
  };

  const getSearch = async (search: string) => {
    setIsLoadingGetData(true);
    try {
      const resp = await CustomerRepository.getSearch(search);

      setListData(resp.result.listData);
      setIsLoadingGetData(false);
    } catch (e: any) {
      setIsLoadingGetData(false);
      Toast.callToastError(e.message);
    }
  };

  const headerTable = [
    { uid: "name", name: "Name" },
    { uid: "phoneNumber", name: "Phone Number" },
    { uid: "dob", name: "Date of Birth" },
    { uid: "address", name: "Address" },
    { uid: "action", name: "Action" },
  ];

  const upsertData = async (data: InterfaceDataSetCustomer) => {
    setLoadingAddData(true);
    try {
      const resp = await CustomerRepository.upsertData({
        id: data.id,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address,
        password: data.password,
        dob: data.dob,
      });

      Toast.callToastSuccess(resp.message);
      setLoadingAddData(false);

      return true;
    } catch (e: any) {
      Toast.callToastError(e.message);
      setLoadingAddData(false);

      return false;
    }
  };

  const deleteData = async (id: number) => {
    setLoadingDelete(true);
    try {
      const resp = await CustomerRepository.deleteData(id);

      Toast.callToastSuccess(resp.message);
      getList(1).then((value) => value);
      setLoadingDelete(false);

      return true;
    } catch (e: any) {
      Toast.callToastError(e.message);
      setLoadingDelete(false);

      return false;
    }
  };

  useEffect(() => {
    getList(page).then((value) => value);
  }, []);

  return {
    page,
    isLoadingGetData,
    getList,
    listData,
    getSearch,
    headerTable,
    loadingAddData,
    upsertData,
    deleteData,
    loadingDelete,
  };
};
