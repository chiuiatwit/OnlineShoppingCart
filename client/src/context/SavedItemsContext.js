import React, { createContext, useContext, useState } from 'react';
import { getSavedItems, saveItem, removeItem } from '../storage';

const SavedItemsContext = createContext(null);

export function SavedItemsProvider({ children }) {
  const [items, setItems] = useState(() => getSavedItems());
  const [isOpen, setIsOpen] = useState(false);

  function addItem(item) {
    saveItem(item);
    setItems(getSavedItems());
  }

  function deleteItem(itemId) {
    removeItem(itemId);
    setItems(getSavedItems());
  }

  function openSidebar() { setIsOpen(true); }
  function closeSidebar() { setIsOpen(false); }

  return (
    <SavedItemsContext.Provider value={{ items, addItem, deleteItem, isOpen, openSidebar, closeSidebar }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  return useContext(SavedItemsContext);
}
