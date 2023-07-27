"use client";


import  {Separator}  from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";
import Heading from "@/components/Heading";
import { DataTable } from "@/components/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};