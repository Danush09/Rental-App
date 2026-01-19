import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/carSlice";
import authReducer from "./features/authSlice";
import bookingReducer from "./features/bookingSlice";

export const store = configureStore({
  reducer: {
    cars: carReducer,
    auth: authReducer,
    bookings: bookingReducer,
  },
});
