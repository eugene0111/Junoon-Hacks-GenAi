// src/components/CartPage.js

import React from "react";
import { Link } from "react-router-dom";
import { BuyerHeader } from "../pages/buyermarket"; // Assuming you export BuyerHeader

export default function CartPage() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* You can reuse the header here */}
      <BuyerHeader />

      <main className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Your Shopping Cart
          </h1>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any handcrafted items yet.
            </p>
            <Link
              to="/" // Link back to the main marketplace page
              className="inline-block bg-google-blue text-white font-semibold px-8 py-3 rounded-lg hover:bg-google-red transition-colors duration-300"
            >
              Start Exploring
            </Link>
          </div>

          {/* TODO: When you have cart items, you would map over them here.
            For example:
            <div className="mt-8">
              {cartItems.map(item => <CartItem key={item.id} item={item} />)}
            </div> 
          */}
        </div>
      </main>
    </div>
  );
}