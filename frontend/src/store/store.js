import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './urlSlice';
 
export const store = configureStore({
  reducer: {
    urls: urlReducer,
  },
}); 