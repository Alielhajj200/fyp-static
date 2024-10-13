import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="p-4 h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)] flex items-center justify-center">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[60%]">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/social.jpg" alt="" fill className="object-cover" />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md hover:ring-4 hover:ring-secondary transition duration-100 ease-in-out">
          <Image
          src="/google.png"
          alt=""
          width={20}
          height={20}
          className="object-contain"
          />
          <span>Sign in with Google</span>
          </button>

          <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md hover:ring-4 hover:ring-primary transition duration-100 ease-in-out">
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          <p className="text-sm">
            Have a problem?<Link className="underline" href="/contact"> Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
