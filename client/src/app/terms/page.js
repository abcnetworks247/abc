import FooterComp from "@/components/Footer/FooterComp"
import Terms from "@/components/Terms/TermsComp"
import Navbar from "@/components/navbar/Navbar"

function page() {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <Terms />
        <FooterComp />
    </div>
  )
}

export default page