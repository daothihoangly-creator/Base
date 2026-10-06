import React, { useState } from 'react';
import { FlaskConical, Droplets, RotateCcw, BookmarkPlus, Sparkles, CheckCircle2, Info, ArrowLeft, ArrowRight, Zap, Volume2 } from 'lucide-react';
import { IndicatorType, Sample } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speakVietnamese } from '../utils/speech';
import { MascotPipi, MascotMood } from './MascotPipi';

interface VirtualLabViewProps {
  onBackHome: () => void;
  onSaveSample: (sampleData: Omit<Sample, 'id' | 'timestamp'>) => void;
  soundEnabled: boolean;
}

interface Solution {
  id: string;
  name: string;
  category: 'Acid' | 'Neutral' | 'Base';
  basePH: number;
  initialColor: string; // CSS color of pure solution before indicator
  description: string;
  formula: string;
}

const SOLUTIONS: Solution[] = [
  { id: 'lemon', name: 'Nước chanh tươi', category: 'Acid', basePH: 2.2, initialColor: 'rgba(254, 240, 138, 0.45)', description: 'Chứa Citric acid tự nhiên, vị chua đặc trưng.', formula: 'C₆H₈O₇' },
  { id: 'vinegar', name: 'Giấm ăn (Ethanoic acid)', category: 'Acid', basePH: 2.9, initialColor: 'rgba(241, 245, 249, 0.35)', description: 'Dung dịch CH₃COOH 5%, làm quỳ hóa đỏ rõ rệt.', formula: 'CH₃COOH' },
  { id: 'tomato', name: 'Nước ép cà chua', category: 'Acid', basePH: 4.3, initialColor: 'rgba(254, 202, 202, 0.5)', description: 'Acid yếu hữu cơ (malic và citric acid).', formula: 'C₄H₆O₅' },
  { id: 'pure_water', name: 'Nước cất tinh khiết', category: 'Neutral', basePH: 7.0, initialColor: 'rgba(224, 242, 254, 0.35)', description: 'Nước tinh khiết ở 25°C, nồng độ [H⁺] = [OH⁻] = 10⁻⁷ M.', formula: 'H₂O' },
  { id: 'baking_soda', name: 'Dung dịch Baking soda', category: 'Base', basePH: 8.5, initialColor: 'rgba(241, 245, 249, 0.4)', description: 'Sodium hydrogencarbonate kiềm nhẹ, an toàn làm bánh.', formula: 'NaHCO₃' },
  { id: 'soap', name: 'Nước xà phòng', category: 'Base', basePH: 10.0, initialColor: 'rgba(219, 234, 254, 0.5)', description: 'Chứa muối natri của axit béo, tính nhờn kiềm cao.', formula: 'C₁₇H₃₅COONa' },
  { id: 'limewater', name: 'Nước vôi trong', category: 'Base', basePH: 12.0, initialColor: 'rgba(248, 250, 252, 0.45)', description: 'Calcium hydroxide bão hòa, dùng khử chua đất trồng.', formula: 'Ca(OH)₂' },
  { id: 'naoh', name: 'Dung dịch Sodium hydroxide 0.1M', category: 'Base', basePH: 13.0, initialColor: 'rgba(241, 245, 249, 0.3)', description: 'Base mạnh điển hình, ăn mòn da, làm phenolphthalein đỏ tía.', formula: 'NaOH' },
];

interface IndicatorOption {
  type: IndicatorType;
  name: string;
  source: string;
  calcColor: (ph: number) => { bg: string; name: string };
}

