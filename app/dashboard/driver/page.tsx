"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Users,
  MapPin,
  AlertCircle,
  Navigation2,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function DriverDashboard() {
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [currentRoute, setCurrentRoute] = useState({
    name: "Route Matin - École Internationale",
    stops: [
      "Riviera Palmeraie",
      "Cocody Angré",
      "II Plateaux",
      "École Internationale",
    ],
    currentStop: 1,
    nextStop: "II Plateaux",
    studentsOnBoard: 15,
    totalStudents: 25,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord Chauffeur</h1>
        <Button
          variant={isOnDuty ? "destructive" : "default"}
          onClick={() => setIsOnDuty(!isOnDuty)}
        >
          {isOnDuty ? "Terminer le service" : "Commencer le service"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Map Card */}
          <Card className="p-6">
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <MapWithNoSSR />
            </div>
          </Card>

          {/* Route Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Route Actuelle</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bus className="h-5 w-5 text-primary" />
                  <span className="font-medium">{currentRoute.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {currentRoute.studentsOnBoard}/{currentRoute.totalStudents}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Prochain arrêt: {currentRoute.nextStop}</span>
              </div>

              {/* Progress of stops */}
              <div className="relative pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progression</span>
                  <span className="text-sm font-medium">
                    {Math.round((currentRoute.currentStop / currentRoute.stops.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full transition-all"
                    style={{
                      width: `${(currentRoute.currentStop / currentRoute.stops.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Actions Rapides</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <AlertCircle className="h-6 w-6" />
                <span>Signaler un incident</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Navigation2 className="h-6 w-6" />
                <span>Navigation</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <PhoneCall className="h-6 w-6" />
                <span>Appeler l&apos;école</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <MessageSquare className="h-6 w-6" />
                <span>Messages</span>
              </Button>
            </div>
          </Card>

          {/* Student List */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Liste des Élèves</h2>
            <div className="space-y-4">
              {/* Student items would go here */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}