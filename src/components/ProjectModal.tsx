import { X, ExternalLink, Github, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Project } from "./Projects";
import { useState, useRef, useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 hover:bg-black text-white transition-all hover:scale-110 border border-white/10"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        {/* Media Section */}
        <div className="relative w-full bg-black rounded-t-2xl overflow-hidden group">
          {project.mediaType === "video" ? (
            <div className="relative">
              <video
                ref={videoRef}
                src={project.mediaSrc}
                className="w-full h-[500px] object-contain bg-black"
                autoPlay
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Custom Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider-progress"
                    style={{
                      background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                  >
                    {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                  </button>

                  {/* Volume Slider */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider-volume"
                    style={{
                      background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                    }}
                  />
                  
                  <div className="flex-1" />
                  
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Maximize size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : project.mediaType === "image" ? (
            <img
              src={project.mediaSrc}
              alt={project.title}
              className="w-full h-[500px] object-contain bg-black"
            />
          ) : null}
        </div>

        {/* Content Section */}
        <div className="p-10">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white/60 mb-3 uppercase tracking-wide">Sobre o Projeto</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              {project.detailedDescription || project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white/60 mb-3 uppercase tracking-wide">Tecnologias</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all font-semibold hover:scale-105 shadow-lg"
              >
                <ExternalLink size={20} />
                Ver Projeto
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20 hover:scale-105"
              >
                <Github size={20} />
                Ver Código
              </a>
            )}
          </div>
        </div>

        <style>{`
          .slider-progress::-webkit-slider-thumb,
          .slider-volume::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0.3);
            transition: transform 0.2s;
          }
          
          .slider-progress::-webkit-slider-thumb:hover,
          .slider-volume::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          
          .slider-progress::-moz-range-thumb,
          .slider-volume::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0.3);
            transition: transform 0.2s;
          }
          
          .slider-progress::-moz-range-thumb:hover,
          .slider-volume::-moz-range-thumb:hover {
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProjectModal;
