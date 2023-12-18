import React from 'react'

const SidebarItem = ({ icon, description }) => {
  return (
    <div className="flex items-center my-3">
      <div className="w-6 h-6 mr-3">
        {
          icon /* You can replace this with your actual icon component or image */
        }
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default SidebarItem