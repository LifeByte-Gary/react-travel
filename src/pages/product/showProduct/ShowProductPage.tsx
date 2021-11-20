import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProductDetail } from "../../../redux/product/productDetailSlice";
import {
  Spin,
  Row,
  Col,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import styles from "./ShowProductPage.module.css";
import { ProductIntro, ProductComments } from "../../../components";
import { DatePicker } from "antd";
import { commentMockData } from "./mockup";
import { MainLayout } from "../../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addCartItem } from "../../../redux/product/cartSlice";

const { RangePicker } = DatePicker;

export const ShowProductPage: React.FC = () => {
  const { id } = useParams();

  const loading = useAppSelector((state) => state.productDetail.loading);
  const error = useAppSelector((state) => state.productDetail.error);
  const product = useAppSelector((state) => state.productDetail.data);

  const jwt = useAppSelector((state) => state.auth.token) as string;

  const cartLoading = useAppSelector((state) => state.cart.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getProductDetail(id));
  }, [dispatch, id]);

  // Render
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
      {/* 产品简介 与 日期选择 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: "block" }}
              type="primary"
              danger
              loading={cartLoading}
              onClick={() => {
                dispatch(addCartItem({ jwt, touristRouteId: product.id }));
              }}
            >
              <ShoppingCartOutlined />
              Add to Cart
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 锚点菜单 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 产品特色 */}
      <div id="feature" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.features }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 费用 */}
      <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>费用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.fees }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 预订须知 */}
      <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>预定须知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{ __html: product.notes }}
          style={{ margin: 50 }}
        ></div>
      </div>
      {/* 商品评价*/}
      <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
