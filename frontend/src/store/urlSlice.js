import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: [],
  loading: false,
  error: null,
};

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {

    // Reducer to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Reducer to set error message
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Reducer to add a new URL
    addUrl: (state, action) => {
      state.urls = Array.isArray(state.urls) ? [...state.urls, action.payload] : [action.payload];
      state.loading = false;
      state.error = null;
    },
    // Reducer to replace
    setUrls: (state, action) => {
      state.urls = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    removeUrl: (state, action) => {
      state.urls = Array.isArray(state.urls) ? state.urls.filter(url => url.id !== action.payload) : [];
    },
  },
});

export const { setLoading, setError, addUrl, setUrls, removeUrl } = urlSlice.actions;
export default urlSlice.reducer;