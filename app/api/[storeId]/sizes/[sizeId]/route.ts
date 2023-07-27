
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req:Request,
    {params}:{params:{sizeId:string}}){
try{
   
if(!params.sizeId){
    return new NextResponse("Billboard id is required",{status:400})
}



const size=await prismadb.size.findUnique({
    where:{
        id:params.sizeId,
    }
    
})


return NextResponse.json(size)
}catch(err){
    console.log('billboards id get',err)
    return new NextResponse("Internal error",{status:500})
}
}


export async function PATCH(req:Request,
    {params}:{params:{storeId:string,sizeId:string}}){
try{
    const {userId}=auth()
    const body=await req.json()
    const {name,value}=body
  


    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
    if(!name){
        return new NextResponse("label is required",{status:400})
    }
    if(!value){
        return new NextResponse("image url is required",{status:400})
    }

if(!params.storeId){
    return new NextResponse("billboard id is required",{status:400})
}

const storeByUserId=await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
})

if(!storeByUserId){
    return new NextResponse("unauthorized",{status:403})
}

const size=await prismadb.size.updateMany({
    where:{
        id:params.sizeId,    
    },
    data:{
        name,
        value
    }
})

console.log(size)
return NextResponse.json(size)

}catch(err){
    console.log('size id patch',err)
    return new NextResponse("Internal error",{status:500})
}
}


export async function DELETE(req:Request,
    {params}:{params:{storeId:string,sizeId:string}}){
try{
    const {userId}=auth()
   
    
    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
 

if(!params.sizeId){
    return new NextResponse("size id is required",{status:400})
}

const storeByUserId=await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
})

if(!storeByUserId){
    return new NextResponse("unauthorized",{status:403})
}


// only delete method doesnt work
const size=await prismadb.size.deleteMany({
    where:{
        id:params.sizeId,
       
      
    }
    
})


return NextResponse.json(size)

}catch(err){
    console.log('size id delete',err)
    return new NextResponse("Internal error",{status:500})
}
}