import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Home.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Results() {
  const query = useQuery();
  const q = query.get('q') || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!q.trim()) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    fetch(`/api/search?q=${encodeURIComponent(q)}&limit=20`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // Prices API returns { success: true, data: { results: [...] } }
        if (data && data.data && Array.isArray(data.data.results)) {
          setResults(data.data.results);
        } else if (Array.isArray(data.results)) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError('Failed to fetch search results.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [q]);

  return (
    <div className="home">
      <h2 className="home__headline">Search results for “{q}”</h2>

      {loading && <p>Loading results…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <p>No results found. Try a different search term.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((item) => (
          <li key={item.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {item.image && (
                <img src={item.image} alt={item.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />
              )}
              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={{ color: '#6b7280' }}>{item.offerCount ? `${item.offerCount} offers` : ''}</div>
                <div style={{ marginTop: 6 }}>
                  <Link to={`/product/${item.id}`}>View offers</Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
