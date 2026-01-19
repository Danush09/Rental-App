
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

//get all cars
export const getAllCars = createAsyncThunk(
  "car/getAllCars",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/car/get-all");
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

//car details
export const getCarDetails = createAsyncThunk(
  "car/getCarDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/car/${id}`);
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

//booking car
export const carBooking = createAsyncThunk(
  "car/booking",
  async (data, thunkApi) => {
    try {
      const res = await API.post("/booking/create", data);
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

const carSlice = createSlice({
  name: "car",
  initialState: {
    loading: false,
    success: false,
    cars: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all cars
      .addCase(getAllCars.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cars = action.payload.cars;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // get car details
      .addCase(getCarDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cars = action.payload.cars;
      })
      .addCase(getCarDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // car booking
      .addCase(carBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(carBooking.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(carBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default carSlice.reducer;


