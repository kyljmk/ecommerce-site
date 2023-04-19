import React from "react";
import { IProductFeedProps, IProductProps } from "@/Types";
import Product from "./Product";

function ProductFeed({ products }: IProductFeedProps) {
  const firstProductElements = products.slice(0, 4).map((product) => {
    return <Product product={product} />;
  });
  const middleProductElements = products.slice(4, 5).map((product) => {
    return <Product product={product} />;
  });
  const remainingProductElements = products
    .slice(5, products.length)
    .map((product) => {
      return <Product product={product} />;
    });
  return (
    <div className="grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:-mt-36 lg:-mt-52">
      {firstProductElements}
      <img
        className="sm:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />
      <div className="sm:col-span-2">{middleProductElements}</div>
      {remainingProductElements}
    </div>
  );
}

export default ProductFeed;
