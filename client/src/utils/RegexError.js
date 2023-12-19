import React from 'react'
import { BiSolidError } from 'react-icons/bi'
// import styled from 'styled-components'


// const RegError=styled.div`
//    background:white;
//    padding:2px;
//    display:flex;
//    gap:2px;
//    width:fit-content;
//    margin-top:2px;
   

//    .errorIcon{
//       width: 50px;
//       height: 50px;
//    }
//    .error{
//      color:red;
//      font-size: 10px;
//    }
// `

function RegexError({error}) {


  return (
    <div style={{fill:'red'}} className="text-red-500 text-[10px]  flex items-center">
    
    <BiSolidError className='text-red-500' />
    <p className='text-red-500'>{error}</p>
    </div>

  )
}

export default RegexError