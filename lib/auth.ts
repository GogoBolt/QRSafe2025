import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { User, RegistrationData } from './types';
import bcrypt from 'bcryptjs';

export async function login(email: string, password: string): Promise<{ success: boolean; user?: User }> {
  try {
    // For demo purposes, allow any credentials
    if (email === 'admin@example.com') {
      return {
        success: true,
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: {
            id: '1',
            name: 'admin',
            description: 'Administrator',
            permissions: [{ id: '1', name: 'all', description: 'Full access' }]
          },
          phone: '+225 0758966156',
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=admin@example.com`
        }
      };
    }

    if (email === 'parent@example.com') {
      return {
        success: true,
        user: {
          id: '2',
          name: 'Parent User',
          email: 'parent@example.com',
          role: {
            id: '2',
            name: 'parent',
            description: 'Parent',
            permissions: [{ id: '2', name: 'view_children', description: 'View children' }]
          },
          phone: '+225 0758966156',
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=parent@example.com`
        }
      };
    }

    // For any other email, create a demo user
    return {
      success: true,
      user: {
        id: Math.random().toString(),
        name: email.split('@')[0],
        email: email,
        role: {
          id: '2',
          name: 'parent',
          description: 'Parent',
          permissions: [{ id: '2', name: 'view_children', description: 'View children' }]
        },
        phone: '+225 0758966156',
        avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`
      }
    };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false };
  }
}

export async function register(data: RegistrationData): Promise<{ success: boolean; user?: User }> {
  try {
    // For demo purposes, always succeed and return a mock user
    const user = {
      id: Math.random().toString(),
      name: data.name,
      email: data.email,
      role: {
        id: Math.random().toString(),
        name: data.role,
        description: `${data.role} user`,
        permissions: [{ id: '1', name: 'basic', description: 'Basic access' }]
      },
      phone: data.phone,
      avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${data.email}`
    };

    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false };
  }
}

export function getDashboardPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'parent':
      return '/dashboard/parent';
    case 'driver':
      return '/dashboard/driver';
    case 'cook':
      return '/dashboard/cook';
    case 'teacher':
      return '/dashboard/teacher';
    default:
      return '/dashboard';
  }
}

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user || !user.role.permissions) return false;
  return user.role.permissions.some(p => p.name === permission || p.name === 'all');
}

export async function getUser(): Promise<User | null> {
  return null;
}

export async function logout(): Promise<void> {
  return;
}