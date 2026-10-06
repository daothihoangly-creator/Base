# 🧪 ECO pH SMART – Trợ Lý Hóa Học & Môi Trường STEM THCS

Ứng dụng web giáo dục STEM thông minh dành cho học sinh THCS (Khoa học tự nhiên 6, 7, 8, 9) và giáo viên Hóa học, kết hợp trí tuệ nhân tạo, camera nhận diện màu sắc chỉ thị pH và phòng thí nghiệm tương tác sinh động.

---

## 🌟 Các Tính Năng & Chức Năng Nổi Bật

### 1. 🤖 Linh Vật Hoạt Hình Mascot: "Tiến Sĩ Bé Pipi" (Pipi The Chem Water Drop)
- Nhân vật hoạt hình 3D phong cách Pixar ngộ nghĩnh, mặc áo blouse trắng, đeo kính tròn bác học.
- Tự động thay đổi biểu cảm và tâm trạng theo độ pH:
  - **Môi trường Acid (pH < 7)**: Biểu cảm chua chát lí lắc, cảnh báo nồng độ ion $H^+$.
  - **Môi trường Trung tính (pH = 7)**: Cười tươi màu ngọc lục bảo cân bằng như nước cất tinh khiết.
  - **Môi trường Base (pH > 7)**: Da trơn mịn, bong bóng xà phòng xúng xính, biểu thị ion $OH^-$.
  - **Khoa học & Chiến thắng**: Tung sao vàng, vẫy tay chúc mừng khi học sinh hoàn thành thử thách.
- Tích hợp giọng nói thuyết minh tiếng Việt (Text-to-Speech) và bong bóng thoại tương tác khi chạm vào.

### 2. 🧪 Phòng Thí Nghiệm Hóa Học Ảo (Virtual Chemistry Lab Simulator)
- Chọn các dung dịch đời sống và hóa chất: Nước chanh, Giấm ăn, Nước cất, Baking soda, Nước xà phòng, Nước vôi trong, $NaOH$...
- Nhỏ giọt các chất chỉ thị màu: Giấy quỳ tím, Chỉ thị vạn năng, Nước bắp cải tím (Anthocyanin), Phenolphthalein.
- Thao tác nhỏ giọt, hoạt họa chất lỏng đổi màu thời gian thực trong bình tam giác Erlenmeyer với bọt khí sủi tăm.
- Thao tác phản ứng trung hòa (Titration): Thêm giọt Acid hoặc giọt Base để quan sát sự chuyển dịch nồng độ $[H^+]$ và $[OH^-]$ về pH 7.
- Lưu mẫu vừa tạo vào Kho mẫu thử.

### 3. 🌈 Thang Đo pH Tương Tác 0 – 14 (Interactive pH Explorer)
- Kéo thanh trượt pH từ 0 đến 14 để quan sát trực quan sự đổi màu đồng thời của 4 loại chất chỉ thị.
- Đối chiếu các vật thể đời sống quen thuộc: Pin acid, dạ dày, cà chua, cà phê, máu người, nước biển, thuốc tẩy...
- Bảng hiển thị nồng độ ion khoa học $[H^+]$ và $[OH^-]$.
- Tích hợp Poster hoạt hình 3D khổ lớn: "The pH Scale" sắc nét, sinh động.

### 4. 🎮 Đấu Trường Mini Game STEM (Chemistry Game Arena)
- **Chế độ 1 - Thợ săn pH**: Thử tài phán đoán môi trường hóa học qua các mẩu màu sắc ngẫu nhiên, tích lũy điểm combo.
- **Chế độ 2 - Cứu hộ Môi trường & Đời sống**: Giải quyết các bài toán thực tiễn (Khử chua đất nhiễm phèn bằng vôi tôi, sơ cứu vết kiến cắn bằng dung dịch kiềm, cứu hộ nước hồ bị mưa acid...).
- Hiệu ứng âm thanh procedural Web Audio API, cúp vàng vinh danh STEM Star đạt thành tích xuất sắc.

### 5. 📄 Trung Tâm Giáo Viên & Xuất Báo Cáo STEM (Word Docx & Print A4)
- Nhập thông tin trường học, lớp, nhóm học sinh và giáo viên hướng dẫn.
- Chọn các mẫu đã đo để tự động lập bảng số liệu khoa học.
- Tự động sinh báo cáo kèm phần trả lời câu hỏi thảo luận và nhận xét của giáo viên.
- **Xuất file Word (.doc / .docx)** định dạng chuẩn để nộp bài hoặc gửi qua Zalo/Email.
- **In ấn trực tiếp (Print Friendly A4)** chuẩn quy cách sư phạm của Bộ Giáo dục & Đào tạo.

### 6. 📷 Camera AI Nhận Diện Màu Sắc & Đọc Kết Quả Bằng Giọng Nói
- Quét nhanh giấy chỉ thị màu qua camera hoặc ảnh tải lên.
- Phân tích màu trong không gian RGB, HSV và LAB, so khớp với thuật toán khoảng cách màu $\Delta E$.
- Đọc to kết quả giá trị pH và môi trường bằng tiếng Việt chuẩn.

### 7. 📚 Thư Viện Kiến Thức KHTN Chuẩn Danh Pháp IUPAC
- 12 bài học chuyên sâu về Acid, Base, pH, chất chỉ thị tự nhiên.
- Mini-quiz tương tác có giải thích chi tiết sau mỗi bài học.

---

## 🚀 Hướng Dẫn Chạy Cục Bộ

1. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```

2. Cấu hình file `.env` (tùy chọn cho tính năng Gemini AI):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. Khởi chạy ứng dụng dev server:
   ```bash
   npm run dev
   ```

4. Mở trình duyệt tại địa chỉ: `http://localhost:3000` (hoặc cổng được hiển thị trong terminal).
