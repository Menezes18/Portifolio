
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import FluidHero from "../components/FluidHero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sidebarOpen]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Fluid Shader Hero - White Background */}
      <FluidHero toggleSidebar={toggleSidebar} />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content - Black Background */}
      <main className="bg-background text-foreground">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
