import React from 'react';
import { Camera, Layers, BookOpen, FlaskConical, Home, Droplets, Gamepad2, FileText } from 'lucide-react';
import { AppTab } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface MobileNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const handleNav = (tab: AppTab) => {
    soundEffects.playClickSound();
    setActiveTab(tab);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 py-1.5 shadow-xl">
      <div className="flex items-center justify-around overflow-x-auto">
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'home' ? 'text-emerald-700 font-black bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Trang chủ</span>
        </button>

        <button
          onClick={() => handleNav('camera')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'camera' ? 'text-emerald-700 font-black bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Camera className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Camera</span>
        </button>

        <button
          onClick={() => handleNav('virtuallab')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'virtuallab' ? 'text-amber-700 font-black bg-amber-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FlaskConical className="w-5 h-5 mb-0.5 text-amber-600" />
          <span className="text-[10px]">Lab Ảo</span>
        </button>

        <button
          onClick={() => handleNav('scale')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'scale' ? 'text-indigo-700 font-black bg-indigo-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Droplets className="w-5 h-5 mb-0.5 text-indigo-600" />
          <span className="text-[10px]">Thang pH</span>
        </button>

        <button
          onClick={() => handleNav('minigame')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'minigame' ? 'text-purple-700 font-black bg-purple-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Gamepad2 className="w-5 h-5 mb-0.5 text-purple-600" />
          <span className="text-[10px]">Game</span>
        </button>

        <button
          onClick={() => handleNav('teacher')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'teacher' ? 'text-blue-700 font-black bg-blue-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5 text-blue-600" />
          <span className="text-[10px]">Báo Cáo</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'library' ? 'text-teal-700 font-black bg-teal-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kho mẫu</span>
        </button>

        <button
          onClick={() => handleNav('knowledge')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors shrink-0 ${
            activeTab === 'knowledge' ? 'text-sky-700 font-black bg-sky-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kiến thức</span>
        </button>
      </div>
    </div>
  );
};
