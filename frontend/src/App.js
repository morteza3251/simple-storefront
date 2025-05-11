// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { useCartState } from './context/CartContext';

function MainApp() {
  const [products, setProducts] = useState([]);
  const dispatch = useCartDispatch();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="mb-6">
        <Link to="/" className="mr-4">صفحه اصلی</Link>
        <Link to="/cart" className="text-blue-500 hover:underline">سبد خرید</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <span>{product.name} - {product.price.toLocaleString()} تومان</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  افزودن به سبد
                </button>
              </li>
            ))}
          </ul>
        } />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}