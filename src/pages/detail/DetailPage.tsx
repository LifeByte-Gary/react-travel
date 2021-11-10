import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage: React.FC = (props) => {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
};
