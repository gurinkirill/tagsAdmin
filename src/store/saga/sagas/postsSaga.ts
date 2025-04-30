import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AddPostActionType,
  EditPostActionType,
  GetPostDetailsActionType,
  GetPostsActionType,
  postsSliceActions,
  RemovePostActionType,
} from '@/store/slices/postsSlice';
import {
  AddPostResponse,
  EditPostResponse,
  GetPostDetailsResponse,
  GetPostsResponse,
  postsApi,
  RemovePostResponse,
} from '@/api/services/postsApi';

function* getPostsSaga(action: GetPostsActionType) {
  const response: GetPostsResponse = yield call(postsApi.getPosts);

  yield put(
    postsSliceActions.getPostsSuccess({
      response: response,
    })
  );
}

function* getPostDetailsSaga(action: GetPostDetailsActionType) {
  const response: GetPostDetailsResponse = yield call(
    postsApi.getPostDetails,
    action.payload.request
  );

  yield put(
    postsSliceActions.getPostDetailsSuccess({
      response: response,
    })
  );
}

function* removePostSaga(action: RemovePostActionType) {
  const response: RemovePostResponse = yield call(
    postsApi.removePost,
    action.payload.request
  );

  yield put(
    postsSliceActions.removePostSuccess({
      response: response,
    })
  );
}

function* editPostSaga(action: EditPostActionType) {
  const response: EditPostResponse = yield call(
    postsApi.editPost,
    action.payload.request
  );

  yield put(
    postsSliceActions.editPostSuccess({
      response: response,
    })
  );
}

function* addPostSaga(action: AddPostActionType) {
  const response: AddPostResponse = yield call(
    postsApi.addPost,
    action.payload.request
  );

  yield put(
    postsSliceActions.addPostSuccess({
      response: response,
    })
  );
}

export function* getPostsWatcherSaga() {
  yield takeLatest(postsSliceActions.getPosts.type, getPostsSaga);
}

export function* getPostDetailsSagaWatcherSaga() {
  yield takeLatest(postsSliceActions.getPostDetails.type, getPostDetailsSaga);
}

export function* removePostSagaWatcherSaga() {
  yield takeLatest(postsSliceActions.removePost.type, removePostSaga);
}

export function* editPostSagaWatcherSaga() {
  yield takeLatest(postsSliceActions.editPost.type, editPostSaga);
}

export function* addPostSagaWatcherSaga() {
  yield takeLatest(postsSliceActions.addPost.type, addPostSaga);
}
