import { createSlice } from '@reduxjs/toolkit';
import { StoreStateType } from '@/store/store';
import Cookies from 'js-cookie';
import {
  LoginRequest,
  LoginResponse,
  LoginStandardError,
  LoginValidationError,
} from '@/api/services/userApi';

export interface LoginActionType {
  type: string;
  payload: {
    request: LoginRequest;
  };
}

export interface LoginSuccessActionType {
  type: string;
  payload: {
    response: LoginResponse;
  };
}

export interface LoginFailureActionType {
  type: string;
  payload: {
    validationError?: LoginValidationError;
    standardError?: LoginStandardError;
  };
}

export interface LoginSliceStateType {
  user?: LoginResponse;
  isLogin?: boolean;
  loginError?: {
    loginValidationError?: LoginValidationError;
    loginStandardError?: LoginStandardError;
  };
}

const initialState: LoginSliceStateType = {
  user: undefined,
  isLogin: !!Cookies.get('access_token'),
  loginError: undefined,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    login: (state, action: LoginActionType) => {},
    loginSuccess: (state, action: LoginSuccessActionType) => {
      state.user = action.payload.response;
      state.isLogin = true;
    },
    loginFailure: (state, action: LoginFailureActionType) => {
      state.loginError = {
        loginValidationError: action.payload.validationError,
        loginStandardError: action.payload.standardError,
      };
    },
    logout: () => {},
    logoutSuccess: () => ({
      ...initialState,
      isLogin: false,
    }),
  },
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
export const userSliceSelector = {
  user: (state: StoreStateType) => state.userReducer.user,
  isLogin: (state: StoreStateType) => state.userReducer.isLogin,
  loginError: (state: StoreStateType) => state.userReducer.loginError,
};
