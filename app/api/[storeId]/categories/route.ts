import { Category } from '@prisma/client';

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req:Request,
    {  params }:{params:{storeId:string}}){
    try{

if(!params.storeId){
    return new NextResponse("Store id is required",{status:400})
}

const categories=await prismadb.category.findMany({
    where:{
       storeId:params.storeId,
       
    }
})



console.log(categories)
return NextResponse.json(categories)
    }catch(err){
        console.log('categories get',err)
        return new NextResponse("Internal error",{status:500})
    }
}



export async function POST(req:Request,
    {  params }:{params:{storeId:string}}){
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
    return new NextResponse("billboard Id is required",{status:400})
}
if(!params.storeId){
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

const category=await prismadb.category.create({
    data:{
       name,
       billboardId,
        storeId:params.storeId
    }
})

console.log(category)
return NextResponse.json(category)
    }catch(err){
        console.log('categories POST',err)
        return new NextResponse("Internal error",{status:500})
    }
}

