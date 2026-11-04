# Kiến trúc tổng thể SHMS

> **Trạng thái:** phần lớn là **ĐỀ XUẤT** của agent (chưa chốt Q001/Q002). Đánh dấu [CHỐT] / [ĐỀ XUẤT] từng mục. Không coi đề xuất là đã phê duyệt.

## 1. Tổng quan ba project

```
                   ┌─────────────────────────────┐
   Trình duyệt ───▶│ shms-frontend (React+TS SPA) │  Giao diện bệnh viện
                   └──────────────┬──────────────┘
                                  │ HTTPS/JSON (REST)
                   ┌──────────────▼──────────────┐
   Trình duyệt ───▶│ shms-document app (React+TS) │  SHMS Project Hub
                   └──────────────┬──────────────┘
                                  │ HTTPS/JSON
                   ┌──────────────▼──────────────────────────┐
                   │ shms-backend (Node+TS)                   │
                   │  ├─ Module HOSPITAL (nghiệp vụ bệnh viện)│
                   │  ├─ Module HUB (quản lý dự án)           │
                   │  ├─ Auth/RBAC (2 không gian vai trò)     │
                   │  ├─ AI adapter → 9router                 │
                   │  └─ Integration adapters (mô phỏng)      │
                   └──────────────┬───────────────────────────┘
                                  │
                   ┌──────────────▼──────────────┐
                   │ PostgreSQL (2 schema: hospital, hub)      │
                   └─────────────────────────────┘
        Adapters mô phỏng: IoT, BHYT, LIS/RIS, ký số (fixture, chưa có đối tác thật)
```

## 2. Lựa chọn công nghệ

| Hạng mục | Đề xuất | Lý do | Trạng thái |
|---|---|---|---|
| Ngôn ngữ | TypeScript cả 3 project | Bootstrap §2 | [CHỐT] |
| FE framework | **Vite + React 18 + React Router** | SPA, ưu tiên desktop; build nhanh; không cần SSR cho app nội bộ | [ĐỀ XUẤT] |
| FE UI kit | **Ant Design 5** (hoặc MUI) | Bộ component dày (table/form/modal) hợp app quản trị; tông xanh dương dễ theme | [ĐỀ XUẤT] |
| FE state/data | **TanStack Query + Zustand** | Query cache cho REST; Zustand cho UI state nhẹ | [ĐỀ XUẤT] |
| BE framework | **NestJS** | Module hóa mạnh, DI, guard/interceptor cho RBAC + audit, hợp dự án lớn nhiều module | [ĐỀ XUẤT] |
| DB | **PostgreSQL 16** | Quan hệ, transaction, JSONB cho dữ liệu linh hoạt (sinh hiệu, cấu hình) | [ĐỀ XUẤT] |
| ORM | **Prisma** | Migration + type-safe; seed dễ | [ĐỀ XUẤT] |
| Auth | **JWT access + refresh, TOTP 2FA** | A01.3 cần 2FA; stateless hợp SPA | [ĐỀ XUẤT] |
| Validation | **Zod (FE) + class-validator (BE)** | Kiểm tra ở biên | [ĐỀ XUẤT] |
| Test | **Vitest (FE/BE unit) + Playwright (E2E) + Supertest (API)** | | [ĐỀ XUẤT] |
| AI | **9router qua adapter** | Bootstrap §2 | [CHỐT provider], [ĐỀ XUẤT adapter] |

Alternatives đã cân nhắc: Next.js (loại — không cần SSR, thêm phức tạp routing prefix khi qua gateway); Express thuần (loại — thiếu cấu trúc RBAC/module sẵn); MongoDB (loại — nghiệp vụ bệnh viện nặng quan hệ/transaction).

## 3. Ranh giới module (bắt buộc tách — D005)

- **Module HOSPITAL**: người bệnh, khám, bệnh án, nội trú, dược, viện phí, nguồn lực, AI lâm sàng, IoT, báo cáo. Vai trò: QTV, TD, BS, DD, DS, KT, LD, NB.
- **Module HUB**: tài liệu, task, truy vết, context, test, quyết định, báo cáo. Vai trò: PM, PO/BA, SA, DevOps, UI/UX, FE, BE, QA.
- **Không trộn quyền** giữa hai không gian. Một người có thể có tài khoản ở cả hai nhưng token/permission tách theo module.
- **Module PLATFORM dùng chung**: auth, user identity, audit log, notification, file storage — chia sẻ nhưng permission resolve theo context module.

## 4. Bảo mật
- Mọi API yêu cầu xác thực trừ: login, đặt lịch công khai (nếu có), health-check.
- RBAC action-level (A02.2) + data-scope theo khoa (A02.3): guard kiểm tra cả "được làm hành động?" và "trên dữ liệu khoa nào?".
- Audit log (A06.2) append-only cho thao tác nhạy cảm (kê đơn, ký số, thu tiền, đổi quyền).
- 2FA TOTP cho vai trò nhạy cảm (QTV, BS ký số).
- **Cảnh báo:** mọi endpoint mạng mở phải khai báo auth rõ; không tạo service không xác thực âm thầm.
- Bí mật (khóa 9router, DB creds) qua biến môi trường, KHÔNG commit. Chưa có khóa thật — adapter chạy mock cho tới khi có.

## 5. Tích hợp (phân biệt 3 mức — bootstrap §8)
| Kênh | Nội bộ chạy được | Adapter mô phỏng | Kết nối đối tác thật |
|---|---|---|---|
| IoT sinh hiệu (U06) | Có (dữ liệu + ngưỡng + cảnh báo) | Simulator phát sinh hiệu theo contract | Chưa — chờ đối tác |
| BHYT (U01.4, U09.3) | Có (nghiệp vụ bảng kê) | Mock cổng BHYT fixture | Chưa |
| LIS/RIS (U03.3) | Có (hiển thị kết quả) | Mock trả kết quả fixture | Chưa |
| Ký số (U03.4) | Có (trạng thái ký) | Mock chữ ký | Chưa |
| AI 9router (U05, A05.4) | Adapter + xử lý output/timeout/retry | Mock response có contract | Chờ tài liệu + khóa (Q002) |

Không báo "đã tích hợp thật" cho bất kỳ kênh nào. Ghi tiêu chí nghiệm thu mô phỏng riêng với nghiệm thu thật.

## 6. Một nguồn thông tin cho Hub + Claude CLI
- Giai đoạn bootstrap: `document/state/*.json` là nguồn chuẩn.
- Khi Backend Hub sẵn sàng: migration state → DB qua API HUB. File xuất sau đó là **snapshot chỉ đọc**. Không cho hai nguồn cùng nhận cập nhật (R005).
- Hub UI và Claude CLI đọc/ghi cùng một API HUB để tránh lệch nguồn.
