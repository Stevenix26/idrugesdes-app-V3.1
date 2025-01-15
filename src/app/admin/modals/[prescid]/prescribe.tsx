
import React, { FC } from 'react'
import ButtonAction from "../../components/ButtonAction"
import BackButton from '../../components/BackButton'
import { db } from '../../../lib/db';


interface PresPageProps{
  params:{
    id: string;
  };
}

async function getPost(id: string){

  const response = await db.prescription.findFirst({
    where:{
      id: id
    },
    select: {
      id: true,
      title: true,
      content:true,
      tags: true,
    }
  });
  return response;

}

const BloomPage: FC<PresPageProps> = async ({params}) => {
  const post = await getPost(params.id);
  console.log(post)


  return (
    <div className='container p-6'>
      <div className='pt-3 row'>
      <div>
        <BackButton/>
      </div>
      <div className='mb-6'>
      
        <h2 className='text-2xl font-bold my-4'>{post?.title}
        </h2>
      
        <ButtonAction id={params.id}/>
      </div>
        <span className='badge badge-neutral mb-3'>{post?.tags.name}</span>
        <p className='text-blue-500'>{post?.content}</p>
    </div>
    </div>
  )
}

export default BloomPage