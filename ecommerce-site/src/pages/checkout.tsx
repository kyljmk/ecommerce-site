import { IProduct } from "@/Types";
import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems, selectTotal } from "@/slices/basketSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useScrollBlock } from "@/hooks/useScrollBlock";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();
  const [displayMessage, setDisplayMessage] = useState<boolean>(true);

  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    if (items.length > 0) {
      blockScroll();
    }
  }, []);

  const currency = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session?.user?.email,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="relative">
      {displayMessage && items.length > 0 && (
        <div className="absolute w-screen h-screen bg-black flex items-center justify-center">
          <div className="bg-white h-auto p-4 w-[70%] z-10 border-yellow-500 space-y-4 border-4 rounded-2xl flex flex-col items-center justify-center font-bold text-center">
            <p className="text-xl">
              This website is for portfolio purposes only!
            </p>
            <p>
              If you click on "Proceed to checkout" you will be taken to a
              Stripe Checkout page which is merely for techincal demonstration.{" "}
            </p>
            <p>
              If you enter your card details and pay, I will receive the money
              but you will not receive any products.{" "}
            </p>
            <p>You have been warned!</p>
            <div
              onClick={() => {
                setDisplayMessage(false);
                allowScroll();
              }}
              className="bg-yellow-500 cursor-pointer rounded-3xl font-bold py-1 px-2"
            >
              Okay
            </div>
          </div>
        </div>
      )}
      <div
        className={`bg-gray-100 ${
          displayMessage && items.length > 0 && "opacity-40"
        }`}
      >
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

          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items):
                  <span className="font-bold ml-2">
                    {currency.format(total)}
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`mt-2 ${!session ? "disabledButton" : "button"}`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
