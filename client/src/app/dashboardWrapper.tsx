"use client";
import React, { useEffect } from 'react'
import Navbar from "@/components/Navbar"
import Sidebar from '@/components/Sidebar'
import StoreProvider, { useAppSelector } from './redux'


const DashboardLayout = ({ children } : {children: React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector(
    (state) =>state.global.isDarkMode
  );
  //changing dark mode because we can't modify the root html with next.js ????
  useEffect(() => {
    if (isDarkMode){
      document.documentElement.classList.add("dark")
    }else{
      document.documentElement.classList.remove("dark")
    }
  })
//checking size of navbar to collapse it
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
    <Sidebar />
    
    <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
      isSidebarCollapsed ? "" : "md:pl-64"
      }`}
    >
        <Navbar />
        {children}
    </main>
    </div>
  )
}

//Provides context for dashboard as a root, using global state disallows this being in layout
const DashboardWrapper = ({ children }: {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper 