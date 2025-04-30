import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './reducer/tokenSlice';
import courseReducer from "./reducer/courseSlice"
import lessonReducer from './reducer/lessonSlice'
import itemsInTheMenubarReducer from './reducer/itemsInTheMenubarSlice'
import userReducer from './reducer/userSlice'
const persistConfig = {
  key: 'root',
  storage,
  debug:true
};
const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
const persistedCourseReducer = persistReducer(persistConfig, courseReducer);
const persistLessonReducer=persistReducer(persistConfig,lessonReducer)
const persistUserReducer=persistReducer(persistConfig,userReducer)
const store = configureStore({
  reducer: {
    token: persistedTokenReducer, // Persisted token reducer
    course: persistedCourseReducer, // Persisted course reducer
    lesson:persistLessonReducer,
    itemsInTheMenubar:itemsInTheMenubarReducer,
    user:persistUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // ignoredActionPaths: ['register', 'rehydrate'],
      },
  })
});

const persistor = persistStore(store);
export { store, persistor };