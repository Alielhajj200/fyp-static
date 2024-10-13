import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  return (
    <Link href="/cart" className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded">
     {/*<div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
  </div>*/}
      <span>Cart</span>
    </Link>
  );
};

export default CartIcon;
