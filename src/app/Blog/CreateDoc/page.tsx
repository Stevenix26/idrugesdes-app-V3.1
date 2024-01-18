'use client'
import React, { FC, useState } from 'react';
import BackButton from '../../components/BackButton.jsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
// import { PrismaClient } from '@prisma/client';
import axios  from 'axios';
import FormPost from '../../components/FormPost'

// async function FromInput(){
//   const client = new PrismaClient();
//   return await client.user.findFirst({
//     select: {id: true}
//     })
//     };
//     const CreateUserPage =()=>{
//       let router = useRouter(); 
// // }
interface FormInputPost{
  id: string;
  title: string;
  content: string;
  tags: string;
  tagId: string;
}



const CreateDoc = () => {
   
    
    const handleSubmit = async (error) => {
    error.preventDefault();}
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);  // Set isEditing to true for "Update" label
                
  const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
    createPost(data);
  };

    const { mutate: createPost} = useMutation({
      mutationFn:async (newPost: FormInputPost) =>{
        return axios.post('/api/posts/creates', newPost);
      },
      onError:(error)=>{
        console.error(error);
      },
      onSuccess: ()=> {
        router.push('/Blog/top');
        router.refresh();
        
      },
    });
  return (
    <div className='items-center text-blue-600'>
      <BackButton />
    <h1 className='text-center text-lg'>ADD A FORM</h1>
    <FormPost submit={handleSubmit}  isEditing = {isEditing}/>
    </div>
  );
};

export default CreateDoc;