"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { hasPermission } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export default function AuthGuard({ children, requiredPermissions = [] }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission =>
        hasPermission(user, permission)
      );

      if (!hasAllPermissions) {
        router.push('/403');
      }
    }
  }, [user, isLoading, router, requiredPermissions]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}