"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { QRScanner } from "@/components/ui/qr-scanner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ScanPage() {
  const [lastScan, setLastScan] = useState<{
    studentId: string;
    timestamp: Date;
    success: boolean;
  } | null>(null);
  const { toast } = useToast();

  const handleScan = async (data: string) => {
    try {
      // Demo: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Demo: Simulate successful scan for specific QR codes
      const success = ["ST-2024-001", "ST-2024-002", "ST-2024-003"].includes(data);
      
      setLastScan({
        studentId: data,
        timestamp: new Date(),
        success,
      });

      toast({
        title: success ? "Scan réussi" : "Scan échoué",
        description: success
          ? "L'élève a été enregistré avec succès"
          : "QR Code non reconnu",
        variant: success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Scan error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du scan",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Scanner QR Code</h1>
          <QRScanner
            onScan={handleScan}
            onError={(error) => {
              console.error("Scan error:", error);
              toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur est survenue avec la caméra",
              });
            }}
          />
        </Card>

        {lastScan && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Dernier Scan</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {lastScan.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  {lastScan.success ? "Scan réussi" : "Scan échoué"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                ID: {lastScan.studentId}
              </p>
              <p className="text-sm text-muted-foreground">
                Heure: {lastScan.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}