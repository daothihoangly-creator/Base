import React from 'react';
import { Camera, Layers, BookOpen, FlaskConical, Settings, Sparkles, Atom, ChevronRight, Gamepad2, ShieldAlert, FileText, Droplets, Heart } from 'lucide-react';
import { AppTab } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { MascotPipi } from './MascotPipi';

interface HomeProps {
  setActiveTab: (tab: AppTab) => void;
  savedSamplesCount: number;
  onOpenAiTutor: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, savedSamplesCount, onOpenAiTutor }) => {
  const handleTabClick = (tab: AppTab) => {
    soundEffects.playClickSound();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-12">
      {/* Hero Section with 3D Laboratory Background */}
      <div className="relative overflow-hidden rounded-[36px] bg-slate-900 text-white shadow-2xl border border-emerald-500/30">
        
        {/* Background Image with Ambient Glow Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/stem_lab_hero.jpg" 
            alt="STEM Chemistry Laboratory" 
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        </div>
        
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Hero Left Content */}
          <div className="max-w-2xl space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-black uppercase tracking-wider">
              <Atom className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Ứng Dụng Hóa Học STEM & Môi Trường THCS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              ECO pH <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">SMART</span>
            </h1>
            
            <p className="text-base sm:text-lg text-emerald-100 font-medium leading-relaxed">
              Camera AI nhận diện màu chỉ thị acid–base, phòng thí nghiệm ảo tương tác, đo pH và đồng hành cùng Bé Pipi khám phá khoa học!
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => handleTabClick('camera')}
                className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-500 transition-all hover:scale-105 text-sm"
              >
                <Camera className="w-5 h-5 text-white" />
                <span>QUÉT CAMERA NHẬN DIỆN pH</span>
              </button>

              <button
                onClick={() => handleTabClick('virtuallab')}
                className="flex items-center space-x-2 px-6 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-extrabold hover:bg-white/25 transition-all hover:scale-105 text-sm"
              >
                <FlaskConical className="w-5 h-5 text-amber-300" />
                <span>PHÒNG THÍ NGHIỆM ẢO</span>
              </button>

              <button
                onClick={onOpenAiTutor}
                className="flex items-center space-x-2 px-5 py-4 rounded-2xl bg-indigo-600/60 backdrop-blur-md border border-indigo-400/40 text-indigo-100 font-bold hover:bg-indigo-600 transition-all text-sm"
              >
                <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
                <span>HỎI ĐÁP ECO AI</span>
              </button>
            </div>
          </div>

          {/* Hero Right Mascot Highlight */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
              <MascotPipi 
                mood="greeting"
                size="lg"
                showBubble={false}
              />
              <div className="text-center mt-3 space-y-0.5">
                <div className="text-sm font-black text-white flex items-center justify-center gap-1">
                  <span>Tiến sĩ Bé Pipi</span>
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
                </div>
                <div className="text-[11px] text-emerald-200 font-medium">Linh vật Trợ lý Khoa học</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mascot Pipi Greeting Banner on Home */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-2 border-emerald-200/80 rounded-3xl p-5 shadow-sm">
        <MascotPipi
          mood="greeting"
          customMessage="Chào mừng các bạn nhỏ và quý thầy cô đến với ECO pH! Hãy chọn một tính năng bên dưới để bắt đầu cuộc phiêu lưu Hóa học đầy màu sắc nhé!"
          size="md"
        />
      </div>

      {/* Scientific Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold">Lưu ý khoa học:</span> Giá trị pH được ứng dụng ước tính dựa trên thuật toán màu sắc của chất chỉ thị và camera. Ứng dụng hỗ trợ học tập trực quan và thí nghiệm STEM theo chương trình KHTN của Bộ GD&ĐT.
        </div>
      </div>

      {/* 8 Feature Function Cards Grid */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Danh Mục Chức Năng Ứng Dụng</h2>
            <p className="text-xs text-slate-500 font-medium">Đầy đủ công cụ học tập, thí nghiệm ảo, trò chơi và báo cáo chuyên nghiệp</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            8 Chức Năng Hoàn Chỉnh
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Nhận diện pH Camera */}
          <div 
            onClick={() => handleTabClick('camera')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">1. Nhận Diện pH Camera</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chụp ảnh giấy chỉ thị, quỳ tím hoặc dung dịch, tự động phân tích RGB/LAB và đọc kết quả bằng giọng nói tiếng Việt.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Mở camera đo ngay</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 2. Phòng thí nghiệm ảo (Mới) */}
          <div 
            onClick={() => handleTabClick('virtuallab')}
            className="group relative bg-white p-6 rounded-3xl border-2 border-amber-300 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 bg-gradient-to-b from-amber-50/30 to-white"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">MỚI ✨</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-700 transition-colors">2. Phòng Thí Nghiệm Ảo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tự tay chọn hóa chất, nhỏ giọt chỉ thị vạn năng, bắp cải tím, phenolphthalein và quan sát phản ứng trung hòa đổi màu!
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Vào phòng lab ảo</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 3. Thang đo pH tương tác (Mới) */}
          <div 
            onClick={() => handleTabClick('scale')}
            className="group relative bg-white p-6 rounded-3xl border-2 border-indigo-300 shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 bg-gradient-to-b from-indigo-50/30 to-white"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Droplets className="w-7 h-7" />
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-500 text-white">MỚI ✨</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors">3. Khám Phá Thang Đo pH</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kéo thanh trượt 0-14 để đối chiếu 4 bảng màu chỉ thị, nồng độ ion H⁺/OH⁻ và xem Poster hoạt hình 3D vui nhộn!
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-indigo-700 group-hover:translate-x-1 transition-transform">
              <span>Khám phá thang đo</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 4. Đấu trường Hóa học (Mini Game) */}
          <div 
            onClick={() => handleTabClick('minigame')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors">4. Đấu Trường Mini Game</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                2 chế độ chơi đỉnh cao: Thợ săn màu sắc pH và Giải cứu môi trường đời sống (khử chua đất, cứu hộ hồ nước acid).
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Chinh phục cúp vàng</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 5. Trung tâm Giáo viên & Báo cáo Word (Mới) */}
          <div 
            onClick={() => handleTabClick('teacher')}
            className="group relative bg-white p-6 rounded-3xl border-2 border-blue-300 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 bg-gradient-to-b from-blue-50/30 to-white"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7" />
                </div>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">DOCX ✨</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">5. Xuất Báo Cáo STEM</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dành cho giáo viên và học sinh: tự động xuất Phiếu báo cáo thí nghiệm sang file Word (.doc/.docx) hoặc in ấn nộp bài A4.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Tạo báo cáo ngay</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 6. Kho mẫu thử */}
          <div 
            onClick={() => handleTabClick('library')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">6. Kho Mẫu Thử Nghiệm</h3>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">{savedSamplesCount} mẫu</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lưu trữ lịch sử các lần đo, so sánh 4 mẫu cùng lúc, xem phân bố pH và xuất bảng dữ liệu chuẩn CSV.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Xem kho mẫu</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 7. Khám phá kiến thức */}
          <div 
            onClick={() => handleTabClick('knowledge')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-700 transition-colors">7. Thư Viện Kiến Thức</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                12 bài học Hóa học & KHTN THCS chuẩn danh pháp IUPAC, hình ảnh minh họa chất chỉ thị và câu hỏi mini-quiz kiểm tra.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Học lý thuyết</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 8. Hiệu chuẩn & Cài đặt */}
          <div 
            onClick={() => handleTabClick('calibration')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-600 to-slate-800 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-slate-800 transition-colors">8. Hiệu Chuẩn Bảng Màu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tạo bảng màu chuẩn tùy biến cho từng loại giấy thử thực tế hoặc thuốc thử tự nhiên và cấu hình lớp học.
              </p>
            </div>
            <div className="mt-5 flex items-center text-xs font-black text-slate-700 group-hover:translate-x-1 transition-transform">
              <span>Mở cài đặt</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
