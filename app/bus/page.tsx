"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { Bus } from "@/lib/types";

export default function AddBusPage() {
  const [formData, setFormData] = useState<Partial<Bus>>({
    busNumber: "",
    licensePlate: "",
    model: "",
    color: "",
    year: new Date().getFullYear(),
    capacity: 30,
  });

  // Demo data
  const drivers = [
    { id: "1", name: "Jean Dupont", phone: "+225 0758966156" },
    { id: "2", name: "Marie Martin", phone: "+225 0758966157" },
  ];

  const routes = [
    { id: "1", name: "Route Nord" },
    { id: "2", name: "Route Sud" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Ajouter un Bus</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Numéro du Bus</label>
              <Input
                value={formData.busNumber}
                onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                placeholder="Ex: BUS-001"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Immatriculation</label>
              <Input
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                placeholder="Ex: 123 ABC 01"
                className="uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Modèle</label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Ex: Toyota Coaster"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Année</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  min={1990}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Couleur</label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Ex: Blanc"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Capacité</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  min={1}
                  max={100}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Chauffeur</label>
              <Select
                value={formData.driver?.id}
                onValueChange={(value) => {
                  const driver = drivers.find(d => d.id === value);
                  setFormData({ ...formData, driver: driver ? { id: driver.id, name: driver.name, phone: driver.phone } : undefined });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Route</label>
              <Select
                value={formData.route?.id}
                onValueChange={(value) => {
                  const route = routes.find(r => r.id === value);
                  setFormData({ ...formData, route: route ? { id: route.id, name: route.name } : undefined });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="flex-1">
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}