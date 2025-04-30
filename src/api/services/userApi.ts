import { api } from '@/api/api';
import axios from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
}

export type LoginValidationError = {
  field: string;
  message: string;
}[];

export interface LoginStandardError {
  name: string;
  message: string;
  code: number;
  status: number;
  type?: string;
}

export const userApi = {
  login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    try {
      const url = '/auth/token-generate';

      const formData = new FormData();
      formData.append('email', loginRequest.email);
      formData.append('password', loginRequest.password);

      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { status, data } = e.response;

        if (status === 422) {
          throw {
            type: 'LoginValidationError' as const,
            data: data as LoginValidationError,
          };
        } else if (status === 400 || status === 405) {
          throw {
            type: 'LoginStandardError' as const,
            data: data as LoginStandardError,
          };
        } else {
          throw new Error('Неизвестный статус ответа');
        }
      }
      throw e;
    }
  },
};
