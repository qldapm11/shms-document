# Danh mục màn hình chính thức & đối chiếu ảnh hành trình

> Mã màn hình chính thức: `SCR-<miền>-<nnn>`. Mã tham chiếu ảnh dùng đầy đủ dạng `UI-REF-<bảng>-<mã trong ảnh>` để tránh gộp nhầm với mã QT trong PDF cũ.
> 48 khung trong 6 bảng ảnh là **minh họa hành trình**, không phải giới hạn số màn hình. Chưa đọc chi tiết pixel ảnh (hoãn để tránh tràn context); đối chiếu theo mã hành trình ghi trong bootstrap §4.1.

## Bảng đối chiếu nguồn ảnh → hành trình

| Bảng | Vai trò | Mã trong ảnh (bootstrap §4.1) |
|---|---|---|
| 01 | Người bệnh & tiếp đón | NB01–NB04, TD01–TD04 |
| 02 | Bác sĩ | BS01–BS08 |
| 03 | Điều dưỡng, nội trú | DD01–DD08 |
| 04 | Dược, vật tư, viện phí | DU01–DU04, VP01–VP04 |
| 05 | Lãnh đạo, quản trị | LD01–LD02, QT01–QT06 |
| 06 | SHMS Project Hub | DA01–DA08 |

## Màn hình chính thức

### Dùng chung (SCR-COM)
| Mã | Màn hình | Tính năng |
|---|---|---|
| SCR-COM-001 | Đăng nhập + 2FA | A01.3 |
| SCR-COM-002 | Trung tâm thông báo | U08.4 |
| SCR-COM-003 | Hồ sơ cá nhân / đổi mật khẩu | A01.3 |
| SCR-COM-004 | Trạng thái mất kết nối / lỗi chung | (nền tảng) |

### Quản trị (SCR-ADM) — bảng 05 QT01–QT06
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-ADM-001 | Quản lý tài khoản | A01.1, A01.2, A01.4 | UI-REF-05-QT01 |
| SCR-ADM-002 | Vai trò & phân quyền | A02.1–A02.4 | UI-REF-05-QT02 |
| SCR-ADM-003 | Danh mục tổ chức (khoa/phòng/giường) | A03.1 | UI-REF-05-QT03 |
| SCR-ADM-004 | Danh mục dịch vụ/thuốc/ICD | A03.2–A03.4 | UI-REF-05-QT03 |
| SCR-ADM-005 | Cấu hình tham số & quy trình | A04.1–A04.4 | UI-REF-05-QT04 |
| SCR-ADM-006 | Quản lý tích hợp & nhật ký đồng bộ | A05.1–A05.5 | UI-REF-05-QT05 |
| SCR-ADM-007 | Giám sát hệ thống & audit | A06.1–A06.4 | UI-REF-05-QT06 |

### Tiếp đón (SCR-REC) — bảng 01 TD/NB
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-REC-001 | Tiếp nhận người bệnh mới | U01.1, U01.3 | UI-REF-01-TD01 |
| SCR-REC-002 | Tra cứu người bệnh | U01.2 | UI-REF-01-TD02 |
| SCR-REC-003 | Kiểm tra thẻ BHYT | U01.4 | UI-REF-01-TD03 |
| SCR-REC-004 | Đăng ký khám & cấp số | U02.1, U02.3 | UI-REF-01-TD04 |
| SCR-REC-005 | Đặt lịch trực tuyến (quầy) | U02.2 | UI-REF-01-NB02 |

### Bác sĩ (SCR-DOC) — bảng 02 BS01–BS08
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-DOC-001 | Hàng chờ khám của bác sĩ | U02.3 | UI-REF-02-BS01 |
| SCR-DOC-002 | Khám & chẩn đoán | U02.4 | UI-REF-02-BS02 |
| SCR-DOC-003 | Chỉ định cận lâm sàng | U02.5 | UI-REF-02-BS03 |
| SCR-DOC-004 | Kê đơn thuốc (có cảnh báo tương tác) | U02.6, U05.4 | UI-REF-02-BS04 |
| SCR-DOC-005 | Bệnh án & lịch sử điều trị | U03.1, U03.2 | UI-REF-02-BS05 |
| SCR-DOC-006 | Kết quả cận lâm sàng | U03.3 | UI-REF-02-BS06 |
| SCR-DOC-007 | Ký số & in/xuất bệnh án | U03.4, U03.5 | UI-REF-02-BS07 |
| SCR-DOC-008 | Quyết định nhập/chuyển/xuất viện | U02.7 | UI-REF-02-BS08 |

