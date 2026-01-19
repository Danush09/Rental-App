import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import AllCars from "./pages/AllCars";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import AllBookings from "./pages/AllBookings";
import BookingDetails from "./pages/BookingDetails";
import Login from "../../client/src/pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData, loadToken } from "./store/features/authSlice";
function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadToken());
    dispatch(getUserData());
    //navigate("/login")
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <Routes>
        {!token && !user?.isAdmin ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/all-cars" element={<AllCars />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/edit-car/:id" element={<EditCar />} />
            <Route path="/all-bookings" element={<AllBookings />} />
            <Route path="/booking-details/:id" element={<BookingDetails />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
