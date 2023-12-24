import React from 'react'
import { UseUserContext } from '../../contexts/UserContext'
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';



export default function Hocsession(Component) {
    const Authtoken = Cookies.get('authToken')
    const session = Authtoken;
  return function withHoc(params) {
     if(!session){
     redirect('/login')
     }
    return <Component {...params} />
  }
}

