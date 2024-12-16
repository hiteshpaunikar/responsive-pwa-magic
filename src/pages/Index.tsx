import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-purple to-soft-peach">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full text-gray-800 mb-4">
              Welcome to the future
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance">
              Create something beautiful
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto text-balance">
              Design and build with precision and elegance
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Button size="lg" className="glass hover:bg-white/40">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="glass">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-sm bg-white/20 backdrop-blur-sm rounded-full text-gray-800 mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Crafted with attention to detail
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto text-balance">
              Every pixel and interaction has been carefully considered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 glass card-hover">
                  <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm mb-4 flex items-center justify-center">
                    {i}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
                  <p className="text-gray-700">
                    Discover how our thoughtfully designed features can enhance your experience
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
            {/* Repeat for other footer sections */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;