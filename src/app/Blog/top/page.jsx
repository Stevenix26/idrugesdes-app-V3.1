import React from 'react'
import PostCard from '../../components/PostCard'
import Link from 'next/link'
import { db } from '../../../lib/db'


async function getPosts(){
  const response = await db.post.findMany({
    select:{
      id: true,
      title:true,
      content:true,
      tags: true,
    },
    orderBy:{
      createdAt: 'desc'
    }
  });
  return response;
}

const tops = async () => {

  const posts = await getPosts();
  console.log(posts)
  


  return (
    <div className="container" style={{padding: "30px"}}>
    <div className='mb-5 btn btn-primary justify-start'>
        <a><Link href= '/Blog/CreateDoc'> Create Page</Link></a>
     </div>   

    <div className='grid items-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
     {posts.map(post =>(
      <PostCard key={post.id} post={post}/>
     ))}
    </div>
    </div>
    
  )
}

export default tops