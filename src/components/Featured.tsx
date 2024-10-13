'use client'
import { featuredProducts } from "@/data";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { fetchData, ProductOptions } from "@/utils/fetchData";
const TOKEN_KEY = 'abcd123';


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | ArrayBuffer; // Use ArrayBuffer for base64 image data
  quantity: number;
  category: string;
}


const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tokenResponse = localStorage.getItem(TOKEN_KEY);
        if (!tokenResponse) {
          console.error('Token not found in localStorage.');
          return;
        }
        
        const productData: Product[] = await fetchData('http://192.168.56.1:3007/fyp/store/products', ProductOptions(tokenResponse));
       
        
        setLoading(false); 
        if (productData) {
          const decodedItems = productData.map((item: any) => ({
            ...item,
            imageUrl: `data:image/jpeg;base64,${item.imageUrl}`, // Assuming the image is JPEG format
          }));
          setProducts(decodedItems);
          console.log(products)
          
        }
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.imageUrl && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.imageUrl} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.name}</h1>
              <p className="p-4 2xl:p-8">{item.description}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
