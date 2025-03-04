"use client"
import { usePathname } from "next/navigation";
import styles from "./menulink.module.css";
import Link from 'next/link';

const MenuLink = ({ item, side }) => {
  const pathname = usePathname()
  return (
    <>

      {
        side ? (<a className="flex flex-1 items-end">
          <Link href={item.path} className={`w-full btn-outline ${styles.container} ${pathname === item.path && styles.active}`}>
            {item.icon}
          </Link>
        </a>
        ) : (
          <a className="flex flex-1 items-end">
            <Link href={item.path} className={`w-full btn-outline ${styles.container} ${pathname === item.path && styles.active}`}>
              {item.icon}
              {item.title}
            </Link>
          </a>)
      }

    </>


  )
}

export default MenuLink