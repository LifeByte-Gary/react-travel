import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CartState {
  loading: boolean;
  error: any;
  items: any[];
}

const initialState: CartState = {
  loading: true,
  error: null,
  items: [],
};

export const getCartItems = createAsyncThunk(
  "cart/getCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );

    return data.shoppingCartItems;
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (params: { jwt: string; touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: params.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      }
    );

    return data.shoppingCartItems;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (params: { jwt: string; itemIds: number[] }, thunkAPI) => {
    console.log("clear");

    return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${params.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bearer ${params.jwt}`,
        },
      }
    );
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getCartItems reducers
    builder
      .addCase(getCartItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // clearCart reducers
    builder
      .addCase(addCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // clearCartItems reducers
    builder
      .addCase(clearCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
