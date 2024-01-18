import React from 'react'
import Navbar from '../components/ui/dashboard/navbar/navbar'
import Sidebar from '../components/ui/dashboard/sidebar/sidebar'
import styles from '../components/ui/dashboard/dashboard.module.css';

const Layout = ({ children }) => {
  return (
      <div className='flex'> 
        <aside className='menu bg-base-300'>
           <Sidebar />
        </aside>
      <main className='justify-center bg-base-200 items-center md:flex-col xl:flex-row px-6 pb-16 xl:pr-2'>
            <article>
          <Navbar />
          {children}
            </article>

            
        </main>
    </div>
  )
}

export default Layout