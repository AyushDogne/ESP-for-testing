import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";
import { cartAPI } from "../api/api";
import "../styles/Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, quantity } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleRemoveItem = async (productId) => {
    dispatch(removeFromCart(productId));
    try {
      await cartAPI.removeFromCart(productId);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
    try {
      await cartAPI.updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    try {
      await cartAPI.clearCart();
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Browse our products and add items to your cart</p>
          <button onClick={() => navigate("/products")} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="item-image">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.title}
                />
              </div>
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)
                  }
                  className="qty-input"
                />
                <button
                  className="qty-btn"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$10.00</span>
          </div>
          <div className="summary-row">
            <span>GST (18%):</span>
            <span>${(total * 0.18).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(total + 10 + total * 0.18).toFixed(2)}</span>
          </div>
          <p className="item-count">Items in cart: {quantity}</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
