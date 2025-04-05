import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tokenReducer from './reducer/tokenSlice';
import courseReducer from "./reducer/courseSlice"
import lessonReducer from './reducer/lessonSlice'
import taskReducer from './reducer/taskSlice'
import itemsInTheMenubarReducer from './reducer/itemsInTheMenubarSlice'
import userReducer from './reducer/userSlice'
const persistConfig = {
  key: 'root',
  storage,
};

const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
const persistedCourseReducer = persistReducer(persistConfig, courseReducer);
const persistLessonReducer=persistReducer(persistConfig,lessonReducer)
const persistTaskReducer=persistReducer(persistConfig,taskReducer)
const persistUserReducer=persistReducer(persistConfig,userReducer)
const store = configureStore({
  reducer: {
    token: persistedTokenReducer, // Persisted token reducer
    course: persistedCourseReducer, // Persisted course reducer
    lesson:persistLessonReducer,
    task:persistTaskReducer,
    itemsInTheMenubar:itemsInTheMenubarReducer,
    user:persistUserReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };