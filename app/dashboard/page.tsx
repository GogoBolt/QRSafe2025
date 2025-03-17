"use client";

import { Card } from "@/components/ui/card";
import {
  Bus,
  Users,
  CreditCard,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
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
      label: "Paiements",
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

  const recentActivity = [
    {
      id: 1,
      type: "transport",
      message: "Bus #12 arrivé à l'école à 7:30",
      time: "Il y a 5 minutes",
    },
    {
      id: 2,
      type: "payment",
      message: "Paiement reçu de Parent Koné",
      time: "Il y a 15 minutes",
    },
    {
      id: 3,
      type: "student",
      message: "Nouvel élève enregistré: Amadou Touré",
      time: "Il y a 1 heure",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

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
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{activity.message}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}