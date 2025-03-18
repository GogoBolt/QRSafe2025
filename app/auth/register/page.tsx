"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bus, Mail, Phone, User, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/lib/auth";
import { ROLES } from "@/lib/types";

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  role: z.enum(['admin', 'teacher', 'student', 'parent', 'driver', 'cook'], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

type RegistrationForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: RegistrationForm) => {
    setIsLoading(true);
    try {
      const result = await register(values);
      
      if (result.success) {
        toast({
          title: "Inscription réussie",
          description: "Vous allez être redirigé vers la page de connexion",
        });
        router.push("/auth/login");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Cette adresse email est déjà utilisée",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de réinitialisation des utilisateurs
 /*  const resetAndInsertUsers = async () => {
    try {
      // Supprimer tous les utilisateurs existants
      await db.delete().from(users);
      console.log("Tous les utilisateurs ont été supprimés");

      // Utilisateur(s) à insérer
      const newUsers = [
        {
          id: "user-1",
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          phone: "0123456789",
          password: "password123", // Assurez-vous de le hacher si nécessaire
          role: "admin", // Exemple de rôle
          avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=jean.dupont@example.com",
        },
        {
          id: "user-2",
          name: "Marie Dubois",
          email: "marie.dubois@example.com",
          phone: "0987654321",
          password: "password123", // Assurez-vous de le hacher si nécessaire
          role: "teacher", // Exemple de rôle
          avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=marie.dubois@example.com",
        },
        // Ajoute autant d'utilisateurs que nécessaire
      ];

      // Insérer les nouveaux utilisateurs dans la base de données
      await db.insert(users).values(newUsers);
      console.log("Nouveaux utilisateurs ajoutés");
      toast.success("Les utilisateurs ont été réinitialisés et ajoutés avec succès.");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des utilisateurs :", error);
      toast.error("Une erreur est survenue lors de la réinitialisation.");
    }
  }; */

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bus className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-center">SchoolTransit</h1>
            <p className="text-muted-foreground text-center">
              Créez votre compte
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10" placeholder="John Doe" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10" placeholder="john@example.com" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input {...field} className="pl-10" placeholder="0758966156" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rôle</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre rôle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          className="pl-10"
                          placeholder="••••••••"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Inscription en cours..."
                ) : (
                  <>
                    S'inscrire
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>


    </div>
  );
}
