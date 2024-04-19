
'use client'

import React from 'react';
// import vid from '../../resources/assets/video/vid.ts';
// import vid1 from '../../resources/assets/video/vid.mp4';

const HomeBanner = () => {
  return (
    <div>
      <header>
        {/* <div
          className='w-full bg-cover bg-center h-[50vh] mb-10'
          style={{
            backgroundImage:
              'url(https://www.physiomics.co.uk/wp-content/uploads/2019/03/news-header-1350px.jpg)',
          }}>
          <div className='flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50'></div>
        </div> */}
        <div className='video-background w-full'>
          <video autoPlay loop muted controls={false} className='w-[100vw]'>
            <source
              src="./vid.mp4"
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </header>
    </div>
  );
};

export default HomeBanner;
