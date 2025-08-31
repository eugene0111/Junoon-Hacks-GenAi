import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

// --- MOCK DATA ---
// In a real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    name: "Jaipur Blue Pottery Vase",
    artisan: "Ramesh Kumar",
    price: 45.0,
    imageUrl: "/3.png",
    category: "Pottery",
  },
  {
    id: 2,
    name: "Handwoven Pashmina Shawl",
    artisan: "Fatima Begum",
    price: 120.0,
    imageUrl: "/4.png",
    category: "Textiles",
  },
  {
    id: 3,
    name: "Madhubani 'Tree of Life'",
    artisan: "Sita Devi",
    price: 85.0,
    imageUrl: "/5.png",
    category: "Painting",
  },
  {
    id: 4,
    name: "Terracotta Horse Statue",
    artisan: "Mani Selvam",
    price: 60.0,
    imageUrl: "/6.png",
    category: "Sculpture",
  },
  {
    id: 5,
    name: "Chikankari Kurta",
    artisan: "Aisha Khan",
    price: 75.0,
    imageUrl: "/7.png",
    category: "Textiles",
  },
  {
    id: 6,
    name: "Bidriware Silver Coasters",
    artisan: "Irfan Husain",
    price: 95.0,
    imageUrl: "/8.png",
    category: "Metalwork",
  },
  {
    id: 7,
    name: "Warli Village Life Canvas",
    artisan: "Jivya Soma Mashe",
    price: 110.0,
    imageUrl: "/9.png",
    category: "Painting",
  },
  {
    id: 8,
    name: "Kondapalli Wooden Toys",
    artisan: "Anusha Reddy",
    price: 35.0,
    imageUrl: "/10.png",
    category: "Woodwork",
  },
];

const mockIdeas = [
  {
    id: 101,
    title: "Eco-Dyed Yoga Mats",
    artisan: "Priya S.",
    description:
      "Handwoven mats using natural dyes from marigold and indigo. Would you buy this?",
    imageUrl: "/11.png",
    votes: 1247,
  },
  {
    id: 102,
    title: "Modern Warli Art Lamps",
    artisan: "Rohan D.",
    description:
      "Minimalist lamps featuring traditional Warli art on recycled paper shades.",
    imageUrl: "/12.png",
    votes: 832,
  },
  {
    id: 103,
    title: "3D Printed Terracotta Jewelry",
    artisan: "Anjali Varma",
    description:
      "Combining modern 3D printing with classic terracotta finishing for unique jewelry designs.",
    imageUrl: "/13.png",
    votes: 971,
  },
];

// --- ICONS ---
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);
const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    ></path>
  </svg>
);
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ></path>
  </svg>
);
const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
    ></path>
  </svg>
);
const ThumbsUpIcon = ({ filled }) => (
  <svg
    className="w-6 h-6"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H9.472a2 2 0 01-1.994-1.817l-.826-6.425A2 2 0 018.65 10H14zM8 10V3a1 1 0 00-1-1H5a1 1 0 00-1 1v7h4z"
    />
  </svg>
);

// --- PAGE COMPONENTS ---

export const BuyerHeader = () => (
  <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Kalaghar Logo"
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tighter">
          Kala<span className="text-google-blue">Ghar</span>
        </h1>
      </Link>

      <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
        <a
          href="#marketplace"
          className="text-google-blue border-b-2 border-google-blue pb-1"
        >
          Shop
        </a>
        <a href="#new-ideas" className="hover:text-google-blue transition">
          New Ideas
        </a>
        <a href="#artisans" className="hover:text-google-blue transition">
          Our Artisans
        </a>
      </nav>

      <div className="flex items-center space-x-5 text-gray-600">
        <button className="hover:text-google-blue transition">
          <SearchIcon />
        </button>
        <Link to="/cart" className="hover:text-google-blue transition relative">
          <CartIcon />
          <span className="absolute -top-2 -right-2 bg-google-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>
        <button className="hover:text-google-blue transition">
          <UserIcon />
        </button>
      </div>
    </div>
  </header>
);

