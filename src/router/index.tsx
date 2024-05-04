import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "../pages/Login";
import Register from "../pages/Register";
import System from "../pages/System";
import NotFund from "../pages/Error/notFund";
import Publish from "../pages/Publish";
import View from "../pages/View";
import Favorites from "../pages/Favorites";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import DetailPage from "../pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/system" replace/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: '/system',
    element: <System/>,
    children: [
      {
        path: '',
        element: <Navigate to="/system/view" replace/>,
      },
      {
        path: 'view',
        element: <View/>
      },
      {
        path: 'favorites',
        element: <Favorites/>
      },
      {
        path: 'publish',
        element: <Publish/>
      },
      {
        path: 'detail/:id',
        element: <DetailPage/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'chat',
        element: <Chat/>
      },
      {
        path: '*',
        element: <NotFund/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFund/>
  }
])

export default router
