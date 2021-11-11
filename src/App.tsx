import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import {
  HomePage,
  RegisterPage,
  SignInPage,
  ShowProductPage,
  SearchProductPage,
} from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="products">
            <Route path=":id" element={<ShowProductPage />} />
          </Route>
          <Route path="search" element={<SearchProductPage />}>
            <Route path=":keywords" element={<SearchProductPage />}></Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
