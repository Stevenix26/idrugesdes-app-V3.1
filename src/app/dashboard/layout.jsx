import React from 'react'
import Navbar from '../components/ui/dashboard/navbar/navbar'
import Sidebar from '../components/ui/dashboard/sidebar/sidebar'
import styles from '../components/ui/dashboard/dashboard.module.css';


const Layout = ({ children }) => {
  return (
    <>
      <div className={`w-full ${styles.container}`}>
        <aside className='bg-base-200 shadow-lg'>
          <div className='p-2 m-2'>
            <Sidebar />
          </div>
        </aside>

        <div className={` ${styles.content}`}>
          {children}
        </div>
      </div>
    </>

  )
}

export default Layout