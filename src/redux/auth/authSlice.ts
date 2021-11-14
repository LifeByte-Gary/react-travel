import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  loading: boolean;
  error: any;
  token: string | undefined;
}

const initialState: AuthState = {
  loading: false,
  error: undefined,
  token: undefined,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (params: { email: string; password: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
      email: params.email,
      password: params.password,
    });
    return data.token;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false;
      state.error = undefined;
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.token = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
