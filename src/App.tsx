import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { HomePage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sign-in" element={<h1>Sign In</h1>} />
          <Route path="*" element={<h1>40 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
