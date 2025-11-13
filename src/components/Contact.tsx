import { useRef, useEffect, useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Chatbot from "./Chatbot";
import { cn } from "@/lib/utils";

/**
 * Contact section (info‑only version)
 * --------------------------------------------------
 *  – Glassmorphism card with email & socials
 *  – Decorative blurred blobs
 *  – No form/registration required
 * --------------------------------------------------
 */
const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* ──────────────────────────────────────────── */
  /* Fade‑in on scroll                           */
  /* ──────────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  /* ──────────────────────────────────────────── */
  /* Mark‑up                                     */
  /* ──────────────────────────────────────────── */
  return (
    <section id="contact" ref={sectionRef} className="relative py-32" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-6 z-10">
        {/* Heading */}
        <div
          className={cn(
            "mx-auto mb-20 max-w-2xl text-center transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-semibold text-white/70 mb-4">
            Contato
          </div>
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Entre em <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Contato</span>
          </h2>
          <p className="mt-4 text-foreground/80">
            Ficou alguma dúvida ou quer iniciar um projeto? Me encontre nos canais abaixo 👇
          </p>
        </div>

        {/* Info card */}
        <div
          className={cn(
            "mx-auto max-w-md transition-all duration-1000 delay-150",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="rounded-3xl border-2 border-white/10 bg-background/60 p-10 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:scale-[1.02]">
            {/* Email */}
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110">
                <Mail size={22} className="text-white" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <a
                  href="mailto:gustavo.e.menezes@outlook.com"
                  className="text-foreground/70 transition-colors hover:text-primary"
                >
                  gustavo.e.menezes@outlook.com
                </a>
              </div>
            </div>

            <hr className="my-8 border-white/10" />

            {/* Socials */}
            <h3 className="mb-6 text-xl font-semibold">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Menezes18"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110"
              >
                <Github size={20} className="transition-transform group-hover:-rotate-6 group-hover:scale-110" />
              </a>
              <a
                href="https://www.linkedin.com/in/gustavo-eyer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110"
              >
                <Linkedin size={20} className="transition-transform group-hover:rotate-6 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>

        
      </div>

    </section>
  );
};

export default Contact;
