
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Reducers
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import organizationReducer from './slices/organizationSlice';
import projectReducer from './slices/projectSlice';
import vulnerabilityReducer from './slices/vulnerabilitySlice';
import notificationReducer from './slices/notificationSlice';
import offlineReducer from './slices/offlineSlice';
import analyticsReducer from './slices/analyticsSlice';
import themeReducer from './slices/themeSlice';
import settingsReducer from './slices/settingsSlice';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  organization: organizationReducer,
  project: projectReducer,
  vulnerability: vulnerabilityReducer,
  notification: notificationReducer,
  offline: offlineReducer,
  analytics: analyticsReducer,
  theme: themeReducer,
  settings: settingsReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'user',
    'organization',
    'theme',
    'settings',
    'offline',
  ],
  blacklist: [
    'notification',
    'analytics',
  ],
  timeout: 10000,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'auth/login/fulfilled',
          'auth/logout',
        ],
        ignoredPaths: [
          'register',
          'rehydrate',
          'auth.token',
          'user.lastLoginAt',
        ],
      },
      immutableCheck: {
        ignoredPaths: ['auth.token'],
      },
    }),
  devTools: __DEV__,
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
