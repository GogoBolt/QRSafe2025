"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Clock,
  MapPin,
  AlertCircle,
  CreditCard,
  Calendar,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function ParentDashboard() {
  const [children] = useState([
    {
      id: 1,
      name: "Sophie Koné",
      grade: "CM2",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie",
      busStatus: "En route",
      nextStop: "École Internationale",
      estimatedArrival: "08:15",
    },
    {
      id: 2,
      name: "Lucas Koné",
      grade: "CE1",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucas",
      busStatus: "À l'école",
      nextStop: "-",
      estimatedArrival: "-",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord Parent</h1>
        <Button variant="outline">
          <MessageSquare className="h-5 w-5 mr-2" />
          Messages
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Children Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <Card key={child.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Classe de {child.grade}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm ${
                          child.busStatus === "En route"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {child.busStatus}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Prochain arrêt: {child.nextStop}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Arrivée estimée: {child.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Map */}
          <Card className="p-6">
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <MapWithNoSSR />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Actions Rapides</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Bus className="h-6 w-6" />
                <span>Absence Transport</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Planning</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <CreditCard className="h-6 w-6" />
                <span>Paiements</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Documents</span>
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Bus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Sophie est montée dans le bus</p>
                  <p className="text-sm text-muted-foreground">Il y a 15 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Paiement transport effectué</p>
                  <p className="text-sm text-muted-foreground">Hier à 14:30</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}