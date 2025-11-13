
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Mail, Code } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState("home");


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      if (isOpen) toggleSidebar();
    }
  };

  return (
    <>
      {/* Sidebar Trigger Button - Minimalista B&W */}
      <button 
        className={cn(
          "fixed top-6 right-6 z-50 w-12 h-12 rounded-full",
          "bg-white border-2 border-black/10",
          "flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "hover:scale-110 hover:rotate-90 hover:shadow-xl hover:shadow-white/30",
          "active:scale-95",
          isOpen && "rotate-90 scale-110 bg-black border-white/20"
        )}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
      >
        <div className="relative">
          {isOpen ? (
            <X size={22} className="text-white" strokeWidth={2.5} />
          ) : (
            <Menu size={22} className="text-black" strokeWidth={2.5} />
          )}
        </div>
      </button>

      {/* Sidebar Panel - Minimalista B&W */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 z-40",
          "bg-black/95 backdrop-blur-2xl border-l border-white/10",
          "shadow-2xl shadow-black/50",
          "transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          {/* Header minimalista */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Menu Principal
            </h2>
            <div className="h-1 w-16 bg-white rounded-full" />
          </div>

          <nav className="space-y-3 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home"
                  onClick={() => scrollToSection("home")}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl",
                    "transition-all duration-300 group",
                    "hover:bg-white/10 hover:border-l-4 hover:border-white hover:pl-6",
                    activeSection === "home" 
                      ? "bg-white/15 border-l-4 border-white pl-6" 
                      : "text-white/60"
                  )}
                >
                  <Home size={22} className={cn(
                    "transition-all duration-300",
                    activeSection === "home" ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "text-base font-medium transition-all duration-300",
                    activeSection === "home" ? "text-white" : "group-hover:text-white"
                  )}>Início</span>
                </a>
              </li>
              <li>
                <a 
                  href="#about"
                  onClick={() => scrollToSection("about")}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl",
                    "transition-all duration-300 group",
                    "hover:bg-white/10 hover:border-l-4 hover:border-white hover:pl-6",
                    activeSection === "about" 
                      ? "bg-white/15 border-l-4 border-white pl-6" 
                      : "text-white/60"
                  )}
                >
                  <User size={22} className={cn(
                    "transition-all duration-300",
                    activeSection === "about" ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "text-base font-medium transition-all duration-300",
                    activeSection === "about" ? "text-white" : "group-hover:text-white"
                  )}>Sobre Mim</span>
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  onClick={() => scrollToSection("projects")}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl",
                    "transition-all duration-300 group",
                    "hover:bg-white/10 hover:border-l-4 hover:border-white hover:pl-6",
                    activeSection === "projects" 
                      ? "bg-white/15 border-l-4 border-white pl-6" 
                      : "text-white/60"
                  )}
                >
                  <Briefcase size={22} className={cn(
                    "transition-all duration-300",
                    activeSection === "projects" ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "text-base font-medium transition-all duration-300",
                    activeSection === "projects" ? "text-white" : "group-hover:text-white"
                  )}>Projetos</span>
                </a>
              </li>
              <li>
                <a 
                  href="#skills"
                  onClick={() => scrollToSection("skills")}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl",
                    "transition-all duration-300 group",
                    "hover:bg-white/10 hover:border-l-4 hover:border-white hover:pl-6",
                    activeSection === "skills" 
                      ? "bg-white/15 border-l-4 border-white pl-6" 
                      : "text-white/60"
                  )}
                >
                  <Code size={22} className={cn(
                    "transition-all duration-300",
                    activeSection === "skills" ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "text-base font-medium transition-all duration-300",
                    activeSection === "skills" ? "text-white" : "group-hover:text-white"
                  )}>Habilidades</span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  onClick={() => scrollToSection("contact")}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl",
                    "transition-all duration-300 group",
                    "hover:bg-white/10 hover:border-l-4 hover:border-white hover:pl-6",
                    activeSection === "contact" 
                      ? "bg-white/15 border-l-4 border-white pl-6" 
                      : "text-white/60"
                  )}
                >
                  <Mail size={22} className={cn(
                    "transition-all duration-300",
                    activeSection === "contact" ? "text-white" : "text-white/60 group-hover:text-white"
                  )} />
                  <span className={cn(
                    "text-base font-medium transition-all duration-300",
                    activeSection === "contact" ? "text-white" : "group-hover:text-white"
                  )}>Contato</span>
                </a>
              </li>
            </ul>
          </nav>

          
        </div>
      </div>

      {/* Backdrop overlay modernizado */}
      {isOpen && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-30",
            "transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
