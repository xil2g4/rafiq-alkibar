import { create } from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => { localStorage.setItem('token', token); set({ token }); },
  logout: () => { localStorage.removeItem('token'); set({ user: null, token: null }); },
  initAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/auth/verify', { headers: { 'Authorization': `Bearer ${token}` } });
        set({ user: response.data.user, token, loading: false });
      } catch {
        localStorage.removeItem('token');
        set({ user: null, token: null, loading: false });
      }
    } else {
      set({ loading: false });
    }
  }
}));

useAuthStore.getState().initAuth();