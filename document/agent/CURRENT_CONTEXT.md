# CURRENT_CONTEXT — SHMS

> Chỉ mục tóm tắt, **sinh lại được** từ `document/state/`. KHÔNG phải nguồn trạng thái thứ hai. Khi lệch, tin `state/`.

## Dự án
SHMS — Hệ thống Quản lý Bệnh viện Thông minh. Version 0.1.0. Giai đoạn: **BOOTSTRAP_REQUIREMENTS_DESIGN** (chưa code ứng dụng).

Ba project (giữ cấu trúc thực tế): `shms-frontend` (React+TS), `shms-backend` (Node+TS), `shms-document` (React+TS — SHMS Project Hub). State tại `shms-document/document/state/`.

## Phạm vi
67 tính năng bệnh viện (A=25, U01-U08=36, U09-U11=6) + 9 HUB-*. Làm toàn bộ, phân kỳ triển khai, không cắt scope.

## Nguồn state chuẩn
- `state/project.json` — cấu hình, giai đoạn, scope.
- `state/features.json` — 67+9, 3 mức readiness (spec/impl/acceptance) tách riêng.
- `state/decisions.json` — D001-D007, giả định AS001-AS003.
- `state/open-questions.json` — Q001-Q004.
- `state/risks.json` — R001-R005.
- `state/tasks.json` — G01-G40 (nhóm) + T-* (kỹ thuật).
- `state/events.jsonl` — nhật ký (chỉ thêm dòng).
- `state/checkpoints/` — checkpoint từng phiên.

## Blocker chính
- Q001 stack FE/BE chưa chốt → chặn code.
- Q002 tài liệu 9router → chặn impl AI.

## Bước tiếp theo
T-REQ-001 (catalog+screens+traceability) → T-DESIGN-001 (kiến trúc) → T-PLAN-001 (roadmap) → T-SPEC-CORE (đặc tả lô nền).

## Quy tắc đọc phiên mới
Đọc bootstrap prompt → checkpoint mới nhất → state → diff thực tế. Không hỏi lại quyết định đã chốt. Không tự báo DONE khi chưa có bằng chứng.
