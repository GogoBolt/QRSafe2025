"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import {
  Bus,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await login(email, password);

      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Redirection vers votre tableau de bord...",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Email ou mot de passe incorrect",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center space-y-2 mb-6">
          <Bus className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold text-center">SchoolTransit</h1>
          <p className="text-muted-foreground text-center">
            Connectez-vous à votre compte
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>

        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Vous n&apos;avez pas de compte?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Créer un compte
            </Link>
          </p>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline block"
          >
            Mot de passe oublié?
          </Link>
        </div>

        {/* Demo accounts */}
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground mb-2">Comptes de démonstration:</p>
          <div className="text-sm space-y-1">
            <p>Admin: admin@example.com</p>
            <p>Parent: parent@example.com</p>
            <p>Chauffeur: driver@example.com</p>
            <p className="text-xs text-muted-foreground mt-1">(Tout mot de passe est accepté)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}