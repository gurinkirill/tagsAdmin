import { api } from '@/api/api';

export interface Picture {
  id: number;
  name: string;
  url: string;
}

export interface PostsItem {
  id: number;
  title: string;
  code: string;
  authorName: string;
  previewPicture: Picture | null;
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
}

export type GetPostsResponse = PostsItem[];

export interface Author {
  id: number;
  fullName: string;
  avatar: Picture | null;
}

export interface Tag {
  id: number;
  name: string;
  code: string;
}

export interface GetPostDetailsResponse {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture: Picture | null;
  author: Author | null;
  tags: Tag[];
  updatedAt: string;
  createdAt: string;
}

export interface GetPostDetailsRequest {
  id: number;
}

export interface RemovePostResponse {
  removed: boolean;
}

export interface RemovePostRequest {
  id: number;
}

export interface EditPostResponse {
  edited: boolean;
}

export interface EditPostRequest {
  id: number;
  code?: string;
  title?: string;
  authorId?: number;
  tagIds?: number[];
  text?: string;
  previewPicture?: File;
}

export interface AddPostResponse {
  id: number;
}

export interface AddPostRequest {
  code?: string;
  title?: string;
  authorId?: number;
  tagIds?: number[];
  text?: string;
  previewPicture?: File;
}

export const postsApi = {
  getPosts: async (): Promise<GetPostsResponse> => {
    const url = '/manage/posts';
    const response = await api.get(url);
    return response.data;
  },
  getPostDetails: async (
    request: GetPostDetailsRequest
  ): Promise<GetPostDetailsResponse> => {
    const url = '/manage/posts/detail';
    const response = await api.get(url, {
      params: { id: request.id },
    });
    return response.data;
  },
  removePost: async (
    request: RemovePostRequest
  ): Promise<GetPostDetailsResponse> => {
    const url = '/manage/posts/remove';
    const response = await api.delete(url, {
      params: { id: request.id },
    });
    return response.data;
  },
  editPost: async (request: EditPostRequest): Promise<EditPostResponse> => {
    const url = '/manage/posts/edit';
    const formData = new FormData();

    if (request.code) formData.append('code', request.code);
    if (request.title) formData.append('title', request.title);
    if (request.authorId)
      formData.append('authorId', request.authorId.toString());
    if (request.tagIds) {
      request.tagIds.forEach((tagId) => {
        formData.append('tagIds[]', tagId.toString());
      });
    }
    if (request.text) formData.append('text', request.text);
    if (request.previewPicture)
      formData.append('previewPicture', request.previewPicture);

    const response = await api.post(url, formData, {
      params: { id: request.id },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  addPost: async (request: AddPostRequest): Promise<AddPostResponse> => {
    const url = '/manage/posts/add';
    const formData = new FormData();

    if (request.code) formData.append('code', request.code);
    if (request.title) formData.append('title', request.title);
    if (request.authorId)
      formData.append('authorId', request.authorId.toString());
    if (request.tagIds) {
      request.tagIds.forEach((tagId) => {
        formData.append('tagIds[]', tagId.toString());
      });
    }
    if (request.text) formData.append('text', request.text);
    if (request.previewPicture)
      formData.append('previewPicture', request.previewPicture);

    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
