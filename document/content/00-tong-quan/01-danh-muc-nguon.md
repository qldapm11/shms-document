# Danh mục nguồn tài liệu

Cập nhật: 2026-11-04. Chỉ ghi file thực sự tìm thấy trong môi trường.

| # | Đường dẫn thực tế | Loại | Trạng thái đọc | Mục đích sử dụng |
|---|---|---|---|---|
| 1 | `requirement/SHMS_AI_BOOTSTRAP_PROMPT.md` | Prompt khởi động | Đã đọc đủ | Nguồn chuẩn cho vai trò, phạm vi 67 tính năng, cấu trúc state, quy trình |
| 2 | `requirement/template/QLDAPM_Nhóm_11_ phân_chia_công_việc.xlsx` | Bảng phân công | Đã đọc đủ | **Nguồn chuẩn** 40 công việc nhóm (G01-G40), owner/support/reviewer |
| 3 | `requirement/template/Nhom_X_Bao_cao.docx` | Mẫu báo cáo | Đã đọc đủ | Khung báo cáo 10 phần của thầy (PHẦN I–X) |
| 4 | `requirement/template/Nhom_X_Phan_cong.xlsx` | Mẫu tiến độ cũ | Đã đọc | Mẫu I–XIII; đã bị bảng 40 công việc thay thế, chỉ tham khảo |
| 5 | `requirement/template/Group_X_Bien_ban_hop_Lan1.docx` | Mẫu biên bản họp | Đã đọc | Khung biên bản 5 mục |
| 6 | `requirement/template/Nhom_X_Slide.pptx` | Mẫu slide | Chưa đọc kỹ | Khung slide thuyết trình |
| 7 | `requirement/SHMS_ Hành trình người bệnh-1.png` | Ảnh mockup bảng 01 | Chưa đọc | Bố cục hành trình NB/TD (hoãn: tránh tràn context) |
| 8 | `requirement/Hành trình bác sĩ trên SHMS-4.png` | Ảnh mockup bảng 02 | Chưa đọc | Bố cục hành trình BS |
| 9 | `requirement/SHMS_ Điều dưỡng & điều trị nội trú-2.png` | Ảnh mockup bảng 03 | Chưa đọc | Bố cục điều dưỡng/nội trú |
| 10 | `requirement/SHMS_ Dược, vật tư và viện phí-3.png` | Ảnh mockup bảng 04 | Chưa đọc | Bố cục dược/vật tư/viện phí |
| 11 | `requirement/05 — Lãnh đạo & quản trị hệ thống-7.png` | Ảnh mockup bảng 05 | Chưa đọc | Bố cục lãnh đạo/quản trị |
| 12 | `requirement/06 — Trung tâm dự án SHMS-5.png` | Ảnh mockup bảng 06 | Chưa đọc | Bố cục SHMS Project Hub |
| 13 | `requirement/*.png` (6 bộ giao diện xanh còn lại) | Ảnh đề xuất giao diện | Chưa đọc | Tham khảo tông màu/phong cách |

## Nguyên tắc dùng nguồn
- Ảnh mockup chỉ dùng cho **bố cục và hành trình**. Không suy ra quyền, ngưỡng y tế, giá, luật BHYT, tương tác thuốc, kết quả AI chính thức từ ảnh.
- Tài liệu cũ là đầu vào minh họa; yêu cầu chính thức được phát triển lại, không sao chép nguyên si thành luật nghiệp vụ.
- Quyết định đã chốt trong `state/decisions.json` cập nhật cách hiểu tài liệu cũ.
- Các file nêu trong bootstrap nhưng KHÔNG tìm thấy trong môi trường (`tai-lieu-ba_v0.3.pdf`, `mockup-giao-dien_v1.0.pdf`, `tom-tat-1-trang.pdf`, `Danh_sach_40_cong_viec_SHMS.xlsx`, bộ `SHMS_AI_Harness_v1.0`): **không có**, không tuyên bố đã đọc. (Bản 40 công việc có mặt dưới tên `QLDAPM_Nhóm_11`.)
