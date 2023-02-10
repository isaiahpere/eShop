import React, { createContext, useContext, useState } from "react";

// create context
const CartContext = createContext();

// create provider function
export const CartContextProvider = ({ children }) => {
  // state
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  /**
   * increaese product qty
   */
  const increaseQty = () => {
    setQty((prevQty) => (prevQty === 9 ? 9 : prevQty + 1));
  };

  /**
   * decreaese product qty
   */
  const decreaseQty = () => {
    setQty((prevQty) => (prevQty === 1 ? 1 : prevQty - 1));
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  /**
   * add product to cartItems or increase product qty
   *
   * @param {*} product
   * @param {*} quantity
   */
  const addProduct = (product, qty) => {
    // update totalQty
    setTotalQty((prevQty) => prevQty + qty);

    // check if product exist in cartItems
    const exist = cartItems.find((item) => item.slug === product.slug);

    // if item exist - update qty of item to new qty
    if (exist) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.slug === product.slug ? { ...exist, qty: item.qty + qty } : item
        )
      );
    } else {
      // if item does not exist add item to cartItems
      setCartItems((prev) => [...prev, { ...product, qty }]);
    }

    // reset qty to 1
    setQty(1);
  };

  /**
   * remove product from cartItems or decrease product quantity by one
   *
   * @param {*} product
   */
  const removeProduct = (product) => {
    // update totalQty
    setTotalQty((prevQty) => prevQty - 1);

    // find if product exist
    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist && exist.qty === 1) {
      const filteredItems = cartItems.filter(
        (item) => item.slug !== product.slug
      );
      setCartItems([...filteredItems]);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.slug === product.slug ? { ...item, qty: item.qty - 1 } : item
        )
      );
    }
  };

  // context values
  const value = {
    qty,
    showCart,
    cartItems,
    totalQty,
    increaseQty,
    decreaseQty,
    addProduct,
    removeProduct,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// export context hook
export const useCartContext = () => useContext(CartContext);
