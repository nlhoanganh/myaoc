// ---------------------------------------------------------------------------
// authStorage.ts — Local username/password auth backed by localStorage
//
// All accounts live in localStorage under the key "aoc_users".
// The current session (logged-in username) is stored under "aoc_session".
// Passwords are hashed with SHA-256 via the Web Crypto API before storing.
// ---------------------------------------------------------------------------

const USERS_KEY = 'aoc_users';
const SESSION_KEY = 'aoc_session';

// -- Types ------------------------------------------------------------------

interface StoredUser {
  username: string;
  passwordHash: string;
}

type UsersMap = Record<string, StoredUser>;

// -- Password hashing -------------------------------------------------------

async function hashPassword(password: string): Promise<string> {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);

  // Convert the ArrayBuffer to a hex string
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// -- Internal helpers -------------------------------------------------------

function readUsers(): UsersMap {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeUsers(users: UsersMap): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// -- Public API -------------------------------------------------------------

/**
 * Register a new account.
 * Returns the username on success, or throws a readable error message.
 */
export async function register(username: string, password: string): Promise<string> {
  const trimmed = username.trim().toLowerCase();

  if (trimmed.length < 3) {
    throw new Error('Username must be at least 3 characters.');
  }
  if (password.length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }

  const users = readUsers();

  if (users[trimmed]) {
    throw new Error('Username already taken.');
  }

  users[trimmed] = {
    username: trimmed,
    passwordHash: await hashPassword(password),
  };

  writeUsers(users);

  return trimmed;
}

/**
 * Log in with an existing account.
 * Returns the username on success, or throws a readable error message.
 */
export async function login(username: string, password: string): Promise<string> {
  const trimmed = username.trim().toLowerCase();
  const users = readUsers();
  const user = users[trimmed];

  if (!user) {
    throw new Error('Invalid username or password.');
  }

  const hash = await hashPassword(password);

  if (hash !== user.passwordHash) {
    throw new Error('Invalid username or password.');
  }

  localStorage.setItem(SESSION_KEY, trimmed);

  return trimmed;
}

/**
 * Log out the current user. Clears the session only — accounts persist.
 */
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Return the currently logged-in username, or null if no active session.
 */
export function getCurrentUser(): string | null {
  return localStorage.getItem(SESSION_KEY);
}
