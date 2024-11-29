import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/product/allproducts");
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Fetch all products on component mount

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product/filter?name=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}`
      );
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        setError("No matching products found.");
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setError("Failed to search products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center text-blue-700">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-600">{error}</h2>;
  }

  return (
    <div className="container mx-auto p-6 bg-[#f8f4e1]">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">All Products</h1>

      {/* Search Filters */}
      <div className="search-bar mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Cars">Cars</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>
        </div>
      </div>

      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="product-image">
                {product.pictures && product.pictures.length > 0 ? (
                  <img
                    src={product.pictures[0]} // Displaying the first image
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-white">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-800 truncate">{product.name}</h2>
                <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-900 mt-4">${product.price}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-600">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;
