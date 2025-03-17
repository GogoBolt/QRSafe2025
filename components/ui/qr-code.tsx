"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  label?: string;
}

export function QRCodeDisplay({ value, size = 256, className, label }: QRCodeDisplayProps) {
  return (
    <Card className={cn("p-4 flex flex-col items-center gap-4", className)}>
      <div className="bg-white p-4 rounded-lg">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={true}
        />
      </div>
      {label && (
        <p className="text-sm text-muted-foreground text-center">{label}</p>
      )}
    </Card>
  );
}