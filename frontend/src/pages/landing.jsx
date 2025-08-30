import React, { useState, useEffect } from "react";

// --- SVG Icons (with Google colors) ---
const ArtisanIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-google-red"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v11.494m-9-5.747h18M5.47 7.712A8.995 8.995 0 0112 4.5a8.995 8.995 0 016.53 3.212M5.47 16.288A8.995 8.995 0 0012 19.5a8.995 8.995 0 006.53-3.212"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.5V2.25m0 19.5V19.5m-7.288-6.53H2.25m19.5 0H19.5"
    ></path>
  </svg>
);

const BuyerIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-google-blue"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 
      2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 
      100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 
      014 0z"
    ></path>
  </svg>
);

const InvestorIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-google-green"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ></path>
  </svg>
);

const AmbassadorIcon = () => (
  <svg
    className="w-12 h-12 mb-4 text-google-yellow"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 
      20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 
      20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 
      0a5.002 5.002 0 019.288 0M15 7a3 3 0 
      11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 
      014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    ></path>
  </svg>
);

// --- Reusable Animated Section ---
const AnimatedSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Page Components ---
const Header = ({ onLoginClick }) => (
  <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800 tracking-tighter">
        Kala<span className="text-google-blue">Ghar</span>
      </h1>
      <button
        onClick={onLoginClick}
        className="bg-google-green text-white font-semibold px-6 py-2 rounded-lg hover:bg-google-red transition-colors duration-300 transform hover:scale-105"
      >
        Login / Signup
      </button>
    </div>
  </header>
);

const Hero = () => (
  <section
    className="min-h-screen flex items-center justify-center pt-24 md:pt-0 bg-cover bg-center relative text-center"
    style={{ backgroundImage: "url('/gd.png')" }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
          Where{" "}
          <span className="text-google-yellow">Artistry</span> Meets{" "}
          <span className="text-google-blue">Opportunity</span>.
        </h2>
        <p className="text-lg text-white/90 font-medium mb-8">
          KalaGhar is a vibrant digital ecosystem dedicated to celebrating and
          empowering artisans, connecting them with a global community of
          buyers, investors, and advocates.
        </p>
        <a
          href="#roles"
          className="bg-google-red text-white font-bold px-8 py-4 rounded-full hover:bg-google-blue transition-all duration-300 transform hover:scale-105 inline-block shadow-lg hover:shadow-xl"
        >
          Join Our Community
        </a>
      </div>
    </div>
  </section>
);

const ExplainerCarousel = () => {
  const features = [
    { title: "Discover", description: "Explore handcrafted goods.", icon: "🎨" },
    { title: "Empower", description: "Support artisans & communities.", icon: "🤝" },
    { title: "Invest", description: "Fund projects & growth.", icon: "📈" },
    { title: "Advocate", description: "Be a voice for heritage.", icon: "🌍" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <AnimatedSection>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            A seamless platform connecting every part of the artisan economy.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index}>
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-bold text-google-blue mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Roles = ({ onRoleSelect }) => {
  const roles = [
    { name: "Artisan", description: "Showcase your craft.", icon: <ArtisanIcon /> },
    { name: "Buyer", description: "Discover unique products.", icon: <BuyerIcon /> },
    { name: "Investor", description: "Fund creative projects.", icon: <InvestorIcon /> },
    { name: "Ambassador", description: "Champion artisans.", icon: <AmbassadorIcon /> },
  ];

  return (
    <section id="roles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <AnimatedSection>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Place
          </h3>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you create, collect, invest, or champion, KalaGhar has a
            place for you.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role) => (
            <AnimatedSection key={role.name}>
              <div
                onClick={() => onRoleSelect(role.name)}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:border-google-blue hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center h-full"
              >
                {role.icon}
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  {role.name}
                </h4>
                <p className="text-gray-600">{role.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const LoginModal = ({ isOpen, onClose, selectedRole }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md relative animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome!</h3>
        <p className="text-center text-gray-600 mb-8">
          Joining as an <span className="font-semibold text-blue-600">{selectedRole || 'Explorer'}</span>. Let's get you started.
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-sm">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 01-4.093 5.574l6.19 5.238C42.012 35.244 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Continue with Google
          </button>
        </div>
        
        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <form>
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">Continue with Email</button>
        </form>

      </div>
    </div>
  );
};


const Footer = () => (
  <footer className="bg-google-blue text-white">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">KalaGhar</h4>
          <p className="text-white/80 text-sm">
            Empowering Artisans Worldwide.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Explore</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Connect</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                Instagram
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Legal</h5>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                Terms
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-google-yellow transition-colors">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/30 mt-8 pt-8 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} KalaGhar. All Rights Reserved.
      </div>
    </div>
  </footer>
);

// --- Main Page ---
export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setSelectedRole(''); // Clear role if opened from header
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const appFont = import.meta.env.VITE_APP_FONT || "sans-serif";

  return (
    
    <div className="font-sans bg-white">
      <Header onLoginClick={handleOpenModal} />
      <main>
        <Hero />
        <ExplainerCarousel />
        <Roles onRoleSelect={handleRoleSelect} />
      </main>
      <Footer />
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        selectedRole={selectedRole}
      />
    </div>
  );
}
