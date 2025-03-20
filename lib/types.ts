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

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  matricule: string;
  class: string;
  schoolYear: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  licensePlate: string; // Immatriculation
  model: string;
  color: string;
  year: number;
  capacity: number;
  driver?: {
    id: string;
    name: string;
    phone: string;
  };
  route?: {
    id: string;
    name: string;
  };
}

export const ROLES = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'teacher', label: 'Enseignant' },
  { value: 'student', label: 'Élève' },
  { value: 'parent', label: 'Parent' },
  { value: 'driver', label: 'Chauffeur' },
  { value: 'cook', label: 'Cuisinier' },
] as const;

export const SCHOOL_YEARS = [
  { value: '2023-2024', label: '2023-2024' },
  { value: '2024-2025', label: '2024-2025' },
  { value: '2025-2026', label: '2025-2026' },
] as const;

export const CLASSES = [
  { value: 'CP1', label: 'CP1' },
  { value: 'CP2', label: 'CP2' },
  { value: 'CE1', label: 'CE1' },
  { value: 'CE2', label: 'CE2' },
  { value: 'CM1', label: 'CM1' },
  { value: 'CM2', label: 'CM2' },
] as const;

export const ROLE_PERMISSIONS = {
  parent: ['view_own_children'],
  admin: ['view_all_students', 'view_routes', 'view_meals'],
  cook: ['view_meals', 'view_meal_attendance'],
  driver: ['view_routes', 'view_schedule'],
  teacher: ['view_class_attendance'],
  student: ['view_own_schedule']
} as const;