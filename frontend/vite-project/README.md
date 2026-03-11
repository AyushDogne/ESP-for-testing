# Frontend Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Installation

1. Navigate to the project directory:
```bash
cd vite-project
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development mode:
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Linting:
```bash
npm run lint
```

## Environment Configuration

The frontend is configured to communicate with the backend at `http://localhost:5000`

To change the backend URL, update the `API_BASE_URL` in `src/api/api.js`:
```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

## Project Structure

```
src/
├── components/
│   ├── Register.jsx      - Registration form
│   ├── Login.jsx        - Login form
│   ├── Header.jsx       - Navigation header
│   ├── ProductList.jsx  - Product listing page
│   └── Cart.jsx         - Shopping cart page
├── redux/
│   ├── store.js         - Redux store configuration
│   └── slices/
│       ├── authSlice.js      - Auth state management
│       ├── cartSlice.js      - Cart state management
│       └── productSlice.js   - Product state management
├── api/
│   └── api.js           - API service with Axios
├── styles/
│   ├── Auth.css        - Authentication pages styling
│   ├── Header.css      - Header styling
│   ├── ProductList.css - Product list styling
│   └── Cart.css        - Cart page styling
├── App.jsx             - Main app component with routing
└── main.jsx            - App entry point
```

## Features

✅ User Authentication (Register/Login)
✅ Protected Routes
✅ Product Listing
✅ Product Search
✅ Shopping Cart Management
✅ Quantity Adjustment
✅ Order Total Calculation
✅ Redux State Management
✅ Responsive Design

## User Flow

1. **First Time**: Register → Fill in name, email, password, country
2. **Login**: Enter email and password
3. **Browse Products**: View all products with images and prices
4. **Search**: Use search bar to find specific products
5. **Add to Cart**: Click "Add to Cart" button
6. **View Cart**: Click cart icon in header
7. **Manage Cart**: Adjust quantities or remove items
8. **Checkout**: Complete the order

## State Management (Redux)

### Auth Slice
```javascript
{
  user: { id, name, email, country },
  token: 'jwt_token',
  isAuthenticated: true,
  loading: false,
  error: null
}
```

### Cart Slice
```javascript
{
  items: [
    { productId, title, price, quantity, image }
  ],
  total: 1000,
  quantity: 5
}
```

### Product Slice
```javascript
{
  items: [], // All products
  filteredItems: [], // Filtered products
  loading: false,
  error: null
}
```

## API Communication

All API calls are handled through `src/api/api.js`:

```javascript
// Authentication
authAPI.register(data)
authAPI.login(data)
authAPI.getCurrentUser()

// Products
productAPI.getAllProducts()
productAPI.searchProducts(query)
productAPI.getProduct(id)
productAPI.getProductsByCategory(category)

// Cart
cartAPI.getCart()
cartAPI.addToCart(data)
cartAPI.updateQuantity(productId, quantity)
cartAPI.removeFromCart(productId)
cartAPI.clearCart()
```

## Troubleshooting

### Backend Connection Error
- Ensure backend server is running on port 5000
- Check if `http://localhost:5000` is accessible
- Verify API_BASE_URL in `src/api/api.js`

### Login/Register Issues
- Check if backend is running
- Verify MongoDB connection
- Check browser console for error messages

### Products Not Loading
- Ensure backend can access DummyJSON API
- Check network tab in browser dev tools
- Verify JWT token is valid

## Dependencies

- react: UI library
- react-router-dom: Navigation
- react-redux: Redux React bindings
- @reduxjs/toolkit: Redux state management
- axios: HTTP client
- vite: Build tool

## Development Tips

1. Use Redux DevTools for state debugging
2. Check browser console for errors
3. Verify API responses in Network tab
4. Use React DevTools for component debugging

## Build Notes

- The app uses Vite for faster builds
- ES modules are used throughout
- CSS modules or regular CSS for styling
- No TypeScript (JavaScript implementation)
