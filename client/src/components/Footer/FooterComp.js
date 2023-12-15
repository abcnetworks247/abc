import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

export default function FooterComp() {
  return (
    <div>
      <footer className="relative bg-blueGray-200 pt-8 pb-6 bg-[#111827] shadow ">
        <div className="container mx-auto ">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 lg:px-20 pl-4 md:pl-0 ">
              <h4 className="text-2xl  fonat-semibold text-white">
                Let's keep in touch!
              </h4>
              <h5 className="text-sm  mt-0 mb-2 text-white">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6 flex flex-wrap">
                <FaSquareFacebook className=" text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2" />
                <FaSquareXTwitter className=" text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2" />
                <FaSquareInstagram className=" text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2" />
                <IoLogoYoutube className=" text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2" />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-white text-[12px]  font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation?ref=njs-profile"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://blog.creative-tim.com?ref=njs-profile"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                      >
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-white text-[12px] font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://creative-tim.com/terms?ref=njs-profile"
                      >
                        Terms  Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://creative-tim.com/privacy?ref=njs-profile"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-white  block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us?ref=njs-profile"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © <span id="get-current-year">2023</span>
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="text-white hover:text-gray-800"
                  target="_blank"
                />{" "}
                ABC Studio
                <a
                  href="https://www.creative-tim.com?ref=njs-profile"
                  className="text-white hover:text-white"
                >
                  Powered by Klipto inc
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
