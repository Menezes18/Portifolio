import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const bootMessages = [
  "Inicializando Sistema de Entrada...",
  "Conectando Controle...",
  "Sincronizando Ambiente...",
  "Pronto para Jogar!",
];

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);

  useEffect(() => {
    const bootSequence = setInterval(() => {
      setBootIndex((prev) => {
        if (prev < bootMessages.length - 1) return prev + 1;
        clearInterval(bootSequence);
        return prev;
      });
    }, 900);

    setTimeout(() => setLoaded(true), 1000);
    setTimeout(() => setShowContent(true), 1500);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Loading Screen */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 z-50",
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="flex flex-col items-center space-y-6">
          {/* Controller Icon (Animated Spin) */}
          <img 
            src="/images/controller.png" 
            alt="Loading Controller"
            className="w-24 h-24 animate-spin-slow drop-shadow-[0_0_10px_rgba(147,51,234,0.6)]"
          />
          
          {/* Texts */}
          <p className="text-primary text-sm tracking-wide animate-flicker">
            {bootMessages[bootIndex]}
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(155, 135, 245, 0.1) 1px, transparent 1px)', 
            backgroundSize: '30px 30px',
            transform: 'perspective(1000px) rotateX(60deg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vr-darker to-vr-dark opacity-80" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple/20 filter blur-3xl animate-float opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-neon-blue/20 filter blur-3xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className={cn(
        "container mx-auto px-6 text-center relative z-10 transition-all duration-1000 transform",
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block">Gustavo Menezes</span>
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-neon-text">
            VR · Web · Game&nbsp;Developer
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-foreground/80 max-w-xl mx-auto mb-8">
          Construo mundos digitais onde tecnologia de ponta se encontra com narrativa e usabilidade impecáveis.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#projects" className="vr-button">
            <span className="relative z-10">Ver Projetos</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 z-10",
        showContent ? "opacity-100" : "opacity-0"
      )}>
        <div className="animate-bounce">
          <ArrowDown className="text-primary" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
