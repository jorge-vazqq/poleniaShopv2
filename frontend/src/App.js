import React, { useEffect} from 'react';
import { Container } from "react-bootstrap";
import { Outlet, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import PromoListScreen from './screens/admin/PromoListScreen';
import PromoEditScreen from './screens/admin/PromoEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import FaqScreen from './screens/FaqScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './assets/styles/bootstrap.custom.css'; // Import Bootstrap styles FIRST
import './styles/globalStyles.css'


const App = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/background.png), linear-gradient(to bottom, #fffbf4, #ddc7ff) `;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<> {/* This is where the layout goes */}
        <Header />
        <main className="py-3">
          <Container>
            <Outlet /> {/* Outlet for the current route's component */}
          </Container>
        </main>
        <Footer />
        <ToastContainer />
      </>}>
      
      
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/about" element={<AboutUsScreen />} />
        <Route path="/faq" element={<FaqScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
          <Route path="/admin/promolist" element={<PromoListScreen />} />
          <Route path="/admin/promo/:id/edit" element={<PromoEditScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;