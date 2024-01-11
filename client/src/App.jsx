import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import Dashboard from "./pages/Admin/dashboard";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/auth/authSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { fetchLoggedInUserInfoAsync } from "./features/user/userSlice";
import AdminProductDetailPage from "./pages/Admin/AdminProductDetailPage";
import AdminProductFromPage from "./pages/Admin/AdminProductFromPage";
import AdminUpdateProductPage from "./pages/Admin/AdminUpdateProductPage";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";
import UserUpdate from "./features/user/components/UserUpdate";
import StripeCheckout from "./pages/Payment/StripeCheckout";
import BreadCrumbs from "./components/BreadCrumbs";
import ProductList from "./features/product-list/components/ProductList";
import Face from "./pages/Face";
import Eyes from "./pages/Eyes";
import Lips from "./pages/Lips";
import Nails from "./pages/Nails";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const id = user?.user?._id;
  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByUserIdAsync(id));
      // dispatch(fetchLoggedInUserInfoAsync(id));
    }
  }, [dispatch, user, id]);

  return (
    <BrowserRouter>
      <Navbar />

      <Layout>
        {/* <BreadCrumbs /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product-listing" element={<ProductList />} />
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route exact path="user" element={<UserProfilePage />} />
            <Route path="user/orders" element={<UserOrdersPage />} />
            <Route path="user/update/:id" element={<UserUpdate />} />
          </Route>
          {/* AdminProtected Routes */}
          <Route path="/profile" element={<AdminRoute />}>
            <Route exact path="admin" element={<Dashboard />} />
            <Route
              exact
              path="admin/product-detail/:id"
              element={<AdminProductDetailPage />}
            />
            <Route
              path="admin/product-form"
              element={<AdminProductFromPage />}
            />
            <Route
              path="admin/product-form/edit/:id"
              element={<AdminUpdateProductPage />}
            />
            <Route path="admin/orders" element={<AdminOrdersPage />} />
          </Route>
          {/* AdminProtected Routes End*/}

          <Route exact path="/about" element={<About />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route
              exact
              path="/product-detail/:id"
              element={<ProductDetailPage />}
            />
            <Route exact path="/cart" element={<CartPage />} />
            <Route exact path="/checkout" element={<CheckOut />} />
            <Route
              exact
              path="/stripe-checkout/"
              element={<StripeCheckout />}
            />
            <Route
              exact
              path="/order-success/:id"
              element={<OrderSuccessPage />}
            />
          </Route>
          <Route exact path="/face" element={<Face />} />
          <Route exact path="/eyes" element={<Eyes />} />
          <Route exact path="/lips" element={<Lips />} />
          <Route exact path="/nails" element={<Nails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
