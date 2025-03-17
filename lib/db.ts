import { User, Role, Permission, RegistrationData, UserRole } from './types';

// Mock data for development
const mockUsers: Record<string, User> = {
  'admin@example.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: {
      id: '1',
      name: 'admin',
      description: 'Administrator with full access',
      permissions: [
        { id: '1', name: 'manage_users', description: 'Can manage users' },
        { id: '2', name: 'manage_roles', description: 'Can manage roles' },
      ]
    },
    phone: '+225 0758966156',
    avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=admin'
  },
  'parent@example.com': {
    id: '2',
    name: 'Parent User',
    email: 'parent@example.com',
    role: {
      id: '2',
      name: 'parent',
      description: 'Parent with limited access',
      permissions: [
        { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
        { id: '8', name: 'view_own_children', description: 'Can view own children' },
      ]
    },
    phone: '+225 0758966156',
    avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=parent'
  }
};

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { id: '1', name: 'manage_users', description: 'Can manage users' },
    { id: '2', name: 'manage_roles', description: 'Can manage roles' },
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
  ],
  teacher: [
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
    { id: '4', name: 'manage_grades', description: 'Can manage grades' },
    { id: '5', name: 'manage_attendance', description: 'Can manage attendance' },
  ],
  student: [
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
    { id: '6', name: 'view_grades', description: 'Can view grades' },
    { id: '7', name: 'view_schedule', description: 'Can view schedule' },
  ],
  parent: [
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
    { id: '8', name: 'view_own_children', description: 'Can view own children' },
  ],
  driver: [
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
    { id: '9', name: 'manage_routes', description: 'Can manage routes' },
  ],
  cook: [
    { id: '3', name: 'view_dashboard', description: 'Can view dashboard' },
    { id: '10', name: 'manage_meals', description: 'Can manage meals' },
  ],
};

export function getUserByEmail(email: string): User | null {
  return mockUsers[email] || null;
}

export function createUser(data: RegistrationData): User {
  const id = Math.random().toString(36).substr(2, 9);
  const user: User = {
    id,
    name: data.name,
    email: data.email,
    role: {
      id: Math.random().toString(36).substr(2, 9),
      name: data.role,
      description: `${data.role} user`,
      permissions: rolePermissions[data.role],
    },
    phone: data.phone,
    avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${id}`,
  };

  mockUsers[data.email] = user;
  return user;
}

export function getStudentStatus(firstName: string, lastName: string, className: string) {
  // Mock student data
  return {
    id: '1',
    first_name: firstName,
    last_name: lastName,
    class_name: className,
    current_subject: {
      name: 'Mathématiques',
      teacher_first_name: 'Jean',
      teacher_last_name: 'Dupont'
    },
    latest_trip: {
      bus_number: '12',
      pickup_time: new Date().toISOString(),
      arrival_time: new Date(Date.now() + 30 * 60000).toISOString(),
      driver_first_name: 'Pierre',
      driver_last_name: 'Martin'
    }
  };
}

export function saveChatHistory(userId: string, message: string, response: string): void {
  console.log('Chat history saved:', { userId, message, response });
}