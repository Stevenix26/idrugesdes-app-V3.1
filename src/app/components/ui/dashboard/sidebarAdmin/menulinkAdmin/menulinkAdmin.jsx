"use client"
import { usePathname } from "next/navigation";
import styles from "./menulinkAdmin.module.css";
import Link from 'next/link';

// This component is no longer used as the links are directly implemented in the sidebar
// Keeping it for backward compatibility
const MenuLink = ({item, side}) => {
  const pathname = usePathname()
  const collapsed = side || false;
  
  return (
    <Link 
      href={item.path} 
      className={`
        flex items-center p-2 rounded-lg 
        ${collapsed ? 'justify-center' : 'px-4'}
        ${pathname === item.path 
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
        transition-all duration-200
      `}
    >
      <span className={`${collapsed ? 'text-xl' : 'text-lg mr-3'}`}>
        {item.icon}
      </span>
      {!collapsed && <span>{item.title}</span>}
    </Link>
  )
}

export default MenuLink