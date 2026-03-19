import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to the page the user was on before hitting/login
  const from = location.state?.from || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Invalid username or password.');
        return;
      }

      const data = await res.json();
      login(data.user);
      navigate(from, { replace: true });
    } catch {
      setError('Could not reach the server. Please try again.');
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Sign in</h1>

        {error && <p className="login__error" role="alert">{error}</p>}

        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__label">
            Username
            <input
              className="login__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="login__label">
            Password
            <div className="login__password-wrap">
              <input
                className="login__input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button type="submit" className="login__submit">Sign in</button>
        </form>

        <p className="login__switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
