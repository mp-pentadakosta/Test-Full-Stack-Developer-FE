"use client";

import { useDisclosure } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { MdAdd } from "react-icons/md";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { useRouter } from "next/navigation";

import { CustomerService } from "@/module/customer/customer.service";
import { SearchIcon } from "@/components/icons";
import { TableCustomer } from "@/module/customer/component/table.customer";
import {
  FormDataCustomer,
  InterfaceDataSetCustomer,
} from "@/module/customer/component/form.data.customer";

export default function CustomerView() {
  const router = useRouter();

  const {
    page,
    listData,
    getList,
    getSearch,
    headerTable,
    isLoadingGetData,
    loadingAddData,
    upsertData,
    deleteData,
    loadingDelete,
  } = CustomerService();
  const upsertModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      getSearch(searchTerm).then(() => {});
    }
  }, [debouncedTerm]);

  return (
    <div className={`flex flex-col gap-4 w-full`}>
      <div className={`flex flex-row`}>
        <h1 className={`text-2xl font-semibold`}>Customer</h1>
      </div>
      <Card className={`w-full flex flex-col`}>
        <CardBody className={`flex flex-row gap-4 justify-between`}>
          <Input
            isClearable
            className={`w-[340px]`}
            labelPlacement="outside"
            name="search"
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className={`text-white`}
            color="success"
            endContent={<MdAdd />}
            onPress={upsertModal.onOpen}
          >
            Add Data
          </Button>
        </CardBody>
      </Card>
      <TableCustomer
        getList={getList}
        goDelete={(value) => {
          deleteModal.onOpen();
          setId(value);
        }}
        goToDetail={(value) => {
          router.push(`/customer/${value}`);
        }}
        headerTable={headerTable}
        isLoading={isLoadingGetData}
        listData={listData}
        openEdit={(value) => {
          upsertModal.onOpen();
          setId(value);
        }}
        page={page}
      />
      <Modal
        backdrop={"blur"}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={upsertModal.isOpen}
        onClose={() => {
          setId(null);
        }}
        onOpenChange={upsertModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <FormDataCustomer
              data={(listData.find((item) => item.id === id) ?? null) as null}
              loadingAddData={loadingAddData}
              onClose={() => {
                setId(null);
                onClose();
              }}
              onSubmit={(e) => {
                e.preventDefault();
                let data = Object.fromEntries(new FormData(e.currentTarget));

                const submit: InterfaceDataSetCustomer = {
                  id: id,
                  fullName: (data.fullName as string) ?? "",
                  phoneNumber: (data.phoneNumber as string) ?? "",
                  email: (data.email as string) ?? "",
                  password: (data.password as string) ?? "",
                  address: (data.address as string) ?? "",
                  dob: (data.dob as string) ?? "",
                };

                upsertData(submit).then((value) => {
                  if (value) {
                    onClose();
                    setId(null);
                    getList(1).then((value) => value);
                  }
                });
              }}
            />
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop={"blur"}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => {
            const data = listData.find((item) => item.id === id) ?? null;

            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Hapus Data {data?.name}
                </ModalHeader>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    isLoading={loadingDelete}
                    onPress={() => {
                      deleteData(id ?? 0).then((value) => {
                        if (value) {
                          getList(1).then((value) => value);
                          onClose();
                          setId(null);
                        }
                      });
                    }}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </div>
  );
}
