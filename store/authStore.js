import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://booknest-backend-7tfy.onrender.com/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Load user & token from AsyncStorage
  loadUser: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      if (user && token) {
        set({ user: JSON.parse(user), token, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
    }
  },

  // Login function
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
    console.log("login:",email,password);
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
        console.log("res:",res);
      const data = await res.json();
        console.log("data:",data);
      if (!res.ok) throw new Error(data.message || 'Login failed');

      const { user, token } = data;

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);

      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: error.message || 'Login error', loading: false });
    }
  },

  // Signup function
  signup: async (email, password, username) => {
    set({ loading: true, error: null });
    console.log("details:",email,password,username);
    try {
        console.log("signup called");
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log("signup data:",data);
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      
      const { user, token } = data;

      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', token);
      console.log("signup successfull")
      set({ user, token, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: error.message || 'Signup error', loading: false });
    }
  },

  // Logout function
  logout: async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing AsyncStorage', error);
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
