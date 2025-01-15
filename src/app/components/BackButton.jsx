
'use client'

import React from 'react'
import { CaretCircleLeft } from '@phosphor-icons/react/dist/ssr';
import { useRouter} from 'next/navigation';

 


const BackButton = () => {
    const router=useRouter();

  return (
    <button className='btn sm:btn-sm btn-active lg:btn-md' onClick={() => router.back()}>
        <CaretCircleLeft/>
        <span>Back</span>
    </button>
  )
}

export default BackButton