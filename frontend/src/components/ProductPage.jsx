import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BuyerHeader } from "../pages/buyermarket"; // Assuming header is in the marketplace file

// --- MOCK DATA ---
// In a real app, you would fetch this from an API using the ID
// I've added a 'description' field for the detail page.
const mockProducts = [
  { id: 1, name: "Jaipur Blue Pottery Vase", artisan: "Ramesh Kumar", price: 45.0, imageUrl: "/3.png", category: "Pottery", description: "A stunning, hand-painted blue pottery vase from Jaipur, known for its vibrant cobalt blue dye. Each piece is crafted from quartz powder, not clay, making it unique and fragile. Perfect as a centerpiece." },
  { id: 2, name: "Handwoven Pashmina Shawl", artisan: "Fatima Begum", price: 120.0, imageUrl: "/4.png", category: "Textiles", description: "Experience the luxurious warmth of a genuine Kashmiri Pashmina shawl. Handwoven by skilled artisans, this piece features intricate patterns and is incredibly soft to the touch. A timeless accessory." },
  { id: 3, name: "Madhubani 'Tree of Life'", artisan: "Sita Devi", price: 85.0, imageUrl: "/5.png", category: "Painting", description: "This intricate Madhubani painting depicts the 'Tree of Life,' symbolizing growth and prosperity. Hand-painted with natural dyes on handmade paper, it's a vibrant piece of Indian folk art." },
  { id: 4, name: "Terracotta Horse Statue", artisan: "Mani Selvam", price: 60.0, imageUrl: "/6.png", category: "Sculpture", description: "A rustic terracotta horse, handcrafted by artisans from Panchmura village. These statues are known for their distinct form and are often used in religious ceremonies and as home decor." },
  { id: 5, name: "Chikankari Kurta", artisan: "Aisha Khan", price: 75.0, imageUrl: "/7.png", category: "Textiles", description: "An elegant and breathable cotton kurta featuring delicate Chikankari hand-embroidery from Lucknow. The intricate white-on-white thread work offers a classic and sophisticated look." },
  { id: 6, name: "Bidriware Silver Coasters", artisan: "Irfan Husain", price: 95.0, imageUrl: "/8.png", category: "Metalwork", description: "A set of exquisite coasters made with the Bidriware craft of Karnataka. Pure silver is inlaid onto a blackened alloy of zinc and copper, creating stunning geometric and floral patterns." },
  { id: 7, name: "Warli Village Life Canvas", artisan: "Jivya Soma Mashe", price: 110.0, imageUrl: "/9.png", category: "Painting", description: "This captivating Warli painting showcases the daily life of the Warli tribe. The minimalist style, using geometric shapes, creates a powerful and rhythmic narrative on canvas." },
  { id: 8, name: "Kondapalli Wooden Toys", artisan: "Anusha Reddy", price: 35.0, imageUrl: "/10.png", category: "Woodwork", description: "A charming set of wooden toys from Kondapalli, Andhra Pradesh. Carved from soft Tella Poniki wood and painted with natural vegetable dyes, these toys are both beautiful and eco-friendly." },
];

const HeartIcon = () => (
    <svg className="w-6 h-6 text-gray-600 group-hover:text-google-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>
);


const ProductPage = () => {
  // 1. Get the URL parameter 'id'
  const { id } = useParams();
  
  // 2. Find the product in our mock data array
  // We use parseInt because the ID from the URL is a string
  const product = mockProducts.find(p => p.id === parseInt(id));

  // 3. Handle the case where the product isn't found
  if (!product) {
    return (
      <div className="font-sans bg-gray-50 min-h-screen">
        <BuyerHeader />
        <div className="pt-32 text-center container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">Product Not Found!</h2>
          <p className="text-gray-600 mt-2">We couldn't find the item you're looking for.</p>
          <Link to="/" className="mt-6 inline-block bg-google-blue text-white font-semibold px-6 py-2 rounded-lg hover:bg-google-red transition-colors">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // 4. Render the product details if found
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <BuyerHeader />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Product Image */}
            <div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full rounded-2xl shadow-xl object-cover aspect-square" 
              />
            </div>

            {/* Right Side: Product Details */}
            <div className="flex flex-col space-y-5">
              <p className="font-semibold text-google-blue tracking-wide">{product.category.toUpperCase()}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500">
                by {' '}
                <Link 
                  to={`/seller/${encodeURIComponent(product.artisan)}`} 
                  className="font-medium text-gray-700 hover:text-google-blue hover:underline"
                >
                  {product.artisan}
                </Link>
              </p>
              
              <p className="text-4xl font-bold text-google-green">${product.price.toFixed(2)}</p>
              
              <div className="border-t pt-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">About this item</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* --- ACTION BUTTONS --- */}
              <div className="flex flex-col space-y-4 pt-4">
                {/* Primary Actions: Cart & Wishlist */}
                <div className="flex items-center space-x-4">
                  <button className="flex-grow bg-google-blue text-white font-bold py-4 px-6 rounded-xl hover:bg-google-red transition-colors duration-300 text-lg shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                  <button className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-google-red transition-colors group">
                    <HeartIcon />
                  </button>
                </div>

                {/* Secondary Action: Invest */}
                <button className="w-full bg-google-green text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-colors duration-300 text-lg shadow-md hover:shadow-lg">
                  Invest in this business
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;