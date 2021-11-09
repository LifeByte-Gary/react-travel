import { createStore } from "redux";
import languageReducer from "./language/languageReducer";

export const store = createStore(languageReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
