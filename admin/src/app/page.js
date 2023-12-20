import Image from 'next/image'
import NavbarDashboard from '@/components/AllNavbar/NavbarDashboard'
import Sidebar from '@/components/sidebar/Sidebar'
export default function Home() {
  return (
   <main>
    <NavbarDashboard />

    <Sidebar />
    <h1>hello</h1>
   </main>
  )
}
