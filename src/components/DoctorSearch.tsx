import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";

interface Doctor {
  AMODOCTORCODE: string;
  AMODOCTORNAME: string;
  MEDICINETYPE: string;
  AMOTIMINGS: string;
  AMOPHONENO: string;
  AMOAREANAME: string;
  MEDDISCIPLNAME: string;
  GEOLOCATION: string;
  AMOHOUSENO: string;
  AMOSTREET: string;
  AMOPLACE: string;
}

const doctors: Doctor[] = [
  {
    "AMODOCTORCODE": "AM04",
    "AMODOCTORNAME": "DR. ASHISH JOSHI",
    "MEDICINETYPE": "ALLOPATHY",
    "AMOTIMINGS": "0900-1400, 1700-2100",
    "AMOPHONENO": "952717231363 (C) 239533 (R)",
    "AMOAREANAME": "BOPAL AMBLI",
    "MEDDISCIPLNAME": "GP (AMO)",
    "GEOLOCATION": "23.033616, 72.465060",
    "AMOHOUSENO": "38 DARSHAN COMPLEX",
    "AMOSTREET": "OPP PURUSHOTTAM  NAGAR STAND",
    "AMOPLACE": "BOPAL AHMEDABAD"
  },
  {
    "AMODOCTORCODE": "AM05",
    "AMODOCTORNAME": "DR. B L KABRA",
    "MEDICINETYPE": "ALLOPATHY",
    "AMOTIMINGS": "1100-1300/1930-2130",
    "AMOPHONENO": "22175306(C) 26861188 (R)",
    "AMOAREANAME": "CHAMANPURA CIVIL",
    "MEDDISCIPLNAME": "GP (AMO)",
    "GEOLOCATION": "23.046846, 72.604726",
    "AMOHOUSENO": "CHAMANPURA CHAKLA",
    "AMOSTREET": "NR. CIVIL HOSPITAL",
    "AMOPLACE": "CHAMANPURA,AHMEDABAD"
  },
  {
    "AMODOCTORCODE": "AM05",
    "AMODOCTORNAME": "DR. B L KABRA",
    "MEDICINETYPE": "ALLOPATHY",
    "AMOTIMINGS": "1100-1300,1930-2130",
    "AMOPHONENO": "22178306",
    "AMOAREANAME": "SHAHIBAUG",
    "MEDDISCIPLNAME": "GP (AMO)",
    "GEOLOCATION": "23.0552728,72.5969482",
    "AMOHOUSENO": "A-2,JAYPREM SOCIETY,",
    "AMOSTREET": "NR. RAJASTHAN HOSPITAL",
    "AMOPLACE": "SHAHIBAUG"
  }
];

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = doctors.filter(doctor => 
      doctor.AMODOCTORNAME.toLowerCase().includes(term) ||
      doctor.AMOAREANAME.toLowerCase().includes(term) ||
      doctor.MEDDISCIPLNAME.toLowerCase().includes(term)
    );
    
    setFilteredDoctors(filtered);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Input
        type="text"
        placeholder="Search doctors by name, area, or specialization..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full"
      />
      
      <div className="grid gap-4 md:grid-cols-2">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.AMODOCTORCODE} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-primary">{doctor.AMODOCTORNAME}</h3>
              <p className="text-sm text-muted-foreground">{doctor.MEDDISCIPLNAME}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{`${doctor.AMOHOUSENO}, ${doctor.AMOSTREET}, ${doctor.AMOPLACE}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.AMOTIMINGS}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{doctor.AMOPHONENO}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorSearch;
