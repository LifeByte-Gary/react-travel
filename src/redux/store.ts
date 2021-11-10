import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recommendedProductsReducer from "./recommendedProducts/recommendedProductsReducer";
import { actionLog } from "./middlewares/actionLog";
import { languageSlice } from "./language/languageSlice";
import { productDetailSlice } from "./product/productDetailSlice";

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendProducts: recommendedProductsReducer,
  productDetail: productDetailSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
