import React from 'react'
import SidebarAdmin from '../components/ui/dashboard/sidebarAdmin/sidebarAdmin'
import styles from '../components/ui/dashboard/dashboard.module.css';


const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <aside className='bg-base-200 shadow-lg'>
                <div className='p-2 m-2'>
                    <SidebarAdmin />
                </div>
            </aside>
            
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default Layout