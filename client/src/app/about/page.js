import AboutComponent from "@/components/About/AboutComponent";
import FooterComp from "@/components/Footer/FooterComp";
FooterComp
import Navbar from "@/components/navbar/Navbar";

function page() {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <AboutComponent />
        <FooterComp />
    </div>
  )
}

export default page