import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/results?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="home">
      {user && (
        <p className="home__greeting">Welcome back, {user.username}!</p>
      )}

      <h1 className="home__headline">
        Track prices smarter. Buy at the right moment.
      </h1>

      <p className="home__subtext">
        Search any product, compare listings fast, and keep your saved picks in one
        clean workspace built for focused shopping.
      </p>

      <form className="home__search" onSubmit={handleSearch}>
        <input
          type="text"
          className="home__search-input"
          placeholder="Search for a product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Product search"
        />
        <button type="submit" className="home__search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
