import React, { useEffect } from "react";
import styles from "./SearchProductPage.module.css";
import { FilterArea, ProductList } from "../../../components";
import { useLocation, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { searchProduct } from "../../../redux/product/productSearchSlice";
import { Spin } from "antd";
import { MainLayout } from "../../../layouts/mainLayout";

export const SearchProductPage: React.FC = () => {
  const { keywords } = useParams();
  const location = useLocation();

  const { loading, error, productList, pagination } = useAppSelector(
    (state) => state.productSearch
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchProduct({ pageNumber: 1, pageSize: 10, keywords }));
  }, [dispatch, keywords, location]);

  const onPageChange = (pageNumber, pageSize) => {
    dispatch(searchProduct({ pageNumber, pageSize, keywords }));
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      {/* Filter */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>

      {/* Product list */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
