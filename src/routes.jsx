import {
  HomeIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Notifications, WeatherAssistant } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import UserManual from "./pages/dashboard/user_manual";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Asistente",
        path: "/assistant",
        element: <WeatherAssistant />,
      },

    ],

  },
  {
    layout: "dashboard",
    pages: [
      {
        // icon: <InformationCircleIcon {...icon} />,
        name: "",
        path: "/user_manual",
        element: <UserManual />,
      }
    ]
  },

  {
    layout: "auth",
    pages: [
      {
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
