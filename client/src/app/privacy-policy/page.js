import FooterComp from '@/components/Footer/FooterComp'
import Privacy from '@/components/Privacy/PrivacyComp';
import Nav1 from '@/components/navbar/Nav1';
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

function page() {
    return (
      <div>
        <Nav1 />
        <div className="bg-[#111827] sticky top-0 z-[10] mb-10">
          <Navbar />
        </div>
        <Privacy />
        <FooterComp />
      </div>
    );
}

export default page