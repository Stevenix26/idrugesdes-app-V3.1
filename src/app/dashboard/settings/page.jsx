import React from 'react'
import { UserProfile } from '@clerk/nextjs';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const Settings = () => {
  return (
    <div className="container">
      <div className="row">
    <UserProfile className="col-md-4 col-lg-6"/>
    </div>
    </div>
  )
}

export default Settings