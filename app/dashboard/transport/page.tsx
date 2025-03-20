"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bus,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function TransportPage() {
  const buses = [
    {
      id: "BUS-001",
      name: "Bus 1",
      driver: "Kouamé Jean",
      status: "En route",
      location: "Riviera Palmeraie",
      nextStop: "École Internationale",
      students: 25,
      capacity: 30,
      onTime: true,
    },
    {
      id: "BUS-002",
      name: "Bus 2",
      driver: "Koné Ibrahim",
      status: "À l'arrêt",
      location: "Cocody Angré",
      nextStop: "Lycée Classique",
      students: 28,
      capacity: 30,
      onTime: true,
    },
    {
      id: "BUS-003",
      name: "Bus 3",
      driver: "Touré Mohamed",
      status: "En retard",
      location: "Yopougon",
      nextStop: "Collège Modern",
      students: 22,
      capacity: 30,
      onTime: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion du Transport</h1>
        <Link href="/bus">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un Bus
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{bus.name}</h3>
                    <p className="text-sm text-muted-foreground">{bus.driver}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    bus.status === "En route"
                      ? "bg-green-100 text-green-800"
                      : bus.status === "À l'arrêt"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {bus.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{bus.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Prochain arrêt: {bus.nextStop}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {bus.students}/{bus.capacity} élèves
                  </span>
                </div>
                {!bus.onTime && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Retard de 10 minutes</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Détails
                </Button>
                <Button variant="outline" className="flex-1">
                  Itinéraire
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}