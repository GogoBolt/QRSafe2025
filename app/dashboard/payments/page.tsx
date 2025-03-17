"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

export default function PaymentsPage() {
  const [period, setPeriod] = useState("month");

  const stats = [
    {
      title: "Revenus du mois",
      value: "2.5M FCFA",
      change: "+12%",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Paiements en attente",
      value: "450K FCFA",
      change: "15 élèves",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Élèves actifs",
      value: "1,234",
      change: "+15",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const transactions = [
    {
      id: "1",
      date: "2024-03-15",
      parent: "M. Koné",
      student: "Sophie Koné",
      amount: "75,000 FCFA",
      status: "completed",
      type: "Transport",
    },
    {
      id: "2",
      date: "2024-03-14",
      parent: "Mme. Touré",
      student: "Lucas Touré",
      amount: "75,000 FCFA",
      status: "pending",
      type: "Transport",
    },
    {
      id: "3",
      date: "2024-03-13",
      parent: "M. Diabaté",
      student: "Emma Diabaté",
      amount: "75,000 FCFA",
      status: "completed",
      type: "Transport",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  {stat.icon}
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Transactions Récentes</h2>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Élève</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(transaction.date).toLocaleDateString("fr-FR")}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.parent}</TableCell>
                  <TableCell>{transaction.student}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      {transaction.type}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}