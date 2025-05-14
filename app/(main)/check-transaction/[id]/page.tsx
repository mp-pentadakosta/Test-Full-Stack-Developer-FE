"use client";

import { useParams } from "next/navigation";

import { CheckTransactionView } from "@/module/check-transaction/check.transaction.view";

export default function Page() {
  const params = useParams();

  return <CheckTransactionView inv={params.id as string} />;
}
