# Ma trận truy vết yêu cầu → màn hình → FE/BE → test

> Chuỗi: tính năng → màn hình/hành động → dữ liệu/API → task FE/BE/docs → test → bằng chứng → nghiệm thu.
> Cột FE/BE/API/Test ghi mã dự kiến; sẽ gán task cụ thể trong `08-backlog/` và `state/tasks.json`. Phần chưa có = `—` (chưa làm, không phải đã xong).

## Quy ước mã
- Màn hình: `SCR-*` (xem `03-man-hinh/`).
- API: `API-<miền>-*` (định nghĩa trong `06-api/`).
- Task FE: `FE-*`, Task BE: `BE-*`, Task Test: `QA-*` (lập trong `08-backlog/`).

## A — Quản trị

| Tính năng | Màn hình | API (dự kiến) | FE | BE | Test | Spec |
|---|---|---|---|---|---|---|
| A01.1 | SCR-ADM-001 | API-ADM-users | — | — | — | CATALOG |
| A01.2 | SCR-ADM-001 | API-ADM-staff | — | — | — | CATALOG |
| A01.3 | SCR-COM-001, SCR-COM-003 | API-AUTH-reset, API-AUTH-2fa | — | — | — | CATALOG |
| A01.4 | SCR-ADM-001 | API-ADM-users-import | — | — | — | CATALOG |
| A02.1 | SCR-ADM-002 | API-ADM-roles | — | — | — | CATALOG |
| A02.2 | SCR-ADM-002 | API-ADM-permissions | — | — | — | CATALOG |
| A02.3 | SCR-ADM-002 | API-ADM-data-scope | — | — | — | CATALOG |
| A02.4 | SCR-ADM-002 | API-ADM-temp-grant | — | — | — | CATALOG |
| A03.1 | SCR-ADM-003 | API-ADM-org | — | — | — | CATALOG |
| A03.2 | SCR-ADM-004 | API-ADM-service | — | — | — | CATALOG |
| A03.3 | SCR-ADM-004 | API-ADM-drug | — | — | — | CATALOG |
| A03.4 | SCR-ADM-004 | API-ADM-icd | — | — | — | CATALOG |
| A04.1 | SCR-ADM-005 | API-ADM-param | — | — | — | CATALOG |
| A04.2 | SCR-ADM-005 | API-ADM-threshold | — | — | — | CATALOG |
| A04.3 | SCR-ADM-005 | API-ADM-workflow | — | — | — | CATALOG |
| A04.4 | SCR-ADM-005 | API-ADM-print-tpl | — | — | — | CATALOG |
| A05.1 | SCR-ADM-006 | API-INT-iot | — | — | — | CATALOG |
| A05.2 | SCR-ADM-006 | API-INT-bhyt | — | — | — | CATALOG |
| A05.3 | SCR-ADM-006 | API-INT-lisris | — | — | — | CATALOG |
| A05.4 | SCR-ADM-006 | API-INT-ai | — | — | — | CATALOG |
| A05.5 | SCR-ADM-006 | API-INT-synclog | — | — | — | CATALOG |
| A06.1 | SCR-ADM-007 | API-MON-health | — | — | — | CATALOG |
| A06.2 | SCR-ADM-007 | API-MON-audit | — | — | — | CATALOG |
| A06.3 | SCR-ADM-007 | API-MON-report | — | — | — | CATALOG |
| A06.4 | SCR-ADM-007 | API-MON-backup | — | — | — | CATALOG |

## U01–U08 — Lâm sàng lõi

