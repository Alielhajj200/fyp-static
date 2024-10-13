"use client";
import Image from "next/image";
import Price from "@/components/Price";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchData, ProductOptions } from "@/utils/fetchData";

const TOKEN_KEY = 'abcd123';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | ArrayBuffer; // Assuming this is where the binary data is stored
  quantity: number;
  category: string;
}

const SingleProductPage = () => {
 
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const tokenResponse = localStorage.getItem(TOKEN_KEY);
        if (!tokenResponse) {
          console.error('Token not found in localStorage.');
          return;
        }
        
        const productData: Product = await fetchData(`http://192.168.56.1:3007/fyp/store/products/${id}`, ProductOptions(tokenResponse));
        
        if (productData) {
          // Decode the imageUrl if it's base64 encoded (assuming it's JPEG format)
          const decodedProduct = {
            ...productData,
            imageUrl: `data:image/jpeg;base64,${productData.imageUrl}`,
          };

          setProduct(decodedProduct);
          setLoading(false);
        } else {
          console.error('Product not found.');
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>; // Handle case where product is not fetched
  }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-primary md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {product.imageUrl && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-contain"
            layout="fill"
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{product.name}</h1>
        <p>{product.description}</p>
        <Price price={product.price} id={product._id} />
      </div>
    </div>
  );
};

export default SingleProductPage;
