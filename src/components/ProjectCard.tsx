
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  description: string;
  mediaType: string;  
  mediaSrc: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  vrProject?: boolean;
  className?: string;
};

const ProjectCard = ({
  title,
  description,
  mediaSrc,
  mediaType,
  tags,
  liveUrl,
  githubUrl,
  vrProject = false,
  className,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative h-full glass-card group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
    >
      {/* Media (imagem ou vídeo) */}
      <div className="relative h-56 overflow-hidden bg-black">
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {mediaType === "video" ? (
          <video
            src={mediaSrc}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : mediaType === "image" ? (
          <img
            src={mediaSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : null}
        
        {/* "Ver Mais" badge on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-3 bg-white/95 text-black rounded-full font-semibold text-sm backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Ver Mais
          </span>
        </div>
      </div>


      {/* Content */}
      <div className="p-6 relative z-10 bg-gradient-to-b from-transparent to-[#0D0D0D]">
        <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/20 font-medium hover:bg-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10">
              +{tags.length - 4}
            </span>
          )}
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
              <span> Live Demo</span>
            </a>
          )}
          
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
