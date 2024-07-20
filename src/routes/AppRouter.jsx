import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginFrom from '../layout/LoginFrom';
import RegisterFrom from '../layout/RegisterFrom';
import useAuth from '../hooks/useAuth';
import Header from '../layout/Header';
import Product from '../layout/Product';
import Addproduct from '../layout/Addproduct';
import ListProduct from '../layout/ListProduct'
import  Cart  from '../layout/Cart'
import Payment from '../layout/payment';


const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginFrom/> },
      { path: "/register", element: <RegisterFrom/>},
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [

      { index:true, element: <Product/>},
      {path:'/order', element: <p>order</p>},
      { path: '/cart', element: <Cart/>},
      { path: '/payment', element: <Payment/>}
      // { index: true, element: <UserHome /> },
      // { path: "/new", element: <NewTodoForm /> },
      // { path: "/Booking", element: <Booking /> },
      
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),children: [
      { index: true, element: <Addproduct/> },
      { path: '/show', element: <p>ShowOrder</p>},
      { path: '/list', element: <ListProduct/>}
      
    ],
  }
])

export default function AppRouter() {
    const { user } = useAuth();
    // console.log(user?.role)
    // const finalRouter = user?.id ? userRouter : guestRouter
    const finalRouter = user?.id ? (user.role ==="ADMIN" ? adminRouter: userRouter) : guestRouter
    return <RouterProvider router={finalRouter} />;
  }