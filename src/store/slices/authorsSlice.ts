import { createSlice } from '@reduxjs/toolkit';
import { StoreStateType } from '@/store/store';
import { AuthorsResponse } from '@/api/services/authorsApi';

export interface GetAuthorsActionType {
  type: string;
  payload: {
    response: AuthorsResponse;
  };
}

export interface AuthorsSliceStateType {
  authors: AuthorsResponse;
}

const initialState: AuthorsSliceStateType = { authors: [] };

const authorsSlice = createSlice({
  name: 'authorsSlice',
  initialState: initialState,
  reducers: {
    getAuthors: () => {},
    getAuthorsSuccess: (state, action: GetAuthorsActionType) => {
      state.authors = action.payload.response;
    },
  },
});

export const authorsSliceActions = authorsSlice.actions;
export const authorsSliceReducer = authorsSlice.reducer;
export const authorsSliceSelector = {
  authors: (state: StoreStateType) => state.authorsReducer.authors,
};
