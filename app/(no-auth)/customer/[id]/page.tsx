"use client";
import { useParams, useRouter } from "next/navigation";

import DetailCustomerDetail from "@/module/customer/detail/detail.customer.detail";

export default function DetailCustomerPage() {
  const params = useParams();
  const router = useRouter();

  const id: string = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string);

  if (!parseInt(id)) {
    router.replace("/error");
  }

  return <DetailCustomerDetail id={parseInt(id)} />;
}
