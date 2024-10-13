import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-primary p-4 flex items-center justify-between border-b-2 border-b-secondary uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center ml-10">
      <Image src="/logo3.png" alt="Logo" width={70} height={100} />
      </div>
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
  <Link 
    href="/" 
    className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded"
  >
    Homepage
  </Link>
  <Link 
    href="/shop" 
    className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded"
  >
    SHOP
  </Link>
  <Link 
    href="/contact" 
    className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded"
  >
    Contact
  </Link>
  <Link 
    href="/Exercises" 
    className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded"
  >
    Exercises
  </Link>
  <CartIcon />

  <Link 
    href="/Chat" 
    className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded"
  >
    Chat
  </Link>
</div>

      
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
       
        {!user ? (
          <Link href="/login" className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded">Login</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
        <Link href="/Register" className="text-gray-800 hover:bg-primary hover:text-white px-4 py-2 rounded">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
