# SHMS — Chỉ mục tài liệu dự án

> SHMS — Smart Hospital Management System — Hệ thống Quản lý Bệnh viện Thông minh. Version 0.1.0.
> Giai đoạn hiện tại: **BOOTSTRAP — xây dựng yêu cầu, thiết kế, kế hoạch** (chưa lập trình ứng dụng).

Nguồn trạng thái chuẩn: `shms-document/document/state/`. Tài liệu dưới đây dẫn link tới nguồn chuẩn, không sao chép.

## Cấu trúc tài liệu (`document/content/`)

| Thư mục | Nội dung |
|---|---|
| `00-tong-quan/` | Chỉ mục, danh mục nguồn, tổng quan dự án |
| `01-quan-ly-du-an/` | Điều lệ, stakeholder, WBS, lịch, chi phí, nguồn lực, truyền thông, chất lượng |
| `02-yeu-cau/` | Danh mục 67 tính năng + HUB, use case, acceptance; đặc tả chi tiết |
| `03-man-hinh/` | Danh mục màn hình, hành trình vai trò, đối chiếu 6 bảng ảnh |
| `04-kien-truc/` | Kiến trúc, module, bảo mật, quyết định kỹ thuật |
| `05-du-lieu/` | ERD, từ điển dữ liệu, trạng thái, dữ liệu mẫu |
| `06-api/` | Hợp đồng API, lỗi, phân quyền, tích hợp |
| `07-truy-vet/` | Ma trận truy vết yêu cầu–màn hình–FE/BE–test |
| `08-backlog/` | Backlog triển khai, thứ tự, ước lượng |
| `09-test/` | Kế hoạch test, test case, kết quả, nghiệm thu |
| `10-van-hanh/` | Triển khai, giám sát, backup/restore, sự cố |
| `11-bao-cao/` | Báo cáo tổng hợp, slide, kịch bản, video, bàn giao |

## Chuỗi truy vết chuẩn
mục tiêu → yêu cầu → tính năng → màn hình/hành động → dữ liệu/API → task FE/BE/docs → test → bằng chứng → nghiệm thu.

## Phạm vi
- 67 tính năng bệnh viện: A (25) + U01–U08 (36) + U09–U11 (6).
- 9 tính năng Project Hub (`HUB-*`), ngoài con số 67.
- Làm toàn bộ; phân kỳ triển khai nhưng mọi tính năng nằm trong kế hoạch.

## Cách đọc
Người mới: đọc `00-tong-quan/` → `02-yeu-cau/` → `04-kien-truc/`. Agent tiếp phiên: đọc `../state/` + checkpoint mới nhất trước.
