// Mock API implementation for development and testing

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/avatars/jane.jpg'
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Evolution 3.0',
    content: 'This is a comprehensive guide to building modern web applications...',
    author: mockUsers[0],
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Advanced Features and Best Practices',
    content: 'Learn about advanced patterns and techniques...',
    author: mockUsers[1],
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z'
  }
];

// Mock API functions with simulated delays
export const mockApi = {
  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id) || null;
  },

  async getPosts(): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockPosts];
  },

  async getPostById(id: string): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockPosts.find(post => post.id === id) || null;
  },

  async createPost(data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newPost: Post = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPosts.push(newPost);
    return newPost;
  }
};