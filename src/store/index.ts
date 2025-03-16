import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from './slices/collectionsSlice';
import breadcrumbsReducer from './slices/breadcrumbsSlice';

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    breadcrumbs: breadcrumbsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;