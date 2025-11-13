import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Gamepad, Laptop, Eye, Layers, Code, ChevronRight } from "lucide-react";

const VRExperience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="vr" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden flex items-center justify-center min-h-screen"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-vr-darker to-vr-darkest opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center">
        <div className={cn(
          "max-w-2xl mx-auto text-center mb-16 transition-all duration-1000 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiência <span className="text-primary">VR</span></h2>
          <p className="text-foreground/80">
            Entre na minha realidade virtual e explore um mundo de possibilidades digitais. Esta demo interativa demonstra o potencial das tecnologias imersivas.
          </p>
        </div>
        
       <div className="grid grid-cols-1 justify-center gap-10 items-center">
          {/* Features */}
          <div className={cn(
            "transition-all duration-1000 delay-500 transform order-1 md:order-2 w-full",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <h3 className="text-2xl font-bold mb-12 text-center ">Tecnologias <span className="text-primary">Imersivas</span></h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
              <div className="glass p-6 rounded-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Gamepad className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Desenvolvimento de Games VR</h4>
                    <p className="text-foreground/70 text-sm">
                      Jogos e experiências interativas utilizando Unity, Unreal Engine e WebXR para plataformas como Oculus, HTC Vive e navegadores web.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center shrink-0">
                    <Eye className="text-neon-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Visualização Arquitetônica</h4>
                    <p className="text-foreground/70 text-sm">
                      Tours virtuais em 3D de espaços arquitetônicos com interatividade e detalhes realistas para imobiliárias e projetos residenciais.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center shrink-0">
                    <Laptop className="text-neon-purple" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Treinamento Corporativo</h4>
                    <p className="text-foreground/70 text-sm">
                      Simulações VR para treinamento de funcionários com feedback em tempo real e métricas de desempenho para empresas.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-lg h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-vr-accent/20 flex items-center justify-center shrink-0">
                    <Code className="text-vr-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">WebXR & Three.js</h4>
                    <p className="text-foreground/70 text-sm">
                      Desenvolvimento de experiências VR acessíveis via navegador utilizando WebXR, Three.js e A-Frame para máxima compatibilidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VRExperience;
