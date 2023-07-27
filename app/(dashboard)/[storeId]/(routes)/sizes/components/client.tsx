"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import Heading from "@/components/Heading";
import { DataTable } from "@/components/data-table";
import ApiList from "@/components/ui/api-list";
import { SizeColumn, columns } from "./columns";
// import { ApiAlert } from "@/components/ui/api-alert";

// import { columns, CategoryColumn } from "./columns";
// import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`sizes (${data.length})`} description="Manage sizes for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};