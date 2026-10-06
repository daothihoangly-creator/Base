import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Droplets, BookOpen, Layers, Maximize2, X, CheckCircle2, Atom, Volume2 } from 'lucide-react';
import { speakVietnamese } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { MascotPipi, MascotMood } from './MascotPipi';

interface InteractiveScaleViewProps {
  onBackHome: () => void;
  soundEnabled: boolean;
}

interface PHStepData {
  pH: number;
  name: string;
  category: 'Acid' | 'Neutral' | 'Base';
  universalColor: string;
  litmusColor: string;
  cabbageColor: string;
  phenolphthaleinColor: string;
  examples: string[];
  hPlusConc: string;
  ohMinusConc: string;
  description: string;
}

const PH_SCALE_DATA: PHStepData[] = [
  {
    pH: 0,
    name: 'Acid cực mạnh (Pin ắc quy)',
    category: 'Acid',
    universalColor: 'rgb(180, 20, 20)',
    litmusColor: 'rgb(220, 38, 38)',
    cabbageColor: 'rgb(225, 29, 72)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Acid ắc quy chì (H₂SO₄)', 'Dung dịch HCl 1M'],
    hPlusConc: '1 M',
    ohMinusConc: '10⁻¹⁴ M',
    description: 'Nồng độ H⁺ tối đa, cực kỳ nguy hiểm, tính ăn mòn kim loại và da rất mạnh.'
  },
  {
    pH: 1,
    name: 'Dịch vị dạ dày người',
    category: 'Acid',
    universalColor: 'rgb(200, 40, 30)',
    litmusColor: 'rgb(220, 38, 38)',
    cabbageColor: 'rgb(225, 29, 72)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Dịch vị dạ dày co bóp tiêu hóa', 'Dung dịch HCl 0.1M'],
    hPlusConc: '10⁻¹ M',
    ohMinusConc: '10⁻¹³ M',
    description: 'Dạ dày tiết acid clohidric để hoạt hóa enzym pepsin phân giải protein thức ăn.'
  },
  {
    pH: 2,
    name: 'Nước cốt chanh tươi',
    category: 'Acid',
    universalColor: 'rgb(220, 70, 30)',
    litmusColor: 'rgb(220, 38, 38)',
    cabbageColor: 'rgb(225, 29, 72)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Nước chanh tươi', 'Nước ngọt có gas (Coca, Pepsi)'],
    hPlusConc: '10⁻² M',
    ohMinusConc: '10⁻¹² M',
    description: 'Chứa nhiều citric acid và carbonic acid tạo vị chua thanh rùng mình!'
  },
  {
    pH: 3,
    name: 'Giấm ăn & Nho chua',
    category: 'Acid',
    universalColor: 'rgb(235, 110, 40)',
    litmusColor: 'rgb(220, 38, 38)',
    cabbageColor: 'rgb(244, 63, 94)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Giấm ăn 5% (CH₃COOH)', 'Nước cam chua', 'Rượu vang'],
    hPlusConc: '10⁻³ M',
    ohMinusConc: '10⁻¹¹ M',
    description: 'Môi trường acid trung bình quen thuộc trong gian bếp và đồ gia vị.'
  },
  {
    pH: 4,
    name: 'Nước ép cà chua & Bia',
    category: 'Acid',
    universalColor: 'rgb(240, 150, 45)',
    litmusColor: 'rgb(220, 38, 38)',
    cabbageColor: 'rgb(217, 70, 239)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Cà chua chín', 'Bia lên men', 'Mưa acid nhẹ'],
    hPlusConc: '10⁻⁴ M',
    ohMinusConc: '10⁻¹⁰ M',
    description: 'Độ chua dịu nhẹ, thường thấy ở các loại quả mọng hữu cơ.'
  },
  {
    pH: 5,
    name: 'Cà phê đen & Nước mưa sạch',
    category: 'Acid',
    universalColor: 'rgb(220, 190, 50)',
    litmusColor: 'rgb(234, 88, 12)',
    cabbageColor: 'rgb(192, 132, 252)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Cà phê đen', 'Nước mưa sạch tự nhiên (hòa tan CO₂)'],
    hPlusConc: '10⁻⁵ M',
    ohMinusConc: '10⁻⁹ M',
    description: 'Nước mưa tự nhiên luôn có pH khoảng 5.6 do hòa tan khí CO₂ trong khí quyển.'
  },
  {
    pH: 6,
    name: 'Sữa bò tươi & Nước bọt',
    category: 'Acid',
    universalColor: 'rgb(180, 210, 60)',
    litmusColor: 'rgb(147, 51, 234)',
    cabbageColor: 'rgb(168, 85, 247)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Sữa tươi thanh trùng', 'Nước bọt khi nghỉ ngơi', 'Nước tiểu'],
    hPlusConc: '10⁻⁶ M',
    ohMinusConc: '10⁻⁸ M',
    description: 'Acid rất yếu, gần như cận kề môi trường trung tính.'
  },
  {
    pH: 7,
    name: 'Nước cất tinh khiết (Trung tính)',
    category: 'Neutral',
    universalColor: 'rgb(34, 197, 94)',
    litmusColor: 'rgb(147, 51, 234)',
    cabbageColor: 'rgb(126, 34, 206)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Nước cất tinh khiết (25°C)', 'Dung dịch muối ăn NaCl'],
    hPlusConc: '10⁻⁷ M',
    ohMinusConc: '10⁻⁷ M',
    description: 'Điểm cân bằng lý tưởng: Số lượng ion H⁺ hoàn toàn bằng số lượng ion OH⁻!'
  },
  {
    pH: 8,
    name: 'Nước biển & Máu người',
    category: 'Base',
    universalColor: 'rgb(14, 165, 233)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(13, 148, 136)',
    phenolphthaleinColor: 'rgba(240, 240, 240, 0.4)',
    examples: ['Máu người (pH 7.35 - 7.45)', 'Nước biển đại dương', 'Lòng trắng trứng'],
    hPlusConc: '10⁻⁸ M',
    ohMinusConc: '10⁻⁶ M',
    description: 'Môi trường kiềm nhẹ thiết yếu giúp hệ tuần hoàn máu người vận hành ổn định.'
  },
  {
    pH: 9,
    name: 'Baking Soda (Bột nở làm bánh)',
    category: 'Base',
    universalColor: 'rgb(37, 99, 235)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(16, 185, 129)',
    phenolphthaleinColor: 'rgb(244, 114, 182)',
    examples: ['Dung dịch Natri hiđrocacbonat (NaHCO₃)', 'Kem đánh răng'],
    hPlusConc: '10⁻⁹ M',
    ohMinusConc: '10⁻⁵ M',
    description: 'Kiềm an toàn sinh học, trung hòa acid dạ dày và làm sạch vết bẩn êm dịu.'
  },
  {
    pH: 10,
    name: 'Thuốc kháng acid & Sữa Magie',
    category: 'Base',
    universalColor: 'rgb(67, 56, 202)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(34, 197, 94)',
    phenolphthaleinColor: 'rgb(236, 72, 153)',
    examples: ['Thuốc đau dạ dày (Mg(OH)₂)', 'Nước xà phòng tắm'],
    hPlusConc: '10⁻¹⁰ M',
    ohMinusConc: '10⁻⁴ M',
    description: 'Khử chua nhanh chóng cho dạ dày bị dư acid dư thừa.'
  },
  {
    pH: 11,
    name: 'Dung dịch Amoniac gia dụng',
    category: 'Base',
    universalColor: 'rgb(91, 33, 182)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(132, 204, 22)',
    phenolphthaleinColor: 'rgb(219, 39, 119)',
    examples: ['Nước lau kính chứa Amoniac (NH₃)', 'Nước xà phòng giặt đồ'],
    hPlusConc: '10⁻¹¹ M',
    ohMinusConc: '10⁻³ M',
    description: 'Mùi khai hăng đặc trưng, có khả năng tẩy dầu mỡ bám dính cực tốt.'
  },
  {
    pH: 12,
    name: 'Nước vôi tôi nông nghiệp',
    category: 'Base',
    universalColor: 'rgb(109, 40, 217)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(234, 179, 8)',
    phenolphthaleinColor: 'rgb(190, 24, 93)',
    examples: ['Nước vôi trong Ca(OH)₂', 'Bột vôi tôi rắc ruộng khử chua'],
    hPlusConc: '10⁻¹² M',
    ohMinusConc: '10⁻² M',
    description: 'Bà con nông dân dùng vôi bột để nâng cao pH của đất nhiễm phèn chua.'
  },
  {
    pH: 13,
    name: 'Nước tẩy Javel & Thuốc thông cống',
    category: 'Base',
    universalColor: 'rgb(126, 34, 206)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(202, 138, 4)',
    phenolphthaleinColor: 'rgb(157, 23, 77)',
    examples: ['Nước Javel (NaClO + NaOH)', 'Thuốc thông tắc đường ống'],
    hPlusConc: '10⁻¹³ M',
    ohMinusConc: '10⁻¹ M',
    description: 'Kiềm mạnh có khả năng hòa tan tóc rác hữu cơ, diệt khuẩn tẩy trắng.'
  },
  {
    pH: 14,
    name: 'Dung dịch Xút ăn da đậm đặc (NaOH 1M)',
    category: 'Base',
    universalColor: 'rgb(88, 28, 135)',
    litmusColor: 'rgb(37, 99, 235)',
    cabbageColor: 'rgb(180, 83, 9)',
    phenolphthaleinColor: 'rgb(131, 24, 67)',
    examples: ['Dung dịch Natri hiđroxit 1M', 'Dung dịch KOH đậm đặc'],
    hPlusConc: '10⁻¹⁴ M',
    ohMinusConc: '1 M',
    description: 'Nồng độ OH⁻ tối đa, tính ăn mòn da và phá hủy vật liệu cực kỳ nguy hiểm.'
  }
];

