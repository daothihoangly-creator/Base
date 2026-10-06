import React, { useState } from 'react';
import { Gamepad2, ArrowLeft, Award, Sparkles, CheckCircle2, XCircle, RotateCcw, Volume2, ShieldCheck, Heart, Zap, HelpCircle } from 'lucide-react';
import { EnvironmentType } from '../types';
import { speakVietnamese } from '../utils/speech';
import { soundEffects } from '../utils/soundEffects';
import { MascotPipi, MascotMood } from './MascotPipi';

interface MiniGameViewProps {
  onBackHome: () => void;
  soundEnabled: boolean;
}

type GameMode = 'hunter' | 'rescue';

interface HunterQuestion {
  color: [number, number, number];
  colorName: string;
  actualPH: number;
  environment: EnvironmentType;
  hint: string;
}

interface RescueQuestion {
  scenario: string;
  currentPH: number;
  target: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const HUNTER_QUESTIONS: HunterQuestion[] = [
  { color: [220, 50, 40], colorName: 'Đỏ đậm', actualPH: 2.0, environment: 'acid', hint: 'Màu sắc đặc trưng của nước chanh tươi hoặc acid dạ dày.' },
  { color: [235, 110, 40], colorName: 'Cam sáng', actualPH: 4.0, environment: 'acid', hint: 'Thường thấy ở nước ép cà chua chín hoặc giấm ăn.' },
  { color: [60, 175, 110], colorName: 'Xanh lá cây tươi', actualPH: 7.0, environment: 'neutral', hint: 'Màu của nước cất tinh khiết ở 25°C.' },
  { color: [30, 150, 160], colorName: 'Xanh ngọc mòng két', actualPH: 8.5, environment: 'base', hint: 'Môi trường kiềm an toàn của dung dịch baking soda.' },
  { color: [110, 30, 140], colorName: 'Tím đậm', actualPH: 12.0, environment: 'base', hint: 'Dung dịch kiềm mạnh như nước vôi tôi hoặc xút loãng.' },
  { color: [200, 40, 30], colorName: 'Đỏ thẫm', actualPH: 1.0, environment: 'acid', hint: 'Tính acid cực mạnh của dung dịch ắc quy chì.' },
  { color: [90, 20, 90], colorName: 'Tím thẫm', actualPH: 14.0, environment: 'base', hint: 'Tính base cực đại của dung dịch sodium hydroxide 1M.' },
  { color: [180, 210, 60], colorName: 'Vàng lục nhạt', actualPH: 6.5, environment: 'acid', hint: 'Gần kề trung tính, như sữa tươi thanh trùng.' }
];

const RESCUE_QUESTIONS: RescueQuestion[] = [
  {
    scenario: 'Một cánh đồng lúa sau đợt hạn hán bị nhiễm phèn chua nặng, đo được pH đất chỉ còn 4.2. Rễ cây lúa bị nghẹt và vàng lá. Bác nông dân cần dùng chất gì để khử chua?',
    currentPH: 4.2,
    target: 'Nâng pH đất lên 6.5 - 7.0',
    options: [
      { text: 'Rắc vôi tôi Ca(OH)₂ hoặc bột đá vôi', correct: true, explanation: 'Chính xác! Vôi tôi mang tính base sẽ trung hòa lượng acid dư trong đất, giải độc phèn cho rễ lúa.' },
      { text: 'Tưới thêm giấm ăn CH₃COOH', correct: false, explanation: 'Sai rồi! Giấm ăn là acid sẽ làm đất chua thêm, cây lúa sẽ chết héo.' },
      { text: 'Bón thêm phân đạm chua', correct: false, explanation: 'Chưa đúng! Phân chua sẽ càng làm giảm pH của đất.' },
    ]
  },
  {
    scenario: 'Một bạn học sinh đi cắm trại không may bị kiến lửa đốt vào tay. Nọc kiến chứa acid fomic (formic acid) gây ngứa rát buốt. Bạn ấy nên dùng vật dụng nào sau đây trong túi cứu thương để thoa lên?',
    currentPH: 3.0,
    target: 'Trung hòa vết chích acid',
    options: [
      { text: 'Bôi một chút kem đánh răng hoặc nước vôi / baking soda', correct: true, explanation: 'Tuyệt vời! Kem đánh răng và baking soda có tính kiềm nhẹ, trung hòa acid nọc kiến làm dịu ngay cảm giác rát buốt.' },
      { text: 'Vắt nước chanh tươi xoa lên vết cắn', correct: false, explanation: 'Sai rồi! Nước chanh có tính acid sẽ làm vết cắn càng xót buốt hơn.' },
      { text: 'Thoa dầu gió cay nồng', correct: false, explanation: 'Dầu cay không có khả năng trung hòa hóa học acid của nọc kiến.' }
    ]
  },
  {
    scenario: 'Hồ nước sinh thái trong công viên bị nước mưa acid tràn vào khiến cá khó thở, đo được pH nguồn nước giảm xuống 5.0. Đội cứu hộ môi trường sinh thái ECO cần xử lý thế nào?',
    currentPH: 5.0,
    target: 'Khôi phục pH nước hồ về 7.0 - 7.5',
    options: [
      { text: 'Thả bột đá vôi mịn (CaCO₃) để trung hòa từ từ nguồn nước', correct: true, explanation: 'Rất chính xác! Đá vôi tan từ từ trong nước acid giải phóng ion CO₃²⁻ giúp cân bằng pH nước hồ an toàn cho cá và thủy sinh.' },
      { text: 'Đổ dung dịch acid clohidric vào hồ', correct: false, explanation: 'Cực kỳ nguy hiểm! Acid sẽ hủy diệt toàn bộ hệ sinh thái của hồ.' },
      { text: 'Không cần làm gì cả', correct: false, explanation: 'Nước chua pH 5 kéo dài sẽ làm chết phù du và cá tôm trong hồ.' }
    ]
  },
  {
    scenario: 'Sau khi ăn đồ chua và uống nước ngọt có gas, độ pH trong khoang miệng giảm xuống dưới 5.5, làm men răng có nguy cơ bị hòa tan (sâu răng). Biện pháp đơn giản và hiệu quả nhất là gì?',
    currentPH: 5.2,
    target: 'Tái lập môi trường miệng trung tính pH 7',
    options: [
      { text: 'Súc miệng ngay bằng nước lọc sạch hoặc nước muối sinh lý', correct: true, explanation: 'Chính xác! Nước lọc giúp rửa trôi acid thừa và nước bọt tự nhiên (pH 6.8-7.2) sẽ tái khoáng hóa men răng.' },
      { text: 'Uống ngay một cốc nước chanh chua', correct: false, explanation: 'Sai rồi! Uống thêm nước chanh sẽ làm men răng bị ăn mòn nặng nề hơn.' },
      { text: 'Đánh răng thật mạnh ngay lập tức', correct: false, explanation: 'Đánh răng ngay khi men răng vừa bị acid làm mềm sẽ gây mòn cổ răng. Nên súc miệng nước lọc trước 30 phút.' }
    ]
  }
];

export const MiniGameView: React.FC<MiniGameViewProps> = ({ onBackHome, soundEnabled }) => {
  const [mode, setMode] = useState<GameMode>('hunter');
  
  // Hunter mode state
  const [hunterIdx, setHunterIdx] = useState(0);
  const [hunterScore, setHunterScore] = useState(0);
  const [hunterStreak, setHunterStreak] = useState(0);
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType | null>(null);
  const [isHunterAnswered, setIsHunterAnswered] = useState(false);
  const [hunterGameOver, setHunterGameOver] = useState(false);

  // Rescue mode state
  const [rescueIdx, setRescueIdx] = useState(0);
  const [rescueScore, setRescueScore] = useState(0);
  const [selectedRescueOption, setSelectedRescueOption] = useState<number | null>(null);
  const [isRescueAnswered, setIsRescueAnswered] = useState(false);
  const [rescueGameOver, setRescueGameOver] = useState(false);

  const currentHunterQ = HUNTER_QUESTIONS[hunterIdx];
  const currentRescueQ = RESCUE_QUESTIONS[rescueIdx];

  // Mascot dynamic mood
  const getMascotMood = (): MascotMood => {
    if (hunterGameOver || rescueGameOver) return 'celebrating';
    if (mode === 'hunter') {
      if (isHunterAnswered) {
        return selectedEnv === currentHunterQ.environment ? 'celebrating' : 'acid';
      }
      return 'scientist';
    } else {
      if (isRescueAnswered) {
        return currentRescueQ.options[selectedRescueOption!]?.correct ? 'celebrating' : 'acid';
      }
      return 'greeting';
    }
  };

  // --- Hunter handlers ---
  const handleHunterGuess = (env: EnvironmentType) => {
    if (isHunterAnswered) return;
    setSelectedEnv(env);
    setIsHunterAnswered(true);

    const correct = env === currentHunterQ.environment;
    if (correct) {
      setHunterScore(prev => prev + 15 + hunterStreak * 2);
      setHunterStreak(prev => prev + 1);
      soundEffects.playSuccessSound();
      if (soundEnabled) speakVietnamese('Chính xác tuyệt vời! Bạn đã tích lũy thêm điểm thưởng!');
    } else {
      setHunterStreak(0);
      soundEffects.playErrorSound();
      if (soundEnabled) speakVietnamese('Chưa chính xác rồi. Hãy quan sát kỹ màu sắc ở câu sau nhé.');
    }
  };

  const handleNextHunter = () => {
    soundEffects.playClickSound();
    if (hunterIdx + 1 < HUNTER_QUESTIONS.length) {
      setHunterIdx(prev => prev + 1);
      setSelectedEnv(null);
      setIsHunterAnswered(false);
    } else {
      setHunterGameOver(true);
      soundEffects.playFanfareSound();
    }
  };

  const handleRestartHunter = () => {
    soundEffects.playClickSound();
    setHunterIdx(0);
    setHunterScore(0);
    setHunterStreak(0);
    setSelectedEnv(null);
    setIsHunterAnswered(false);
    setHunterGameOver(false);
  };

  // --- Rescue handlers ---
  const handleRescueGuess = (optIdx: number) => {
    if (isRescueAnswered) return;
    setSelectedRescueOption(optIdx);
    setIsRescueAnswered(true);

    const isCorrect = currentRescueQ.options[optIdx].correct;
    if (isCorrect) {
      setRescueScore(prev => prev + 25);
      soundEffects.playSuccessSound();
      if (soundEnabled) speakVietnamese('Giải cứu thành công! Bạn xử lý tình huống môi trường rất giỏi!');
    } else {
      soundEffects.playErrorSound();
      if (soundEnabled) speakVietnamese('Chưa đúng rồi. Hãy đọc kỹ lời giải thích nhé.');
    }
  };

  const handleNextRescue = () => {
    soundEffects.playClickSound();
    if (rescueIdx + 1 < RESCUE_QUESTIONS.length) {
      setRescueIdx(prev => prev + 1);
      setSelectedRescueOption(null);
      setIsRescueAnswered(false);
    } else {
      setRescueGameOver(true);
      soundEffects.playFanfareSound();
    }
  };

  const handleRestartRescue = () => {
    soundEffects.playClickSound();
    setRescueIdx(0);
    setRescueScore(0);
    setSelectedRescueOption(null);
    setIsRescueAnswered(false);
    setRescueGameOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>ĐẤU TRƯỜNG HÓA HỌC STEM</span>
              <span className="text-xs bg-purple-100 text-purple-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">Mini Games</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Học vui qua trò chơi nhận diện màu sắc pH và thử thách giải cứu môi trường</p>
          </div>
        </div>

        {/* Total Score Badge */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black px-4 py-2 rounded-2xl shadow-md border-2 border-white flex items-center gap-1.5 text-sm">
          <span>⭐ Điểm:</span>
          <span className="text-lg">{mode === 'hunter' ? hunterScore : rescueScore}</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex p-1.5 bg-slate-200/80 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => {
            setMode('hunter');
            soundEffects.playClickSound();
          }}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
            mode === 'hunter' ? 'bg-white text-purple-900 shadow-md scale-[1.02]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🎯 Chế độ 1: Thợ Săn pH</span>
        </button>

        <button
          onClick={() => {
            setMode('rescue');
            soundEffects.playClickSound();
          }}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
            mode === 'rescue' ? 'bg-white text-emerald-900 shadow-md scale-[1.02]' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🌱 Chế độ 2: Cứu Hộ Môi Trường</span>
        </button>
      </div>

      {/* Mascot Pipi Cheerleading Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border-2 border-purple-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        <MascotPipi
          mood={getMascotMood()}
          customMessage={
            mode === 'hunter'
              ? (hunterGameOver 
                  ? `Xuất sắc! Bạn đã vượt qua tất cả các câu hỏi với tổng số ${hunterScore} điểm! Đạt danh hiệu Nhà Vô Địch pH!`
                  : `Câu hỏi ${hunterIdx + 1}: Hãy nhìn màu sắc của mẫu thử và phán đoán xem dung dịch thuộc môi trường Acid, Trung tính hay Base nhé!`)
              : (rescueGameOver
                  ? `Hoan hô! Bạn đã hoàn thành xuất sắc các tình huống thực tiễn và bảo vệ môi trường thành công! Tổng điểm: ${rescueScore}!`
                  : `Tình huống STEM thực tế số ${rescueIdx + 1}: Hãy vận dụng kiến thức pH để giúp giải cứu đất, nước và vết cắn côn trùng nhé!`)
          }
          soundEnabled={soundEnabled}
        />
      </div>

      {/* MODE 1: THỢ SĂN pH */}
      {mode === 'hunter' && (
        <div>
          {hunterGameOver ? (
            /* Victory Screen */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
              <div className="w-36 h-36 rounded-3xl overflow-hidden mx-auto shadow-2xl border-4 border-amber-300 ring-4 ring-amber-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <img src="/images/trophy_badge.jpg" alt="STEM Star Trophy" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-black px-3 py-1 rounded-full bg-amber-100 text-amber-800">STEM Chemistry Master</span>
                <h3 className="text-3xl font-black text-slate-900">Chiến Thắng Vang Dội!</h3>
                <p className="text-sm text-slate-600">Bạn đã thành thạo nhận diện các sắc thái màu của chất chỉ thị pH.</p>
                <div className="text-4xl font-black text-purple-700 pt-2">⭐ Tổng điểm: {hunterScore}</div>
              </div>

              <button
                onClick={handleRestartHunter}
                className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-2xl bg-purple-600 text-white font-black hover:bg-purple-700 shadow-lg text-sm hover:scale-[1.02] transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi Lại Từ Đầu</span>
              </button>
            </div>
          ) : (
            /* Game Card */
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xl max-w-xl mx-auto">
              <div className="flex items-center justify-between text-xs font-black text-slate-500">
                <span>CÂU HỎI {hunterIdx + 1} / {HUNTER_QUESTIONS.length}</span>
                <span className="text-amber-600 flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-current text-amber-500" />
                  <span>Chuỗi đúng liên tiếp: {hunterStreak}</span>
                </span>
              </div>

              {/* Color Swatch Display */}
              <div className="space-y-3 text-center">
                <div 
                  className="w-36 h-36 rounded-3xl mx-auto shadow-xl border-4 border-white ring-4 ring-slate-100 transition-transform duration-500 hover:scale-105 flex items-center justify-center"
                  style={{ backgroundColor: `rgb(${currentHunterQ.color.join(',')})` }}
                >
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white text-[11px] font-black">
                    {currentHunterQ.colorName}
                  </span>
                </div>
                <div className="text-xs text-slate-500 italic">💡 Gợi ý: {currentHunterQ.hint}</div>
              </div>

              <h3 className="text-center font-black text-slate-900 text-lg">
                Mẫu thử trên thuộc môi trường hóa học nào?
              </h3>

              {/* Guess Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleHunterGuess('acid')}
                  disabled={isHunterAnswered}
                  className={`p-4 rounded-2xl font-black text-xs sm:text-sm border transition-all ${
                    isHunterAnswered
                      ? currentHunterQ.environment === 'acid'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                        : selectedEnv === 'acid'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-red-50 text-red-800 border-2 border-red-200 hover:bg-red-100 hover:scale-[1.02]'
                  }`}
                >
                  🍋 ACID (pH &lt; 7)
                </button>

                <button
                  onClick={() => handleHunterGuess('neutral')}
                  disabled={isHunterAnswered}
                  className={`p-4 rounded-2xl font-black text-xs sm:text-sm border transition-all ${
                    isHunterAnswered
                      ? currentHunterQ.environment === 'neutral'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                        : selectedEnv === 'neutral'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100 hover:scale-[1.02]'
                  }`}
                >
                  💧 TRUNG TÍNH (pH = 7)
                </button>

                <button
                  onClick={() => handleHunterGuess('base')}
                  disabled={isHunterAnswered}
                  className={`p-4 rounded-2xl font-black text-xs sm:text-sm border transition-all ${
                    isHunterAnswered
                      ? currentHunterQ.environment === 'base'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                        : selectedEnv === 'base'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-blue-50 text-blue-800 border-2 border-blue-200 hover:bg-blue-100 hover:scale-[1.02]'
                  }`}
                >
                  🧼 BASE / KIỀM (pH &gt; 7)
                </button>
              </div>

              {isHunterAnswered && (
                <div className="space-y-4 pt-2">
                  <div className={`p-4 rounded-2xl text-center font-bold text-xs sm:text-sm leading-relaxed ${
                    selectedEnv === currentHunterQ.environment ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-red-100 text-red-950 border border-red-300'
                  }`}>
                    {selectedEnv === currentHunterQ.environment 
                      ? `🎉 Chính xác tuyệt vời! Mẫu màu này tương ứng với pH thực tế ≈ ${currentHunterQ.actualPH}. (+15 điểm)` 
                      : `❌ Chưa đúng rồi! Đáp án đúng là môi trường ${currentHunterQ.environment.toUpperCase()} (pH thực tế ≈ ${currentHunterQ.actualPH}).`}
                  </div>

                  <button
                    onClick={handleNextHunter}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 shadow-lg text-sm transition-all hover:scale-[1.02]"
                  >
                    Tiếp tục câu hỏi tiếp theo →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: CỨU HỘ MÔI TRƯỜNG & ĐỜI SỐNG */}
      {mode === 'rescue' && (
        <div>
          {rescueGameOver ? (
            /* Victory Screen */
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
              <div className="w-36 h-36 rounded-3xl overflow-hidden mx-auto shadow-2xl border-4 border-emerald-300 ring-4 ring-emerald-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <img src="/images/trophy_badge.jpg" alt="STEM Star Trophy" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">Hiệp Sĩ Môi Trường STEM</span>
                <h3 className="text-3xl font-black text-slate-900">Giải Cứu Thành Công!</h3>
                <p className="text-sm text-slate-600">Bạn đã áp dụng thành công kiến thức phản ứng trung hòa acid-base vào bảo vệ đời sống.</p>
                <div className="text-4xl font-black text-emerald-700 pt-2">⭐ Tổng điểm: {rescueScore}</div>
              </div>

              <button
                onClick={handleRestartRescue}
                className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 shadow-lg text-sm hover:scale-[1.02] transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Chơi Lại Từ Đầu</span>
              </button>
            </div>
          ) : (
            /* Rescue Game Card */
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-between text-xs font-black text-slate-500">
                <span>TÌNH HUỐNG STEM {rescueIdx + 1} / {RESCUE_QUESTIONS.length}</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">Mục tiêu: {currentRescueQ.target}</span>
              </div>

              {/* Scenario Box */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tình huống thực tế:</span>
                </div>
                <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
                  "{currentRescueQ.scenario}"
                </p>
                <div className="text-xs text-slate-500 font-semibold pt-1">
                  Đo được giá trị hiện tại: <span className="text-red-600 font-bold">pH ≈ {currentRescueQ.currentPH}</span>
                </div>
              </div>

              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                Chọn giải pháp hóa học tối ưu nhất:
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {currentRescueQ.options.map((opt, idx) => {
                  const isSelected = selectedRescueOption === idx;
                  let btnStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/50';

                  if (isRescueAnswered) {
                    if (opt.correct) {
                      btnStyle = 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      btnStyle = 'border-red-600 bg-red-100 text-red-950';
                    } else {
                      btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleRescueGuess(idx)}
                      disabled={isRescueAnswered}
                      className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center shrink-0 text-xs font-black shadow-2xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div>{opt.text}</div>
                        {isRescueAnswered && (opt.correct || isSelected) && (
                          <div className={`text-xs font-medium pt-1 ${opt.correct ? 'text-emerald-800' : 'text-red-700'}`}>
                            {opt.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isRescueAnswered && (
                <div className="pt-2">
                  <button
                    onClick={handleNextRescue}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-700 shadow-lg text-sm transition-all hover:scale-[1.02]"
                  >
                    Tiếp tục tình huống tiếp theo →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
