// components/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  year: string;
  title: string;
  place: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    year: "set de 2023 - jul de 2024",
    title: "Monitor",
    place: "PUC MINAS",
    description:
      "Apoio aos alunos nos laboratórios de programação e desenvolvimento de jogos com Unity e C#. Responsável por esclarecer dúvidas, revisar projetos com foco em boas práticas e contribuir com documentação técnica de apoio.",
  },
  {
    year: "nov de 2023 - abr de 2024",
    title: "Instrutor de Programação e Games",
    place: "SuperGeeks",
    description:
      "Ministrei aulas práticas de lógica de programação e desenvolvimento de jogos com foco em Python, Java e Unity. Criei materiais didáticos personalizados e projetos gamificados para alunos de diferentes idades.",
  },
  {
    year: "abr de 2023 - jan de 2025",
    title: "Experiência VR",
    place: "Projeto SARA - UFMG",
    description:
      "Projeto voltado para reabilitação cognitiva de idosos usando realidade virtual com hand tracking no Meta Quest. Atuei na programação da experiência, coleta de dados e estruturação do backend personalizado para análise clínica.",
  },
  {
    year: "dez de 2024 - abr de 2025",
    title: "Unity Freelancer",
    place: "Rede Batista - IOCO",
    description:
      "um jogo em Unity voltado para crianças, definindo design de níveis, lógica de gameplay, UI intuitiva, deployment multiplataforma, game Mobile"
  },
  {
    year: "dez de 2024 - atual",
    title: "VR & Unity Freelancer",
    place: "Freelance",
    description:
      "Desenvolvo aplicações imersivas com foco em hand tracking, Unity, WebXR e Multiplayer. Trabalho em projetos variados, desde jogos até experiências educacionais, sempre buscando inovação e qualidade.",
  },
];

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0D0D0D' }}>
        {/* Decorative gradient blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white/70 mb-4">
            Sobre Mim
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Conhecendo <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">a Pessoa</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* FOTO + JORNADA */}
          <motion.div
            className={cn(
              "w-full md:w-[460px] bg-background border-2 border-white/10 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="/images/Gustavo.png"
                  alt="Foto de Gustavo"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <p className="text-center text-xl font-semibold text-foreground">
              Gustavo Menezes
            </p>
            <p className="text-center text-sm text-foreground/60 mb-6">
              Game Dev • Web • VR/XR
            </p>
            <div className="space-y-4 text-sm text-foreground/80">
              <h3 className="text-md font-semibold text-primary">A Jornada Digital</h3>
              <p>Sou um desenvolvedor movido pela ideia de transportar pessoas para novos mundos, seja num browser, num headset ou controle.</p>
              <p>Comecei no front-end tradicional, mas logo mergulhei em game dev e descobri o potencial da realidade virtual. Desde então, venho cruzando essas três frentes web, games e VR para entregar experiências que aliam performance, narrativa e usabilidade.</p>
              <p>Acredito que o futuro é interativo, imersivo e multiplayer. Por isso, exploro tecnologias que realmente conectem pessoas e ampliem o que é possível em entretenimento e educação.</p>
            </div>
          </motion.div>

          {/* EXPERIÊNCIA PROFISSIONAL */}
          <div className="flex-1 space-y-16">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white/70 mb-4">
                Trajetória
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experiência <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Profissional</span>
              </h2>
            </div>

            <div className="space-y-14">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-white/30 pl-6 relative transition-all duration-300 hover:border-white/60 group"
                >
                  <div className="absolute -left-2 top-1 w-4 h-4 bg-white rounded-full border-2 border-background transition-all duration-300 group-hover:scale-125 group-hover:bg-white/80" />
                  <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title} – <span className="text-foreground/80">{item.place}</span>
                  </h3>
                  <p className="text-sm text-foreground/70 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
