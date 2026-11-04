# Danh mục 67 tính năng bệnh viện + 9 HUB

> Nguồn chuẩn dữ liệu: `state/features.json`. Bảng này là bản đọc cho người. Mức readiness xem trong state (spec/impl/acceptance tách riêng).

Vai trò: QTV=Quản trị, TD=Tiếp đón, BS=Bác sĩ, DD=Điều dưỡng, DS=Dược sĩ, KT=Kế toán/Viện phí, LD=Lãnh đạo, NB=Người bệnh.

## Nhóm A — Quản trị hệ thống (25)

| Mã | Tên | Vai trò | Ghi chú |
|---|---|---|---|
| A01.1 | Tạo/sửa/khóa/mở khóa tài khoản | QTV | Ưu tiên khóa/ngừng dùng thay vì xóa |
| A01.2 | Hồ sơ nhân viên | QTV | |
| A01.3 | Đặt lại mật khẩu và 2FA | QTV, ALL | Tách: đặt lại MK + bật/tắt/xác minh 2FA |
| A01.4 | Nhập tài khoản từ Excel | QTV | Validate + báo cáo lỗi dòng |
| A02.1 | Vai trò mặc định | QTV | |
| A02.2 | Quyền theo chức năng/hành động | QTV | RBAC action-level |
| A02.3 | Phạm vi dữ liệu theo khoa | QTV | Data scope |
| A02.4 | Phân quyền tạm thời | QTV | Có thời hạn, tự thu hồi |
| A03.1 | Khoa/phòng/buồng/giường | QTV | Cây phân cấp |
| A03.2 | Chuyên khoa/dịch vụ/giá | QTV, KT | |
| A03.3 | Thuốc/vật tư | QTV, DS | |
| A03.4 | ICD-10 và danh mục dùng chung | QTV, BS | |
| A04.1 | Tham số vận hành | QTV | |
| A04.2 | Ngưỡng cảnh báo và luật phân luồng | QTV | Giá trị minh họa cần xác nhận |
| A04.3 | Cấu hình quy trình | QTV | |
| A04.4 | Mẫu in | QTV | |
| A05.1 | Tích hợp thiết bị IoT | QTV | mô phỏng |
| A05.2 | Cổng BHYT | QTV, KT | mô phỏng |
| A05.3 | LIS/RIS | QTV | mô phỏng |
| A05.4 | Dịch vụ AI | QTV | qua 9router |
| A05.5 | Nhật ký đồng bộ và lỗi tích hợp | QTV | |
| A06.1 | Tình trạng hệ thống | QTV, LD | |
| A06.2 | Nhật ký truy cập/thao tác | QTV | Audit, không sửa/xóa |
| A06.3 | Báo cáo quản trị | QTV, LD | |
| A06.4 | Theo dõi sao lưu/phục hồi | QTV | |

## Nhóm U01–U08 — Nghiệp vụ lâm sàng lõi (36)

| Mã | Tên | Vai trò | Nguồn ảnh |
|---|---|---|---|
| U01.1 | Tiếp nhận mới | TD | UI-REF-01 |
| U01.2 | Tra cứu người bệnh | TD, BS, DD | UI-REF-01 |
| U01.3 | Cập nhật hành chính | TD | |
| U01.4 | Kiểm tra thẻ BHYT | TD, KT | mô phỏng |
| U02.1 | Đăng ký/cấp số khám | TD | UI-REF-01 |
| U02.2 | Đặt lịch trực tuyến | NB, TD | UI-REF-01 |
| U02.3 | Hàng chờ khám | TD, BS, DD | |
| U02.4 | Khám/chẩn đoán | BS | UI-REF-02 |
| U02.5 | Chỉ định cận lâm sàng | BS | UI-REF-02 |
| U02.6 | Kê đơn thuốc | BS | UI-REF-02 |
| U02.7 | Nhập/chuyển/xuất viện | BS, DD | UI-REF-03 |
| U02.8 | Điều trị và chăm sóc nội trú | BS, DD | UI-REF-03 |
| U03.1 | Bệnh án theo lượt/đợt | BS, DD | |
| U03.2 | Lịch sử điều trị | BS, DD | |
| U03.3 | Kết quả cận lâm sàng | BS | mô phỏng LIS/RIS |
| U03.4 | Ký số bệnh án | BS | mô phỏng |
| U03.5 | In/xuất bệnh án | BS, DD | |
| U04.1 | Sơ đồ giường | DD, BS, LD | UI-REF-03 |
| U04.2 | Phòng bệnh/phòng khám | QTV, DD | |
| U04.3 | Lịch trực | LD, DD | |
| U04.4 | Thiết bị y tế và bảo trì | QTV, DD | |
| U05.1 | AI phân luồng | TD, BS | 9router |
| U05.2 | AI cảnh báo sớm | BS, DD | 9router |
| U05.3 | AI dự báo giường | LD, DD | 9router |
| U05.4 | AI cảnh báo tương tác thuốc | BS, DS | 9router |
| U06.1 | Sinh hiệu theo giường | DD, BS | mô phỏng IoT |
| U06.2 | Xu hướng sinh hiệu | DD, BS | mô phỏng IoT |
| U06.3 | Vượt ngưỡng/mất tín hiệu | DD, BS | mô phỏng IoT |
| U06.4 | Nhiệt độ kho thuốc | DS | mô phỏng IoT |
| U07.1 | Dashboard | LD, QTV | UI-REF-05 |
| U07.2 | Báo cáo theo khoa/thời gian | LD, QTV | |
| U07.3 | Xuất Excel/PDF | LD, KT, QTV | |
| U08.1 | Nhắc lịch/số thứ tự | NB, TD | |
| U08.2 | Cảnh báo lâm sàng | BS, DD | |
| U08.3 | Cảnh báo vận hành | QTV, LD | |
| U08.4 | Trung tâm thông báo | ALL | |

## Nhóm U09–U11 — Viện phí, dược, trực tuyến (6)

| Mã | Tên | Vai trò | Nguồn ảnh |
|---|---|---|---|
| U09.1 | Bảng kê/tách phần chi trả | KT | UI-REF-04 |
| U09.2 | Thu tiền/biên lai | KT | UI-REF-04 |
| U09.3 | Gửi/nhận phản hồi hồ sơ BHYT | KT | mô phỏng |
| U10.1 | Cấp phát thuốc theo đơn | DS | UI-REF-04 |
| U10.2 | Tồn kho/hạn dùng | DS | |
| U11.1 | Người bệnh xem lịch hẹn/kết quả (mobile) | NB | |

## HUB — SHMS Project Hub (9, ngoài 67)

| Mã | Tên |
|---|---|
| HUB-DOC | Quản lý tài liệu: xem/tìm/phân loại/version/so sánh |
| HUB-REVIEW | Bình luận/review/phê duyệt |
| HUB-TASK | Phân công, trạng thái, phụ thuộc, blocker |
| HUB-TRACE | Truy vết yêu cầu–màn hình–FE/BE–test |
| HUB-CONTEXT | Context/checkpoint/handoff |
| HUB-TEST | Kế hoạch/test case/kết quả/lỗi/nghiệm thu |
| HUB-DECISION | Quyết định/giả định/câu hỏi/kiểm soát thay đổi |
| HUB-REPORT | Báo cáo/slide/video/bàn giao + minh chứng |
| HUB-AUTH | Đăng nhập Hub + quyền theo trách nhiệm dự án |

**Tổng: 67 bệnh viện + 9 HUB.** Kiểm tra: A=25, U01–U08=36, U09–U11=6.
