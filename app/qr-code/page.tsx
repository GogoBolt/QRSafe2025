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
import { QRCodeDisplay } from "@/components/ui/qr-code";
import { ArrowLeft, Edit, Trash, Download, Search, UserCheck } from "lucide-react";
import Link from "next/link";
import { SCHOOL_YEARS, CLASSES } from "@/lib/types";

interface StudentInfo {
  id: string;
  firstName: string;
  lastName: string;
  matricule: string;
}

export default function QRCodePage() {
  const [schoolYear, setSchoolYear] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [matricule, setMatricule] = useState<string>("");
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string>("");

  // Demo data - In a real app, this would come from your database
  const demoStudents: StudentInfo[] = [
    { id: "1", firstName: "Jean", lastName: "Dupont", matricule: "2024-001" },
    { id: "2", firstName: "Marie", lastName: "Koné", matricule: "2024-002" },
  ];

  const handleMatriculeSearch = () => {
    const student = demoStudents.find(s => s.matricule === matricule);
    if (student) {
      setStudentInfo(student);
      setQrCodeData(JSON.stringify({
        id: student.id,
        matricule: student.matricule,
        schoolYear,
        class: selectedClass,
        timestamp: new Date().toISOString()
      }));
    } else {
      setStudentInfo(null);
      setQrCodeData("");
    }
  };

  const handleDownload = () => {
    // Implement QR code download logic
    console.log("Downloading QR code...");
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
            <h1 className="text-2xl font-bold">Générer QR Code</h1>
          </div>
        </div>

        <div className="space-y-6 max-w-md">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Année Scolaire</label>
              <Select value={schoolYear} onValueChange={setSchoolYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'année scolaire" />
                </SelectTrigger>
                <SelectContent>
                  {SCHOOL_YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Classe</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la classe" />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map((classe) => (
                    <SelectItem key={classe.value} value={classe.value}>
                      {classe.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Matricule</label>
              <div className="flex gap-2">
                <Input
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  placeholder="Ex: 2024-001"
                />
                <Button onClick={handleMatriculeSearch} variant="secondary">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {studentInfo && (
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{studentInfo.firstName} {studentInfo.lastName}</p>
                    <p className="text-sm text-muted-foreground">Matricule: {studentInfo.matricule}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {qrCodeData && (
            <div className="space-y-6">
              <QRCodeDisplay
                value={qrCodeData}
                size={256}
                label={`${studentInfo?.firstName} ${studentInfo?.lastName} - ${selectedClass}`}
              />

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}