import FooterComp from "@/components/Footer/FooterComp";
import Terms from "@/components/Terms/TermsComp";
import Nav1 from "@/components/navbar/Nav1";
import Navbar from "@/components/navbar/Navbar";

function page() {
  return (
    <div>
      <Nav1 />
      <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
        <Navbar />
      </div>
      <Terms />
      <FooterComp />
    </div>
  );
}

export default page;
