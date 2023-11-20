'use client'
import React from "react";
Link
import {Card,CardBody, CardFooter,Button, Link} from "@nextui-org/react";
import Image from "next/image";
export default function App() {
    const list = [
    {
      title: "Orange",
      img: '/images/p1.jpg',
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: '/images/p2.jpg',
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: '/images/p3.jpg',
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: '/images/p4.jpg',
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: '/images/p5.jpg',
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: '/images/p6.jpg',
      price: "$8.00",
    },
    {
      title: "Banana",
      img: '/images/p7.jpg',
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: '/images/p8.jpg',
      price: "$12.20",
    },
  ];
  return (
    <div className="container">
        <div className="row ">
        <div className="col">
            <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-40"
            >
                <Image
                    alt="Woman listing to music"
                    className="object-cover"
                    height={100}
                    src="/images/doctor1.png"
                    width={200}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80">Available soon.</p>
                    <Link href="/userdashboard">
                    <Button  className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                    Notify me
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
        </div>
         <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100"
              height="100"
              alt={item.title}
              className="w-full object-cover h-[180px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>

  );
}





