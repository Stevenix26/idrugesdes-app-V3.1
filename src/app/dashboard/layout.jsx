"use client"
import React, { useState } from 'react'
import Sidebar from '../components/ui/dashboard/sidebar/sidebar'
import styles from '../components/ui/dashboard/dashboard.module.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen">
      {/* Mobile menu toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-base-200 p-2 rounded shadow-lg"
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-base-200 shadow-lg transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}
      >
        <div className="h-full w-64 p-4 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-base-100 p-4 xl:p-2 md:p-3 transition-all duration-300 ml-0 md:ml-4">
        <div className="max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout