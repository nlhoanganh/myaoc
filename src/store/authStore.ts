// ---------------------------------------------------------------------------
// authStore.ts — Zustand store for authentication state
// ---------------------------------------------------------------------------

import { create } from 'zustand';
import * as authStorage from '../services/authStorage';

interface AuthState {
  // The logged-in username, or null when not authenticated
  user: string | null;

  // Error message shown on the login page (e.g. "Invalid credentials")
  error: string | null;

  // Whether an auth action is in progress (disables buttons)
  loading: boolean;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  loading: false,

  /**
   * Attempt to log in. On success, sets `user`. On failure, sets `error`.
   */
  login: async (username, password) => {
    set({ loading: true, error: null });

    try {
      const user = await authStorage.login(username, password);
      set({ user, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed.';
      set({ error: message, loading: false });
    }
  },

  /**
   * Attempt to register a new account and log in immediately.
   */
  register: async (username, password) => {
    set({ loading: true, error: null });

    try {
      await authStorage.register(username, password);
      set({ loading: false });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed.';
      set({ error: message, loading: false });
      return false;
    }
  },

  /**
   * Log out and return to the login page.
   */
  logout: () => {
    authStorage.logout();
    set({ user: null, error: null });
  },

  /**
   * Called once on app mount to check if there's an existing session.
   */
  restoreSession: () => {
    const user = authStorage.getCurrentUser();
    if (user) {
      set({ user });
    }
  },

  clearError: () => set({ error: null }),
}));
