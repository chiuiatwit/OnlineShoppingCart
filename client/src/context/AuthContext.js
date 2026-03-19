import React, { createContext, useContext, useState, useEffect } from 'react';
import { setUser, clearUser } from '../storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  // loading = true while we check the session with the server on startup
  const [loading, setLoading] = useState(true);

  // On mount, ask the server if there's a valid session.
  // This is the source of truth -localStorage is only used for display caching.
  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setUserState(data.user);
        } else {
          clearUser();
          setUserState(null);
        }
      })
      .catch(() => {
        // Server unreachable, leave user as null
      })
      .finally(() => setLoading(false));
  }, []);

  function login(userData) {
    setUser(userData);
    setUserState(userData);
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    clearUser();
    setUserState(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

