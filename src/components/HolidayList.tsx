import React, { useEffect, useState } from 'react';
import { HolidayData } from '../types/holiday';

const HolidayList = () => {
  const [holidayData, setHolidayData] = useState<HolidayData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('/data/holidays.json');
        if (!response.ok) {
          throw new Error('Failed to fetch holiday data');
        }
        const data: HolidayData = await response.json();
        setHolidayData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!holidayData || !holidayData.holidays) {
    return <div className="text-center p-4">No holiday data available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Holiday List 2024</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Date</th>
              <th className="px-6 py-3 border-b text-left">Day</th>
              <th className="px-6 py-3 border-b text-left">Occasion</th>
            </tr>
          </thead>
          <tbody>
            {holidayData.holidays.map((holiday, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 border-b">{holiday.date}</td>
                <td className="px-6 py-4 border-b">{holiday.day}</td>
                <td className="px-6 py-4 border-b">{holiday.occasion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayList;