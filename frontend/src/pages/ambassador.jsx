import React, { useState, useEffect, useRef } from 'react';

// --- Reusable Animated Section ---
const AnimatedSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
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

// --- Page Hero Component ---
const PageHero = ({ title, highlightText, subtitle, backgroundImage, highlightColorClass = 'text-google-blue' }) => (
  <section
    className="min-h-[60vh] flex items-center justify-center pt-24 bg-cover bg-[center_bottom_30%] relative text-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="container mx-auto px-6 relative z-10">
      <AnimatedSection>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            {title}{' '}
            <span className={highlightColorClass}>{highlightText}</span>
          </h1>
          <p className="text-lg text-white/90 font-medium">
            {subtitle}
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// --- Call To Action Component ---
const CallToAction = ({ onApplyClick, roleName, buttonColorClass = 'bg-google-red' }) => (
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto px-6 text-center">
      <AnimatedSection>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Volunteer Your Passion?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Join our network of KalaGhar Ambassadors and dedicate your time to a cause that matters. Your effort can change lives.
        </p>
        <button
          onClick={() => onApplyClick(roleName)}
          className={`${buttonColorClass} text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg`}
        >
          Volunteer as an {roleName}
        </button>
      </AnimatedSection>
    </div>
  </section>
);

// --- Main AmbassadorPage Component ---
const AmbassadorPage = ({ onApplyClick }) => {
  return (
    <>
      <PageHero
        title="Be a Beacon for"
        highlightText="Local Artisans"
        subtitle="Dedicate your passion to a greater cause. Empower local creators, preserve our cultural heritage, and make a tangible impact in your community."
        backgroundImage="/1.png" // A background image representing community/heritage
        highlightColorClass="text-google-yellow"
      />

      {/* --- Features Section --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 space-y-16">
          
          {/* Your Volunteer Role & Impact */}
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Volunteer Role & Impact 🤝</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">As a volunteer KalaGhar Ambassador, you will be the cornerstone of our mission, driving change from the ground up.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2 text-google-blue">Mentor & Guide</h3>
                <p className="text-gray-600">Be a trusted mentor and the first point of contact for artisans in your area, helping them join and benefit from the KalaGhar community.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2 text-google-green">Foster Community</h3>
                <p className="text-gray-600">Build a strong, supportive network. Organize local meetups and workshops to encourage collaboration, knowledge sharing, and collective growth.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2 text-google-red">Champion Local Craft</h3>
                <p className="text-gray-600">Be the voice for your local artisans. Help showcase their stories and unique crafts to a global audience through our platform and events.</p>
              </div>
            </div>
          </AnimatedSection>
          
          <hr/>

          {/* Volunteer Perks & Recognition */}
          <AnimatedSection>
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Volunteer Perks & Recognition ✨</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">We value your time and contribution. Here are some of the perks we offer as a token of our gratitude.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-google-yellow">Exclusive Product Discounts</h3>
                    <p className="text-gray-600">Receive special discounts on beautiful, handcrafted products from our entire network of talented artisans across the country.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-google-yellow">Skill Development</h3>
                    <p className="text-gray-600">Gain valuable experience in community management, social entrepreneurship, and digital literacy with our provided training and resources.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2 text-google-yellow">Certificate of Contribution</h3>
                    <p className="text-gray-600">Receive an official certificate from KalaGhar recognizing your valuable volunteer work and social impact—a great addition to your profile.</p>
                </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      <CallToAction 
        onApplyClick={onApplyClick} 
        roleName="Ambassador"
        buttonColorClass="bg-google-yellow" 
      />
    </>
  );
};

export default AmbassadorPage;