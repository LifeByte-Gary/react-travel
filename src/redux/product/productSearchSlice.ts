import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
  loading: boolean;
  error: any;
  productList: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  productList: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "ProductSearch/searchProduct",
  async (
    params: {
      keywords: string | undefined;
      pageNumber: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${params.pageNumber}&pageSiz=${params.pageSize}`;

    if (params.keywords) {
      url += `&keyword=${params.keywords}`;
    }

    const response = await axios.get(url);
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
  }
);

export const productSearchSlice = createSlice({
  name: "ProductSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productList = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
