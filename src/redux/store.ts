import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { actionLog } from "./middlewares/actionLog";
import { languageSlice } from "./language/languageSlice";
import { productDetailSlice } from "./product/productDetailSlice";
import { recommendedProductsSlice } from "./product/recommendedProductsSlice";
import { productSearchSlice } from "./product/productSearchSlice";
import { AuthSlice } from "./auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  language: languageSlice.reducer,
  recommendedProducts: recommendedProductsSlice.reducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  auth: AuthSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionLog),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
