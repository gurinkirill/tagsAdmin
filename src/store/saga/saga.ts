import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import {
  loginWatcherSaga,
  logoutWatcherSaga,
} from '@/store/saga/sagas/userSaga';
import {
  addPostSagaWatcherSaga,
  editPostSagaWatcherSaga,
  getPostDetailsSagaWatcherSaga,
  getPostsWatcherSaga,
  removePostSagaWatcherSaga,
} from '@/store/saga/sagas/postsSaga';
import { getAuthorsWatcherSaga } from '@/store/saga/sagas/authorsSaga';
import { getTagsWatcherSaga } from '@/store/saga/sagas/tagsSaga';

export const rootSagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    logoutWatcherSaga(),
    getAuthorsWatcherSaga(),
    getTagsWatcherSaga(),
    getPostsWatcherSaga(),
    getPostDetailsSagaWatcherSaga(),
    removePostSagaWatcherSaga(),
    editPostSagaWatcherSaga(),
    addPostSagaWatcherSaga(),
  ]);
}
