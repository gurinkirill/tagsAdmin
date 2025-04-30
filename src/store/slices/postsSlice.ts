import { createSlice } from '@reduxjs/toolkit';
import { StoreStateType } from '@/store/store';
import {
  AddPostRequest,
  AddPostResponse,
  EditPostRequest,
  EditPostResponse,
  GetPostDetailsRequest,
  GetPostDetailsResponse,
  GetPostsResponse,
  RemovePostRequest,
  RemovePostResponse,
} from '@/api/services/postsApi';

export interface GetPostsActionType {
  type: string;
  payload: {
    response: GetPostsResponse;
  };
}

export interface GetPostDetailsActionType {
  type: string;
  payload: {
    request: GetPostDetailsRequest;
  };
}

export interface GetPostDetailsSuccessActionType {
  type: string;
  payload: {
    response: GetPostDetailsResponse;
  };
}

export interface RemovePostActionType {
  type: string;
  payload: {
    request: RemovePostRequest;
  };
}

export interface RemovePostSuccessActionType {
  type: string;
  payload: {
    response: RemovePostResponse;
  };
}

export interface EditPostActionType {
  type: string;
  payload: {
    request: EditPostRequest;
  };
}

export interface EditPostSuccessActionType {
  type: string;
  payload: {
    response: EditPostResponse;
  };
}

export interface AddPostActionType {
  type: string;
  payload: {
    request: AddPostRequest;
  };
}

export interface AddPostSuccessActionType {
  type: string;
  payload: {
    response: AddPostResponse;
  };
}

export interface PostsSliceStateType {
  posts: GetPostsResponse;
  postDetails?: GetPostDetailsResponse;
}

const initialState: PostsSliceStateType = { posts: [], postDetails: undefined };

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: initialState,
  reducers: {
    getPosts: () => {},
    getPostsSuccess: (state, action: GetPostsActionType) => {
      state.posts = action.payload.response;
    },

    getPostDetails: (state, action: GetPostDetailsActionType) => {},
    getPostDetailsSuccess: (state, action: GetPostDetailsSuccessActionType) => {
      state.postDetails = action.payload.response;
    },

    removePost: (state, action: RemovePostActionType) => {},
    removePostSuccess: (state, action: RemovePostSuccessActionType) => {
      console.log('removePost: ', action.payload.response);
    },

    editPost: (state, action: EditPostActionType) => {},
    editPostSuccess: (state, action: EditPostSuccessActionType) => {
      console.log('editPost: ', action.payload.response);
    },

    addPost: (state, action: AddPostActionType) => {},
    addPostSuccess: (state, action: AddPostSuccessActionType) => {
      console.log('addPost: ', action.payload.response);
    },
  },
});

export const postsSliceActions = postsSlice.actions;
export const postsSliceReducer = postsSlice.reducer;
export const postsSliceSelector = {
  posts: (state: StoreStateType) => state.postsReducer.posts,
  postDetails: (state: StoreStateType) => state.postsReducer.postDetails,
};
