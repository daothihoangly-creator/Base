import React, { useState } from 'react';
import { FileText, Download, Printer, ArrowLeft, CheckCircle2, Award, Sparkles, BookOpen, User, School, Calendar, HelpCircle } from 'lucide-react';
import { Sample } from '../types';
import { soundEffects } from '../utils/soundEffects';
import { speakVietnamese } from '../utils/speech';
import { MascotPipi } from './MascotPipi';

interface TeacherReportViewProps {
  samples: Sample[];
  onBackHome: () => void;
  soundEnabled: boolean;
}

export const TeacherReportView: React.FC<TeacherReportViewProps> = ({
  samples,
  onBackHome,
  soundEnabled
}) => {
  const [schoolName, setSchoolName] = useState('Trường THCS Lê Quý Đôn');
  const [className, setClassName] = useState('Lớp 8A2 - Nhóm Khoa học Xanh');
  const [studentNames, setStudentNames] = useState('Nguyễn Văn An, Trần Thị Mai, Lê Hoàng Long');
  const [teacherName, setTeacherName] = useState('Thầy Nguyễn Hóa Học');
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('vi-VN'));
  const [experimentTitle, setExperimentTitle] = useState('Báo cáo thực hành: Nhận biết môi trường Acid - Base & Đo độ pH bằng chất chỉ thị');
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>(() => samples.slice(0, 5).map(s => s.id));
  const [discussionAnswer1, setDiscussionAnswer1] = useState('Đất bị chua (pH < 5.5) làm rễ cây khó hấp thụ khoáng chất và vi khuẩn có hại phát triển. Nông dân dùng vôi tôi Ca(OH)₂ hoặc bột đá vôi CaCO₃ để trung hòa acid và nâng cao pH cho đất.');
  const [discussionAnswer2, setDiscussionAnswer2] = useState('Nọc kiến chứa acid fomic (formic acid). Ta bôi nước vôi trong hoặc kem đánh răng/baking soda có tính kiềm nhẹ để trung hòa acid, giảm ngứa rát.');
  const [teacherComment, setTeacherComment] = useState('Nhóm hoàn thành thí nghiệm nghiêm túc, thao tác chuẩn xác, bảng số liệu rõ ràng. Đạt điểm 10/10!');

  const activeSamples = samples.filter(s => selectedSampleIds.includes(s.id));

  const toggleSelectSample = (id: string) => {
    if (selectedSampleIds.includes(id)) {
      setSelectedSampleIds(selectedSampleIds.filter(i => i !== id));
    } else {
      setSelectedSampleIds([...selectedSampleIds, id]);
    }
    soundEffects.playClickSound();
  };

  const handlePrint = () => {
    soundEffects.playClickSound();
    window.print();
  };

  const handleExportWord = () => {
    soundEffects.playSuccessSound();
    if (soundEnabled) {
      speakVietnamese('Đang xuất báo cáo thí nghiệm sang tài liệu Word. Bạn có thể mở bằng Microsoft Word để in ấn và nộp bài.');
    }

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${experimentTitle}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; margin: 20mm; color: #000; }
          h1 { font-size: 16pt; text-align: center; text-transform: uppercase; margin-bottom: 5px; color: #1e3a8a; }
          h2 { font-size: 14pt; margin-top: 15px; border-bottom: 1px solid #000; padding-bottom: 4px; }
          .meta-table { width: 100%; margin-bottom: 15px; border-collapse: collapse; }
          .meta-table td { padding: 4px; font-size: 12pt; }
          table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; }
          table.data-table th, table.data-table td { border: 1px solid #000; padding: 6px 8px; text-align: left; font-size: 11pt; }
          table.data-table th { background-color: #f1f5f9; text-align: center; }
          .badge { font-weight: bold; }
          .footer-sign { width: 100%; margin-top: 30px; text-align: center; }
        </style>
      </head>
      <body>
        <div style="text-align: center; font-size: 11pt; margin-bottom: 10px;">
          <b>PHÒNG GD&ĐT QUẬN/HUYỆN</b><br/>
          <b>${schoolName.toUpperCase()}</b><br/>
          ***
        </div>

        <h1>${experimentTitle}</h1>
        <p style="text-align: center; font-style: italic; margin-top: 0;">Môn học: Khoa học tự nhiên (Hóa học STEM THCS) - Ngày: ${reportDate}</p>

        <h2>I. THÔNG TIN NHÓM THỰC HIỆN</h2>
        <table class="meta-table">
          <tr><td><b>Lớp / Nhóm:</b> ${className}</td><td><b>Giáo viên hướng dẫn:</b> ${teacherName}</td></tr>
          <tr><td colspan="2"><b>Thành viên nhóm:</b> ${studentNames}</td></tr>
        </table>

        <h2>II. BẢNG SỐ LIỆU ĐO ĐẠC VÀ KẾT QUẢ THÍ NGHIỆM</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 5%;">STT</th>
              <th style="width: 25%;">Tên mẫu thử nghiệm</th>
              <th style="width: 15%;">Chất chỉ thị</th>
              <th style="width: 15%;">Màu quan sát</th>
              <th style="width: 12%;">Độ pH ước tính</th>
              <th style="width: 15%;">Môi trường</th>
              <th style="width: 13%;">Độ tin cậy</th>
            </tr>
          </thead>
          <tbody>
            ${activeSamples.map((s, idx) => `
              <tr>
                <td style="text-align: center;">${idx + 1}</td>
                <td><b>${s.name}</b></td>
                <td>${s.indicatorType}</td>
                <td>${s.detectedColor}</td>
                <td style="text-align: center; font-weight: bold;">${s.estimatedPH.toFixed(1)}</td>
                <td>${s.environment === 'acid' ? 'Acid (Axit)' : s.environment === 'base' ? 'Base (Kiềm)' : 'Trung tính'}</td>
                <td style="text-align: center;">${s.confidence}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>III. CÂU HỎI THẢO LUẬN & LIÊN HỆ ĐỜI SỐNG</h2>
        <p><b>1. Vì sao đất bị chua lại cần bón vôi tôi để cải tạo?</b><br/>
        <i>Trả lời:</i> ${discussionAnswer1}</p>
        
        <p><b>2. Biện pháp sơ cứu khi bị kiến lửa đốt bằng hóa chất quen thuộc trong gia đình?</b><br/>
        <i>Trả lời:</i> ${discussionAnswer2}</p>

        <h2>IV. NHẬN XÉT VÀ ĐÁNH GIÁ CỦA GIÁO VIÊN</h2>
        <p style="border: 1px dashed #666; padding: 10px; background-color: #fafafa;">
          ${teacherComment}
        </p>

        <table class="footer-sign">
          <tr>
            <td style="width: 50%;"><b>ĐẠI DIỆN NHÓM HỌC SINH</b><br/><i>(Ký và ghi rõ họ tên)</i><br/><br/><br/><br/></td>
            <td style="width: 50%;"><b>GIÁO VIÊN CHẤM ĐIỂM</b><br/><i>(Ký và nhận xét)</i><br/><br/><br/><br/>${teacherName}</td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bao_Cao_Thi_Nghiem_STEM_${className.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>TRUNG TÂM GIÁO VIÊN & BÁO CÁO STEM</span>
              <span className="text-xs bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase">Docx & Print</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Xuất phiếu báo cáo thí nghiệm chuẩn Bộ GD&ĐT sang Word hoặc in ấn nộp bài</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportWord}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-extrabold text-xs shadow-md hover:bg-blue-700 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Xuất File Word (.DOC)</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white font-extrabold text-xs shadow-md hover:bg-slate-800 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>In Ấn (PDF)</span>
          </button>
        </div>
      </div>

      {/* Mascot Pipi Note */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border-2 border-blue-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
        <MascotPipi
          mood="scientist"
          customMessage="Thầy cô và các bạn có thể tùy chỉnh thông tin trường lớp, chọn các mẫu thử đã chụp hoặc làm trong Lab ảo để tự động xuất ra một bài báo cáo khoa học tuyệt đẹp!"
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <School className="w-5 h-5 text-blue-600" />
          <span>1. Thông Tin Chung Báo Cáo Thí Nghiệm</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Trường THCS / Tiểu học:</label>
            <input 
              type="text" 
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Lớp học / Nhóm STEM:</label>
            <input 
              type="text" 
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Thành viên nhóm học sinh:</label>
            <input 
              type="text" 
              value={studentNames}
              onChange={(e) => setStudentNames(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Giáo viên hướng dẫn / Chấm điểm:</label>
            <input 
              type="text" 
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        {/* Sample selection checkboxes */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
              2. Chọn Mẫu Thử Đưa Vào Báo Cáo ({activeSamples.length}/{samples.length}):
            </span>
            <span className="text-xs text-slate-500">Nhấp chọn để bật/tắt mẫu thử</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
            {samples.map(s => {
              const isSelected = selectedSampleIds.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleSelectSample(s.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50/70 text-blue-900 shadow-2xs' 
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div>{s.name}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">pH: {s.estimatedPH.toFixed(1)} • {s.detectedColor}</div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500 shrink-0" 
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussion Questions */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <span className="text-xs font-black uppercase text-slate-700 tracking-wider block">
            3. Câu Hỏi Thảo Luận & Liên Hệ Môi Trường:
          </span>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Câu 1: Vì sao đất bị chua lại cần bón vôi tôi để cải tạo?</label>
              <textarea 
                rows={2}
                value={discussionAnswer1}
                onChange={(e) => setDiscussionAnswer1(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Câu 2: Biện pháp sơ cứu khi bị kiến lửa đốt bằng hóa chất quen thuộc trong gia đình?</label>
              <textarea 
                rows={2}
                value={discussionAnswer2}
                onChange={(e) => setDiscussionAnswer2(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nhận xét của Giáo viên:</label>
              <textarea 
                rows={2}
                value={teacherComment}
                onChange={(e) => setTeacherComment(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-amber-50/50"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Live Preview Paper Display */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 p-8 sm:p-12 shadow-2xl space-y-6 print:border-none print:shadow-none print:p-0">
        <div className="text-center space-y-1 border-b border-slate-200 pb-4">
          <div className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
            {schoolName} • KHOA HỌC TỰ NHIÊN THCS
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
            {experimentTitle}
          </h2>
          <div className="text-xs text-slate-500 italic">
            Ngày lập báo cáo: {reportDate}
          </div>
        </div>

        {/* Group Info Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
          <div className="grid grid-cols-2">
            <span><b>Lớp / Nhóm:</b> {className}</span>
            <span><b>Giáo viên:</b> {teacherName}</span>
          </div>
          <div>
            <b>Thành viên:</b> {studentNames}
          </div>
        </div>

        {/* Live Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">Bảng số liệu kết quả đo đạc:</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-xs text-left">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-800">
                  <th className="border border-slate-300 p-2 text-center w-10">STT</th>
                  <th className="border border-slate-300 p-2">Tên mẫu thử nghiệm</th>
                  <th className="border border-slate-300 p-2">Chất chỉ thị</th>
                  <th className="border border-slate-300 p-2">Màu nhận diện</th>
                  <th className="border border-slate-300 p-2 text-center">Độ pH</th>
                  <th className="border border-slate-300 p-2">Môi trường</th>
                  <th className="border border-slate-300 p-2 text-center">Độ tin cậy</th>
                </tr>
              </thead>
              <tbody>
                {activeSamples.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                    <td className="border border-slate-300 p-2 font-bold text-slate-900">{s.name}</td>
                    <td className="border border-slate-300 p-2">{s.indicatorType}</td>
                    <td className="border border-slate-300 p-2 flex items-center gap-1.5">
                      <div 
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" 
                        style={{ backgroundColor: `rgb(${s.rgb.join(',')})` }}
                      />
                      <span>{s.detectedColor}</span>
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-black text-indigo-700">{s.estimatedPH.toFixed(1)}</td>
                    <td className="border border-slate-300 p-2">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        s.environment === 'acid' ? 'bg-red-100 text-red-800' :
                        s.environment === 'base' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {s.environment.toUpperCase()}
                      </span>
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">{s.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Discussions in paper */}
        <div className="space-y-3 pt-2 text-xs">
          <h4 className="font-black uppercase text-slate-800 tracking-wider">Thảo luận khoa học & Thực tiễn:</h4>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900">1. Khử chua cho đất trồng trọt:</span>
            <p className="text-slate-700 italic">{discussionAnswer1}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900">2. Sơ cứu vết kiến cắn:</span>
            <p className="text-slate-700 italic">{discussionAnswer2}</p>
          </div>
        </div>

        {/* Teacher Comment */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
          <span className="font-black text-amber-900 uppercase">Nhận xét của Giáo viên:</span>
          <p className="text-amber-950 font-medium">{teacherComment}</p>
        </div>

        {/* Footer Signature */}
        <div className="grid grid-cols-2 text-center text-xs pt-8">
          <div>
            <div className="font-bold uppercase text-slate-700">Đại diện nhóm học sinh</div>
            <div className="text-[11px] text-slate-400 italic">(Ký và ghi rõ họ tên)</div>
          </div>
          <div>
            <div className="font-bold uppercase text-slate-700">Giáo viên chấm điểm</div>
            <div className="text-[11px] text-slate-400 italic">(Ký và cho điểm)</div>
            <div className="mt-12 font-bold text-slate-900">{teacherName}</div>
          </div>
        </div>

      </div>

    </div>
  );
};
