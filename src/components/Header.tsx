
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contato" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-1 group relative z-10"
            >
              <span className="transition-all duration-300 group-hover:text-white/70">GM</span>
              <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">DEV</span>
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-5 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* CTA Button Desktop */}
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:flex px-7 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              Fale Comigo
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 pt-24 pb-8 px-6 transition-all duration-500",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-6 py-4 rounded-2xl text-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10",
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className={cn(
              "mt-6 block px-6 py-4 rounded-2xl bg-white text-black font-semibold text-center text-lg transition-all duration-300 hover:bg-white/90",
              mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}
            style={{ transitionDelay: `${navItems.length * 50}ms` }}
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
