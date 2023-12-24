import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Face from "./pages/Face";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import Dashboard from "./pages/Admin/dashboard";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route exact path="user" element={<Profile />} />
          </Route>
          <Route path="/profile" element={<AdminRoute />}>
            <Route exact path="admin" element={<Dashboard />} />
          </Route>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/face" element={<Face />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