export const InteractiveScaleView: React.FC<InteractiveScaleViewProps> = ({
  onBackHome,
  soundEnabled
}) => {
  const [currentStep, setCurrentStep] = useState<number>(7);
  const [showPosterModal, setShowPosterModal] = useState<boolean>(false);

  const data = PH_SCALE_DATA[currentStep];

  const getMascotMood = (): MascotMood => {
    if (currentStep < 7) return 'acid';
    if (currentStep > 7) return 'base';
    return 'neutral';
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCurrentStep(val);
    soundEffects.playClickSound();
  };

  const handleSpeakInfo = () => {
    const text = `Giá trị pH bằng ${data.pH}. ${data.name}. Đây là môi trường ${data.category === 'Acid' ? 'acid chua' : data.category === 'Base' ? 'base kiềm' : 'trung tính'}. Ví dụ tiêu biểu gồm có ${data.examples.join(', ')}.`;
    speakVietnamese(text);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="text-center sm:text-left flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Atom className="w-7 h-7 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>KHÁM PHÁ THANG ĐO pH TƯƠNG TÁC</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">0 - 14</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Kéo thanh trượt để xem sự đổi màu đồng thời của 4 loại chất chỉ thị và ứng dụng đời sống</p>
          </div>
        </div>

        <button
          onClick={() => setShowPosterModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 text-white font-extrabold text-xs shadow-md hover:bg-amber-600 transition-all hover:scale-105"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Xem Poster Hoạt Hình 3D</span>
        </button>
      </div>

      {/* Mascot Pipi Mood Reaction */}
      <div className="bg-gradient-to-r from-teal-50 via-indigo-50 to-purple-50 border-2 border-indigo-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        <MascotPipi
          mood={getMascotMood()}
          customMessage={`Đang xem nấc pH = ${data.pH}: [${data.name}]. ${data.description}`}
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Main Interactive Slider Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* pH Big Dial / Number */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                data.category === 'Acid' ? 'bg-red-100 text-red-800' :
                data.category === 'Base' ? 'bg-blue-100 text-blue-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                Môi trường {data.category.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-slate-500">Mốc số {data.pH} / 14</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{data.name}</h3>
            <p className="text-xs text-slate-500 max-w-lg">{data.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex flex-col items-center justify-center text-white shadow-xl border-4 border-white ring-4 ring-slate-100 transition-colors duration-500"
              style={{ backgroundColor: data.universalColor }}
            >
              <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Độ pH</span>
              <span className="text-4xl sm:text-5xl font-black">{data.pH}</span>
            </div>

            <button
              onClick={handleSpeakInfo}
              className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200"
              title="Nghe thuyết minh"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Master pH Slider Control */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-black text-slate-600 px-1">
            <span className="text-red-600">0 (Acid cực mạnh)</span>
            <span className="text-emerald-600">7 (Trung tính cân bằng)</span>
            <span className="text-purple-600">14 (Base cực mạnh)</span>
          </div>

          <div className="relative">
            {/* Rainbow Spectrum Background Track */}
            <div className="h-6 rounded-2xl bg-gradient-to-r from-red-600 via-amber-400 via-emerald-500 via-sky-500 to-purple-800 shadow-inner p-1"></div>
            
            {/* Native HTML range input styled overlay */}
            <input
              type="range"
              min="0"
              max="14"
              step="1"
              value={currentStep}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />

            {/* Custom slider thumb indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-8 h-10 bg-white border-2 border-slate-900 rounded-xl shadow-xl flex items-center justify-center -translate-x-1/2 pointer-events-none transition-all duration-150 z-10"
              style={{ left: `${(currentStep / 14) * 100}%` }}
            >
              <span className="text-xs font-black text-slate-900">{currentStep}</span>
            </div>
          </div>

          {/* Quick step click numbers (0 to 14) */}
          <div className="grid grid-cols-15 gap-1 pt-1 text-center">
            {PH_SCALE_DATA.map(item => (
              <button
                key={item.pH}
                onClick={() => {
                  setCurrentStep(item.pH);
                  soundEffects.playClickSound();
                }}
                className={`py-1 text-[11px] font-black rounded-lg transition-all ${
                  item.pH === currentStep
                    ? 'bg-slate-900 text-white scale-110 shadow-xs'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.pH}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Indicators Matrix Comparison Grid */}
        <div className="space-y-3 pt-4">
          <h4 className="text-sm font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>So Sánh Màu Sắc Của 4 Loại Chất Chỉ Thị Tại pH = {data.pH}:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Universal Indicator */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block">1. Chỉ thị vạn năng</span>
              <div 
                className="h-14 rounded-xl shadow-inner border border-white/40 flex items-center justify-center text-white text-xs font-extrabold shadow-sm transition-colors duration-500"
                style={{ backgroundColor: data.universalColor }}
              >
                pH {data.pH}
              </div>
              <p className="text-[11px] text-slate-600">Đổi màu liên tục từ đỏ, cam, vàng, lục sang lam, tím.</p>
            </div>

            {/* 2. Litmus paper */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block">2. Giấy quỳ tím</span>
              <div 
                className="h-14 rounded-xl shadow-inner border border-white/40 flex items-center justify-center text-white text-xs font-extrabold shadow-sm transition-colors duration-500"
                style={{ backgroundColor: data.litmusColor }}
              >
                {data.pH < 6 ? 'Màu Đỏ' : data.pH <= 7.5 ? 'Màu Tím' : 'Màu Xanh'}
              </div>
              <p className="text-[11px] text-slate-600">Chỉ thị truyền thống: Acid hóa đỏ, Base hóa xanh.</p>
            </div>

            {/* 3. Red Cabbage */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block">3. Nước bắp cải tím</span>
              <div 
                className="h-14 rounded-xl shadow-inner border border-white/40 flex items-center justify-center text-white text-xs font-extrabold shadow-sm transition-colors duration-500"
                style={{ backgroundColor: data.cabbageColor }}
              >
                Anthocyanin
              </div>
              <p className="text-[11px] text-slate-600">Sắc tố tự nhiên biến chuyển qua 6 dải màu khác nhau!</p>
            </div>

            {/* 4. Phenolphthalein */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <span className="text-xs font-bold text-slate-500 block">4. Phenolphthalein</span>
              <div 
                className="h-14 rounded-xl shadow-inner border border-slate-300 flex items-center justify-center text-slate-800 text-xs font-extrabold shadow-sm transition-colors duration-500"
                style={{ backgroundColor: data.phenolphthaleinColor, color: data.pH >= 9 ? '#ffffff' : '#334155' }}
              >
                {data.pH < 8.2 ? 'Không màu' : 'Màu Hồng / Tía'}
              </div>
              <p className="text-[11px] text-slate-600">Chuyên biệt nhận biết base (chỉ đổi màu khi pH &gt; 8.2).</p>
            </div>

          </div>
        </div>

        {/* Real World Life Applications & Ion concentrations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <span className="text-xs font-extrabold uppercase text-indigo-900 tracking-wider block">
              Vật Thể Đời Sống Có Cùng Mức pH {data.pH}:
            </span>
            <ul className="space-y-1.5 text-xs text-indigo-950 font-medium">
              {data.examples.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-xs">
            <span className="text-xs font-extrabold uppercase text-slate-700 tracking-wider block font-sans">
              Nồng Độ Ion Trong Dung Dịch:
            </span>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">[H⁺] Hydrogen ion:</span>
              <span className="font-bold text-red-600">{data.hPlusConc}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">[OH⁻] Hydroxide ion:</span>
              <span className="font-bold text-blue-600">{data.ohMinusConc}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Poster Lightbox Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base">Poster Giáo Dục STEM: Thang Đo pH Hoạt Hình 3D</h3>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100">
              <img 
                src="/images/ph_scale_cartoon.jpg" 
                alt="The pH Scale Educational Cartoon" 
                className="max-h-[70vh] rounded-2xl shadow-lg object-contain"
              />
              <p className="text-xs text-slate-600 font-semibold mt-3 text-center">
                Infographic minh họa trực quan: Giọt nước chua đỏ gắt (Acid), Giọt nước cân bằng tươi cười (Trung tính), và Giọt nước kiềm xà phòng bong bóng (Base).
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
