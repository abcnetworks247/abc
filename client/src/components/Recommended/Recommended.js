import React from 'react'
import SingleRecommend from './SingleRecommend'

const Recommended = () => {
  return (
    <div className="container pb-16">
    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      
        <SingleRecommend/>
        <SingleRecommend/>
        <SingleRecommend/>
        <SingleRecommend/>
   {/* the end */}



    </div>
</div>
  )
}

export default Recommended
