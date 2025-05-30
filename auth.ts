import ApiService from './api';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock implementations for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    avatar: '/assets/avatar.jpg',
  },
];

class AuthService {
  /**
   * Login user
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // In a real app, this would make an API call
      // Mock implementation for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      
      const user = mockUsers.find((u) => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      const token = `mock-jwt-token-${Math.random().toString(36).substring(2, 9)}`;
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a new user
   */
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // In a real app, this would make an API call
      // Mock implementation for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Check if email already exists
      if (mockUsers.some((u) => u.email === data.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: data.name,
        email: data.email,
        role: 'User',
      };
      
      // Add to mock users (in a real app, this would be handled by the server)
      mockUsers.push(newUser);
      
      const token = `mock-jwt-token-${Math.random().toString(36).substring(2, 9)}`;
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return { user: newUser, token };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Check if token is valid
   * In a real app, this would verify the token with the server
   */
  static async verifyToken(): Promise<boolean> {
    try {
      // In a real app, this would make an API call to verify the token
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      
      // For demo purposes, just check if token exists
      return !!localStorage.getItem('token');
    } catch (error) {
      return false;
    }
  }
}

export default AuthService;