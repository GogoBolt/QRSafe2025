"use client";

import { useState } from "react";
import QrScanner from "react-qr-scanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan, X } from "lucide-react";

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export function QRScanner({ onScan, onError, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (data: { text: string } | null) => {
    if (data?.text) {
      onScan(data.text);
      setIsScanning(false);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
    onError?.(err);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Scanner QR Code</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {!isScanning ? (
        <Button
          className="w-full"
          onClick={() => setIsScanning(true)}
        >
          <Scan className="mr-2 h-4 w-4" />
          Commencer le scan
        </Button>
      ) : (
        <div className="relative aspect-square max-w-sm mx-auto">
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%" }}
          />
          <Button
            variant="secondary"
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
            onClick={() => setIsScanning(false)}
          >
            Annuler
          </Button>
        </div>
      )}
    </Card>
  );
}