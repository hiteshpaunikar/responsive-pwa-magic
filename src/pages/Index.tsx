import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import DoctorSearch from "@/components/DoctorSearch";
import { useState } from "react";

const menuItems = [
  { title: "Doctor List", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/doctors" },
  { title: "Guest House", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/guest-house" },
  { title: "Ward Charges", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/ward-charges" },
  { title: "Supplementary Item", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/supplementary" },
  { title: "Inadmissible Items", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/inadmissible" },
  { title: "Imp. Telephone Number", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/telephone" },
  { title: "Holiday List", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/holidays" },
  { title: "About", icon: "/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png", path: "/about" },
];

const Index = () => {
  const [showDoctorSearch, setShowDoctorSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#3949ab]">
      <header className="p-4 text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-1">Indian Space Research Organisation</h1>
        <h2 className="text-lg md:text-xl">Space Applications Centre</h2>
        <p className="text-sm md:text-base">Ahmedabad-380015</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => item.title === "Doctor List" && setShowDoctorSearch(true)}
            >
              <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-all bg-white/90 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-800">{item.title}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {showDoctorSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <DoctorSearch />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;