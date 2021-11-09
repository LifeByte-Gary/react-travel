import { createStore, combineReducers } from "redux";
import languageReducer from "./language/languageReducer";
import recommendedProductsReducer from "./recommendedProducts/recommendedProductsReducer";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendedProductsReducer,
});

export const store = createStore(rootReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
