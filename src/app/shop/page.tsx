"use client";
import Image from "next/image";
import { fetchData, ProductOptions } from "@/utils/fetchData";
import { useEffect, useState } from "react";

const TOKEN_KEY = 'abcd123';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | ArrayBuffer;
  quantity: number;
  category: string;
}

interface Categories {
  _id: string;
  name: string;
}

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const tokenResponse = localStorage.getItem(TOKEN_KEY);
        if (!tokenResponse) {
          console.error('Token not found in localStorage.');
          return;
        }

        const productData: Product[] = await fetchData(
          'http://192.168.56.1:3007/fyp/store/products',
          ProductOptions(tokenResponse)
        );

        const categoriesData: Categories[] = await fetchData(
          'http://192.168.56.1:3007/fyp/store/categories',
          ProductOptions(tokenResponse)
        );
        setCategories(categoriesData);
        setLoading(false);
        if (productData) {
          const decodedItems = productData.map((item: any) => ({
            ...item,
            imageUrl: `data:image/jpeg;base64,${item.imageUrl}`, // Assuming the image is JPEG format
          }));
          setProducts(decodedItems);
          setFilteredProducts(decodedItems); // Initially display all products
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = () => {
    const results = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory)
      );
    });
    setFilteredProducts(results);
  };

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === "") {
      setFilteredProducts(products);
    } else {
      try {
        const tokenResponse = localStorage.getItem(TOKEN_KEY);
        if (!tokenResponse) {
          console.error('Token not found in localStorage.');
          return;
        }

        const categoryProducts: Product[] = await fetchData(
          `http://192.168.56.1:3007/fyp/store/products/category/${categoryId}`,
          ProductOptions(tokenResponse)
        );

        if (categoryProducts) {
          const decodedItems = categoryProducts.map((item: any) => ({
            ...item,
            imageUrl: `data:image/jpeg;base64,${item.imageUrl}`,
          }));
          setFilteredProducts(decodedItems);
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    }
  };

  const handleProductClick = (id: string) => {
    window.location.href = `/product/${id}`;
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 shadow-md rounded-lg">
        <div className="flex w-full sm:w-2/3 max-w-md mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 border border-gray-300 rounded-l-lg w-full shadow-sm focus:ring focus:ring-primary"
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white p-3 rounded-r-lg hover:bg-primary-dark"
          >
            Search
          </button>
        </div>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-3 border border-gray-300 rounded-lg sm:ml-4 w-full sm:w-1/4 shadow-sm focus:ring focus:ring-primary"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap text-primary">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item._id}
              className="w-full sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50 cursor-pointer"
            >
              <div
                className="w-full h-[60vh] border-r-2 border-b-2 border-primary flex flex-col justify-between"
                onClick={() => handleProductClick(item._id)}
              >
                {item.imageUrl && (
                  <div className="relative h-[80%]">
                    <Image
                      src={item.imageUrl as string}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between font-bold">
                  <h1 className="text-2xl uppercase p-2">{item.name}</h1>
                  <h2 className="text-xl">${item.price}</h2>
                  <button className="uppercase bg-primary text-white p-2 rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-xl font-semibold p-4">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
