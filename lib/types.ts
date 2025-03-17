export type UserRole = 'admin' | 'parent' | 'teacher' | 'student' | 'driver' | 'cook';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: UserRole;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  avatar?: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
}

export interface ChatResponse {
  response: string;
  error?: string;
  loading?: boolean;
}

export const ROLES = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'teacher', label: 'Enseignant' },
  { value: 'student', label: 'Élève' },
  { value: 'parent', label: 'Parent' },
  { value: 'driver', label: 'Chauffeur' },
  { value: 'cook', label: 'Cuisinier' },
] as const;

export const ROLE_PERMISSIONS = {
  parent: ['view_own_children'],
  admin: ['view_all_students', 'view_routes', 'view_meals'],
  cook: ['view_meals', 'view_meal_attendance'],
  driver: ['view_routes', 'view_schedule'],
  teacher: ['view_class_attendance'],
  student: ['view_own_schedule']
} as const;