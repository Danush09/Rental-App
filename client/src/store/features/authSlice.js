import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

//register
export const register = createAsyncThunk(
  "auth/userRegister",
  async ({ uname, email, password, phone }, thunkApi) => {
    try {
      const res = await API.post("/user/register", {
        uname,
        email,
        password,
        phone,
      });
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in register user from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//login
export const login = createAsyncThunk(
  "auth/userlogin",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("appData", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in login from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//UPDATE USER
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, updatedUser }, thunkApi) => {
    try {
      const res = await API.patch(`/user/update/${id}`, updatedUser);
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in update user from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);
// USER bookings
export const getUserBookings = createAsyncThunk(
  "auth/gteUserBooking",
  async ({ id }, thunkApi) => {
    try {
      const res = await API.get(`/booking/user-booking/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error.message?.data?.message ||
        error.message ||
        "error in  user bookings from redux";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//TOKEN
export const loadToken = createAsyncThunk("auth/loadToken", () => {
  const localData = localStorage.getItem("appData");
  const appData = JSON.parse(localData);

  return appData?.token;
});

//get user data
export const getUserData = createAsyncThunk("auth/getUser", () => {
  const localData = localStorage.getItem("appData");
  const appData = JSON.parse(localData);
  return appData?.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    user: null,
    token: null,
    error: null,
    bookings: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        // state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false,
          state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      //userData
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      //load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      // update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // get user booking
      .addCase(getUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookings = action.payload.booking;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
