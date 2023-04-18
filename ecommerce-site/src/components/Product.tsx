import { IProduct, IProductProps } from "@/Types";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

function Product({ product }: IProductProps) {
  const { id, title, description, image, category, rating } = product;
  const [starRating] = useState<number>(Math.round(rating.rate));
  const [hasPrime] = useState<boolean>(Math.random() < 0.5);

  return (
    <div>
      <p>{category}</p>
      <Image
        src={image}
        alt=""
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
      />
      <h4>{title}</h4>
      <div className="flex">
        {Array(starRating)
          .fill("")
          .map((_, i) => {
            return <StarIcon className="h-5" />;
          })}
        <span>{rating.rate}</span>
        <span>({rating.count})</span>
      </div>

      <p>{description}</p>
    </div>
  );
}

export default Product;
