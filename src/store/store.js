import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlice } from './jornual';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});