import React from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Nav />
      <main className="layout__main">
        {children}
      </main>
      <footer className="layout__footer">
        <p>© 2026 PriceTracker. All rights reserved.</p>
      </footer>
      <Sidebar />
    </div>
  );
}
