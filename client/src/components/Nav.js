import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSavedItems } from '../context/SavedItemsContext';
import './Nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const { items, openSidebar } = useSavedItems();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">BuyWise</Link>

        <nav aria-label="Main navigation">
          <ul className="nav__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
              <Badge badgeContent={items.length} color="primary" showZero={false}>
                <button onClick={openSidebar} className="nav__saved-btn">
                  Saved
                </button>
              </Badge>
            </li>
            {user ? (
              <>
                <li className="nav__username">Hi, {user.username}</li>
                <li>
                  <button onClick={handleLogout} className="nav__btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav__btn">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
