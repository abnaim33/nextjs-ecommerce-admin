"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {  Color  } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"

// import  AlertModal  from "@/components/modals/alert-modal"
// import ImageUpload from "@/components/ui/image-upload"
// import Heading from "./Heading"
// import AlertModal from "./modals/alert-modal"
import Image from "next/image"
import AlertModal from "@/components/modals/alert-modal"
import Heading from "@/components/Heading"

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/,{
message:"String must be a valid hex code"
  }),
});

type colorFormValues = z.infer<typeof formSchema>

interface colorFormProps {
  initialData: Color | null;

};

 const ColorForm: React.FC<colorFormProps> = ({
  initialData,

}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit color' : 'Create color';
  const description = initialData ? 'Edit a color.' : 'Add a new color';
  const toastMessage = initialData ? 'color updated.' : 'color created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<colorFormValues>({
    mode:'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });



  const onSubmit = async (data: colorFormValues) => {
    try {
      setLoading(true);
      console.log(data)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success('color deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all product using this color first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }



  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            color="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">


     


          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>color Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>color Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">

                    <Input disabled={loading} placeholder="color value" {...field} />
                  
                  <div className="border p-4 rounded-full"
                  style={{backgroundColor:field.value}}/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForm