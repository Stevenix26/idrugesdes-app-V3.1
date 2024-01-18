"use client"
import { usePathname } from "next/navigation";
import styles from "./menulink.module.css";
import Link from 'next/link';

const MenuLink = ({item}) => {
  const pathname = usePathname()
  return (
    <a className="flex">
    <Link href={item.path} className={` link-hover link ${styles.container} ${pathname === item.path && styles.active}`}>
        {item.icon }
        {item.title}
    </Link>
    </a>
  )
}

export default MenuLink