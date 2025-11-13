import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

/**
 * Project category type – matches the available filter buttons.
 */
export type FilterType =
  | "all"
  | "vr"
  | "web"
  | "game"
  | "mobile"
  | "api"; 

/**
 * Project model shared between this component and <ProjectCard />.
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  mediaSrc: string;  
  mediaType: string;  
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  categories: Exclude<FilterType, "all">[]; // allows more than one category
}

/**
 * You can feed this array from an API or CMS later – it is strongly typed now
 * and each entry declares its *category*, allowing any number of future
 * filters (mobile, desktop, etc.) with zero extra code changes.
 */
const projects: Project[] = [
  {
    id: 1,
    title: "VR para o Doutorado Sara",
    description:
      "Projeto de realidade virtual desenvolvido para pesquisa de doutorado, focado em avaliação e coleta de dados usando tecnologias imersivas.",
    detailedDescription:
      "Este projeto foi desenvolvido como parte de uma pesquisa de doutorado em parceria com a área de psicologia. Criei um ambiente de realidade virtual completo que permite a avaliação cognitiva e coleta de dados de pacientes de forma imersiva e controlada. O sistema integra hardware VR com hand tracking para capturar interações naturais, enquanto um backend robusto em PHP e SQL armazena e processa os dados coletados. A interface web em React permite que pesquisadores acompanhem resultados em tempo real e gerem relatórios detalhados. O projeto utiliza técnicas avançadas de modelagem 3D no Blender para criar ambientes realistas e acolhedores para os participantes.",
    mediaType: "video",
    mediaSrc: "/videos/Sara.mp4",
    tags: ["Unity", "VR", "C#", "React", "SQL", "PHP", "HandTracker", "Blender"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["vr", "web"],
  },
  {
    id: 9,
    title: "TCC Banana Party - 7 semestre",
    description:
      "Jogo desenvolvido como Trabalho de Conclusão de Curso, um party game multiplayer com mini-jogos temáticos e mecânicas competitivas, focado em diversão e interação social entre jogadores.",
    detailedDescription:
      "Banana Party é o meu Trabalho de Conclusão de Curso, um party game multiplayer desenvolvido na Unity que traz diversão e competição para até 4 jogadores. O jogo conta com diversos mini-jogos únicos, cada um com mecânicas diferentes e desafiadoras. Implementei todo o sistema de networking multiplayer, garantindo sincronia perfeita entre os jogadores, sistema de pontuação dinâmico, transições suaves entre mini-jogos, e uma interface intuitiva. O projeto demonstra domínio completo do ciclo de desenvolvimento de jogos, desde concept art e game design até programação avançada e polimento final.",
    mediaType: "video",
    mediaSrc: "/videos/BananaParty.mp4",
    tags: ["Unity", "C#", "Multiplayer", "Game Design", "TCC"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"],
  },
  {
    id: 10,
    title: "UEMG Anatomia do Cérebro VR",
    description:
      "Projeto de realidade virtual educacional desenvolvido para a UEMG, focado no ensino de anatomia do cérebro humano através de uma experiência imersiva e interativa, permitindo exploração detalhada das estruturas cerebrais.",
    detailedDescription:
      "Aplicação educacional de realidade virtual criada para a Universidade do Estado de Minas Gerais (UEMG) que revoluciona o ensino de anatomia cerebral. Os estudantes podem explorar um modelo 3D ultra-detalhado do cérebro humano em escala real, interagindo diretamente com cada estrutura através de hand tracking. O sistema permite destacar, isolar e obter informações detalhadas sobre cada região cerebral, facilitando a compreensão espacial e funcional. Implementei um sistema de quiz interativo, modo de visualização por camadas, e narração educativa. O projeto recebeu feedback extremamente positivo de professores e alunos, aumentando significativamente o engajamento e retenção de conhecimento.",
    mediaType: "video",
    mediaSrc: "/videos/Uemg.mp4",
    tags: ["Unity", "VR", "C#", "Educação", "Anatomia", "HandTracker"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["vr"],
  },
  {
    id: 11,
    title: "UEMG Anatomia VR e AR",
    description:
      "Projeto de realidade virtual e aumentada desenvolvido para a UEMG, disponível para óculos VR e dispositivos móveis, focado no ensino de anatomia através de experiências imersivas e interativas.",
    detailedDescription:
      "Aplicação educacional multiplataforma em desenvolvimento para a Universidade do Estado de Minas Gerais (UEMG), com previsão de início em fevereiro de 2026. O projeto oferecerá duas modalidades de acesso: modo VR completo para óculos de realidade virtual, proporcionando imersão total no estudo anatômico, e modo mobile para smartphones, permitindo exploração em realidade aumentada. Os estudantes poderão explorar modelos 3D ultra-detalhados de anatomia humana em escala real, com interação natural através de hand tracking em VR e gestos touch em dispositivos móveis. A versão mobile utilizará AR para sobrepor modelos anatômicos no ambiente real, facilitando o estudo em qualquer lugar. O sistema incluirá recursos como destacar estruturas, modo de visualização por camadas, quiz interativo, narração educativa e sincronização de progresso entre dispositivos.",
    mediaType: "video",
    mediaSrc: "/videos/",
    tags: ["Unity", "VR", "AR", "C#", "Mobile", "Educação", "Anatomia", "HandTracker", "Cross-Platform"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["vr"],
  },
  {
    id: 2,
    title: "IET Hackathon 2024",
    description:
      "Solução VR desenvolvida para avaliação de distúrbios psicológicos em crianças e idosos. Implementei as tarefas Corsi, Nine Peg Role e Grooved em ambiente virtual, permitindo coleta e análise de dados através de um site integrado.",
    mediaType: "video",
    mediaSrc: "/videos/iet.mp4", 
    tags: ["Unity", "VR", "C#", "React", "SQL", "PHP", "HandTracker", "Blender"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["vr", "web"],
  },
  {
    id: 3,
    title: "Karawara",
    description:
      "Jogo de RPG desenvolvido no 5º e 6º período, inspirado no folclore brasileiro. Fui responsável pela programação, incluindo movimentação do player, inteligência artificial dos bosses, sistema de combate, habilidades, NavMesh para movimentação dos inimigos, árvore de habilidades, ajustes de sensibilidade da câmera, interações com NPCs e otimizações gerais do jogo.",
    mediaType: "video",
    mediaSrc: "/videos/karawara2.mp4", 
    tags: ["Unity", "C#", "Blender", "Game Design", "Multiplayer"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },
  {
    id: 4,
    title: "DuckDuck Run",
    description:
      "Jogo runner desenvolvido no segundo período da faculdade, onde fui responsável por toda a programação. O jogo apresenta um sistema de save, missões, loja, personalização de personagens e muito mais, oferecendo uma experiência divertida e dinâmica para os jogadores.",
      mediaType: "video",
      mediaSrc: "/videos/DuckDuckRun.mp4", 
    tags: ["Unity", "C#" ],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },
  {
    id: 5,
    title: "Pinglu Defense",
    description:
      "Jogo tower defense criado em uma gamejam de 72 horas. Como programador principal, desenvolvi a IA dos inimigos, movimentação, preview de armas, sistema de câmera e loja, criando uma experiência estratégica envolvente.",
      mediaType: "video",
      mediaSrc: "/videos/pinglu.mp4", 
    tags: ["Unity", "C#" ],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },
  {
    id: 6,
    title: "A Gota D'Água",
    description:
      "Jogo sério de simulação subaquática desenvolvido em 48 horas. Implementei a movimentação do player, sistema de oxigênio e mecânica de manipulação de objetos inspirada em Slime Rancher, focando na conscientização ambiental.",
      mediaType: "video",
      mediaSrc: "/videos/gota.mp4", 
    tags: ["Unity", "C#" ],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },
  {
    id: 7,
    title: "Medieval Land",
    description:
      "Simulador de fazenda medieval onde desenvolvi 80% da programação, incluindo sistemas de plantação, IA de animais e NPCs, ciclo dia/noite, VFX das estações e calendário sazonal, além de grande parte dos efeitos visuais.",
      mediaType: "video",
      mediaSrc: "/videos/medieval.mp4", 
    tags: ["Unity", "C#" ],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },
  {
    id: 8,
    title: "Rede Batista de Educação",
    description:
      "Participei do desenvolvimento de um jogo mobile em Unity voltado para o público infantil, criado para a Rede Batista, com foco em ensino cristão. O jogo conta com mini-jogos educativos que incentivam a leitura da Bíblia e a prática de valores como Ir, Orar, Compartilhar e Ofertar.",
      mediaType: "image",
      mediaSrc: "/videos/IconeIoco.jpg", 
    tags: ["Unity", "C#", "Mobile", "iOS", "Android"],
    liveUrl: "https://github.com/Menezes18",
    githubUrl: "https://github.com/Menezes18",
    categories: ["game"]
  },

];

/**
 * <Projects /> section – now 100 % category-agnostic. 🪄
 */
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Lazy-reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Unified filtering logic – extend with new categories without touching this
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ backgroundColor: '#0D0D0D' }} />
        {/* Decorative gradient blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 border border-white/20">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Meus Projetos
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Uma seleção dos meus trabalhos recentes em desenvolvimento web, jogos e realidade virtual.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {(["all", "vr", "game", "web"] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 border-2",
                activeFilter === filter
                  ? "bg-white text-black border-white shadow-lg scale-105"
                  : "bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/40",
              )}
            >
              {filter !== "all" && <Filter size={16} />}
              <span>
                {filter === "all"
                  ? "Todos"
                  : filter === "vr"
                  ? "VR"
                  : filter === "game"
                  ? "Games"
                  : "Web"}
              </span>
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer">
              {/* NOTE: ProjectCard already receives every field, so no extra props needed */}
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default Projects;
