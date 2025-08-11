// Context for global wishlist management.
// Provides functions to add, remove, and query books in the wishlist.
// Persists the wishlist in localStorage.

import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on initial render.
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // Save wishlist to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add a book to the wishlist.
  const addToWishlist = (book) => {
    if (!wishlist.find((b) => b.id === book.id)) {
      setWishlist([...wishlist, book]);
    }
  };

  // Remove a book from the wishlist.
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((b) => b.id !== id));
  };

  // Check if a book is in the wishlist.
  const isInWishlist = (id) => wishlist.some((b) => b.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use the wishlist context.
export function useWishlist() {
  return useContext(WishlistContext);
}
