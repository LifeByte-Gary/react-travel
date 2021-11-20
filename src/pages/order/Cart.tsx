import { Affix, Col, Row } from "antd";
import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import styles from "./Cart.module.css";
import { ProductList, PaymentCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/product/cartSlice";

export const Cart: React.FC = () => {
  const loading = useAppSelector((state) => state.cart.loading);
  const cartItems = useAppSelector((state) => state.cart.items);
  const jwt = useAppSelector((state) => state.auth.token) as string;

  const dispatch = useAppDispatch();

  // Render
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {<ProductList data={cartItems.map((s) => s.touristRoute)} />}
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              {
                <PaymentCard
                  loading={loading}
                  originalPrice={cartItems
                    .map((s) => s.originalPrice)
                    .reduce((a, b) => a + b, 0)}
                  price={cartItems
                    .map(
                      (s) =>
                        s.originalPrice *
                        (s.discountPresent ? s.discountPresent : 1)
                    )
                    .reduce((a, b) => a + b, 0)}
                  onCheckout={() => {}}
                  onShoppingCartClear={() => {
                    dispatch(
                      clearCart({ jwt, itemIds: cartItems.map((s) => s.id) })
                    );
                  }}
                />
              }
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
