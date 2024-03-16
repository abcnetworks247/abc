import React from 'react';

const HomeBanner = () => {
  return (
    <div>
      <header>
        <div
          className='w-full bg-cover bg-center h-[50vh] mb-10'
          style={{
            backgroundImage:
              'url(https://www.physiomics.co.uk/wp-content/uploads/2019/03/news-header-1350px.jpg)',
          }}>
          <div className='flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50'></div>
        </div>
      </header>
    </div>
  );
};

export default HomeBanner;
