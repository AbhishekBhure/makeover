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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/face" element={<Face />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
