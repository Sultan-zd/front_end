import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/50 backdrop-blur-lg shadow-md"
          : "bg-amber-50 shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-extrabold text-center text-[#d62828] uppercase drop-shadow-md ml-12">
            R@MI&apos;S
            <span className="text-[#000000]">KART</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-6 mr-8">
          <a
            href="#home"
            className="text-gray-700 hover:font-semibold hover:underline hover:text-gray-800"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:font-semibold hover:underline hover:text-gray-800"
          >
            About
          </a>
          <a
            href="#products"
            className="text-gray-700 hover:font-semibold hover:underline hover:text-gray-800"
          >
            Products
          </a>
          <a
            href="#feedback"
            className="text-gray-700 hover:font-semibold hover:underline hover:text-gray-800"
          >
            Feedback
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:font-semibold hover:underline hover:text-gray-800"
          >
            Contact
          </a>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            onClick={() => {
              navigate("/login");
            }}
          >
            Logout
          </button>
          <button
            className="bg-gray-100 px-4 py-2 rounded shadow hover:bg-gray-200"
            onClick={() => {
              navigate("/addProduct");
            }}
          >
            Create a Product
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
