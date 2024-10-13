import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
;
type Props = {
  price: number;
  id: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  const TOKEN_KEY = 'abcd123';

  const addToCart = async () => {
    try {
      const tokenResponse = await localStorage.getItem(TOKEN_KEY);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenResponse}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1, // Default quantity
        }),
      };

      const response = await fetch('http://192.168.56.1:3007/fyp/store/cart', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      console.log('Product added to cart:', id);
      window.location.href='/cart'
      setShowAlert(true); // Show alert on successful addition to cart
      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);

    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error, show user feedback, etc.
    }
  };

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      {/* ALERT */}
      {showAlert && (
        <div className="bg-green-200 border-l-4 border-green-500 text-green-900 p-4">
          Product added to cart successfully!
        </div>
      )}

      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-secondary">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-secondary text-white p-3 ring-1 ring-secondary" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
