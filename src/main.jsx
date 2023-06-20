import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Shop from './components/Shop/Shop'
import Home from './components/Layout/Home'
import Orders from './components/Orders/Orders'
import Inventory from './components/Invrntory/Inventory'
import Login from './components/Login/Login'
import cartProductsLoader from './Loders/cartProducts'
import CheckOut from './components/CheckOut/CheckOut'
import SignUp from './components/signup/SignUp'
import AuthProvider from './components/providers/AuthProvider'
import PrivetRouts from './routes/PrivetRouts'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: cartProductsLoader,
      },
      {
        path: "inventory",
        element: (
          <PrivetRouts>
            <Inventory></Inventory>
          </PrivetRouts>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivetRouts>
            <CheckOut></CheckOut>
          </PrivetRouts>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
