"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Home,
  Users,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2",
          isActive && "bg-primary/10 text-primary"
        )}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Accueil", href: "/dashboard" },
    {
      icon: <Bus size={20} />,
      label: "Transport",
      href: "/dashboard/transport",
    },
    {
      icon: <Users size={20} />,
      label: "Élèves",
      href: "/dashboard/students",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Paiements",
      href: "/dashboard/payments",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      href: "/dashboard/notifications",
    },
    {
      icon: <Settings size={20} />,
      label: "Paramètres",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Bus className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">GR-Safe</span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
              <LogOut size={20} />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-200 ease-in-out",
          "lg:ml-64 min-h-screen"
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}