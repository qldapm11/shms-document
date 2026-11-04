# Backlog triển khai & roadmap phân kỳ

> Giữ toàn bộ 67 + 9 HUB trong kế hoạch. Thứ tự theo phụ thuộc. Ước lượng có mức bất định; đơn vị = ngày-người (đ-ng), ký hiệu bất định: L=thấp, M=trung bình, H=cao.
> **Cảnh báo lịch (R001):** cửa sổ nhóm 02–15/11 không đủ cho toàn bộ. Roadmap chia pha; pha sau là phần có nguy cơ trễ, không bị cắt khỏi kế hoạch.

## Nguyên tắc chia task
- Mỗi feature sinh tối thiểu: 1 task BE (API+nghiệp vụ), 1 task FE (màn hình), 1 task QA (test). Feature tích hợp thêm task adapter mô phỏng. Feature AI thêm task adapter 9router.
- Task bàn giao độc lập được; liên kết `feature_ids`, `screen_ids`, `group_link` (G01-G40).
- Một agent giữ một task triển khai tại một thời điểm.

## Pha triển khai

### Pha 0 — Nền tảng (bắt buộc trước mọi thứ)
Phụ thuộc: chốt Q001 (stack).
| Task | Nội dung | Feature | Ước lượng | Bất định |
|---|---|---|---|---|
| P0-SETUP-FE | Khởi tạo Vite+React+TS, routing, theme xanh, layout, i18n vi | — | 2 đ-ng | M |
| P0-SETUP-BE | Khởi tạo NestJS+TS, Prisma, cấu trúc module, migration cơ sở | — | 2 đ-ng | M |
| P0-AUTH | Đăng nhập, JWT, refresh, 2FA, đổi/đặt lại MK | A01.3 | 3 đ-ng | M |
| P0-RBAC | Vai trò, quyền action-level, data-scope, phân quyền tạm thời | A02.1-A02.4 | 4 đ-ng | H |
| P0-AUDIT | Audit log append-only + middleware | A06.2 | 1.5 đ-ng | L |
| P0-SEED | Dữ liệu mẫu + tài khoản demo mọi vai trò | G14 | 2 đ-ng | M |

### Pha 1 — Quản trị & danh mục
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| P1-USERS | A01.1, A01.2, A01.4 | 3 đ-ng | M |
| P1-CATALOG | A03.1-A03.4 | 4 đ-ng | M |
| P1-CONFIG | A04.1-A04.4 | 3 đ-ng | M |
| P1-MONITOR | A06.1, A06.3, A06.4 | 3 đ-ng | M |

### Pha 2 — Luồng lâm sàng lõi (tiếp đón → khám → đơn)
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| P2-RECEPTION | U01.1-U01.3, U02.1, U02.3 | 5 đ-ng | M |
| P2-EXAM | U02.4, U02.5, U03.1-U03.2 | 5 đ-ng | H |
| P2-PRESCRIBE | U02.6 | 3 đ-ng | M |
| P2-EMR | U03.3-U03.5 (ký số mô phỏng) | 4 đ-ng | H |
| P2-APPOINTMENT | U02.2, U08.1 | 3 đ-ng | M |

### Pha 3 — Nội trú, nguồn lực, IoT
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| P3-ADMISSION | U02.7, U02.8 | 4 đ-ng | H |
| P3-BEDS | U04.1, U04.2 | 3 đ-ng | M |
| P3-RESOURCES | U04.3, U04.4 | 2 đ-ng | M |
| P3-IOT | U06.1-U06.4 + simulator | 5 đ-ng | H |

### Pha 4 — Viện phí, dược, BHYT
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| P4-BILLING | U09.1, U09.2 | 4 đ-ng | H |
| P4-BHYT | U01.4, U09.3 (mô phỏng) | 3 đ-ng | H |
| P4-PHARMACY | U10.1, U10.2 | 4 đ-ng | M |

### Pha 5 — AI, báo cáo, thông báo, cổng người bệnh
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| P5-AI | U05.1-U05.4 + adapter 9router (mock) | 5 đ-ng | H |
| P5-REPORT | U07.1-U07.3 | 4 đ-ng | M |
| P5-NOTI | U08.2-U08.4 | 3 đ-ng | M |
| P5-PORTAL | U11.1, SCR-PAT | 3 đ-ng | M |
| P5-INTEGRATION | A05.1-A05.5 (adapter + sync log) | 4 đ-ng | H |

### Pha H — SHMS Project Hub (song song được, ưu tiên sớm vì phục vụ quản lý)
| Task | Feature | Ước lượng | Bất định |
|---|---|---|---|
| PH-HUB-CORE | HUB-AUTH, HUB-DOC, HUB-TASK | 5 đ-ng | H |
| PH-HUB-TRACE | HUB-TRACE, HUB-REVIEW | 3 đ-ng | M |
| PH-HUB-CONTEXT | HUB-CONTEXT, HUB-TEST | 3 đ-ng | M |
| PH-HUB-REPORT | HUB-DECISION, HUB-REPORT | 3 đ-ng | M |
| PH-MIGRATE | Migration state/*.json → DB HUB, snapshot chỉ đọc | — | 3 đ-ng | H |

## Tổng ước lượng thô
~115–125 đ-ng (chưa gồm review/test lặp). Với 8 người ~2 tuần ≈ 70–80 đ-ng khả dụng → **không đủ cho toàn bộ trong cửa sổ nhóm**. 

## Khuyến nghị phạm vi demo khả thi (báo PM quyết)
- **Khả thi trong cửa sổ:** Pha 0 + Pha 1 + Pha 2 + Pha H-CORE → luồng xuyên suốt tiếp đón→khám→kê đơn→bệnh án + quản trị + Hub cơ bản.
- **Nguy cơ trễ (đưa vào pha sau, vẫn trong kế hoạch):** Pha 3, 4, 5 đầy đủ; tích hợp mô phỏng nâng cao.
- Không cắt khỏi backlog; chỉ xếp thứ tự. PM (Nguyệt) + BA (Minh) chốt lát cắt demo.

## Thứ tự phụ thuộc (rút gọn)
P0 → (P1 ∥ P2-RECEPTION) → P2-EXAM → P2-PRESCRIBE → P2-EMR → P3 → P4 → P5. Hub chạy song song sau P0-AUTH/RBAC. Integration/AI phụ thuộc Q002/Q004.
