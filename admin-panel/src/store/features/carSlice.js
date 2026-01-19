import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

//add cars
export const addCar = createAsyncThunk(
  "car/addCar",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/car/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in add car from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

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

//car update
export const updateCar = createAsyncThunk(
  "car/updateCar",
  async ({ id, formData }, thunkApi) => {
    try {
      const res = await API.patch(`/car/update-car/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

//car delete
export const deletCar = createAsyncThunk(
  "car/deleteCar",
  async (id, thunkApi) => {
    try {
      const res = await API.delete(`/car/delete-car/${id}`);
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
      // add car
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCar.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // update car
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCar.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // DELETE car
      .addCase(deletCar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletCar.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deletCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default carSlice.reducer;
