import { ComplexNavbar } from '@/components/navbar/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div>
       <main className="flex flex-row w-[100%]">
        <Sidebar />
        <div className="w-[100%]">
          <ComplexNavbar />
        </div>
        
      </main>
    </div>
  )
}

export default page
