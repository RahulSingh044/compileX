import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import api from "./axiosAuth";

export const LoginUser = createAsyncThunk("/login", async (credentials) => {
  const response = await api.post("/login", credentials);
  console.log("Backend response",response.data);
  return response.data;
});

export const SignupUser = createAsyncThunk("/signup", async (payload) => {
  const response = await api.post("/signup", payload);
  return response.data;
});

export const currentUser = createAsyncThunk("/me", async (token) => {
  const response = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      cookies.remove("token");
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      cookies.set("token", action.payload.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (a) => a.type.startsWith("/") && a.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (a) => a.type.startsWith("/") && a.type.endsWith("/fulfilled"),
        (state, { payload }) => {
          state.status = "succeeded";
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
          cookies.set("token", payload.token);
        }
      )
      .addMatcher(
        (a) => a.type.startsWith("/") && a.type.endsWith("/rejected"),
        (state, { error }) => {
          state.status = "failed";
          state.error = error.message;
        }
      );
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
