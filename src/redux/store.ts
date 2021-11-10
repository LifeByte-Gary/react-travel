import { createStore, combineReducers, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendedProductsReducer from "./recommendedProducts/recommendedProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendedProductsReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, actionLog)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
