import axios, { AxiosResponse } from 'axios';
import { AuthResponse, Policy, User } from '../types';

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

api.interceptors.request.use((config: any) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        authentication: accessToken,
      },
    };
    return newConfig;
  }
  return config;
});

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  try {
    const response = await api.post<
      { email: string; password: string },
      AxiosResponse<AuthResponse>
    >('/auth', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/auth');
  return response.data;
};

export const getAllPolicies = async (
  from?: string,
  to?: string
): Promise<Policy[]> => {
  const response = await api.get<Policy[]>('/policies', {
    params: { from, to },
  });
  return response.data?.map((policy) => ({
    ...policy,
    date: new Date(policy.date),
  }));
};

export const getPolicyById = async (id: number): Promise<Policy> => {
  const response = await api.get<Policy>(`/policies/${id}`);
  return { ...response.data, date: new Date(response.data.date) };
};

export const register = async (
  user: User & { password: string }
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', user);
  return response.data;
};

export const createPolicy = async (
  policy: Partial<Policy>
): Promise<Policy> => {
  const response = await api.post<Policy>('/policies', policy);
  return response.data;
};

export const verifyUserVote = async (
  userId: number,
  policyId: number
): Promise<{ voted: boolean }> => {
  const response = await api.get<{ voted: boolean }>(
    `/users/${userId}/policies/${policyId}`
  );
  return response.data;
};

export const upVotePolicy = async (id: number): Promise<{ status: number }> => {
  const response = await api.put(`/policies/${id}/upvote`);
  return { status: response.status };
};

export default api;
