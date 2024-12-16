import DoctorSearch from "@/components/DoctorSearch";

const DoctorSearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#3949ab] py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Find a Doctor
        </h1>
        <DoctorSearch />
      </div>
    </div>
  );
};

export default DoctorSearchPage;