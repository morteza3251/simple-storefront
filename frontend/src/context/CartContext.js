// src/context/CartContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0),
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const initialState = {
  cart: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);