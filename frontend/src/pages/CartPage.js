// src/pages/CartPage.js
import React from 'react';
import { useCartState, useCartDispatch } from '../context/CartContext';

function CartPage() {
  const { cart } = useCartState();
  const dispatch = useCartDispatch();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">سبد خرید</h1>
      {cart.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <span className="font-semibold">{item.name}</span> - {item.price.toLocaleString()} ×{' '}
                  {item.quantity}
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: { id: item.id } })}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: { id: item.id } })}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-bold">مجموع قیمت: {totalPrice.toLocaleString()} تومان</div>
        </>
      )}
    </div>
  );
}

export default CartPage;