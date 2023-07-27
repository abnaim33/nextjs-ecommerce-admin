'use client'

import StoreModal from "@/components/modals/store-modal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted,setIsMounted]=useState(false)

    useEffect(()=>{
setIsMounted(true)
    },[])

    // to solve hydration error
    if(!isMounted){
        return null
    }

  return (
    <><StoreModal/></>
  )
}

export default ModalProvider