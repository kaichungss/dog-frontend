import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "../pages/Login";
import Register from "../pages/Register";
import System from "../pages/System";
import NotFund from "../pages/Error/notFund";
import Publish from "../pages/Publish";
import View from "../pages/View";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace/>,
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
        path: 'publish',
        element: <Publish/>
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
