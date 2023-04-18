import React from "react";
import { IProductFeedProps, IProductProps } from "@/Types";
import Product from "./Product";

function ProductFeed({ products }: IProductFeedProps) {
  const productElements = products.map((product) => {
    return <Product product={product} />;
  });
  return <div>{productElements}</div>;
}

export default ProductFeed;
