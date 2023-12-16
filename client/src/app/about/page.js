import AboutComponent from "@/components/About/AboutComponent";
import FooterComp from "@/components/Footer/FooterComp";
FooterComp
import Navbar from "@/components/navbar/Navbar";

function page() {
  return (
    <div>
         <div className="bg-white sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
        <br />
        <br />
        <AboutComponent />
        <FooterComp />
    </div>
  )
}

export default page