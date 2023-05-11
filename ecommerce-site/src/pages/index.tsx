import { IProduct, IProductFeedProps, IProductProps } from "@/Types";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import ProductFeed from "@/components/ProductFeed";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home({ products }: IProductFeedProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const products: IProduct[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  const session = useSession(context);

  return {
    props: {
      products,
      session,
    },
  };
}
