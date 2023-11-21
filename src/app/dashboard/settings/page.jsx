import React from 'react'
import { UserProfile } from '@clerk/nextjs';// Import Bootstrap CSS
import { Card } from '@nextui-org/react';

const Settings = () => {
  return (
    <div className='flex container p-5'>
      <div className="row">
        <Card>
          <div className="flex flex-1 sm:w-1/2 md:w-1/2 lg:w-1/3">
          <UserProfile className='w-10'/>
        </div>
        </Card>
        
    
    </div>
    </div>
  )
}

export default Settings