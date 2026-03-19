import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      login(data.user);
      navigate('/', { replace: true });
    } catch {
      setError('Could not reach the server. Please try again.');
    }
  }

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__title">Create account</h1>

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
              minLength={3}
              maxLength={50}
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
                autoComplete="new-password"
                minLength={6}
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

          <label className="login__label">
            Confirm password
            <input
              className="login__input"
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <button type="submit" className="login__submit">Create account</button>
        </form>

        <p className="login__switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
