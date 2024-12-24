import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface HolidaysByMonth {
  [key: string]: Holiday[];
}

const fetchHolidays = async () => {
  const response = await fetch("/src/data/holidaylist.json");
  const data = await response.json();
  return data.holidays;
};

const HolidayList = () => {
  const { data: holidays = [], isLoading, error } = useQuery({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading holidays...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error loading holiday list</div>;
  }

  const holidaysByMonth = holidays.reduce((acc: HolidaysByMonth, holiday: Holiday) => {
    const month = format(parseISO(holiday.date), "MMMM yyyy");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(holiday);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Holiday List 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
            <div key={month} className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">{month}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Holiday</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthHolidays.map((holiday) => (
                    <TableRow key={holiday.date}>
                      <TableCell>{format(parseISO(holiday.date), "dd MMM yyyy")}</TableCell>
                      <TableCell>{holiday.name}</TableCell>
                      <TableCell>{holiday.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidayList;