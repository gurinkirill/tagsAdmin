import { LoginResponse, userApi } from '@/api/services/userApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginActionType, userSliceActions } from '@/store/slices/userSlice';
import Cookies from 'js-cookie';
import { expiredUtils } from '@/utils/utils';

function* loginSaga(action: LoginActionType) {
  try {
    const response: LoginResponse = yield call(
      userApi.login,
      action.payload.request
    );

    Cookies.set('access_token', response.access_token, {
      expires: expiredUtils(response.access_expired_at),
      secure: true,
    });
    Cookies.set('refresh_token', response.refresh_token, {
      expires: expiredUtils(response.refresh_expired_at),
      secure: true,
    });

    yield put(
      userSliceActions.loginSuccess({
        response: response,
      })
    );
  } catch (error: any) {
    if (error.type === 'LoginValidationError') {
      yield put(
        userSliceActions.loginFailure({
          validationError: error.data,
        })
      );
    } else if (error.type === 'LoginStandardError') {
      yield put(userSliceActions.loginFailure({ standardError: error.data }));
    } else {
      yield put(
        userSliceActions.loginFailure({
          standardError: {
            name: 'UnknownError',
            message: 'Something went wrong',
            code: 0,
            status: 0,
          },
        })
      );
    }
  }
}

function* logoutSaga() {
  try {
    yield put(userSliceActions.logoutSuccess());
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  } catch (error) {
    console.error('Logout error: ', error);
  }
}

export function* loginWatcherSaga() {
  yield takeLatest(userSliceActions.login.type, loginSaga);
}

export function* logoutWatcherSaga() {
  yield takeLatest(userSliceActions.logout.type, logoutSaga);
}
