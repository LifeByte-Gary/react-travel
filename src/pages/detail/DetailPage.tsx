import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage: React.FC = (props) => {
  const params = useParams();

  return <h1>Product ID: {params.id}</h1>;
};
