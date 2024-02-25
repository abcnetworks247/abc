import React from 'react'
import Api from '@/utils/Api'
export default async function CustompaymentFetch(props) {
     
    const res = await Api.get(`admin/payment/history/${props}`)

  return res
}
