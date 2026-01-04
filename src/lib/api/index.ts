// Main API module with switching between mock and real implementations

import { mockApi } from './mocks';
import { realApi } from './real';

// Determine which API to use based on environment variables or URL parameters
function getApiMode(): 'mock' | 'real' {
  // Check URL parameters first (for development/testing)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const apiMode = urlParams.get('apiMode');
    if (apiMode === 'real' || apiMode === 'mock') {
      return apiMode;
    }
  }

  // Fall back to environment variable
  const envApiMode = process.env.NEXT_PUBLIC_API_MODE;
  if (envApiMode === 'real') {
    return 'real';
  }

  // Default to mock for development
  return 'mock';
}

// Export unified API interface
export const api = {
  getUsers: () => {
    const mode = getApiMode();
    return mode === 'real' ? realApi.getUsers() : mockApi.getUsers();
  },

  getUserById: (id: string) => {
    const mode = getApiMode();
    return mode === 'real' ? realApi.getUserById(id) : mockApi.getUserById(id);
  },

  getPosts: () => {
    const mode = getApiMode();
    return mode === 'real' ? realApi.getPosts() : mockApi.getPosts();
  },

  getPostById: (id: string) => {
    const mode = getApiMode();
    return mode === 'real' ? realApi.getPostById(id) : mockApi.getPostById(id);
  },

  createPost: (data: Parameters<typeof mockApi.createPost>[0]) => {
    const mode = getApiMode();
    return mode === 'real' ? realApi.createPost(data) : mockApi.createPost(data);
  }
};

// Export types for convenience
export type { User, Post } from './mocks';

// Utility function to get current API mode (useful for debugging)
export function getCurrentApiMode() {
  return getApiMode();
}