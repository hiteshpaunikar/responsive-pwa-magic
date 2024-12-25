import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a237e] to-[#3949ab] flex flex-col">
      <header className="p-6 text-white text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Indian Space Research Organisation</h1>
        <h2 className="text-xl md:text-2xl font-semibold">Space Applications Centre</h2>
        <p className="text-sm md:text-base text-white/80 mt-2">Ahmedabad-380015</p>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => navigate(item.path)}
              className="cursor-pointer"
            >
              <Card className="p-4 text-center h-full flex flex-col items-center justify-center hover:shadow-lg transition-all bg-white/90 backdrop-blur-sm border border-gray-200">
                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 flex items-center justify-center">
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h3 className="text-sm md:text-base font-medium text-gray-800 text-balance">
                  {item.title}
                </h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;