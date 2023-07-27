
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req:Request,
    {params}:{params:{categoryId:string}}){
try{
   
if(!params.categoryId){
    return new NextResponse("category id is required",{status:400})
}


// only delete method doesnt work
const category=await prismadb.category.findUnique({
    where:{
        id:params.categoryId,
    },
    include:{
        billboard:true
    }
    
})


return NextResponse.json(category)
}catch(err){
    console.log('category id get',err)
    return new NextResponse("Internal error",{status:500})
}
}


export async function PATCH(req:Request,
    {params}:{params:{storeId:string,categoryId:string}}){
try{
    const {userId}=auth()
    const body=await req.json()
    const {name,billboardId}=body
  


    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
    if(!name){
        return new NextResponse("name is required",{status:400})
    }
    if(!billboardId){
        return new NextResponse("billboard id  is required",{status:400})
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

const category=await prismadb.category.updateMany({
    where:{
        id:params.categoryId,    
    },
    data:{
        name,
        billboardId
    }
})

console.log(category)
return NextResponse.json(category)

}catch(err){
    console.log('category id patch',err)
    return new NextResponse("Internal error",{status:500})
}
}


export async function DELETE(req:Request,
    {params}:{params:{storeId:string,categoryId:string}}){
try{
    const {userId}=auth()
   
    
    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
 

if(!params.categoryId){
    return new NextResponse("Store id is required",{status:400})
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
const category=await prismadb.category.deleteMany({
    where:{
        id:params.categoryId,
       
      
    }
    
})


return NextResponse.json(category)

}catch(err){
    console.log('category id delete',err)
    return new NextResponse("Internal error",{status:500})
}
}