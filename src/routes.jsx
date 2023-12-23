import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import { SignIn, SignUp, SignOut } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; 
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
  {
    title: "Actions",
    layout: "auth",
    pages: isAuthenticated() ? 
      [
        {
          icon: <ServerStackIcon {...icon} />,
          name: "sign out",
          path: "/sign-out",
          element: <SignOut />,
        },
      ] : 
      [        {
          icon: <ServerStackIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
  },
];

export default routes;
