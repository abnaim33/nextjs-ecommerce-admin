import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,
    {params}:{params:{storeId:string}}){
try{
    const {userId}=auth()
    const body=await req.json()
    const {name}=body
    console.log(name,'from route')
    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
    if(!name){
        return new NextResponse("Name is required",{status:400})
    }

if(!params.storeId){
    return new NextResponse("Store id is required",{status:400})
}

const store=await prismadb.store.updateMany({
    where:{
        id:params.storeId,
       
        userId
    },
    data:{
        name
    }
})

console.log(store)
return NextResponse.json(store)

}catch(err){
    console.log('STORES patch',err)
    return new NextResponse("Internal error",{status:500})
}
}


export async function DELETE(req:Request,
    {params}:{params:{storeId:string}}){
try{
    const {userId}=auth()
   
    
    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    
 

if(!params.storeId){
    return new NextResponse("Store id is required",{status:400})
}
// only delete method doesnt work
const store=await prismadb.store.deleteMany({
    where:{
        id:params.storeId,
       
        userId
    }
    
})


return NextResponse.json(store)

}catch(err){
    console.log('STORES delete',err)
    return new NextResponse("Internal error",{status:500})
}
}