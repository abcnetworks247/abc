import Link from 'next/link';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaSquareFacebook } from 'react-icons/fa6';
import { FaSquareInstagram } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

export default function FooterComp() {
  return (
    <div>
      <footer
        id='footer'
        className='relative bg-blueGray-200 pt-8 pb-6 bg-[#111827] shadow lg:px-8'>
        <div className='container mx-auto '>
          <div className='flex flex-wrap text-left lg:text-left'>
            <div className='w-full lg:w-6/12  pl-4 md:pl-0 '>
              <h4 className='text-2xl  fonat-semibold text-white'>
                Let's keep in touch!
              </h4>
              <h5 className='text-sm  mt-0 mb-2 text-white'>
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className='mt-6 lg:mb-0 mb-6 flex flex-wrap'>
                <a
                  href='https://web.facebook.com/ABCAmbaTelevision/?_rdc=1&_rdr'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FaSquareFacebook className=' text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2' />
                </a>
                <a
                  href='https://twitter.com/AbcAmbaTV?t=_pw3uE46en4ZX2MGMoZUHg&s=08'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <FaSquareXTwitter className=' text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2' />
                </a>
                <a href='#' target='_blank' rel='noopener noreferrer'>
                  <FaSquareInstagram className=' text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2' />
                </a>
                <a
                  href='https://www.youtube.com/c/ABCAmbaTV'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <IoLogoYoutube className=' text-white shadow-lg font-normal text-2xl items-center justify-center align-center outline-none focus:outline-none mr-2' />
                </a>
              </div>
            </div>
            <div className='w-full lg:w-6/12 '>
              <div className='flex flex-wrap items-top mb-6 gap-8'>
                <div className='w-full lg:w-4/12 px-4 ml-auto'>
                  <span className='block uppercase text-white text-[12px]  font-semibold mb-2'>
                    Useful Links
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='/about'
                        target='_blank'>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='/contact'
                        target='_blank'>
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='/terms'
                        target='_blank'>
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='/privacy-policy'
                        target='_blank'>
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='w-full lg:w-4/12 px-4'>
                  <span className='block uppercase text-white text-[12px] font-semibold mb-2'>
                    Social Accounts
                  </span>
                  <ul className='list-unstyled'>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='https://www.facebook.com/ABCAmbaTelevision/'
                        target='_blank'>
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='https://twitter.com/AbcAmbaTV?t=_pw3uE46en4ZX2MGMoZUHg&s=08'
                        target='_blank'>
                        Twitter
                      </Link>
                    </li>

                    <li>
                      <Link
                        className='text-white hover:text-white  block pb-2 text-sm'
                        href='https://www.youtube.com/c/ABCAmbaTV'
                        target='_blank'>
                        Youtube
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <hr className='my-6 border-gray-50 opacity-20' />
          <div className='px-3 lg:px-0 flex flex-wrap items-start  justify-start'>
            <div className='w-full mx-auto text-start'>
              <div className='text-sm text-white font-semibold py-1'>
                Copyright ©<span id='get-current-year'>2024</span>
                <Link
                  href='/'
                  className='text-white hover:text-gray-800'
                  target='_blank'
                />{' '}
                ABC Network 24,
                <a
                  href='https://www.creative-tim.com?ref=njs-profile'
                  className='text-white hover:text-white ml-1'>
                  Powered by - Klipto Inc.
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
