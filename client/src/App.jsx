import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cars from "./pages/Car/Cars";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import CarDetails from "./pages/Car/CarDetails";
import Profile from "./pages/user/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadToken } from "./store/features/authSlice";
import PaymentPage from "./pages/payment/PaymentPage";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        {!token && (
          <>
            {/* auth */}
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {token && (
          <>
             <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* cars */}
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            {/* user */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<PaymentPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;



