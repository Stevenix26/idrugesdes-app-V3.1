"use client"
import { usePathname } from "next/navigation";
import styles from "./menulinkAdmin.module.css";
import Link from 'next/link';

const MenuLink = ({item}) => {
  const pathname = usePathname()
  return (
    <a className="flex flex-1 items-end">
    <Link href={item.path} className={`w-full btn-outline ${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon }
        {item.title}
    </Link>
    </a>
  )
}

export default MenuLink