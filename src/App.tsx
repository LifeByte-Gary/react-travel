import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import styles from "./App.module.css";
import {
  HomePage,
  RegisterPage,
  SignInPage,
  ShowProductPage,
  SearchProductPage,
  Cart,
} from "./pages";
import { useAppSelector } from "./redux/hooks";

const PrivateOutlet = ({ isAuth }) => {
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} />
  );
};

function App() {
  const jwt = useAppSelector((state) => state.auth.token);

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
          <Route path="/" element={<PrivateOutlet isAuth={jwt} />}>
            <Route path="/cart" element={<Cart />}></Route>
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
