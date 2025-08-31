// src/components/SellerPage.js (or your preferred path)

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BuyerHeader } from "../pages/buyermarket"; // Adjust path if needed

// --- MOCK DATA ---
// In a real app, this would likely be imported from a shared data file.
const mockProducts = [
    { id: 1, name: "Jaipur Blue Pottery Vase", artisan: "Ramesh Kumar", price: 45.0, imageUrl: "/3.png", category: "Pottery", description: "A stunning, hand-painted blue pottery vase from Jaipur, known for its vibrant cobalt blue dye. Each piece is crafted from quartz powder, not clay, making it unique and fragile. Perfect as a centerpiece." },
    { id: 2, name: "Handwoven Pashmina Shawl", artisan: "Fatima Begum", price: 120.0, imageUrl: "/4.png", category: "Textiles", description: "Experience the luxurious warmth of a genuine Kashmiri Pashmina shawl. Handwoven by skilled artisans, this piece features intricate patterns and is incredibly soft to the touch. A timeless accessory." },
    { id: 3, name: "Madhubani 'Tree of Life'", artisan: "Sita Devi", price: 85.0, imageUrl: "/5.png", category: "Painting", description: "This intricate Madhubani painting depicts the 'Tree of Life,' symbolizing growth and prosperity. Hand-painted with natural dyes on handmade paper, it's a vibrant piece of Indian folk art." },
    { id: 4, name: "Terracotta Horse Statue", artisan: "Mani Selvam", price: 60.0, imageUrl: "/6.png", category: "Sculpture", description: "A rustic terracotta horse, handcrafted by artisans from Panchmura village. These statues are known for their distinct form and are often used in religious ceremonies and as home decor." },
    { id: 5, name: "Chikankari Kurta", artisan: "Aisha Khan", price: 75.0, imageUrl: "/7.png", category: "Textiles", description: "An elegant and breathable cotton kurta featuring delicate Chikankari hand-embroidery from Lucknow. The intricate white-on-white thread work offers a classic and sophisticated look." },
    { id: 6, name: "Bidriware Silver Coasters", artisan: "Irfan Husain", price: 95.0, imageUrl: "/8.png", category: "Metalwork", description: "A set of exquisite coasters made with the Bidriware craft of Karnataka. Pure silver is inlaid onto a blackened alloy of zinc and copper, creating stunning geometric and floral patterns." },
    { id: 7, name: "Warli Village Life Canvas", artisan: "Jivya Soma Mashe", price: 110.0, imageUrl: "/9.png", category: "Painting", description: "This captivating Warli painting showcases the daily life of the Warli tribe. The minimalist style, using geometric shapes, creates a powerful and rhythmic narrative on canvas." },
    { id: 8, name: "Kondapalli Wooden Toys", artisan: "Anusha Reddy", price: 35.0, imageUrl: "/10.png", category: "Woodwork", description: "A charming set of wooden toys from Kondapalli, Andhra Pradesh. Carved from soft Tella Poniki wood and painted with natural vegetable dyes, these toys are both beautiful and eco-friendly." },
    // Add more products from the same artisans to test the page
    { id: 9, name: "Jaipur Blue Pottery Plate", artisan: "Ramesh Kumar", price: 35.0, imageUrl: "/3.png", category: "Pottery", description: "A beautiful hand-painted dinner plate to match the vase." },
];

// A simple Product Card component for the seller's page
const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-300">
                <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.name} />
                <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-google-blue transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">by {product.artisan}</p>
                    <p className="mt-4 text-xl font-bold text-google-green">${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
};


const SellerPage = () => {
    // 1. Get the seller's name from the URL. The key 'sellerName' must match the route path.
    const { sellerName } = useParams();
    const decodedSellerName = decodeURIComponent(sellerName);

    // 2. Filter the products to find all items by this seller.
    const sellerProducts = mockProducts.filter(
        product => product.artisan === decodedSellerName
    );

    // 3. Handle case where seller has no products or doesn't exist.
    if (sellerProducts.length === 0) {
        return (
            <div className="font-sans bg-gray-50 min-h-screen">
                <BuyerHeader />
                <div className="pt-32 text-center container mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800">Seller Not Found</h2>
                    <p className="text-gray-600 mt-2">We couldn't find any products for "{decodedSellerName}".</p>
                    <Link to="/" className="mt-6 inline-block bg-google-blue text-white font-semibold px-6 py-2 rounded-lg hover:bg-google-red transition-colors">
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            <BuyerHeader />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Seller Information Header */}
                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-500">Products by</p>
                        <h1 className="text-5xl font-extrabold text-gray-900">{decodedSellerName}</h1>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sellerProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SellerPage;