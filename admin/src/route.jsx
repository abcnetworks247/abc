import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,

  } from "@heroicons/react/24/solid";
  import {  Home, Profile, Tables,  } from "./pages/dashboard";
  // import { SignIn, SignUp } from "./pages/auth";

  // import Recover from "./pages/auth/recover";
  // import UpdatePassword from "./pages/auth/updatepassword";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  const  route = [
    
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/dashboard",
          element: <Home />,
        },
        {
            icon: <UserCircleIcon {...icon} />,
            name: "profile",
            path: "/profile",
            element: <Profile />,
          },
          {
            icon: <TableCellsIcon {...icon} />,
            name: "tables",
            path: "/tables",
            element: <Tables />,
          },
      ],
    },

  ];
  
export default route