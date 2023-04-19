import { IProduct, IProductProps } from "@/Types";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

function Product({ product }: IProductProps) {
  const { id, title, description, image, category, rating, price } = product;
  const [starRating] = useState<number>(Math.round(rating.rate));
  const [hasPrime] = useState<boolean>(Math.random() < 0.5);

  const currency = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-500">
        {category}
      </p>
      <Image
        src={image}
        alt=""
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
        className="self-center"
      />
      <h4 className="my-3">{title}</h4>

      <div className="flex items-center">
        {Array(starRating)
          .fill("")
          .map((_) => {
            return <StarIcon className="h-5 text-yellow-500" />;
          })}
        <span className="font-bold ml-2">{rating.rate}</span>
        <span className="text-gray-700 ml-1">({rating.count})</span>
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <p className="mb-5">{currency.format(price)}</p>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;
