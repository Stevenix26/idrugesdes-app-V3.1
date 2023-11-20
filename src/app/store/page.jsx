"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Button, card } from '@nextui-org/react'


const Store = () => {

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

const mapPharmacies = pharmacies.map((pharmacy,i)=>{
    return(
        <div className=" card text-secondary items-center col-md-6 col-lg-4 ">
            <Image className="object-cover mt-2 shadow-xl rounded-xl" src={pharmacy.image} width={300} height={300}/>
            <h5 className="card-title">Name: {pharmacy.name}</h5>
            <p className="card-text">Address: {pharmacy.address}
            <p className="card-text">Phone Number: {pharmacy.phone}</p>
            </p>
            <div className="d-grid">
            <Link className="btn btn-outline-success d-grid mb-2" href={`/store/${pharmacy.id}`}> Visit Store</Link>
            </div>
        </div>
        
    )
})



  return (
    <section>
        <div className="container">
        <Card>
            <Card.Body className="row g-1 border-bottom mb-2  w-75">
                 {mapPharmacies}
                 
            </Card.Body>
        </Card>
        <div className="flex flex-wrap gap-4 items-center">
      <Button color="primary" variant="solid">
        Solid
      </Button>
      <Button color="primary" variant="faded">
        Faded
      </Button>
      <Button color="primary" variant="bordered">
        Bordered
      </Button>
      <Button color="primary" variant="light">
        Light
      </Button>
      <Button color="primary" variant="flat">
        Flat
      </Button>
      <Button color="primary" variant="ghost">
        Ghost
      </Button>
      <Button color="primary" variant="shadow">
        Shadow
      </Button>
        </div>
        </div>
        
    </section>
  )
}

export default Store