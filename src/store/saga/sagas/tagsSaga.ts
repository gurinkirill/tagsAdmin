import { call, put, takeLatest } from 'redux-saga/effects';
import { tagsApi, TagsResponse } from '@/api/services/tagsApi';
import { GetTagsActionType, tagsSliceActions } from '@/store/slices/tagsSlice';

function* getTagsSaga(action: GetTagsActionType) {
  const response: TagsResponse = yield call(tagsApi.getTags);

  yield put(
    tagsSliceActions.getTagsSuccess({
      response: response,
    })
  );
}

export function* getTagsWatcherSaga() {
  yield takeLatest(tagsSliceActions.getTags.type, getTagsSaga);
}
