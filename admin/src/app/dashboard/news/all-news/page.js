'use client';
import Api from '@/utils/Api';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  Button,
  CardFooter,
  Checkbox,
  Option,
  Select,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
const Page = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const pathUrl = '/dashboard/news/all-news';
  const editUrl = '/dashboard/news/edit';
  const router = useRouter();
  const AuthToken = Cookies.get('adminToken');

  useEffect(() => {
    Api.get('admin/blog')
      .then((res) => {
        const data = res.data.allBlogs;
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error==', err);
        const error = 'Something went wrong, Try again later';
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteBlog = (id) => {
    Api.delete(`admin/blog/delete`, {
      data: {
        _id: id,
      },

      headers: {
        Authorization: `Bearer ${String(AuthToken)}`,
      },
    })
      .then((res) => {
        console.log(res, data);
        router.reload();
      })
      .catch((err) => {
        console.log('cant delete', err);
      });
  };

  async function Delete(id) {
    Swal.fire({
      title: `Are you sure you want to delete this `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        // make a delete request to the server and if it is successful then show the alert and reload the page else show the error alert
        Api.delete(`admin/blog/delete`, {
          data: { id },
          headers: {
            Authorization: `Bearer ${String(AuthToken)}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (res.status >= 200 && res.status <= 300) {
              Swal.fire({
                title: 'Post Deleted!',
                text: `${res.data.message}`,
                icon: 'success',
                timer: 2000,
              });
              console.log(res.statusText, res.status, res.data);
              // reload the page
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log('cant delete', err);
            console.log(id);

            Swal.fire({
              title: 'Post Not Deleted!',
              text: 'Post Not Deleted. Error occurred during the request.',
              icon: 'error',
            });
          });
      }
    });
  }

  if (error) {
    return (
      // create a professinal error page
      <div className=' flex flex-col items-center justify-center gap-3 h-[80svh]'>
        <h1 className='text-3xl font-bold'>{error}</h1>
      </div>
    );
  }

  return (
    <main className='px-5 mt-10'>
      <h1 className='ml-10 text-3xl font-bold'>All News</h1>
      <br />
      {loading ? (
        <div className='flex items-center justify-center h-[70svh] lg:h-full'>
          <svg
            className='w-20 h-20 mr-3 -ml-1 text-blue-500 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            />
          </svg>
        </div>
      ) : (
        <div>
          {news.map((item) => (
            <article
              key={item._id}
              className='p-4 m-3 bg-white border border-gray-100 shadow-lg rounded-xl md:p-7 sm:p-6 lg:p-2'>
              <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 md:grid-cols-2'>
                <div className='lg:col-span-1 md:col-span-1'>
                  <div className='rounded-lg overflow-hidden'>
                    <Link href={`${pathUrl}/${item._id}`}>
                      <img
                        src={item.blogimage}
                        alt='random image from unsplash'
                        className='object-cover object-center w-full h-60 md:h-48 lg:h-[250px] '
                      />
                    </Link>
                  </div>
                </div>

                <div className='lg:col-span-1 md:col-span-1 flex flex-col gap-5 items-start justify-center'>
                  <div className='flex flex-col justify-between'>
                    <h3 className='mt-4 text-lg md:text-xl font-medium'>
                      <Link
                        href={`${pathUrl}/${item._id}`}
                        className='hover:underline line-clamp-2 text-2xl capitalize'>
                        {item.title}
                      </Link>
                    </h3>
                    <p className='mt-1 text-sm text-gray-700'>
                      {item.shortdescription}
                    </p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div>
                      <button
                        onClick={() => {
                          router.push(`${editUrl}/${item._id}`);
                        }}
                        className='rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-xs md:text-sm font-medium mr-1 text-white'>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          let id = item._id;
                          Delete(id);
                        }}
                        className='rounded border border-red-500 bg-red-500 px-3 py-1.5 text-xs md:text-sm font-medium ml-1 text-white'>
                        Delete
                      </button>
                    </div>
                    <p className='text-xs md:text-sm text-gray-500'>
                      {item.createdAt.split('T')[0]}{' '}
                      {item.createdAt.split('T')[1].split('.')[0].slice(0, 5)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <CardFooter className='flex items-center justify-between p-4 border-t border-blue-gray-50'>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal'>
              Page 1 of 10
            </Typography>
            <div className='flex gap-2'>
              <Button variant='outlined' size='sm'>
                Previous
              </Button>
              <Button variant='outlined' size='sm'>
                Next
              </Button>
            </div>
          </CardFooter>
        </div>
      )}
    </main>
  );
};

export default Page;
