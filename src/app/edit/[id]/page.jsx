'use client'
import React,{useState} from 'react'
import FormPost from '../../components/FormPost'
import BackButton from '../../components/BackButton'



const EditPost = () => {
    const { isEditing, setIsEditing } = useState(false);
    return (
        <div className='row'>
            <div className="mt-5 items-end justify-end">
            <BackButton />
        </div>
        <div className='col col-md-6  col-lg-12 text-center text-indigo-600'>
            <h1 className='mt-2'>Edit Form Post</h1>
            <FormPost isEditing = {!isEditing} />
        </div>
        </div>
    )
}

export default EditPost