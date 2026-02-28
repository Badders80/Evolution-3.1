// Real API implementation for production

import { User, Post } from './mocks';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

// Helper function for making API requests
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Real API functions
export const realApi = {
  async getUsers(): Promise<User[]> {
    return apiRequest<User[]>('/users');
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      return await apiRequest<User>(`/users/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  },

  async getPosts(): Promise<Post[]> {
    return apiRequest<Post[]>('/posts');
  },

  async getPostById(id: string): Promise<Post | null> {
    try {
      return await apiRequest<Post>(`/posts/${id}`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  },

  async createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    return apiRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Post> {
    return apiRequest<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async deletePost(id: string): Promise<void> {
    await apiRequest<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }
};