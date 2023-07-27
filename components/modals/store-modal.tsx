'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import{zodResolver}from '@hookform/resolvers/zod'
import {Form,  FormControl,  FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from 'axios'
import { toast } from "react-hot-toast"
import { redirect } from "next/navigation"

const formSchema=z.object({
  name:z.string().min(1)
})


const StoreModal = () => {
  const storeModal=useStoreModal()

const [loading,setLoading]=useState(false)

  const form=useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:""
    }
  })

  const onSubmit=async(values:z.infer<typeof formSchema>)=>{
try{
setLoading(true)
const response=await axios.post(`/api/stores`,values)
if(response)  {
  toast.success("store created successfully")
 return    window.location.assign(`/${response.data.id}`);

}
}catch(err){
console.log(err)
toast.error("something went wrong")
}finally{
  setLoading(false)
}
  }
  return (
    <Modal title="crate store" description="add a new store to manage your products"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>
      <div>

       <div className="space-y-4 py-2 pb-4">
<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}>
<FormField
name="name"
control={form.control}
render={({field})=>
(<FormItem>
<FormLabel>Name</FormLabel>
<FormControl>
  <Input placeholder="E-commerce" {...field}
  disabled={loading}/>
</FormControl>
<FormMessage/>

</FormItem>)
}/>

<div className="pt-6 space-x-2 flex items-center justify-end">
<Button variant="outline" onClick={storeModal.onClose} disabled={loading}>Cancel</Button>
<Button type="submit" disabled={loading}>Continue</Button>
</div>
</form>
</Form>
       </div>
      </div>
    </Modal>
  )
}

export default StoreModal