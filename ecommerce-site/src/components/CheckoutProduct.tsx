import { IProduct, IProductProps } from "@/Types";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";

function CheckoutProduct({ product }: IProductProps) {
  const { id, title, price, rating, description, category, image, hasPrime } =
    product;
  const [starRating] = useState<number>(Math.round(rating.rate));
  const currency = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  const dispatch = useDispatch();

  const addItemToBasket = () => {};

  return (
    <div className="grid grid-cols-5">
      <Image
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
        src={image}
        alt={""}
      />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex items-center">
          {Array(starRating)
            .fill("")
            .map((_) => {
              return <StarIcon className="h-5 text-yellow-500" />;
            })}
          <span className="font-bold ml-2">{rating.rate}</span>
          <span className="text-gray-700 ml-1">({rating.count})</span>
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>{currency.format(price)}</p>

        {hasPrime && (
          <div className="flex items-center space-x-2 ">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button">Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
