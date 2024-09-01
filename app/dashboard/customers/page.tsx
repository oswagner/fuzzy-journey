import Search from "@/app/ui/search";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";
import { TableRowSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchFilteredCustomers } from "@/app/lib/data";

import { Metadata } from "next";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<TableRowSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}
