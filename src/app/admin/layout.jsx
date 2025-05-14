import React from 'react'
import SidebarAdmin from '../components/ui/dashboard/sidebarAdmin/sidebarAdmin'


const Layout = ({ children }) => {
    return (
        <div className="flex h-full">
            <aside className="hidden md:block w-64 bg-base-200 shadow-lg">
                <div className="fixed h-full w-64 p-4 overflow-y-auto">
                    <SidebarAdmin />
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-base-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout