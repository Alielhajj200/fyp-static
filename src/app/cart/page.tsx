"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | ArrayBuffer; // Use ArrayBuffer for base64 image data
  quantity: number;
  category: string;
}

const CartPage = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const TOKEN_KEY = "abcd123";

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const tokenResponse = await localStorage.getItem(TOKEN_KEY);
        if (tokenResponse) {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenResponse}`,
            },
          };
  
          const response = await fetch(
            "http://192.168.56.1:3007/fyp/store/usercart",
            requestOptions
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const responseData = await response.json();
          if (responseData.items) {
            const decodedItems = responseData.items.map((item:any) => ({
              ...item,
              product: {
                ...item.product,
                imageUrl: `data:image/jpeg;base64,${item.product.imageUrl}`, // Assuming the image is JPEG format
              },
            }));
            setCartItems(decodedItems);
            console.log("cart items ",cartItems)
            calculateSubtotal(decodedItems);
          }
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  
    fetchCartItems();
  }, []);
  

  const calculateSubtotal = (items:any) => {
    const total = items.reduce(
      (acc:any, item:any) => acc + item.product.price * item.quantity,
      0
    );
    setSubtotal(total.toFixed(2));
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Perform any additional actions here, such as sending data to backend
    console.log("Form submitted with data:", { street, city, state, zip });
  };

  const isFormValid = () => {
    return street.trim() !== "" && city.trim() !== "" && state.trim() !== "" && zip.trim() !== "";
  };

  const removeFromCart = (itemId:any) => {
    // Implement remove item functionality
    console.log("Removing item:", itemId);
  };




  const handleCheckout = async () => {
    try {
      const requestBody = {
        street,
        city,
        state,
        zip
      };

      const tokenResponse = await localStorage.getItem(TOKEN_KEY);
      
      const response = await axios.post('http://192.168.56.1:3007/fyp/store/checkout', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenResponse}`, 
        },
      });

      if (response.status === 201) {
        console.log('Checkout successful:', response.data.url);
        window.location.href = response.data.url; // Redirect to the received URL
      } else {
        console.error('Checkout failed:', response.statusText);
        // Handle checkout failure
      }

    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error, show user feedback, etc.
    }
  };
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-primary lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="p-4 overflow-scroll lg:h-full lg:w-full xl:px-10 2xl:px-20 border-2 border-gray-300 rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
  <div className="overflow-x-auto">
    <table className="w-full bg-white border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 text-left">Item</th>
          <th className="py-3 px-4 text-left">Details</th>
          <th className="py-3 px-4 text-center">Price</th>
          <th className="py-3 px-4 text-center">Quantity</th>
          
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.product._id} className="border-b border-gray-200">
            {/* IMAGE */}
            <td className="py-4 px-4">
              <div className="flex items-center">
                <div className="relative w-20 h-20">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-2">
                  <h1 className="text-lg font-bold">{item.product.name}</h1>
                  <p className="text-sm">SKU: {item.product.sku}</p>
                </div>
              </div>
            </td>
            {/* DETAILS */}
            <td className="py-4 px-4">
              <p className="text-sm">Quantity: {item.quantity}</p>
            </td>
            {/* PRICE */}
            <td className="py-4 px-4 text-center">
              <span className="font-bold">${item.product.price.toFixed(2)}</span>
            </td>
            {/* QUANTITY CONTROLS */}
            <td className="py-4 px-4 text-center">
              <div className="flex items-center justify-center">
                <button
                  className="p-2 border border-primary rounded w-8"
                  onClick={() => console.log("Decrease quantity")}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="p-2 border border-primary rounded w-8"
                  onClick={() => console.log("Increase quantity")}
                >
                  +
                </button>
              </div>
            </td>
           
            {/* REMOVE BUTTON */}
            <td className="py-4 px-4 text-center">
              <button
                className="text-primary hover:text-red-700"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        {/* Form */}
        
          {/* Street */}
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="p-2 border rounded-md"
          />
          {/* City */}
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border rounded-md"
          />
          {/* State */}
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-2 border rounded-md"
          />
          {/* Zip */}
          <input
            type="text"
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="p-2 border rounded-md"
          />
          {/* Checkout Button */}
          <button
         onClick={handleCheckout}
            className={`bg-primary text-white p-3 rounded-md w-1/2 self-end ${
              !isFormValid() && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid()}
          >
            CHECKOUT
          </button>
        

        {/* Total Section */}
        <div>
          <div className="flex justify-between">
            <span className="">Subtotal ({cartItems.length} items)</span>
            <span className="">${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="">Service Cost</span>
            <span className="">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="">Delivery Cost</span>
            <span className="text-green-500">FREE!</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="">TOTAL (INCL. VAT)</span>
            <span className="font-bold">${subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
