import { rootSaga, rootSagaMiddleware } from '@/store/saga/saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from '@/store/slices/userSlice';
import { postsSliceReducer } from '@/store/slices/postsSlice';
import { authorsSliceReducer } from '@/store/slices/authorsSlice';
import { tagsSliceReducer } from '@/store/slices/tagsSlice';

export const loggerMiddleware = () => (next: any) => (action: any) => {
  console.info(`[ACTION ${new Date().toLocaleTimeString()}]`, action);
  next(action);
};

const rootReducer = combineReducers({
  userReducer: userSliceReducer,
  postsReducer: postsSliceReducer,
  authorsReducer: authorsSliceReducer,
  tagsReducer: tagsSliceReducer,
});
export type StoreStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootSagaMiddleware, loggerMiddleware),
});

rootSagaMiddleware.run(rootSaga);

export type AppStoreType = typeof store;
