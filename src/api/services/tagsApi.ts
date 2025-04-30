import { api } from '@/api/api';

export interface TagsItem {
  id: number;
  name: string;
  code: string;
  sort: number;
  updatedAt: string;
  createdAt: string;
}

export type TagsResponse = TagsItem[];

export const tagsApi = {
  getTags: async (): Promise<TagsResponse> => {
    const url = '/manage/tags';
    const response = await api.get(url);
    return response.data;
  },
};
