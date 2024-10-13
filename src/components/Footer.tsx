import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-auto md:h-24 p-4 lg:px-20 xl:px-40 text-primary flex flex-col md:flex-row items-center justify-between">
      <Link href="/" className="font-bold text-xl md:mb-0 mb-4">WorkFit</Link>
      
      <div className="text-center md:flex-1 md:mb-0 mb-4">
        <p className="font-semibold">Designed by A&H company</p>
        <p>Phone: 70043174</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="https://instagram.com" target="_blank">
            <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
          </Link>
          <Link href="https://tiktok.com" target="_blank">
            <Image src="/tiktok.webp" alt="TikTok" width={36} height={36} />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image src="/youtube.png" alt="YouTube" width={24} height={24} />
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <Image src="/logo2.png" alt="Logo" width={90} height={180} />
      </div>
    </div>
  );
};

export default Footer;
