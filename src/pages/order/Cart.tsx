import { Affix, Col, Row } from "antd";
import React from "react";
import { MainLayout } from "../../layouts/mainLayout";
import styles from "./Cart.module.css";
import { ProductList, PaymentCard } from "../../components";

export const Cart: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
