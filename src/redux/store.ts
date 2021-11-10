import languageReducer from "./language/languageReducer";
import recommendedProductsReducer from "./recommendedProducts/recommendedProductsReducer";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./product/productDetailSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  language: languageReducer,
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
