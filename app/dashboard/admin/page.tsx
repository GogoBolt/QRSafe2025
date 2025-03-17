"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Bus,
  Users,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Calendar,
  Map,
  Settings,
} from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      icon: <Bus className="h-6 w-6" />,
      label: "Bus Actifs",
      value: "12",
      change: "+2",
      changeType: "positive",
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "Élèves",
      value: "1,234",
      change: "+15",
      changeType: "positive",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      label: "Revenus",
      value: "2.5M FCFA",
      change: "+12%",
      changeType: "positive",
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      label: "Incidents",
      value: "0",
      change: "-2",
      changeType: "positive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord Administrateur</h1>
        <div className="flex items-center gap-4">
          <Settings className="h-6 w-6 text-muted-foreground cursor-pointer" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="map">Carte en direct</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={
                        stat.changeType === "positive"
                          ? "text-green-600 text-sm flex items-center gap-1"
                          : "text-red-600 text-sm flex items-center gap-1"
                      }
                    >
                      <TrendingUp className="h-4 w-4" />
                      {stat.change}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Activité Récente</h2>
            <div className="space-y-4">
              {/* Activity items */}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="p-6">
            <div className="h-[600px] w-full rounded-lg overflow-hidden">
              <MapWithNoSSR />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="planning">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Planning des Bus</h2>
            {/* Planning content */}
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Rapports</h2>
            {/* Reports content */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}