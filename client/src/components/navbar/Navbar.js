import React from 'react'

export default function Navbar() {
  return (
    <div>
<div className="navbar rounded-lg sticky top-0 z-[10]">
	<div className="navbar-start">
		<a className="navbar-item">Ripple UI</a>
	</div>
	<div className="navbar-end">
		<div className="avatar avatar-ring avatar-md">
			<div className="dropdown-container">
					<label htmlFor="sidebar-mobile-fixed"  className="btn btn-ghost flex cursor-pointer px-0 lg:hidden"   tabIndex="0">
						<img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
					</label>
				<div className="dropdown">
					<label className="btn btn-ghost  cursor-pointer px-0 hidden lg:block"   tabIndex="0">
						<img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
					</label>
					<div className="dropdown-menu dropdown-menu-bottom-left bg-white">
						<a className="dropdown-item text-sm -z-50">Profile</a>
						<a tabIndex="-1" className="dropdown-item text-sm">Account settings</a>
						<a tabIndex="-1" className="dropdown-item text-sm">Subscriptions</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </div>
  )
}