const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-transparent hover:border-google-blue h-full flex flex-col">
    <div className="relative">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <HeartIcon />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <p className="text-sm text-gray-500 mb-1">{product.artisan}</p>
      <h3 className="text-lg font-bold text-gray-800 truncate">
        {product.name}
      </h3>
      <div className="flex justify-between items-center mt-4 flex-grow items-end">
        <p className="text-xl font-semibold text-google-green">
          ${product.price.toFixed(2)}
        </p>
        <button className="bg-google-blue text-white font-semibold px-5 py-2 rounded-lg hover:bg-google-red transition-colors duration-300 transform group-hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const IdeaCard = ({ idea }) => {
  const [vote, setVote] = useState(null); // 'up' or null
  const [currentVotes, setCurrentVotes] = useState(idea.votes);

  const handleVote = useCallback(() => {
    if (vote === null) {
      setVote("up");
      setCurrentVotes((v) => v + 1);
    } else {
      setVote(null);
      setCurrentVotes((v) => v - 1);
    }
  }, [vote]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col min-w-[320px] snap-start border-2 border-transparent hover:border-google-yellow transition-all duration-300">
      <img
        src={idea.imageUrl}
        alt={idea.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-gray-800">{idea.title}</h4>
        <p className="text-sm text-gray-500 mb-3">by {idea.artisan}</p>
        <p className="text-gray-600 text-sm flex-grow">{idea.description}</p>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleVote}
            className={`flex items-center space-x-2 font-semibold py-2 px-4 rounded-lg transition-colors ${
              vote === "up"
                ? "bg-google-green/20 text-google-green"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ThumbsUpIcon filled={vote === "up"} />
            <span>{vote === "up" ? "Voted!" : "Vote"}</span>
          </button>
          <p className="text-lg font-bold text-gray-800 text-right">
            {currentVotes.toLocaleString()}{" "}
            <span className="text-sm font-normal text-gray-500">votes</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MARKETPLACE COMPONENT ---
export default function BuyerMarketplace() {
  const categories = [
    "All",
    "Textiles",
    "Pottery",
    "Painting",
    "Woodwork",
    "Metalwork",
    "Sculpture",
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = mockProducts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="font-sans bg-gray-50">
      <BuyerHeader />

      <main className="pt-24">
        {/* --- Marketplace Section --- */}
        <section id="marketplace">
          {/* Part 1: Heading and Filters with Background */}
          <div
            className="py-16 bg-cover bg-[center_bottom_30%] relative"
            style={{ backgroundImage: "url('/2.png')" }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                  Discover{" "}
                  <span className="text-google-yellow">Handcrafted</span>{" "}
                  Treasures
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Explore unique, authentic items with rich stories, direct
                  from the artisans.
                </p>
              </div>

              {/* Category Filters */}
              <div className="flex justify-center flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-google-blue text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Part 2: Product Grid without Background */}
          <div className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* --- MODIFICATION START --- */}
                {filteredProducts.map((product) => (
                  // Wrap ProductCard with Link and move the key to the Link
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard product={product} />
                  </Link>
                ))}
                {/* --- MODIFICATION END --- */}
              </div>
            </div>
          </div>
        </section>

        {/* --- New Ideas Section --- */}
        <section
          id="new-ideas"
          className="py-20 bg-gray-100"
          style={{ backgroundImage: "url('/2.png')" }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
                Shape the <span className="text-google-yellow">Future</span> of
                Craft
              </h2>
              <p className="text-lg text-gray-600">
                Artisans are sharing their next big ideas. Vote for the designs
                you'd love to own!
              </p>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="flex space-x-8 pb-4 overflow-x-auto snap-x snap-mandatory">
              {mockIdeas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Re-using the footer from your landing page */}
      <footer className="bg-google-blue text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white/70 text-sm">
            &copy; {new Date().getFullYear()} KalaGhar. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}