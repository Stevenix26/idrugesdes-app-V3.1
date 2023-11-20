import React from 'react'
import Navbar from '../components/ui/dashboard/navbar/navbar'
import Sidebar from '../components/ui/dashboard/sidebar/sidebar'
import styles from '../components/ui/dashboard/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card } from '@nextui-org/react';

const Layout = ({ children }) => {
  return (
      <div className= {styles.container}> 
        <div className={styles.menu}>
           <Sidebar />
        </div>
        <div className={styles.content}>
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default Layout