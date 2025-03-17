"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Bus,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: "1",
      type: "transport",
      title: "Bus #12 arrivé à l'école",
      message: "Le bus est arrivé à l'École Internationale à 7:30",
      time: "Il y a 5 minutes",
      status: "success",
    },
    {
      id: "2",
      type: "payment",
      title: "Paiement reçu",
      message: "Paiement de 75,000 FCFA reçu de M. Koné",
      time: "Il y a 15 minutes",
      status: "success",
    },
    {
      id: "3",
      type: "alert",
      title: "Retard de bus",
      message: "Bus #15 en retard de 10 minutes sur son itinéraire",
      time: "Il y a 30 minutes",
      status: "warning",
    },
  ];

  const getIcon = (type: string, status: string) => {
    switch (type) {
      case "transport":
        return <Bus className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNotifications = notifications.filter(
    notification => filter === "all" || notification.type === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les notifications</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="payment">Paiements</SelectItem>
              <SelectItem value="alert">Alertes</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card key={notification.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${getStatusColor(notification.status)}`}>
                {getIcon(notification.type, notification.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-muted-foreground">{notification.message}</p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {notification.time}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}