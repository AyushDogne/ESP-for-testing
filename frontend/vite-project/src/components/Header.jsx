import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { setApiToken } from "../api/api";
import "../styles/Header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { quantity } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    setApiToken(null);
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={isAuthenticated ? "/products" : "/"}>
            <h1>ShopHub</h1>
          </Link>
        </div>

        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/products" className="nav-link">Products</Link>
              <div className="user-section">
                <span className="user-name">{user?.name}</span>

                <Link to="/cart" className="cart-link">
                  <span className="cart-icon">🛒</span>
                  <span className="cart-count">{quantity}</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
