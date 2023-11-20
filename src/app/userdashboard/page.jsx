'use client'


// src/components/AdminDashboard.js


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { clerkClient, useClerk } from '@clerk/nextjs';
import { UserProfile, useUser } from '@clerk/nextjs';

const UserDashboard = () => {
  const { users } = useClerk();
  const [profile, setProfile] =useState([])

  useEffect(()=>{
 const getuser= async()=>{
    const users = await clerkClient.users.getUserList();
    console.log(users[1].id)
    setProfile(prev=> [...prev,users])
  }
  getuser()

  },[])
console.log("profile", profile);
 
  const mapProfile = profile.map(profile=>{
    return(
      <div key={profile.id}>
      <p>{profile.id}</p>

      </div>
    )
  })
  
  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <div>
        {mapProfile}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              
              <p className="card-text">There are 1,234 registered users.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sales Statistics</h5>
              <p className="card-text">This month's sales: $12,345</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3>Recent Orders</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>profile</th>
              <th>Order Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td></td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Jane Smith</td>
              <td>$75.50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
