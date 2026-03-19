// storage.js — the ONLY module that reads/writes localStorage directly.
// All other modules must import from here instead of using localStorage keys directly.

const KEYS = {
  USER: 'pt_user',
  SAVED_ITEMS: 'pt_saved_items',
};

//Auth

export function getUser() {
  try {
    const raw = localStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(KEYS.USER);
}

//Saved Items

export function getSavedItems() {
  try {
    const raw = localStorage.getItem(KEYS.SAVED_ITEMS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// item shape: { id, name, price, url }
export function saveItem(item) {
  const items = getSavedItems();
  if (!items.find((i) => i.id === item.id)) {
    localStorage.setItem(KEYS.SAVED_ITEMS, JSON.stringify([...items, item]));
  }
}

export function removeItem(itemId) {
  const updated = getSavedItems().filter((i) => i.id !== itemId);
  localStorage.setItem(KEYS.SAVED_ITEMS, JSON.stringify(updated));
}

export function clearSavedItems() {
  localStorage.removeItem(KEYS.SAVED_ITEMS);
}
