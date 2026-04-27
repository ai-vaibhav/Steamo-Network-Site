import { create } from 'zustand';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  interests: string[];
  onboarded: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setInterests: (interests: string[]) => void;
  completeOnboarding: () => void;
}

const STORAGE_KEY = 'steami-auth-user';

const loadUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const saveUser = (user: UserProfile | null) => {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
};

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(),
  isAuthenticated: !!loadUser(),

  login: async (email: string, _password: string) => {
    // Mock login — accept any credentials
    const existing = loadUser();
    if (existing && existing.email === email) {
      set({ user: existing, isAuthenticated: true });
      return true;
    }
    const user: UserProfile = {
      id: crypto.randomUUID(),
      fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      interests: [],
      onboarded: false,
    };
    saveUser(user);
    set({ user, isAuthenticated: true });
    return true;
  },

  register: async (fullName: string, email: string, _password: string) => {
    const user: UserProfile = {
      id: crypto.randomUUID(),
      fullName,
      email,
      interests: [],
      onboarded: false,
    };
    saveUser(user);
    set({ user, isAuthenticated: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null, isAuthenticated: false });
  },

  setInterests: (interests: string[]) =>
    set((state) => {
      if (!state.user) return {};
      const updated = { ...state.user, interests };
      saveUser(updated);
      return { user: updated };
    }),

  completeOnboarding: () =>
    set((state) => {
      if (!state.user) return {};
      const updated = { ...state.user, onboarded: true };
      saveUser(updated);
      return { user: updated };
    }),
}));
