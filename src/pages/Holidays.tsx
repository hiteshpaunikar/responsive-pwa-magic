import HolidayList from "@/components/HolidayList";

const Holidays = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#3949ab] py-8">
      <header className="container mx-auto px-4 mb-8">
        <h1 className="text-2xl font-bold text-white">ISRO Space Applications Centre</h1>
        <p className="text-white/80">Holiday List</p>
      </header>
      <HolidayList />
    </div>
  );
};

export default Holidays;