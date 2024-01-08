import AboutComponent from "@/components/About/AboutComponent";
import FooterComp from "@/components/Footer/FooterComp";
FooterComp;
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

function About() {
  return (
    <div>
      <Sidebar />
      <div className="bg-[#111827] sticky top-0 z-[10]">
        <Navbar />
      </div>

      <AboutComponent />
      <FooterComp />
    </div>
  );
}

export default About;
