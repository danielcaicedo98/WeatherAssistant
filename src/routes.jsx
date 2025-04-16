import {
  HomeIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Notifications, WeatherAssistant } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import UserManual from "./pages/dashboard/user_manual";
import SmartAssistant from "./pages/dashboard/smart_assistant";
import { BookOpen } from "lucide-react";

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
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "Asistente por voz",
      //   path: "/smart_assistant",
      //   element: <SmartAssistant />,
      // },
      {
        icon: <BookOpen {...icon} />,
        name: "Manual de usuario",
        path: "/usermanual",
        element: <UserManual />,
      }

    ],

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
