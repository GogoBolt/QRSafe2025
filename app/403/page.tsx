import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Accès Refusé</h1>
        <p className="text-muted-foreground max-w-md">
          Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.
          Veuillez contacter votre administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contacter le support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}