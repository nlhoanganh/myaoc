// ---------------------------------------------------------------------------
// LoginPage.tsx — Full-screen login/register with AoC ASCII Christmas theme
// ---------------------------------------------------------------------------

import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import './LoginPage.scss';

// Snowflake characters, cycled for variety
const SNOW_CHARS = ['*', '.', '+', '*', '.', '+', '*', '.', '*', '.'];

{/*
 * Colored ASCII Christmas tree — each row grows by 2 chars, perfectly centered.
 *
 *          ★              star (gold, pulsing glow)
 *         /.\             branches (green)
 *        /o..\            o = ornament (red)
 *       /..o..\
 *      /o...o..\
 *     /..o...o..\
 *    /o..o..o..o.\
 *   /..o..o..o..o.\
 *        ||||             trunk (brown)
 *        ||||
 */}
function AsciiTree() {
  return (
    <pre className="login-page__tree" aria-hidden="true">
      <span className="tree-star">{'         ★\n'}</span>
      <span className="tree-green">{'        /..\\\n'}</span>
      <span className="tree-green">{'       /..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'.\\\n'}</span>
      <span className="tree-green">{'      /..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'...\\\n'}</span>
      <span className="tree-green">{'     /'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'....'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..\\\n'}</span>
      <span className="tree-green">{'    /..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'....'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..\\\n'}</span>
      <span className="tree-green">{'   /'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'...'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'.\\\n'}</span>
      <span className="tree-green">{'  /..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..'}</span><span className="tree-ornament">{'o'}</span><span className="tree-green">{'..\\\n'}</span>
      <span className="tree-trunk">{'        ||||\n'}</span>
      <span className="tree-trunk">{'        ||||'}</span>
    </pre>
  );
}

export function LoginPage() {
  const { error, loading, login, register, clearError } = useAuthStore();

  // Toggle between "signin" and "register" modes
  const [mode, setMode] = useState<'signin' | 'register'>('signin');

  // Form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Local validation error (separate from server/store errors)
  const [localError, setLocalError] = useState('');

  const displayedError = localError || error;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');

    if (mode === 'register' && password !== confirm) {
      setLocalError('Passwords do not match.');
      return;
    }

    if (mode === 'signin') {
      login(username, password);
    } else {
      const success = await register(username, password);
      if (success) {
        setMode('signin');
        setPassword('');
        setConfirm('');
      }
    }
  }

  function switchMode() {
    setMode(mode === 'signin' ? 'register' : 'signin');
    setLocalError('');
    clearError();
  }

  return (
    <div className="login-page">
      {/* Decorative snowflakes — mixed characters for variety */}
      <div className="login-page__snow" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <span key={i} className="login-page__flake">
            {SNOW_CHARS[i % SNOW_CHARS.length]}
          </span>
        ))}
      </div>

      <div className="login-page__card">
        {/* Colored ASCII tree */}
        <AsciiTree />

        {/* Title banner */}
        <div className="login-page__banner">
          <span className="login-page__ornament">.~'~.~'~.~'~.~'~.~'~.</span>
          <h1 className="login-page__title">My Advent of Code</h1>
          <p className="login-page__subtitle">Solution Tracker</p>
          <span className="login-page__ornament">'~.~'~.~'~.~'~.~'~.~'</span>
        </div>

        {/* Login / Register form */}
        <form className="login-page__form" onSubmit={handleSubmit}>
          <label className="login-page__field">
            <span className="login-page__label">&gt; Username:</span>
            <input
              className="login-page__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              spellCheck={false}
              autoFocus
            />
          </label>

          <label className="login-page__field">
            <span className="login-page__label">&gt; Password:</span>
            <input
              className="login-page__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </label>

          {mode === 'register' && (
            <label className="login-page__field">
              <span className="login-page__label">&gt; Confirm:</span>
              <input
                className="login-page__input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </label>
          )}

          {/* Error message */}
          {displayedError && (
            <p className="login-page__error">! {displayedError}</p>
          )}

          {/* Submit button */}
          <button
            className="login-page__submit"
            type="submit"
            disabled={loading}
          >
            [ {mode === 'signin' ? 'Sign In' : 'Register'} ]
          </button>
        </form>

        {/* Mode toggle */}
        <div className="login-page__toggle">
          {mode === 'signin'
            ? "Don't have an account?"
            : 'Already have an account?'}
          <button className="login-page__toggle-btn" onClick={switchMode}>
            &gt; {mode === 'signin' ? 'Register' : 'Sign In'} _
          </button>
        </div>

        {/* Decorative year footer */}
        <div className="login-page__years">
          {Array.from({ length: 12 }, (_, i) => 2015 + i).map((year, i) => (
            <span key={year}>
              {i > 0 && <span className="login-page__star"> * </span>}
              {year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
