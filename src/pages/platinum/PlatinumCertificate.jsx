import React from 'react';
import { useNavigate } from "react-router-dom";

const PlatinumCertificate = () => {

  const navigate = useNavigate();

  const handleBuyNowClick =() => {
    navigate('/customer-form2');
  };
  return (
    <div className="bg-gradient-to-b from-[#1c2b4d] to-[#18375e] text-white py-16">
      <div className="max-w-screen-lg mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b8b8b8] to-[#e5e5e5] mb-4">
            Platinum Wildcard Certificate
          </h2>
          <p className="text-xl text-gray-300">
            Elite protection for high-value domains with ultimate encryption and trust.
          </p>
        </div>

        {/* Certificate Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Why Choose a Wildcard Certificate?</h3>
            <p className="text-gray-200">
              Wildcard certificates offer the flexibility to secure an unlimited number of subdomains under one certificate. It's perfect for businesses with multiple subdomains like www, blog, shop, etc.
            </p>
          </div>

          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Security for Unlimited Subdomains</h3>
            <p className="text-gray-200">
              With the Platinum Wildcard, you get top-tier security for as many subdomains as you need, all under one roof. No need for separate certificates for each subdomain.
            </p>
          </div>
        </div>

        {/* More Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Single Certificate for Multiple Subdomains</h3>
            <p className="text-gray-200">
              One Platinum certificate covers an infinite number of subdomains (e.g., api.example.com, mail.example.com). Save on costs and simplify certificate management.
            </p>
          </div>

          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Encryption & Trust</h3>
            <p className="text-gray-200">
              Platinum certificates use the latest SSL/TLS encryption to ensure secure connections. They're trusted by users and major browsers worldwide.
            </p>
          </div>
        </div>

        {/* Validity & Browser Compatibility Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Validity Period</h3>
            <p className="text-gray-200">
              The Platinum Wildcard Certificate is valid for up to 5 years, reducing the frequency of renewals and offering long-term security.
            </p>
          </div>

          <div className="p-8 bg-[#2b3b5b] rounded-lg shadow-2xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#ffcc00] mb-4">Compatible with Most Browsers</h3>
            <p className="text-gray-200">
              Compatible with all major browsers, ensuring that your users experience seamless security when visiting your domains.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <h3 className="text-4xl font-bold mb-6 text-[#ffcc00]">Get Your Platinum Certificate Now</h3>
          <p className="text-lg mb-8 text-gray-200">Experience top-tier security for your business domains. Order your Platinum Wildcard Certificate today!</p>
          <button className="bg-gradient-to-r from-[#ffcc00] to-[#e50000] text-black font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-[#b8b800] transition duration-300"
          onClick={() => {
            navigate("/customer-form2");
          }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlatinumCertificate;
