import React, { useState } from 'react';
import { Sparkles, Volume2, MessageSquare, Heart } from 'lucide-react';
import { speakVietnamese } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';

export type MascotMood = 'greeting' | 'acid' | 'neutral' | 'base' | 'scientist' | 'celebrating';

interface MascotPipiProps {
  mood?: MascotMood;
  customMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  soundEnabled?: boolean;
  showBubble?: boolean;
  className?: string;
}

const DEFAULT_MESSAGES: Record<MascotMood, string> = {
  greeting: 'Chào bạn! Mình là Tiến sĩ Bé Pipi. Hãy cùng mình khám phá thế giới kỳ diệu của pH và Hóa học STEM nhé!',
  acid: 'Ui da! Môi trường này có tính Acid (pH < 7), nhiều ion H⁺ làm mình cảm thấy chua và rạo rực như nước chanh tươi!',
  neutral: 'Tuyệt vời! Đây là môi trường Trung tính hoàn hảo (pH = 7), cân bằng như nước cất tinh khiết đó bạn!',
  base: 'Ôi trơn mịn quá! Môi trường Base (pH > 7) ngập tràn ion OH⁻ và bọt xà phòng mát lành!',
  scientist: 'Cậu biết không? Bắp cải tím và hoa đậu biếc cũng là chất chỉ thị màu siêu nhạy đấy! Hãy thử ngay nhé.',
  celebrating: 'Hoan hô! Bạn làm xuất sắc lắm! Một huy hiệu Nhà Khoa Học Nhí xứng đáng thuộc về bạn!'
};

const MOOD_BADGES: Record<MascotMood, { text: string; bg: string; textCol: string }> = {
  greeting: { text: 'Bé Pipi chào bạn! 👋', bg: 'bg-emerald-100', textCol: 'text-emerald-800' },
  acid: { text: 'Cảnh báo Acid! 🍋', bg: 'bg-red-100', textCol: 'text-red-800' },
  neutral: { text: 'Cân bằng Neutral 💧', bg: 'bg-teal-100', textCol: 'text-teal-800' },
  base: { text: 'Kiềm dịu êm 🧼', bg: 'bg-blue-100', textCol: 'text-blue-800' },
  scientist: { text: 'Góc Nhà Bác Học 🔬', bg: 'bg-purple-100', textCol: 'text-purple-800' },
  celebrating: { text: 'Chiến thắng vang dội! 🏆', bg: 'bg-amber-100', textCol: 'text-amber-800' }
};

export const MascotPipi: React.FC<MascotPipiProps> = ({
  mood = 'greeting',
  customMessage,
  size = 'md',
  soundEnabled = true,
  showBubble = true,
  className = ''
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  const message = customMessage || DEFAULT_MESSAGES[mood];
  const badge = MOOD_BADGES[mood];

  const handleSpeak = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEffects.playBubbleSound();
    setIsWaving(true);
    setIsTalking(true);
    setTimeout(() => setIsWaving(false), 1200);

    if (soundEnabled) {
      speakVietnamese(message, () => setIsTalking(true), () => setIsTalking(false));
    } else {
      setTimeout(() => setIsTalking(false), 2000);
    }
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 sm:w-36 sm:h-36',
    lg: 'w-44 h-44 sm:w-52 sm:h-52'
  };

  return (
    <div className={`relative flex items-center gap-4 ${className}`}>
      {/* Interactive Mascot Avatar */}
      <div 
        onClick={handleSpeak}
        title="Nhấp vào bé Pipi để lắng nghe!"
        className="group relative cursor-pointer select-none shrink-0"
      >
        {/* Glow halo behind */}
        <div className={`absolute -inset-2 rounded-full opacity-60 blur-md transition-all group-hover:opacity-90 group-hover:scale-105 ${
          mood === 'acid' ? 'bg-gradient-to-r from-red-400 to-amber-400' :
          mood === 'base' ? 'bg-gradient-to-r from-blue-400 to-purple-400' :
          mood === 'neutral' ? 'bg-gradient-to-r from-teal-400 to-emerald-400' :
          'bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400'
        }`} />

        {/* Mascot container with border */}
        <div className={`relative rounded-3xl overflow-hidden bg-white shadow-xl border-4 transition-all transform duration-300 ${
          sizeClasses[size]
        } ${
          isWaving ? 'scale-110 -rotate-3 ring-4 ring-emerald-300' : 'group-hover:scale-105 ring-2 ring-white/60'
        } ${
          mood === 'acid' ? 'border-red-400' :
          mood === 'base' ? 'border-blue-400' :
          mood === 'neutral' ? 'border-teal-400' :
          'border-emerald-400'
        }`}>
          <img 
            src="/images/pipi_mascot.jpg" 
            alt="Tiến sĩ Bé Pipi - Mascot Hóa học ECO pH" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Interactive Floating Badge on Top-Right */}
          <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-xs rounded-full p-1 shadow-sm text-emerald-600">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Talking Indicator */}
          {isTalking && (
            <div className="absolute bottom-1 inset-x-2 bg-emerald-700/80 backdrop-blur-xs text-white text-[9px] font-bold py-0.5 rounded-full text-center flex items-center justify-center gap-1 shadow-xs animate-pulse">
              <Volume2 className="w-2.5 h-2.5" />
              <span>Đang nói...</span>
            </div>
          )}
        </div>

        {/* Click Me prompt badge */}
        <div className="absolute -bottom-2 -left-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border border-white group-hover:scale-110 transition-transform flex items-center gap-0.5">
          <Heart className="w-2.5 h-2.5 fill-current text-rose-600" />
          <span>Bấm Pipi!</span>
        </div>
      </div>

      {/* Speech Bubble */}
      {showBubble && (
        <div 
          onClick={handleSpeak}
          className="relative flex-1 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-slate-200/80 shadow-md hover:border-emerald-300 transition-all cursor-pointer group/bubble max-w-lg"
        >
          {/* Triangular Tail pointing to Mascot */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent drop-shadow-xs" />

          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.textCol}`}>
                {badge.text}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">Tiến sĩ Giọt Nước pH</span>
            </div>

            <button 
              onClick={handleSpeak}
              className="p-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Đọc to bằng giọng nói tiếng Việt"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-800 leading-relaxed group-hover/bubble:text-emerald-900 transition-colors">
            "{message}"
          </p>

          <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-0.5">
              <MessageSquare className="w-2.5 h-2.5" />
              <span>Chạm để bé Pipi đọc to</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
