import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";

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

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
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
      });
  },
});
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
