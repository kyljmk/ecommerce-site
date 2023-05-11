import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import { collection, getDoc } from "firebase/firestore";

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

// export async function getServerSideProps(context: any) {
//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//   const session = await getSession(context)

//   if(!session){
//     return {
//       props:{}
//     }
//   }

//   // const q = query(collection(db, "users"), where(doc, "==", "me"))
//   // const usersSnpshot = (await getDocs(q)).query(doc("r"))
// //@ts-ignore
//   const docRef = await doc(db, "users", session.user?.email)

//   const docSnap = await getDoc(docRef).listCollections()

// const orders = await Promise.all(
//   docSnap
// )

// const orders1 = await db.collection("users")

// }
