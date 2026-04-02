import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';

export default function Product() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offers, setOffers] = useState([]);
  const { addItem, openSidebar } = useSavedItems();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`/api/products/${encodeURIComponent(id)}/offers?limit=20`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        // Prices API response shape may be { success: true, data: { offers: [...] } }
        if (data && data.data && Array.isArray(data.data.offers)) {
          setOffers(data.data.offers);
        } else if (Array.isArray(data.offers)) {
          setOffers(data.offers);
        } else if (Array.isArray(data)) {
          setOffers(data);
        } else {
          setOffers([]);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setError('Failed to load offers.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  function handleAdd(offer) {
    // normalize shape: use id + vendor or variant to avoid collisions
    const item = {
      id: `${offer.id}-${offer.vendor || offer.store || 'unknown'}`,
      name: offer.title || offer.product_title || offer.name || `Offer ${offer.id}`,
      price: offer.price || offer.final_price || offer.amount || '',
      url: offer.link || offer.url || '',
    };
    addItem(item);
    // open the sidebar so the user sees the saved item immediately
    if (openSidebar) openSidebar();
  }

  if (loading) return <div style={{ padding: 16 }}>Loading offers…</div>;
  if (error) return <div style={{ padding: 16, color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Offers</h2>
      {offers.length === 0 && <p>No offers found for this product.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {offers.map((o) => (
          <li key={(o.id || o.offer_id || Math.random()).toString()} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {o.image && <img src={o.image} alt={o.title || ''} style={{ width: 84, height: 84, objectFit: 'cover' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{o.title || o.vendor || o.store || 'Offer'}</div>
                <div style={{ color: '#6b7280' }}>{o.price ? `Price: ${o.price}` : o.final_price ? `Price: ${o.final_price}` : ''}</div>
                <div style={{ marginTop: 8 }}>
                  <a href={o.link || o.url || '#'} target="_blank" rel="noreferrer">View on store</a>
                </div>
              </div>
              <div>
                <button onClick={() => handleAdd(o)} className="btn-primary">Add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
