import { IProduct } from "@/Types";
import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems } from "@/slices/basketSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function Checkout() {
  const items = useSelector(selectItems);
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={"https://links.papareact.com/ikj"}
            width={1020}
            height={250}
            alt={""}
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item: IProduct, i: number) => {
              return <CheckoutProduct key={i} product={item} />;
            })}
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}

export default Checkout;
