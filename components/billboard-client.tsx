'use client'

import { Plus } from "lucide-react"
import Heading from "./Heading"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { useParams, useRouter } from "next/navigation"
import { Billboard } from "@prisma/client"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "./data-table"
import ApiList from "./ui/api-list"

interface BillboardClientProps{
data:BillboardColumn[]
}

const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {

    const router=useRouter()
    const params=useParams()
  return (
    <>
    <div className="flex items-center justify-between">
        <Heading title={`Billboards (${data.length})`}
        description="Manage billboards for your store"/>
        <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
        </div>
        <Separator/>
        
        <DataTable searchKey="label" columns={columns} data={data}/>
      
      <Separator/>
      <Heading title="Api" description="Api calls for billboards"/>
      <ApiList entityName="billboards" entityIdName="billboardId"/>


        </>
  )
}

export default BillboardClient