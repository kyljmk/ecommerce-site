import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


function Orders({ orders }: any) {
  const session = useSession();
  return (
    <div>
      <Header />

      <main className="max-w-screen-xl mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>x Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4"></div>
      </main>
    </div>
  );
}

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

  const session = await getSession(context)

  if(!session){
    return {
      props:{}
    }
  }

  const docRef = doc(db, "users")
  const usersSnpshot = await getDoc(usersCol)

  const a = usersSnpshot.docs.filter(a => a.)

  // const citiesCol = collection(db, 'cities');
  // const citySnapshot = await getDocs(citiesCol);
  // const cityList = citySnapshot.docs.map(doc => doc.data());

}
