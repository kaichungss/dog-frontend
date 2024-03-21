import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login";
import Register from "../pages/Register";
import System from "../pages/System";
import NotFund from "../pages/Error/notFund";
import Publish from "../pages/Publish";
import View from "../pages/View";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
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
        element: <View/>
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
