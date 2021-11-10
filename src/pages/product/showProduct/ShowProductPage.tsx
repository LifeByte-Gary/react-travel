import React from "react";
import { useParams } from "react-router-dom";

export const ShowProductPage: React.FC = () => {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
};
