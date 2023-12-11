import BlogComp from "@/components/Blog/BlogComp";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main>
      {/* navbar component  */}
      <div className="bg-white sticky top-0 z-[10]">
        <Navbar />
      </div>
      <BlogComp />

      <Sidebar />
      <div className="flex flex-row sm:gap-10"></div>
    </main>
  );
}
