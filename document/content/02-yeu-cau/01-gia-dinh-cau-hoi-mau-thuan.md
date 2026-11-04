# Giả định, câu hỏi và mâu thuẫn

> Nguồn chuẩn: `state/decisions.json` (giả định AS*), `state/open-questions.json` (Q*). Bản này tổng hợp cho người đọc + ghi mâu thuẫn giữa các nguồn.

## Giả định đang dùng
| Mã | Giả định | Trạng thái |
|---|---|---|
| AS001 | Dùng cấu trúc `shms-frontend/backend/document` (không phải `frontend/backend/document` như bootstrap đề xuất) | Đã xác nhận |
| AS002 | Stack cụ thể (Vite+React / NestJS / PostgreSQL / Prisma) là **đề xuất** tới khi chốt Q001 | Đề xuất |
| AS003 | 8 thành viên + vai trò theo bootstrap §3 là bản hiện hành | Đã xác nhận |

## Câu hỏi còn mở
| Mã | Chủ đề | Chặn gì |
|---|---|---|
| Q001 | Stack FE/BE/DB/ORM | Mọi task code |
| Q002 | Tài liệu & khả năng 9router | Impl AI (U05, A05.4) |
| Q003 | Nơi triển khai demo (gateway vs local) | Publish demo |
| Q004 | Mức nghiệm thu mô phỏng tích hợp | Acceptance feature integration |

## Mâu thuẫn giữa các nguồn & cách giải quyết
| # | Mâu thuẫn | Nguồn | Giải quyết |
|---|---|---|---|
| C1 | Cấu trúc thư mục: bootstrap đề xuất `frontend/backend/document`; thực tế có `shms-frontend/backend/document` | Bootstrap §2 vs repo thực tế | Giữ cấu trúc thực tế (D002). State dưới `shms-document/document/`. |
| C2 | Bản phân công: `Nhom_X_Phan_cong.xlsx` (I–XIII) vs `QLDAPM_Nhóm_11` (40 công việc) | 2 file xlsx | Dùng bản 40 công việc làm chuẩn (D007); bản I–XIII chỉ tham khảo. |
| C3 | Mức Must/Should/Could cũ (20 Must/14 màn hình) vs phạm vi 67 tính năng | Harness PA1 cũ vs bootstrap §2 | Bỏ giới hạn cũ, làm toàn bộ 67 (D001). |
| C4 | Mã QT trong PDF cũ vs mã QT trong ảnh bảng 05 | Bootstrap §4.1 cảnh báo | Dùng mã đầy đủ `UI-REF-05-QT0x` khi truy vết, không gộp. |
| C5 | Tên thành viên: mẫu báo cáo docx dùng A–F ẩn danh vs bootstrap §3 dùng tên thật | docx vs bootstrap | Dùng tên bootstrap §3 (AS003); docx chỉ là khung mẫu. |
| C6 | Số liệu 500 giường/30 tỷ/2027 | Tài liệu dự án giả lập | Đánh dấu GIẢ LẬP trong project.json, không phải thực tế nhóm. |

## Điểm KHÔNG suy diễn từ ảnh/tài liệu minh họa
Quyền truy cập, ngưỡng y tế, giá dịch vụ, quy định BHYT, tương tác thuốc, kết quả AI chính thức — tất cả cần xác nhận riêng, không lấy trực tiếp từ số liệu xuất hiện trong ảnh mockup.
