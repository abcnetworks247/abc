'use client';
import FooterComp from '@/components/Footer/FooterComp';
import Navbar from '@/components/navbar/Navbar';
import RelatedArticles from '@/components/relatedArticles/RelatedArticles';
import Sidebar from '@/components/sidebar/Sidebar';
import Nav1 from '@/components/navbar/Nav1';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Api from '@/utils/Api';
import SharePostModal from '@/components/Modal/SharePostModal';

export default function page() {
  // store fetched data in state
  const [blog, setBlog] = useState([]);
  // store author's data in state
  const [author, setAuthor] = useState([]);
  // store loading state
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const [shareModal, setShareModal] = useState(false);
  const [linkToShare, setLinkToShare] = useState(false);
  const [formatedTime, setFormatedTime] = useState('');
  const [commentSection, setCommentSection] = useState(false);

  //fetch blog api
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`admin/blog/${id}`);

      const data = await res.data.blogdata;
      const author = await res.data.blogdata.author;

      console.log('this is blog oo', res);
      setBlog(data);
      setAuthor(author);
      setFormatedTime(data.createdAt);
      console.log('hey', res.data.blogdata.author);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate = new Date(formatedTime).toLocaleString('en-US', {
    hour12: true,
  });

  useEffect(() => {
    fetchBlog();
    console.log(id);
  }, [id]);

  const openModal = (id) => {
    console.log('this is ', id);
    setLinkToShare(`${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${id}`);
    setShareModal(true);
    document.body.style.overflow = 'hidden'; // Hide the scrollbar
  };

  // Function to close the modal
  const closeModal = () => {
    setShareModal(false);
    document.body.style.overflow = 'auto'; // Show the scrollbar
  };

  return (
    <div className='relative'>
      <Nav1 />
      <div className='bg-[#111827] sticky top-0 z-[10] mb-10'>
        <Navbar />
      </div>

      {
        // if loading is true, show loading component
        loading ? (
          <main className='mt-[110px] pb-16  lg:pb-24 bg-white w-auto antialiased'>
            <div className='flex flex-col justify-between max-w-screen-xl gap-5 px-4 mx-auto'>
              <span className='w-full h-12 max-w-2xl mx-auto bg-gray-200 rounded-lg animate-pulse lg:h-6 format format-sm sm:format-base lg:format-lg format-blue'></span>
              <div className='w-full h-[50svh] bg-gray-200 rounded max-w-2xl mx-auto format format-sm sm:format-base lg:format-lg format-blue animate-pulse'></div>
            </div>
          </main>
        ) : (
          // else show fetched data
          <>
            <Sidebar />
            <main className='mt-[30px] pb-16  lg:pb-24 bg-white w-auto antialiased'>
              <div className='flex justify-between max-w-screen-xl px-4 mx-auto '>
                <article className='w-full max-w-3xl mx-auto format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
                  <header className=' lg:mb-2 not-format'>
                    <address className='flex items-center mb-2 not-italic'>
                      {/* map through fetched data */}
                    </address>
                    <h1 className='text-xl font-semibold leading-tight text-gray-900 my-7 lg:mb-6 lg:text-xl'>
                      {blog.title}
                    </h1>
                  </header>

                  <div className='flex items-center justify-between gap-5 my-10'>
                    <div className='flex items-center '>
                      <img
                        className='w-8 h-8 mr-2 rounded-full'
                        src={author.userdp}
                        alt='Profile picture of author'
                      />
                      <h3 className='text-base font-bold text-gray-900'>
                        {author.fullname}:
                      </h3>
                      <p className='text-sm text-gray-800 ml-1'>Author</p>
                    </div>
                    <div className=''>
                      <p className='text-sm text-gray-800 mx-4'>
                        <time
                          pubdate
                          datetime='2022-02-08'
                          title='February 8th, 2022'>
                          {formattedDate}
                        </time>
                      </p>
                    </div>
                  </div>

                  <figure>
                    <img
                      className='w-full h-auto mb-6 rounded-lg'
                      src={blog.blogimage}
                    />
                  </figure>

                  <div className='w-full text-base leading-relaxed text-gray-700 lg:px-0 lg:w-full'>
                    {parse(`${blog.longdescription}`)}
                  </div>

                  <section className='mt-6 not-format'>
                    <div className='flex items-center justify-between mb-6'>
                      <h2 className='text-lg font-bold text-gray-900 lg:text-lg'>
                        Discussion (0)
                      </h2>

                      <h2
                        className='text-md font-bold text-gray-900 lg:text-lg flex flex-row items-center gap-1 cursor-pointer'
                        onClick={() => {
                          let id = blog._id;
                          console.log('this is modal id', blog);
                          openModal(id);
                        }}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                          />
                        </svg>
                        Share
                      </h2>
                    </div>
                    <form className='mb-6'>
                      <div className='px-4 py-2 mb-4 bg-gray-200 border border-gray-200 rounded-lg rounded-t-lg'>
                        <label for='comment' className='sr-only'>
                          Your comment
                        </label>
                        <textarea
                          id='comment'
                          rows='6'
                          className='w-full px-0 text-lg text-gray-900 bg-gray-200 border-0 outline-0 focus:ring-0 dark:placeholder-gray-400'
                          placeholder='Write a comment...'
                          required></textarea>
                      </div>
                      <button
                        type='submit'
                        className='inline-flex items-end justify-end py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 '>
                        Post comment
                      </button>
                    </form>
                    {commentSection && (
                      <article className='p-6 mb-6 text-base bg-gray-200 rounded-lg '>
                        <p className='text-gray-600'>
                          Very straight-to-point article. Really worth time
                          reading. Thank you! But tools are just the instruments
                          for the UX designers. The knowledge of the design
                          tools are as important as the creation of the design
                          strategy.
                        </p>
                      </article>
                    )}
                  </section>
                </article>
              </div>
            </main>

            <aside
              aria-label='Related articles'
              className='px-5 py-8 overflow-hidden'>
              <div className='max-w-screen-xl px-4 mx-auto'></div>
              <div className=''>
                <RelatedArticles id={id} />
              </div>
            </aside>
          </>
        )
      }
      {shareModal && (
        <SharePostModal closeModal={closeModal} linkToShare={linkToShare} />
      )}
      <FooterComp />
    </div>
  );
}
