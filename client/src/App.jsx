import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthRegister from "./pages/auth/register.jsx";

import NotFound from "./pages/not-found/index.jsx";
import UnAuthPage from './pages/unauth-page/index.jsx';

import AdminLayout from "./components/admin-view/layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminOrders from "./pages/admin-view/orders.jsx";
import AdminProducts from "./pages/admin-view/products.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";

import ShoppingLayout from "./components/shopping-view/layout.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import CheckAuth from "./components/common/check-auth.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";

import { Skeleton } from "./components/ui/skeleton.jsx";
import PaypalReturnPage from "./pages/shopping-view/paypal-return.jsx";
import PaymentSuccessPage from "./pages/shopping-view/payment-success.jsx";
import SearchProducts from "./pages/shopping-view/search.jsx";



function App() {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-auto h-auto rounded-full" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Common component */}
      {/* <h1>Header Component</h1> */}

      <Routes>

        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        } />

        {/* Auth routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping routes */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Route for Page-Not-Found */}
        <Route path="*" element={<NotFound />} />

        {/* Route for Un-Auth Page */}
        <Route path="/unauth-page" element={<UnAuthPage />} />

      </Routes>

    </div>
  );
}

export default App;
