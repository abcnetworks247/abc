import AboutComponent from "@/components/About/AboutComponent";
import FooterComp from "@/components/Footer/FooterComp";
FooterComp;
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

function About() {
  return (
    <div>
      <div className="bg-[#111827] sticky top-0 z-[10]" id="navbar">
        <Navbar />
      </div>
      <Sidebar />

      <AboutComponent />
      <div id='footer'>
         <FooterComp />
      </div>
     
    </div>
  );
}

export default About;
