import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './reducer/tokenSlice';
import courseReducer from "./reducer/courseSlice"

const persistConfig = {
  key: 'root',
  storage,
};

const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
const persistedCourseReducer = persistReducer(persistConfig, courseReducer);

const store = configureStore({
  reducer: {
    token: persistedTokenReducer, // Persisted token reducer
    course: persistedCourseReducer, // Persisted course reducer
  },
});

const persistor = persistStore(store);

export { store, persistor };