
import Link from 'next/link';
import React,{FC} from 'react';
import { Tag  } from '@prisma/client';

interface PostCardProps{
  post:{
  id: string;  
  title: string;
  content: string;
  tags: Tag;
};
}

const PostCard: FC<PostCardProps> = ({post}) => {
  const {id,title, content,tags} = post;


  return (
    <>
    <div className='container' >
        <div className="card w-full bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
            <div className="card-actions justify-end">
              <span className='badge badge-neutral mb-3'>{tags.name}</span>
                   <Link href ={`/Bloom/${id}`} className="hover:underline btn btn-xs " >
                   Read More...</Link>
                </div>
            </div>
        </div>  
       
        </div>
    </>
  )}
  export default PostCard