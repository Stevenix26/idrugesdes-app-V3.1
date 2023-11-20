'use client'
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import Dashboard from '../../dashboard/page'
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { Card } from 'react-bootstrap'


const page = ({params}) => {

  const [pharmacies, setPharmacies]=useState( [
    {
        id:1,
        name:'Abiola Micheal Pharmacy',
        image:'/images/shelf.jpg',

        address: 'Folorunso Street, Alaba, Lagos',
        phone:9020993323,

    },
     {
        id:2,
        name:'First Mercy Pharmacy',
        image:'/images/shelf.jpg',

        address: 'Daniels Street, Olando, Asaba',
        phone:9024736789,


    }, {
        id:3,
        name:'Ola\'s Pharmacy',
        image:'/images/shelf.jpg',
        address: 'Peterson\'s Street, Alaba, Akure',
        phone:9027099323,


    }, {
        id:4,
        name:'Ajiboye Tayo Pharmacy',
        image:'/images/shelf.jpg',
        address: 'Ungary Street, Alaba, Akure',
        phone:9023456789,

    },
])
const selectPharmacy = pharmacies.find(pharmacy => pharmacy.id ===Number(params.slug))
console.log(selectPharmacy);
  console.log(params.slug);
  return (
    <div className='container '>
      <div className="row card w-50 ">
        <div className="col-md-6 col-lg-6 card-body align-items-center">
        <Image className= "mt-2 rounded-xl object-cover " src={selectPharmacy.image} width={300} height={300} />
          <div className='text-secondary'>
          <h5 className="card-title text-danger">{selectPharmacy.name}</h5>
          <p className='card-text'>{selectPharmacy.address}</p>
          <small>{selectPharmacy.phone}</small>
          <div>
          <SignedIn>
              {/* <Dashboard/> */}
               <Link className="btn btn-outline-secondary" href='/prescriptions'>Submit prescription</Link>
          </SignedIn>
            <SignedOut>
              <SignInButton mode='modal'>
                <button className='btn btn-outline-secondary rounded border border-gray-400 px-3 py-0.5'>
                  Submit prescription
                </button>
              </SignInButton>
            </SignedOut>
            </div>
        </div>
            
        </div>
    </div>
    



    </div>
  )
}

export default page