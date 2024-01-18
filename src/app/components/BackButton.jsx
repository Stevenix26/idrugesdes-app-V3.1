
'use client'

import React from 'react'
import { CaretCircleLeft } from '@phosphor-icons/react/dist/ssr';
import { Button } from "@nextui-org/react";
import { useRouter} from 'next/navigation';

 


const BackButton = () => {
    const router=useRouter();

  return (
    <button className='btn' onClick={() => router.back()}>
        <CaretCircleLeft/>
        <span>Back</span>
    </button>
  )
}

export default BackButton