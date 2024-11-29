import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick"; // Ensure you install react-slick and slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroBg from "../assets/pexels-thatguycraig000-1727684.jpg";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/product/allproducts"); // Replace with your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products || data); // Use `data.products` if the API response has a `products` array
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    prevArrow: (
      <button className="slick-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-6xl text-white bg-blue-900 p-8 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out">
        &lt;
      </button>
    ),
    nextArrow: (
      <button className="slick-next absolute right-0 top-1/2 transform -translate-y-1/2 text-6xl text-white bg-blue-900 p-8 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out">
        &gt;
      </button>
    ),
  };

  return (
    <div>
      <Header />

      {/* Smooth Scrolling */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
          <h2 className="text-sm uppercase text-red-400 tracking-widest mb-4 animate__animated animate__fadeIn">Up To 60% Off Now</h2>
          <h1 className="text-5xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Mid Season Sale <span className="text-red-400">40%</span>
          </h1>
          <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">Final Clearance: Take 20% off Sale Must-Haves</p>
          <button
            className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:bg-red-500 transition duration-300 animate__animated animate__fadeIn animate__delay-3s"
            onClick={() => {
              navigate("/products");
            }}
          >
            Start Shopping →
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen bg-blue-100 flex items-center justify-center animate__animated animate__fadeIn animate__delay-4s">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We <span className="text-blue-500">Are</span></h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            At R@MIS Kart, we strive to bring you the best shopping experience by providing high-quality products and unbeatable customer service. Our mission is to make your life easier with every purchase.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-gradient-to-b from-white to-gray-100 animate__animated animate__fadeIn animate__delay-5s">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Our Exclusive Products</h2>
          <p className="text-lg text-gray-600 mb-10">
            Explore a curated selection of premium products designed to elevate your experience.
          </p>

          {/* Product Slider */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Slider {...sliderSettings}>
              {products.map((product, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h3>
                  <p className="text-gray-500 mb-4">{product.description}</p>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition duration-300" 
                  onClick={()=>{navigate("/products")}}
                  >
                    View Product
                  </button>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-gray-900 text-white animate__animated animate__fadeIn animate__delay-6s">
        <div className="text-center max-w-lg px-6">
          <h2 className="text-4xl font-bold mb-6">We Value Your <span className="text-yellow-400">Feedback</span></h2>
          <p className="text-lg leading-relaxed mb-8">
            Your thoughts and suggestions are important to us. Let us know how we can improve your experience. Were here to listen and make things better.
          </p>
          <button
            className="bg-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            onClick={() => navigate("/feedback")}
          >
            Share Feedback →
          </button>
        </div>
      </section>

      {/* Footer with Smooth Animations */}
      <footer id="contact" className="bg-gray-900 py-10 text-white pl-8 animate__animated animate__fadeIn animate__delay-7s">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 ">ABOUT US</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Affiliate Program
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Wholesale Program
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Press Inquiries
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">CUSTOMER SUPPORT</h3>
              <ul>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Shipping Information
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Track Your Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Promo Code Lookup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-400">
                    Gift Card Lookup
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">CONNECT WITH US</h3>
              <div className="flex space-x-4 mb-4">
                <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
              </div>
              <p className="text-sm text-gray-400 mt-6">
                &copy; 2024 R@MIS Kart. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