const INDICATORS: IndicatorOption[] = [
  {
    type: 'universal',
    name: 'Chỉ thị vạn năng',
    source: 'Hỗn hợp hóa chất chuẩn pH 0-14',
    calcColor: (ph) => {
      if (ph <= 2) return { bg: 'rgb(220, 38, 38)', name: 'Đỏ đậm' };
      if (ph <= 4) return { bg: 'rgb(234, 88, 12)', name: 'Cam đậm' };
      if (ph <= 6) return { bg: 'rgb(234, 179, 8)', name: 'Vàng rơm' };
      if (ph <= 7.5) return { bg: 'rgb(34, 197, 94)', name: 'Xanh lá cây' };
      if (ph <= 9) return { bg: 'rgb(14, 165, 233)', name: 'Xanh ngọc lơ' };
      if (ph <= 11) return { bg: 'rgb(37, 99, 235)', name: 'Xanh dương đậm' };
      return { bg: 'rgb(109, 40, 217)', name: 'Tím thẫm' };
    }
  },
  {
    type: 'litmus',
    name: 'Giấy quỳ tím',
    source: 'Chiết xuất từ địa y tự nhiên',
    calcColor: (ph) => {
      if (ph < 6) return { bg: 'rgb(220, 38, 38)', name: 'Đỏ tươi' };
      if (ph <= 7.5) return { bg: 'rgb(147, 51, 234)', name: 'Tím nguyên bản' };
      return { bg: 'rgb(37, 99, 235)', name: 'Xanh lam' };
    }
  },
  {
    type: 'homemade',
    name: 'Nước bắp cải tím (Anthocyanin)',
    source: 'Sắc tố tự nhiên từ thực vật',
    calcColor: (ph) => {
      if (ph <= 2.5) return { bg: 'rgb(225, 29, 72)', name: 'Đỏ tươi' };
      if (ph <= 5.5) return { bg: 'rgb(217, 70, 239)', name: 'Hồng tím' };
      if (ph <= 7.5) return { bg: 'rgb(126, 34, 206)', name: 'Tím đậm' };
      if (ph <= 9.5) return { bg: 'rgb(13, 148, 136)', name: 'Xanh lam lục' };
      if (ph <= 11.5) return { bg: 'rgb(22, 163, 74)', name: 'Xanh lá cây tươi' };
      return { bg: 'rgb(202, 138, 4)', name: 'Vàng lục' };
    }
  },
  {
    type: 'phenolphthalein',
    name: 'Dung dịch Phenolphthalein',
    source: 'Thuốc thử nhận biết base',
    calcColor: (ph) => {
      if (ph < 8.2) return { bg: 'rgba(241, 245, 249, 0.4)', name: 'Không màu trong suốt' };
      if (ph <= 10) return { bg: 'rgb(244, 114, 182)', name: 'Hồng cánh sen' };
      return { bg: 'rgb(190, 24, 93)', name: 'Đỏ tía / Hồng đậm' };
    }
  }
];

