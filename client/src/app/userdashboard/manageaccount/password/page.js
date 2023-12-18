import React from 'react'

const page = () => {
  return (
    <form action="#" method="post" className="basis-2/3 py-6">
      <div className="px-4 mb-6 w-full">
        <label className="block mb-2 text-sm font-medium "> Current Password</label>
        <input
          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
          type="password"
          name=""
          placeholder="Current Password"
        />
      </div>
      <div className="px-4 mb-6">
        <label className="block mb-2 text-sm font-medium ">New Password</label>
        <input
          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
          type="password"
          name=""
          placeholder="New Password"
        />
      </div>
      <div className="px-4 mb-6">
        <label className="block mb-2 text-sm font-medium ">Confirm Password</label>
        <input
          className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded    "
          type="password"
          name=""
          placeholder="Confirm Password"
        />
      </div>

</form>
  )
}

export default page