"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2, XCircle } from "lucide-react";

// Demo data
const scanHistory = [
  {
    id: "1",
    studentName: "Sophie Koné",
    studentAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie",
    qrCode: "ST-2024-001",
    timestamp: new Date(2024, 2, 16, 8, 30),
    success: true,
    scannedBy: "M. Touré",
    type: "Entrée",
  },
  {
    id: "2",
    studentName: "Lucas Touré",
    studentAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucas",
    qrCode: "ST-2024-002",
    timestamp: new Date(2024, 2, 16, 8, 35),
    success: true,
    scannedBy: "M. Touré",
    type: "Entrée",
  },
  {
    id: "3",
    studentName: "Emma Diabaté",
    studentAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma",
    qrCode: "ST-2024-003",
    timestamp: new Date(2024, 2, 16, 12, 0),
    success: true,
    scannedBy: "Mme. Koné",
    type: "Cantine",
  },
];

export default function ScanHistoryPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Historique des Scans</h1>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élève</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scanné par</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scanHistory.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={scan.studentAvatar} alt={scan.studentName} />
                        <AvatarFallback>{scan.studentName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{scan.studentName}</p>
                        <p className="text-sm text-muted-foreground">ID: {scan.qrCode}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {format(scan.timestamp, "d MMMM yyyy", { locale: fr })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(scan.timestamp, "HH:mm")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{scan.type}</TableCell>
                  <TableCell>{scan.scannedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {scan.success ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Succès</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Échec</span>
                        </>
                      )}
                    </div>
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