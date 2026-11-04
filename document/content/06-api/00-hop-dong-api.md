# Hợp đồng API & phân quyền (tổng thể)

> [ĐỀ XUẤT] — quy ước chung + nhóm endpoint theo miền. Chi tiết request/response từng endpoint hoàn thiện khi đặc tả feature (Loại C). Base path dự kiến `/api/v1`. Khi qua gateway sẽ thêm prefix riêng (Q003).

## Quy ước chung
- REST/JSON. `Content-Type: application/json`.
- Auth: `Authorization: Bearer <access_token>`. Refresh token qua `/auth/refresh`.
- Phân trang: `?page=&size=&sort=`. Trả `{ data, total, page, size }`.
- Lỗi chuẩn: `{ error: { code, message, details? }, traceId }`.
- Idempotency cho thao tác tạo nhạy cảm: header `Idempotency-Key` (chống thao tác trùng).

## Mã lỗi chuẩn
| HTTP | code | Khi nào |
|---|---|---|
| 400 | VALIDATION_ERROR | Sai dữ liệu đầu vào |
| 401 | UNAUTHENTICATED | Thiếu/hết hạn token |
| 403 | FORBIDDEN | Không đủ quyền/sai data-scope |
| 404 | NOT_FOUND | Không tồn tại |
| 409 | CONFLICT | Xung đột trạng thái / thao tác trùng |
| 422 | BUSINESS_RULE | Vi phạm luật nghiệp vụ (vd kê đơn khi encounter đã DONE) |
| 429 | RATE_LIMITED | Quá giới hạn (gồm AI 9router) |
| 502 | INTEGRATION_ERROR | Lỗi adapter tích hợp/nhà cung cấp |
| 504 | INTEGRATION_TIMEOUT | Timeout tích hợp/AI |

## Nhóm endpoint theo miền (khớp ma trận truy vết)

### Platform / Auth
- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- `POST /auth/2fa/setup`, `POST /auth/2fa/verify`, `POST /auth/password/reset` → A01.3
- `GET/POST/PATCH /admin/users`, `POST /admin/users/import` → A01.*
- `GET/POST/PATCH /admin/roles`, `/admin/permissions`, `/admin/data-scopes`, `/admin/temp-grants` → A02.*

### Danh mục / cấu hình
- `/admin/departments`, `/admin/beds`, `/admin/services`, `/admin/drugs`, `/admin/icd10` → A03.*
- `/admin/config`, `/admin/thresholds`, `/admin/workflows`, `/admin/print-templates` → A04.*

### Giám sát & tích hợp
- `/admin/integrations`, `/admin/sync-logs` → A05.*
- `/monitor/health`, `/monitor/audit`, `/monitor/reports`, `/monitor/backups` → A06.*

### Lâm sàng
- `/patients`, `/patients/:id`, `/patients/search`, `/patients/:id/bhyt-check` → U01.*
- `/appointments`, `/encounters`, `/encounters/queue` → U02.1-U02.3
- `/encounters/:id/exam`, `/encounters/:id/orders`, `/encounters/:id/prescriptions` → U02.4-U02.6
- `/admissions`, `/admissions/:id/care-tasks` → U02.7-U02.8
- `/medical-records`, `/medical-records/:id/sign`, `/medical-records/:id/export` → U03.*
- `/lab-results` → U03.3

### Nguồn lực / IoT
- `/resources/beds`, `/resources/rooms`, `/resources/rosters`, `/resources/devices` → U04.*
- `/iot/vitals`, `/iot/vitals/trend`, `/iot/alerts`, `/iot/fridge` → U06.*

### AI (qua 9router adapter)
- `POST /ai/triage` → U05.1
- `POST /ai/early-warning` → U05.2
- `GET /ai/bed-forecast` → U05.3
- `POST /ai/drug-interaction` → U05.4
- Mọi endpoint AI: timeout có giới hạn, retry ≤ N, ghi `ai_requests`, trả fallback khi lỗi nhà cung cấp, cần nhân viên y tế xác nhận trước khi áp dụng kết quả (không auto-apply).

### Báo cáo / thông báo
- `/reports/dashboard`, `/reports/by-department`, `/reports/export` → U07.*
- `/notifications`, `/notifications/center` → U08.*

### Viện phí / dược
- `/invoices`, `/invoices/:id/items`, `/payments`, `/bhyt-claims` → U09.*
- `/pharmacy/dispenses`, `/pharmacy/inventory` → U10.*

### Người bệnh trực tuyến
- `/portal/appointments`, `/portal/results` → U11.1 (quyền NB, chỉ dữ liệu của chính mình)

### HUB
- `/hub/auth`, `/hub/documents`, `/hub/reviews`, `/hub/tasks`, `/hub/traceability`, `/hub/checkpoints`, `/hub/handoffs`, `/hub/test-cases`, `/hub/decisions`, `/hub/events` → HUB-*

## Phân quyền theo hành động (ví dụ)
| Endpoint | Vai trò được phép | Data-scope |
|---|---|---|
| `POST /encounters/:id/prescriptions` | BS | encounter thuộc khoa của BS |
| `POST /medical-records/:id/sign` | BS (chủ bệnh án) | của chính mình |
| `POST /payments` | KT | khoa thu ngân |
| `GET /reports/dashboard` | LD, QTV | toàn viện hoặc khoa được giao |
| `/admin/*` | QTV | toàn hệ thống |
| `/hub/*` | vai trò dự án (PM/BA/Dev/QA...) | KHÔNG dùng quyền bệnh viện |

## AI 9router — chưa xác minh
Chưa biết endpoint/model/khả năng thật của 9router (Q002). Thiết kế lớp `AiProvider` trừu tượng; triển khai `NineRouterProvider` + `MockAiProvider`. Mặc định dùng Mock cho tới khi có tài liệu + khóa test. Không bịa khả năng.
