"use client"
import { usePathname } from "next/navigation";
import Link from 'next/link';

const MenuLink = ({ item, side }) => {
  const pathname = usePathname();
  const isActive = pathname === item.path;
  
  return (
    <>
      {side ? (
        <Link 
          href={item.path} 
          className={`
            flex items-center justify-center p-2 rounded-lg 
            transition-all duration-200 
            ${isActive 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="text-xl">{item.icon}</span>
          {isActive && <span className="absolute left-0 w-1 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-r-md"></span>}
        </Link>
      ) : (
        <Link 
          href={item.path} 
          className={`
            flex items-center px-4 py-2 rounded-lg 
            transition-all duration-200 
            ${isActive 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
          `}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="text-xl mr-3">{item.icon}</span>
          <span className="font-medium">{item.title}</span>
          {isActive && <span className="absolute left-0 w-1 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-r-md"></span>}
        </Link>
      )}
    </>
  )
}

export default MenuLink