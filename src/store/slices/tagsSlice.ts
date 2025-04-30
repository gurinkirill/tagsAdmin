import { createSlice } from '@reduxjs/toolkit';
import { StoreStateType } from '@/store/store';
import { TagsResponse } from '@/api/services/tagsApi';

export interface GetTagsActionType {
  type: string;
  payload: {
    response: TagsResponse;
  };
}

export interface TagsSliceStateType {
  tags: TagsResponse;
}

const initialState: TagsSliceStateType = { tags: [] };

const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState: initialState,
  reducers: {
    getTags: () => {},
    getTagsSuccess: (state, action: GetTagsActionType) => {
      state.tags = action.payload.response;
    },
  },
});

export const tagsSliceActions = tagsSlice.actions;
export const tagsSliceReducer = tagsSlice.reducer;
export const tagsSliceSelector = {
  tags: (state: StoreStateType) => state.tagsReducer.tags,
};
