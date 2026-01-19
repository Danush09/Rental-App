import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

//get all booking
export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/booking/get-all");
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in get booking  from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//boooking details
export const getBookingDetails = createAsyncThunk(
  "booking/getBookingDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/booking/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in get booking details from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//car booking stats
export const updateStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status }, thunkApi) => {
    try {
      const res = await API.patch(`/booking/update-status/${id}`, { status });
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in get car from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    success: false,
    bookings: null,
    booking: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.bookings = action.payload.booking;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // get  bookings details
      .addCase(getBookingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.booking = action.payload.booking;
      })
      .addCase(getBookingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // update booking statuss
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default bookingSlice.reducer;
