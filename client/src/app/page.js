import Navbar from "@/components/navbar/Navbar"
import Sidebar from "@/components/sidebar/Sidebar"
export default function Home() {
    return (
      <main>
    <Navbar />
     
     <Sidebar />
     <div className="flex flex-row sm:gap-10">

	<div className="flex w-full flex-col p-4">
		<div className="w-fit">
    <label htmlFor="sidebar-mobile-fixed" className="btn-primary btn sm:hidden bg-red-500 text-white">Open Sidebar</label>
		</div>

    <label htmlFor="sidebar-mobile-fixed"  className="btn-primary btn sm:hidden bg-red-500 text-white">hello world </label>

	</div>
</div>
      </main>
    )
}
