"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QrCode, LogOut, Settings, User, Menu, Bot } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getDashboardPath } from "@/lib/auth";

export default function MainNav() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationLinks = pathname === "/" ? [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#testimonials", label: "Témoignages" },
    { href: "#faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ] : [];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold">QR-Safe by T. Gogo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navigationLinks.map((link) => (
              link.href.startsWith('#') ? (
                <Button
                  key={link.href}
                  variant="ghost"
                  onClick={() => handleNavigation(link.href)}
                  className="font-sans"
                >
                  {link.label}
                </Button>
              ) : (
                <Link key={link.href} href={link.href}>
                  <Button variant="ghost" className="font-sans">{link.label}</Button>
                </Link>
              )
            ))}
            
            <ThemeToggle />
            
            {!user ? (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="font-sans">Se connecter</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="font-sans">S'inscrire</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/chat">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bot className="h-5 w-5" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardPath(user.role.name)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Tableau de bord</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/chat">
                        <Bot className="mr-2 h-4 w-4" />
                        <span>Assistant</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link href="/chat">
                <Button variant="ghost" size="icon">
                  <Bot className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <ThemeToggle />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    link.href.startsWith('#') ? (
                      <button
                        key={link.href}
                        onClick={() => {
                          handleNavigation(link.href);
                          setIsMenuOpen(false);
                        }}
                        className="text-lg font-medium hover:text-primary transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  {!user ? (
                    <>
                      <Link href="/auth/login">
                        <Button className="w-full" variant="ghost">
                          Se connecter
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full">S'inscrire</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 py-4">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Link href={getDashboardPath(user.role.name)}>
                        <Button className="w-full" variant="outline">
                          Tableau de bord
                        </Button>
                      </Link>
                      <Link href="/chat">
                        <Button className="w-full" variant="outline">
                          <Bot className="mr-2 h-4 w-4" />
                          Assistant
                        </Button>
                      </Link>
                      <Button
                        className="w-full"
                        variant="ghost"
                        onClick={logout}
                      >
                        Déconnexion
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}