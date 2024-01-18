'use client'
import React,{useState} from 'react'
import Link from 'next/link';
import { ArrowDownLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { tokens } from './themes/theme';
import { useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'
import axios from 'axios';



const ButtonAction = ({id}) => {
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {mutate: deletePost, isLoading } = useMutation({
    mutationFn: async ()=>{
      return axios.delete(`../api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push('/Blog/top');
      router.refresh();

    }
  });

  return (
    <div>
       <a className='mr-3'>
         <Link href={'/edit/id'} >
           <button variant='shadow' className='btn'> 
            <PencilIcon className='w-4 h-4 grid'/>
           <span sx={{color: colors.greenAccent[500]}}> Edit</span>
            </button>
        </Link>
        </a> 
        <button onClick={() => deletePost()} className='bg-red-600 btn btn-outline text-white mr-5'>
            {isLoading && <span className='loading loading-spinner '></span>}
            {isLoading ? ('Loading...'):(
              <>
                <TrashIcon className = 'w-4 h-4 grid'/>
                Delete
              </>
            )}
        </button>
    </div>
  )
}

export default ButtonAction