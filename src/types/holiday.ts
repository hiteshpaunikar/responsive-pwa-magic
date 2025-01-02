export interface Holiday {
  date: string;
  day: string;
  occasion: string;
}

export interface HolidayData {
  holidays: Holiday[];
}