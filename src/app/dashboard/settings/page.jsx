import React from 'react'
import { UserProfile } from '@clerk/nextjs';// Import Bootstrap CSS

const Settings = () => {
  return (
    <div className='flex container p-5'>
      <div className="row">
        <div className='card'>
          <div className="flex flex-col sm:w-1/2 md:w-1/2 lg:w-1/3">
          <UserProfile className='w-10'/>
        </div>
        </div>
        
    
    </div>
    </div>
  )
}

export default Settings