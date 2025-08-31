import React, { useState, useEffect } from 'react'; // Fixed: Imported useEffect
import { useParams, Link } from 'react-router-dom';
import { BuyerHeader } from "../pages/buyermarket";

// --- UPDATED MOCK DATA ---
const mockProducts = [
  { 
    id: 1, 
    name: "Jaipur Blue Pottery Vase", 
    artisan: "Ramesh Kumar", 
    price: 45.0, 
    imageUrl: "/3.png", 
    category: "Pottery", 
    description: "A stunning, hand-painted blue pottery vase from Jaipur, known for its vibrant cobalt blue dye. Each piece is crafted from quartz powder, not clay, making it unique and fragile. Perfect as a centerpiece.",
    additionalImages: [
      "/3_alt1.png", // Example alternative image
      "/3_alt2.png", // Another example image
      "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" // Example video embed (replace with actual product video)
    ]
  },
  { id: 2, name: "Handwoven Pashmina Shawl", artisan: "Fatima Begum", price: 120.0, imageUrl: "/4.png", category: "Textiles", description: "Experience the luxurious warmth of a genuine Kashmiri Pashmina shawl. Handwoven by skilled artisans, this piece features intricate patterns and is incredibly soft to the touch. A timeless accessory.",
    additionalImages: [ "/4_alt1.png", "/4_alt2.png" ]
  },
  { id: 3, name: "Madhubani 'Tree of Life'", artisan: "Sita Devi", price: 85.0, imageUrl: "/5.png", category: "Painting", description: "This intricate Madhubani painting depicts the 'Tree of Life,' symbolizing growth and prosperity. Hand-painted with natural dyes on handmade paper, it's a vibrant piece of Indian folk art.",
    additionalImages: []
  },
  { id: 4, name: "Terracotta Horse Statue", artisan: "Mani Selvam", price: 60.0, imageUrl: "/6.png", category: "Sculpture", description: "A rustic terracotta horse, handcrafted by artisans from Panchmura village. These statues are known for their distinct form and are often used in religious ceremonies and as home decor.",
    additionalImages: []
  },
  { id: 5, name: "Chikankari Kurta", artisan: "Aisha Khan", price: 75.0, imageUrl: "/7.png", category: "Textiles", description: "An elegant and breathable cotton kurta featuring delicate Chikankari hand-embroidery from Lucknow. The intricate white-on-white thread work offers a classic and sophisticated look.",
    additionalImages: []
  },
  { id: 6, name: "Bidriware Silver Coasters", artisan: "Irfan Husain", price: 95.0, imageUrl: "/8.png", category: "Metalwork", description: "A set of exquisite coasters made with the Bidriware craft of Karnataka. Pure silver is inlaid onto a blackened alloy of zinc and copper, creating stunning geometric and floral patterns.",
    additionalImages: []
  },
  { id: 7, name: "Warli Village Life Canvas", artisan: "Jivya Soma Mashe", price: 110.0, imageUrl: "/9.png", category: "Painting", description: "This captivating Warli painting showcases the daily life of the Warli tribe. The minimalist style, using geometric shapes, creates a powerful and rhythmic narrative on canvas.",
    additionalImages: []
  },
  { id: 8, name: "Kondapalli Wooden Toys", artisan: "Anusha Reddy", price: 35.0, imageUrl: "/10.png", category: "Woodwork", description: "A charming set of wooden toys from Kondapalli, Andhra Pradesh. Carved from soft Tella Poniki wood and painted with natural vegetable dyes, these toys are both beautiful and eco-friendly.",
    additionalImages: []
  },
];

const HeartIcon = () => (
    <svg className="w-6 h-6 text-gray-600 group-hover:text-google-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>
);

const PlayIcon = () => <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>;
const PauseIcon = () => <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"></path></svg>;

const ProductPage = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));

  // Combine main image and additional images for the carousel
  const allMedia = product ? [product.imageUrl, ...(product.additionalImages || [])] : [];

  // State to track the currently displayed media item
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  // Fixed: Changed 'cconst' to 'const'
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Function to navigate carousel
  const navigateMedia = (direction) => {
    setCurrentMediaIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return allMedia.length - 1;
      if (newIndex >= allMedia.length) return 0;
      return newIndex;
    });
  };

  useEffect(() => {
    // Only run the slideshow if it's playing and there is more than one media item
    if (isPlaying && allMedia.length > 1) {
      const timer = setInterval(() => {
        navigateMedia(1); // Advance to the next slide
      }, 5000); // Interval of 5 seconds

      // Cleanup: clear the timer when the component unmounts or dependencies change
      return () => clearInterval(timer);
    }
  }, [currentMediaIndex, isPlaying, allMedia.length]); // Effect restarts if the index, play state, or media count changes

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

  const currentMedia = allMedia[currentMediaIndex];
  const isVideo = currentMedia && currentMedia.includes("youtube.com/embed"); // Simple check for video

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <BuyerHeader />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* --- MODIFIED: Product Media Scroller with hover events --- */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              <div className="w-full rounded-2xl shadow-xl object-cover aspect-square flex items-center justify-center bg-gray-200 overflow-hidden">
                {isVideo ? (
                  <iframe src={currentMedia} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full" title="Product Video"></iframe>
                ) : (
                  <img src={currentMedia} alt={`${product.name} - View ${currentMediaIndex + 1}`} className="w-full h-full object-cover"/>
                )}
              </div>

              {allMedia.length > 1 && (
                <>
                  <button onClick={() => navigateMedia(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-colors z-10" aria-label="Previous image">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <button onClick={() => navigateMedia(1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-colors z-10" aria-label="Next image">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                  
                  {/* --- NEW: Play/Pause Button --- */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
                    aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {allMedia.map((_, index) => (
                      <button key={index} onClick={() => setCurrentMediaIndex(index)} className={`w-3 h-3 rounded-full ${index === currentMediaIndex ? 'bg-google-blue' : 'bg-gray-400'} hover:bg-google-blue transition-colors`} aria-label={`View media ${index + 1}`}></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Side: Product Details (No changes here) */}
            <div className="flex flex-col space-y-5">
              <p className="font-semibold text-google-blue tracking-wide">{product.category.toUpperCase()}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-500">
                by <Link to={`/seller/${encodeURIComponent(product.artisan)}`} className="font-medium text-gray-700 hover:text-google-blue hover:underline">{product.artisan}</Link>
              </p>
              <p className="text-4xl font-bold text-google-green">${product.price.toFixed(2)}</p>
              <div className="border-t pt-5">
                <h3 className="text-xl font-bold mb-2 text-gray-800">About this item</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <button className="flex-grow bg-google-blue text-white font-bold py-4 px-6 rounded-xl hover:bg-google-red transition-colors duration-300 text-lg shadow-md hover:shadow-lg">Add to Cart</button>
                  <button className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-google-red transition-colors group"><HeartIcon /></button>
                </div>
                <button className="w-full bg-google-green text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 transition-colors duration-300 text-lg shadow-md hover:shadow-lg">Invest in this business</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;