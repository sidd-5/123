import { useEffect, useRef, useState } from "react";
import { Music } from "lucide-react";

interface Props {
  opened: boolean;
}

export function MusicPlayer({ opened }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  // Attempt to auto-play once the envelope is opened (user interaction is required by browsers)
  useEffect(() => {
    if (opened && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Autoplay was prevented by the browser. User can click the vinyl icon to play.");
      });
    }
  }, [opened]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {/* 
        This points to the public folder. 
        Place your MP3 file inside the 'public' folder and name it 'bg-music.mp3' 
      */}
      <audio ref={audioRef} src="/final-bg.mp3" loop preload="auto" />
      
      {/* Floating Vinyl Button */}
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-1000 ${
          opened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <button
          onClick={togglePlay}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center transition-transform hover:scale-110"
          style={{ 
            background: "linear-gradient(135deg, oklch(0.97 0.02 80), oklch(0.92 0.04 75))",
            border: "2px solid oklch(0.75 0.16 80)" 
          }}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          <div className={`relative ${isPlaying ? "animate-gentle-float" : ""}`}>
            {/* The Music Icon */}
            <Music size={24} className="text-[oklch(0.32_0.14_22)]" strokeWidth={2} />
          </div>
          
          {/* Strikethrough line when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-[2px] bg-[oklch(0.45_0.16_30)]/80 rotate-45 transform origin-center shadow-sm" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
