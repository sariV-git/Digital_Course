import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './reducer/tokenSlice';
import courseReducer from "./reducer/courseSlice"
import lessonReducer from './reducer/lessonSlice'
import itemsInTheMenubarReducer from './reducer/itemsInTheMenubarSlice'
import userReducer from './reducer/userSlice'


const tokenPersistConfig = {
  key: 'token',
  storage,
};
const  itemsInTheMenubarPersistConfig = {
  key: 'itemsInTheMenubar',
  storage,
};const userPersistConfig = {
  key: 'user',
  storage,
};const lessonPersistConfig = {
  key: 'lesson',
  storage,
};const coursePersistConfig = {
  key: 'course',
  storage,
};


const persistedTokenReducer = persistReducer(tokenPersistConfig, tokenReducer);
const persistedCourseReducer = persistReducer(coursePersistConfig, courseReducer);
const persistLessonReducer=persistReducer(lessonPersistConfig,lessonReducer)
const persistUserReducer=persistReducer(userPersistConfig,userReducer)
const persistItemsInTheMenubarReducer=persistReducer(itemsInTheMenubarPersistConfig,itemsInTheMenubarReducer)
const store = configureStore({
  reducer: {
    token: persistedTokenReducer, // Persisted token reducer
    course: persistedCourseReducer, // Persisted course reducer
    lesson:persistLessonReducer,
    itemsInTheMenubar:persistItemsInTheMenubarReducer,
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