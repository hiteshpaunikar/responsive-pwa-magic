export interface Doctor {
  AMODOCTORCODE: string;
  DOCTORTYPE: string;
  PANNO: string;
  AMODOCTORNAME: string;
  MEDICINETYPE: string;
  AMOHOUSENO: string;
  AMOSTREET: string;
  AMOPLACE: string;
  AMOPINCODE: string;
  AMOTIMINGS: string;
  CONSULTPLACE: string;
  AMOPHONENO: string;
  AMOAREANAME: string;
  MEDDISCIPLNAME: string;
  ADDRESSTYPE: string;
  GEOLOCATION: string;
  PRIMARYPHONE: string;
}

export interface DoctorsData {
  version: string;
  Doctor: Doctor[];
}