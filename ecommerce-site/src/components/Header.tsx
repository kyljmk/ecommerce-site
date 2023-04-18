import React from "react";
import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mx-2 pt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src={"https://links.papareact.com/f90"}
            width={100}
            height={50}
            style={{ objectFit: "contain" }}
            alt={""}
            className="cursor-pointer"
          />
        </div>

        <div className="hidden sm:flex items-center h-10 rounded-xl bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-xl focus:outline-none"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6">
          <div className="cursor-pointer">
            <p>Hello, Kyle Manson-Kullin</p>
            <p>Account & Lists</p>
          </div>
          <div className="cursor-pointer">
            <p>Returns</p>
            <p>& Orders</p>
          </div>
          <div className="cursor-pointer">
            <ShoppingCartIcon className="h-10" />
            <p>Basket</p>
          </div>
        </div>
      </div>

      <div></div>
    </header>
  );
}

export default Header;
