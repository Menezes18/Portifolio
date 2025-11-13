
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Development",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Unity", level: 95 },
      { name: "C#", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "Three.js", level: 85 },
      { name: "Node.js", level: 82 },
    ]
  },
  {
    title: "VR & Game",
    skills: [
      { name: "Unity VR", level: 95 },
      { name: "Hand Tracking", level: 90 },
      { name: "Multiplayer", level: 92 },
      { name: "WebXR", level: 85 },
      { name: "Quest 2/3", level: 92 },
      { name: "Mirror P2P", level: 88 },
      { name: "Game Design", level: 90 },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "C# .NET", level: 88 },
      { name: "PHP/Laravel", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 78 },
    ]
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: 92 },
      { name: "Blender", level: 85 },
      { name: "UI/UX Design", level: 88 },
      { name: "Photoshop", level: 82 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Git", level: 90 },
    ]
  },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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
      id="skills" 
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={cn(
          "max-w-3xl mx-auto text-center mb-24 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white/70 mb-6">
            Tech Stack
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Minhas <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Habilidades</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Expertise em desenvolvimento de experiências imersivas, games e aplicações web de alta performance.
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={cn(
                "transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${200 + categoryIndex * 100}ms` }}
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                {category.title}
              </h3>
              
              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group"
                  >
                    {/* Skill Name and Percentage */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white/90 transition-all duration-300 group-hover:text-white">
                        {skill.name}
                      </span>
                      <span className={cn(
                        "text-xs font-semibold transition-all duration-300",
                        hoveredSkill === `${categoryIndex}-${skillIndex}` ? "text-white scale-110" : "text-white/50"
                      )}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "absolute inset-y-0 left-0 bg-gradient-to-r from-white to-white/70 rounded-full transition-all duration-1000 ease-out",
                          isVisible ? "translate-x-0" : "-translate-x-full"
                        )}
                        style={{ 
                          width: `${skill.level}%`,
                          transitionDelay: `${400 + categoryIndex * 100 + skillIndex * 50}ms`
                        }}
                      >
                        {/* Animated glow effect */}
                        <div className={cn(
                          "absolute inset-0 bg-white/30 transition-opacity duration-300",
                          hoveredSkill === `${categoryIndex}-${skillIndex}` ? "opacity-100" : "opacity-0"
                        )} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={cn(
          "mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "800ms" }}
        >
          {[
            { number: "20+", label: "Projetos" },
            { number: "5+", label: "Anos Exp" },
            { number: "20+", label: "Tecnologias" },
            { number: "10+", label: "VR Apps" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
