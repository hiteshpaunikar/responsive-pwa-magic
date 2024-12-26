import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from "date-fns";

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface HolidayResponse {
  holidays: Holiday[];
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await fetch("/src/data/holidaylist.json");
  const data: HolidayResponse = await response.json();
  return data.holidays;
};

const HolidayList = () => {
  const { data: holidays = [], isLoading, error } = useQuery<Holiday[]>({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading holidays...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error loading holiday list</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Holiday List 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Date</TableHead>
                <TableHead className="w-[50%]">Holiday</TableHead>
                <TableHead className="w-[25%]">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => (
                <TableRow key={holiday.date}>
                  <TableCell>{format(parseISO(holiday.date), "dd MMM yyyy")}</TableCell>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>{holiday.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidayList;