import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface recommendedProductsState {
  loading: boolean;
  currentRequestId: undefined | string;
  error: null | SerializedError;
  productList: any;
}

const initialState: recommendedProductsState = {
  loading: true,
  currentRequestId: undefined,
  error: null,
  productList: [],
};

export const fetchRecommendedProducts = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("recommendedProducts/fetchRecommendedProducts", async (_: void, thunkAPI) => {
  const { currentRequestId } = thunkAPI.getState().recommendedProducts;

  if (!thunkAPI.requestId && thunkAPI.requestId !== currentRequestId) {
    console.log("error");

    return;
  }

  const { data } = await axios.get(
    "http://123.56.149.216:8080/api/productCollections"
  );

  return data;
});

export const recommendedProductsSlice = createSlice({
  name: "recommendedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedProducts.pending, (state, action) => {
        if (state.loading) {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = null;
          state.productList = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchRecommendedProducts.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});
