 import React from 'react'
 
 const Loadinganimate = ({color}) => {
   return (
     <div
       className="animate-spin inline-block w-4 h-4 border-[1px] border-current border-t-transparent rounded-full" style={{color:color}}
       role="status"
       aria-label="loading"
     ></div>
   );
 }
 
 export default Loadinganimate