export const VirtualLabView: React.FC<VirtualLabViewProps> = ({
  onBackHome,
  onSaveSample,
  soundEnabled
}) => {
  const [selectedSolution, setSelectedSolution] = useState<Solution>(SOLUTIONS[0]);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorOption>(INDICATORS[0]);
  const [indicatorDrops, setIndicatorDrops] = useState<number>(0);
  const [currentPH, setCurrentPH] = useState<number>(SOLUTIONS[0].basePH);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Determine current mascot mood based on pH
  const getMascotMood = (): MascotMood => {
    if (currentPH < 6.5) return 'acid';
    if (currentPH > 7.5) return 'base';
    return 'neutral';
  };

  const currentColor = indicatorDrops === 0
    ? { bg: selectedSolution.initialColor, name: 'Màu dung dịch nguyên bản' }
    : selectedIndicator.calcColor(currentPH);

  const handleSelectSolution = (sol: Solution) => {
    setSelectedSolution(sol);
    setCurrentPH(sol.basePH);
    setIndicatorDrops(0);
    setSavedSuccess(false);
    soundEffects.playClickSound();
  };

  const handleSelectIndicator = (ind: IndicatorOption) => {
    setSelectedIndicator(ind);
    setSavedSuccess(false);
    soundEffects.playClickSound();
  };

  const handleAddIndicatorDrop = () => {
    setIsDropping(true);
    soundEffects.playBubbleSound();
    setTimeout(() => {
      setIsDropping(false);
      setIndicatorDrops(prev => Math.min(prev + 1, 5));
    }, 400);
  };

  // Titration / Neutralization: Add drops of Acid or Base
  const handleAddAcidDrop = () => {
    soundEffects.playBubbleSound();
    setCurrentPH(prev => Math.max(0.5, Number((prev - 0.7).toFixed(1))));
  };

  const handleAddBaseDrop = () => {
    soundEffects.playBubbleSound();
    setCurrentPH(prev => Math.min(14.0, Number((prev + 0.7).toFixed(1))));
  };

  const handleReset = () => {
    soundEffects.playClickSound();
    setCurrentPH(selectedSolution.basePH);
    setIndicatorDrops(0);
    setSavedSuccess(false);
  };

  const handleSaveToLibrary = () => {
    const env = currentPH < 6.8 ? 'acid' : currentPH > 7.2 ? 'base' : 'neutral';
    
    // Create an illustrative SVG/Canvas dataURL for the sample image
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 400, 300);
      // flask glow
      const grad = ctx.createRadialGradient(200, 180, 20, 200, 180, 120);
      grad.addColorStop(0, currentColor.bg);
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(200, 180, 100, 0, Math.PI * 2);
      ctx.fill();
      // text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Thí nghiệm ảo: ${selectedSolution.name}`, 200, 50);
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`pH ≈ ${currentPH.toFixed(1)} (${currentColor.name})`, 200, 90);
    }
    const sampleImg = canvas.toDataURL('image/jpeg');

    onSaveSample({
      name: `Thí nghiệm: ${selectedSolution.name} (${selectedIndicator.name})`,
      image: sampleImg,
      indicatorType: selectedIndicator.type,
      estimatedPH: currentPH,
      environment: env,
      detectedColor: currentColor.name,
      rgb: [40, 140, 200],
      hsv: [200, 80, 80],
      lab: [50, 0, -20],
      confidence: 99,
      note: `Pha chế ảo trong Lab STEM: ${selectedSolution.name} kết hợp ${selectedIndicator.name}. Nồng độ ion H⁺ ≈ 10^(-${currentPH.toFixed(1)}) M.`
    });

    setSavedSuccess(true);
    soundEffects.playSuccessSound();
    if (soundEnabled) {
      speakVietnamese(`Đã lưu kết quả thí nghiệm ảo của ${selectedSolution.name} vào kho mẫu thử!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      {/* Top Navigation & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="text-center sm:text-left flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
            <FlaskConical className="w-7 h-7 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>PHÒNG THÍ NGHIỆM ẢO STEM</span>
              <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">Lab Simulator</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Tự do pha chế, nhỏ giọt chất chỉ thị và quan sát phản ứng đổi màu kỳ diệu</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm mới Lab</span>
        </button>
      </div>

      {/* Mascot Pipi Guiding Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        <MascotPipi
          mood={getMascotMood()}
          customMessage={
            indicatorDrops === 0
              ? `Bạn đang chọn mẫu [${selectedSolution.name}]. Hãy bấm 'Nhỏ giọt chỉ thị' bên dưới để xem sự biến đổi màu sắc ngoạn mục nhé!`
              : `Hiện tượng đổi màu: Bình đang có màu [${currentColor.name}] với pH ≈ ${currentPH.toFixed(1)}. Hãy thử thêm giọt Acid hoặc Base để quan sát sự trung hòa ion H⁺ và OH⁻!`
          }
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Main Laboratory Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Solution & Indicator Pickers (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* 1. Pick Solution */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Bước 1: Chọn dung dịch thử</span>
              <span className="text-xs font-bold text-indigo-600">{selectedSolution.category}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {SOLUTIONS.map(sol => (
                <button
                  key={sol.id}
                  onClick={() => handleSelectSolution(sol)}
                  className={`p-2.5 rounded-2xl text-left border text-xs font-bold transition-all ${
                    selectedSolution.id === sol.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="truncate">{sol.name}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">pH ban đầu: {sol.basePH}</div>
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>{selectedSolution.name}</span>
                <span className="text-indigo-600 font-mono text-[11px]">{selectedSolution.formula}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">{selectedSolution.description}</p>
            </div>
          </div>

          {/* 2. Pick Indicator */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">Bước 2: Chọn chất chỉ thị</span>
            
            <div className="space-y-2">
              {INDICATORS.map(ind => (
                <button
                  key={ind.type}
                  onClick={() => handleSelectIndicator(ind)}
                  className={`w-full p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                    selectedIndicator.type === ind.type
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-extrabold">{ind.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{ind.source}</div>
                  </div>
                  {selectedIndicator.type === ind.type && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center / Right: Interactive Flask Simulation (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            
            {/* Visual Glass Laboratory Flask */}
            <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
              
              {/* Dropper & Erlenmeyer Flask */}
              <div className="relative flex flex-col items-center">
                {/* Dropper Pipette Tool */}
                <div className={`relative mb-2 transition-transform duration-300 ${isDropping ? 'translate-y-4' : ''}`}>
                  <div className="w-8 h-20 bg-slate-200/80 rounded-t-lg border-2 border-slate-400 flex flex-col items-center justify-between p-1 shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-rose-500 shadow-md animate-pulse" title="Bóp nhỏ giọt" />
                    <div className="w-1.5 h-8 bg-slate-300 rounded-b-sm" />
                  </div>
                  {/* Falling Drop Animation */}
                  {isDropping && (
                    <div 
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3.5 h-4 rounded-full animate-bounce shadow-md"
                      style={{ backgroundColor: currentColor.bg }}
                    />
                  )}
                </div>

                {/* Glass Erlenmeyer Flask */}
                <div className="relative w-48 sm:w-56 h-64 flex flex-col items-center justify-end">
                  {/* Flask Neck */}
                  <div className="absolute top-0 w-14 h-16 border-l-4 border-r-4 border-t-2 border-slate-300/80 bg-white/20 backdrop-blur-xs z-10 rounded-t-sm" />
                  
                  {/* Flask Body (Trapezoid / Triangle) */}
                  <div className="relative w-48 sm:w-56 h-48 rounded-b-[40px] border-4 border-slate-300/90 bg-white/30 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col justify-end">
                    
                    {/* Measurement graduation lines on glass */}
                    <div className="absolute left-3 top-8 space-y-4 z-20 pointer-events-none opacity-40">
                      <div className="w-5 h-0.5 bg-slate-700"></div>
                      <div className="w-3 h-0.5 bg-slate-700"></div>
                      <div className="w-5 h-0.5 bg-slate-700"></div>
                      <div className="w-3 h-0.5 bg-slate-700"></div>
                      <div className="w-5 h-0.5 bg-slate-700"></div>
                    </div>

                    {/* Liquid fill */}
                    <div 
                      className="w-full transition-all duration-700 relative overflow-hidden flex items-end justify-center"
                      style={{ 
                        height: indicatorDrops === 0 ? '55%' : '65%',
                        backgroundColor: currentColor.bg,
                        boxShadow: `inset 0 -20px 40px rgba(0,0,0,0.2), 0 0 30px ${currentColor.bg}`
                      }}
                    >
                      {/* Liquid Surface Wave */}
                      <div className="absolute top-0 inset-x-0 h-4 bg-white/30 rounded-full blur-[1px] animate-pulse" />

                      {/* Bubbles rising */}
                      <div className="absolute bottom-2 left-6 w-3 h-3 rounded-full bg-white/60 animate-bounce" style={{ animationDuration: '2s' }} />
                      <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDuration: '1.4s' }} />
                      <div className="absolute bottom-10 left-16 w-2.5 h-2.5 rounded-full bg-white/40 animate-bounce" style={{ animationDuration: '2.5s' }} />
                      
                      {/* Flask label */}
                      <span className="relative z-10 mb-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[11px] font-black tracking-wide">
                        {currentColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Flask base shadow */}
                  <div className="w-40 h-4 rounded-full bg-slate-400/30 blur-xs mt-1" />
                </div>
              </div>

              {/* Realtime Chemical Readout Panel */}
              <div className="flex-1 max-w-xs space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Độ pH Bình Phản Ứng</span>
                  <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight flex items-baseline justify-center sm:justify-start gap-2">
                    <span>pH {currentPH.toFixed(1)}</span>
                  </div>
                  <div className="inline-block">
                    <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      currentPH < 6.8 ? 'bg-red-100 text-red-800' :
                      currentPH > 7.2 ? 'bg-blue-100 text-blue-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {currentPH < 6.8 ? 'Môi trường Acid (Chua)' :
                       currentPH > 7.2 ? 'Môi trường Base (Kiềm)' :
                       'Môi trường Trung Tính'}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chất chỉ thị:</span>
                    <span className="font-bold text-slate-800">{selectedIndicator.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Số giọt đã nhỏ:</span>
                    <span className="font-extrabold text-emerald-700">{indicatorDrops} giọt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nồng độ [H⁺]:</span>
                    <span className="font-mono font-bold text-indigo-700">10⁻{currentPH.toFixed(1)} M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nồng độ [OH⁻]:</span>
                    <span className="font-mono font-bold text-purple-700">10⁻{(14 - currentPH).toFixed(1)} M</span>
                  </div>
                </div>

                {/* Quick Save button */}
                <button
                  onClick={handleSaveToLibrary}
                  disabled={savedSuccess}
                  className={`w-full py-3 px-4 rounded-2xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    savedSuccess
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02]'
                  }`}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{savedSuccess ? '✓ Đã Lưu Vào Kho Mẫu' : 'Lưu Thí Nghiệm Này'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Control Console (Buttons) */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Bàn Điều Khiển Hóa Chất (Thêm giọt thuốc thử & Phản ứng Trung hòa):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Add indicator drop */}
                <button
                  onClick={handleAddIndicatorDrop}
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Droplets className="w-5 h-5 animate-pulse" />
                  <span>+ Nhỏ 1 Giọt Thuốc Thử</span>
                </button>

                {/* 2. Titrate Acid */}
                <button
                  onClick={handleAddAcidDrop}
                  className="py-3.5 px-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-800 border-2 border-red-200 font-extrabold text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <span>🍋 + Nhỏ Giọt Acid (Giảm pH)</span>
                </button>

                {/* 3. Titrate Base */}
                <button
                  onClick={handleAddBaseDrop}
                  className="py-3.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 border-2 border-blue-200 font-extrabold text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <span>🧼 + Nhỏ Giọt Base (Tăng pH)</span>
                </button>
              </div>

              {/* Chemical Insight Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-extrabold">Phương trình ion bản chất: H⁺ + OH⁻ ⇌ H₂O</div>
                  <p className="text-amber-900 leading-relaxed text-xs">
                    Khi bạn thêm Acid vào Base (hoặc ngược lại), các ion H⁺ kết hợp với OH⁻ tạo thành phân tử nước H₂O. Khi lượng H⁺ và OH⁻ tương đương nhau, dung dịch sẽ đạt điểm tương đương trung tính pH = 7.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
