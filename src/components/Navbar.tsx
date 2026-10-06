import React from 'react';
import { Atom, Volume2, VolumeX, Sparkles, BookOpen, Camera, FlaskConical, Layers, Settings, Gamepad2, FileText, Droplets } from 'lucide-react';
import { AppTab } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenAiTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenAiTutor
}) => {
  const handleNav = (tab: AppTab) => {
    soundEffects.playClickSound();
    setActiveTab(tab);
  };

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { tab: 'home', label: 'Trang chủ', icon: null },
    { tab: 'camera', label: 'Nhận diện pH', icon: <Camera className="w-4 h-4 text-emerald-600" /> },
    { tab: 'virtuallab', label: 'Lab Ảo', icon: <FlaskConical className="w-4 h-4 text-amber-500" />, badge: 'Mới' },
    { tab: 'scale', label: 'Thang pH', icon: <Droplets className="w-4 h-4 text-indigo-500" />, badge: 'Mới' },
    { tab: 'minigame', label: 'Mini Game', icon: <Gamepad2 className="w-4 h-4 text-purple-600" /> },
    { tab: 'teacher', label: 'Báo Cáo', icon: <FileText className="w-4 h-4 text-blue-600" /> },
    { tab: 'library', label: 'Kho mẫu', icon: <Layers className="w-4 h-4 text-teal-600" /> },
    { tab: 'knowledge', label: 'Kiến thức', icon: <BookOpen className="w-4 h-4 text-sky-600" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand with Mascot Avatar */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md group-hover:scale-105 transition-transform shrink-0">
              <img 
                src="/images/pipi_mascot.jpg" 
                alt="ECO pH Mascot" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-xl bg-gradient-to-r from-emerald-700 via-teal-600 to-indigo-700 bg-clip-text text-transparent">
                  ECO pH
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  STEM
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Trợ lý nhận diện chất chỉ thị & Thí nghiệm ảo</p>
            </div>
          </div>

          {/* Navigation links for desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.tab}
                onClick={() => handleNav(item.tab)}
                className={`relative px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                  activeTab === item.tab 
                    ? 'bg-emerald-50 text-emerald-800 shadow-2xs' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAiTutor}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">HỎI ECO AI</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClickSound();
                setSoundEnabled(!soundEnabled);
              }}
              title={soundEnabled ? "Tắt âm thanh đọc" : "Bật âm thanh đọc"}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <button
              onClick={() => handleNav('calibration')}
              title="Cài đặt & Hiệu chuẩn màu"
              className={`p-2.5 rounded-xl border transition-colors ${
                activeTab === 'calibration' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
