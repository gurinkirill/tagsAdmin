import { call, put, takeLatest } from 'redux-saga/effects';
import { authorsApi, AuthorsResponse } from '@/api/services/authorsApi';
import {
  authorsSliceActions,
  GetAuthorsActionType,
} from '@/store/slices/authorsSlice';

function* getAuthorsSaga(action: GetAuthorsActionType) {
  const response: AuthorsResponse = yield call(authorsApi.getAuthors);

  yield put(
    authorsSliceActions.getAuthorsSuccess({
      response: response,
    })
  );
}

export function* getAuthorsWatcherSaga() {
  yield takeLatest(authorsSliceActions.getAuthors.type, getAuthorsSaga);
}