### Điều dưỡng / nội trú (SCR-NUR) — bảng 03 DD01–DD08
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-NUR-001 | Sơ đồ giường | U04.1 | UI-REF-03-DD01 |
| SCR-NUR-002 | Danh sách người bệnh nội trú | U02.8 | UI-REF-03-DD02 |
| SCR-NUR-003 | Thực hiện y lệnh & chăm sóc | U02.8 | UI-REF-03-DD03 |
| SCR-NUR-004 | Theo dõi sinh hiệu (IoT) | U06.1, U06.2 | UI-REF-03-DD04 |
| SCR-NUR-005 | Cảnh báo vượt ngưỡng/mất tín hiệu | U06.3, U05.2, U08.2 | UI-REF-03-DD05 |
| SCR-NUR-006 | Phòng bệnh/phòng khám | U04.2 | UI-REF-03-DD06 |
| SCR-NUR-007 | Lịch trực | U04.3 | UI-REF-03-DD07 |
| SCR-NUR-008 | Thiết bị y tế & bảo trì | U04.4 | UI-REF-03-DD08 |

### Dược / viện phí (SCR-PHA, SCR-BIL) — bảng 04 DU/VP
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-PHA-001 | Cấp phát thuốc theo đơn | U10.1 | UI-REF-04-DU01 |
| SCR-PHA-002 | Tồn kho & hạn dùng | U10.2 | UI-REF-04-DU02 |
| SCR-PHA-003 | Nhiệt độ kho thuốc (IoT) | U06.4 | UI-REF-04-DU03 |
| SCR-BIL-001 | Bảng kê & tách phần chi trả | U09.1 | UI-REF-04-VP01 |
| SCR-BIL-002 | Thu tiền & in biên lai | U09.2 | UI-REF-04-VP02 |
| SCR-BIL-003 | Hồ sơ BHYT gửi/nhận | U09.3 | UI-REF-04-VP03 |

### Lãnh đạo (SCR-MGR) — bảng 05 LD01–LD02
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-MGR-001 | Dashboard điều hành | U07.1, U05.3 | UI-REF-05-LD01 |
| SCR-MGR-002 | Báo cáo theo khoa/thời gian & xuất | U07.2, U07.3 | UI-REF-05-LD02 |

### Người bệnh trực tuyến (SCR-PAT) — bảng 01 NB01–NB04
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-PAT-001 | Đặt lịch hẹn trực tuyến (mobile) | U02.2 | UI-REF-01-NB01 |
| SCR-PAT-002 | Xem lịch hẹn & số thứ tự | U08.1, U11.1 | UI-REF-01-NB03 |
| SCR-PAT-003 | Xem kết quả khám/CLS | U11.1 | UI-REF-01-NB04 |

### AI (lồng trong màn hình nghiệp vụ)
| Mã | Vị trí | Tính năng |
|---|---|---|
| SCR-AI-001 | Gợi ý phân luồng tại tiếp đón/khám | U05.1 |
| (U05.2) | Panel cảnh báo sớm trong SCR-NUR-005 | U05.2 |
| (U05.3) | Widget dự báo giường trong SCR-MGR-001 | U05.3 |
| (U05.4) | Cảnh báo trong SCR-DOC-004 | U05.4 |

### Project Hub (SCR-HUB) — bảng 06 DA01–DA08
| Mã | Màn hình | Tính năng | Nguồn |
|---|---|---|---|
| SCR-HUB-001 | Đăng nhập & trang chủ Hub | HUB-AUTH | UI-REF-06-DA01 |
| SCR-HUB-002 | Thư viện tài liệu (xem/tìm/lọc/version) | HUB-DOC | UI-REF-06-DA02 |
| SCR-HUB-003 | Soạn/so sánh tài liệu & review | HUB-DOC, HUB-REVIEW | UI-REF-06-DA03 |
| SCR-HUB-004 | Bảng task & phân công | HUB-TASK | UI-REF-06-DA04 |
| SCR-HUB-005 | Ma trận truy vết | HUB-TRACE | UI-REF-06-DA05 |
| SCR-HUB-006 | Context/checkpoint/handoff | HUB-CONTEXT | UI-REF-06-DA06 |
| SCR-HUB-007 | Test & nghiệm thu | HUB-TEST | UI-REF-06-DA07 |
| SCR-HUB-008 | Quyết định & báo cáo/bàn giao | HUB-DECISION, HUB-REPORT | UI-REF-06-DA08 |

## Ghi chú độ phủ
- Mọi mã trong 67 + 9 HUB đều có ≥1 màn hình xử lý (xem ma trận `07-truy-vet/`).
- Phần bổ sung ngoài 48 khung ảnh: SCR-COM-004, tách SCR-ADM theo A-group, panel AI lồng ghép — đánh dấu là **đề xuất của agent**, cần Phong (UI/UX) xác nhận khi thiết kế chi tiết.
