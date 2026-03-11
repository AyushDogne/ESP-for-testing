import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProducts, setLoading, filterProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { productAPI } from "../api/api";
import "../styles/ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, filteredItems, loading } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["electronics", "clothing", "furniture", "books"];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await productAPI.getAllProducts();
      console.log("API Response:", response);
      const productsData = response.data.products || response.data;
      console.log("Products data:", productsData);
      dispatch(setProducts(productsData));
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      dispatch(filterProducts(term));
    } else {
      dispatch(setProducts(items));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.id.toString(),
        title: product.title,
        price: product.price,
        image: product.thumbnail || product.image,
        quantity: 1,
      })
    );
    alert("Product added to cart!");
  };

  const displayedProducts = searchTerm ? filteredItems : items;

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  console.log("Products loaded:", items);
  console.log("Displayed products:", displayedProducts);

  return (
    <div className="product-list-container">
      <div className="product-header">
        <h1>Products</h1>
        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="products-grid">
        {Array.isArray(displayedProducts) && displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.thumbnail || product.image || "https://via.placeholder.com/200"}
                  alt={product.title}
                />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-rating">
                  <span className="rating">⭐ {product.rating || "N/A"}</span>
                  <span className="reviews">
                    ({Array.isArray(product.reviews) ? product.reviews.length : 0} reviews)
                  </span>
                </div>
                <div className="product-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">No products found. Make sure backend is running on http://localhost:5000</div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
