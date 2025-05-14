"use client"
import { usePathname } from "next/navigation";
import styles from "./menulink.module.css";
import Link from 'next/link';

const MenuLink = ({ item, side }) => {
  const pathname = usePathname()
  return (
    <>

      {
        side ? (
          <Link href={item.path} className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${pathname === item.path ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <span className="text-xl">{item.icon}</span>
          </Link>
        ) : (
          <Link href={item.path} className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${pathname === item.path ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <span className="text-xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.title}</span>
          </Link>
        )
      }

    </>


  )
}

export default MenuLink