| Tính năng | Màn hình | API (dự kiến) | FE | BE | Test | Spec |
|---|---|---|---|---|---|---|
| U01.1 | SCR-REC-001 | API-PAT-register | — | — | — | CATALOG |
| U01.2 | SCR-REC-002 | API-PAT-search | — | — | — | CATALOG |
| U01.3 | SCR-REC-001 | API-PAT-update | — | — | — | CATALOG |
| U01.4 | SCR-REC-003 | API-INT-bhyt-check | — | — | — | CATALOG |
| U02.1 | SCR-REC-004 | API-ENC-register | — | — | — | CATALOG |
| U02.2 | SCR-PAT-001, SCR-REC-005 | API-APPT-book | — | — | — | CATALOG |
| U02.3 | SCR-DOC-001, SCR-REC-004 | API-ENC-queue | — | — | — | CATALOG |
| U02.4 | SCR-DOC-002 | API-ENC-exam | — | — | — | CATALOG |
| U02.5 | SCR-DOC-003 | API-ORDER-cls | — | — | — | CATALOG |
| U02.6 | SCR-DOC-004 | API-RX-prescribe | — | — | — | CATALOG |
| U02.7 | SCR-DOC-008 | API-ADM-admission | — | — | — | CATALOG |
| U02.8 | SCR-NUR-002, SCR-NUR-003 | API-INP-care | — | — | — | CATALOG |
| U03.1 | SCR-DOC-005 | API-EMR-record | — | — | — | CATALOG |
| U03.2 | SCR-DOC-005 | API-EMR-history | — | — | — | CATALOG |
| U03.3 | SCR-DOC-006 | API-LIS-result | — | — | — | CATALOG |
| U03.4 | SCR-DOC-007 | API-EMR-sign | — | — | — | CATALOG |
| U03.5 | SCR-DOC-007 | API-EMR-export | — | — | — | CATALOG |
| U04.1 | SCR-NUR-001 | API-RES-beds | — | — | — | CATALOG |
| U04.2 | SCR-NUR-006 | API-RES-rooms | — | — | — | CATALOG |
| U04.3 | SCR-NUR-007 | API-RES-roster | — | — | — | CATALOG |
| U04.4 | SCR-NUR-008 | API-RES-devices | — | — | — | CATALOG |
| U05.1 | SCR-AI-001 | API-AI-triage | — | — | — | CATALOG |
| U05.2 | SCR-NUR-005 | API-AI-earlywarn | — | — | — | CATALOG |
| U05.3 | SCR-MGR-001 | API-AI-bedforecast | — | — | — | CATALOG |
| U05.4 | SCR-DOC-004 | API-AI-druginteract | — | — | — | CATALOG |
| U06.1 | SCR-NUR-004 | API-IOT-vitals | — | — | — | CATALOG |
| U06.2 | SCR-NUR-004 | API-IOT-trend | — | — | — | CATALOG |
| U06.3 | SCR-NUR-005 | API-IOT-alert | — | — | — | CATALOG |
| U06.4 | SCR-PHA-003 | API-IOT-fridge | — | — | — | CATALOG |
| U07.1 | SCR-MGR-001 | API-RPT-dashboard | — | — | — | CATALOG |
| U07.2 | SCR-MGR-002 | API-RPT-bydept | — | — | — | CATALOG |
| U07.3 | SCR-MGR-002 | API-RPT-export | — | — | — | CATALOG |
| U08.1 | SCR-PAT-002 | API-NOTI-remind | — | — | — | CATALOG |
| U08.2 | SCR-NUR-005 | API-NOTI-clinical | — | — | — | CATALOG |
| U08.3 | SCR-ADM-007 | API-NOTI-ops | — | — | — | CATALOG |
| U08.4 | SCR-COM-002 | API-NOTI-center | — | — | — | CATALOG |

## U09–U11 — Viện phí, dược, trực tuyến

| Tính năng | Màn hình | API (dự kiến) | FE | BE | Test | Spec |
|---|---|---|---|---|---|---|
| U09.1 | SCR-BIL-001 | API-BIL-statement | — | — | — | CATALOG |
| U09.2 | SCR-BIL-002 | API-BIL-payment | — | — | — | CATALOG |
| U09.3 | SCR-BIL-003 | API-INT-bhyt-claim | — | — | — | CATALOG |
| U10.1 | SCR-PHA-001 | API-PHA-dispense | — | — | — | CATALOG |
| U10.2 | SCR-PHA-002 | API-PHA-inventory | — | — | — | CATALOG |
| U11.1 | SCR-PAT-002, SCR-PAT-003 | API-PORTAL-patient | — | — | — | CATALOG |

## HUB

| Tính năng | Màn hình | API (dự kiến) | FE | BE | Test | Spec |
|---|---|---|---|---|---|---|
| HUB-AUTH | SCR-HUB-001 | API-HUB-auth | — | — | — | CATALOG |
| HUB-DOC | SCR-HUB-002, SCR-HUB-003 | API-HUB-docs | — | — | — | CATALOG |
| HUB-REVIEW | SCR-HUB-003 | API-HUB-review | — | — | — | CATALOG |
| HUB-TASK | SCR-HUB-004 | API-HUB-tasks | — | — | — | CATALOG |
| HUB-TRACE | SCR-HUB-005 | API-HUB-trace | — | — | — | CATALOG |
| HUB-CONTEXT | SCR-HUB-006 | API-HUB-context | — | — | — | CATALOG |
| HUB-TEST | SCR-HUB-007 | API-HUB-test | — | — | — | CATALOG |
| HUB-DECISION | SCR-HUB-008 | API-HUB-decision | — | — | — | CATALOG |
| HUB-REPORT | SCR-HUB-008 | API-HUB-report | — | — | — | CATALOG |

## Độ phủ
- 67/67 tính năng bệnh viện + 9/9 HUB đều có màn hình + API dự kiến. **FE/BE/Test = chưa làm** (giai đoạn bootstrap, chưa code).
- Spec hiện ở mức CATALOG toàn bộ; lô nền sẽ nâng lên DRAFT/COMPLETE trong `02-yeu-cau/` (T-SPEC-CORE).
