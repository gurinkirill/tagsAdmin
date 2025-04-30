import { api } from '@/api/api';
import { Picture } from '@/api/services/postsApi';

export interface AuthorsItem {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar: Picture | null;
  updatedAt: string;
  createdAt: string;
}

export type AuthorsResponse = AuthorsItem[];

export const authorsApi = {
  getAuthors: async (): Promise<AuthorsResponse> => {
    const url = '/manage/authors';
    const response = await api.get(url);
    return response.data;
  },
};
