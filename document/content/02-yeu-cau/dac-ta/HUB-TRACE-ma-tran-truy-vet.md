## HUB-TRACE — Ma trận truy vết yêu cầu–màn hình–FE/BE–test

- **Mục đích:** Duy trì ma trận truy vết hai chiều giữa yêu cầu (feature), màn hình (SCR), task FE/BE (API) và ca kiểm thử/kết quả; phát hiện thiếu phủ (feature không có màn hình/test, API không gắn feature) để bảo đảm toàn bộ 67 + 9 HUB được xử lý.
- **Vai trò sử dụng:** Mọi thành viên (xem/kiểm tra độ phủ); BA/SA (duy trì liên kết yêu cầu–thiết kế); FE/BE (gắn task thực thi); QA (gắn test); PM/SA (duyệt độ phủ).
- **Liên kết nguồn:** HUB-TRACE; SCR-HUB-005 (ma trận truy vết); API nhóm `/hub/traceability`; `hub.traceability`; nguồn liên kết: features.json, danh mục màn hình (03-man-hinh), API (06-api), HUB-TASK, HUB-TEST.
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần SA Dương + QA Phương Anh xác nhận tiêu chí độ phủ khi chốt).

### Phạm vi
- **Làm:** (1) Hiển thị ma trận: hàng = feature, cột = màn hình / API / FE-task / BE-task / test_id; (2) Lọc theo nhóm (A, U01–U08, U09–U11, HUB), theo trạng thái phủ; (3) Tạo/sửa liên kết truy vết (gắn feature ↔ screen ↔ api ↔ fe_task ↔ be_task ↔ test); (4) Tính và cảnh báo độ phủ: feature thiếu màn hình, thiếu test, API không gắn feature, task mồ côi; (5) Điều hướng từ ô ma trận sang tài liệu/đặc tả/task/test tương ứng; (6) Xuất ma trận (đọc) ra báo cáo (liên kết HUB-REPORT).
- **Không làm (giai đoạn này):** Tự động suy luận liên kết từ nội dung (chỉ gợi ý, người xác nhận); sinh test tự động; chỉnh sửa feature/screen gốc (chỉ liên kết, nguồn ở danh mục tương ứng).
- **Phụ thuộc:** HUB-AUTH, `hub.traceability`, HUB-TASK (`hub_tasks.feature_ids/screen_ids`), HUB-TEST (`test_cases`), features.json, danh mục màn hình, hợp đồng API.
- **Giả định & câu hỏi:** Giả định một feature có thể gắn nhiều màn hình/API/test (quan hệ nhiều-nhiều). Giả định tiêu chí độ phủ tối thiểu: mỗi feature ≥1 màn hình + ≥1 test; mỗi API gắn ≥1 feature. Câu hỏi: ngưỡng "đạt phủ" để nghiệm thu là 100% feature có test hay theo lô ưu tiên? (đề xuất: theo lô, hiển thị % và danh sách thiếu).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub; có dữ liệu feature/screen/task/test để liên kết.
- **Luồng chính (xem ma trận):** Vào SCR-HUB-005 → chọn nhóm → ma trận hiển thị feature × (screen/api/fe/be/test) với ô đã-liên-kết/trống → lọc "chỉ hiện thiếu phủ".
- **Luồng chính (gắn liên kết):** BA/SA/Dev/QA mở một feature → thêm liên kết tới màn hình/API/task/test → hệ thống validate tồn tại các mã → lưu `traceability` → ô ma trận cập nhật + audit.
- **Luồng chính (kiểm tra độ phủ):** Hệ thống tính: số feature thiếu màn hình, thiếu test, API mồ côi, task mồ côi → hiển thị bảng cảnh báo + % phủ theo nhóm.
- **Luồng thay thế (điều hướng):** Bấm ô → mở nhanh đặc tả/tài liệu (HUB-DOC), task (HUB-TASK) hoặc test (HUB-TEST) tương ứng.
- **Luồng thay thế (xuất):** PM/SA xuất ma trận hiện hành thành bảng cho báo cáo (snapshot chỉ đọc).
- **Ngoại lệ:** Gắn mã feature/screen/api không tồn tại → VALIDATION_ERROR; liên kết trùng → hợp nhất idempotent; người không có quyền sửa bấm "Thêm liên kết" → 403.
- **Hậu điều kiện:** Liên kết lưu đúng; cảnh báo độ phủ phản ánh thực trạng; mọi thành viên xem được; audit ghi thay đổi liên kết.

### Màn hình / form
**SCR-HUB-005 — Ma trận truy vết**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Nhóm feature | select | Không | Tất cả | A/U01-U08/U09-U11/HUB | features.json |
| Chỉ hiện thiếu phủ | toggle | Không | Tắt | — | tính toán |
| Feature (hàng) | ref | Có khi gắn | — | thuộc features.json | features.json |
| Màn hình liên kết | select(multi) | Không | — | thuộc danh mục SCR | 03-man-hinh |
| API liên kết | select(multi) | Không | — | thuộc hợp đồng API | 06-api |
| FE task / BE task | select(multi) | Không | — | thuộc hub_tasks | HUB-TASK |
| Test liên kết | select(multi) | Không | — | thuộc test_cases | HUB-TEST |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Xem/lọc ma trận | mọi thành viên | đã đăng nhập | truy vấn ma trận | render + % phủ |
| Thêm/sửa liên kết | BA, SA, FE, BE, QA (theo cột) | có `hub.trace.edit`, mã tồn tại | ghi traceability | ô cập nhật + audit |
| Xóa liên kết sai | BA, SA, PM | có quyền | gỡ liên kết (giữ log) | cập nhật ma trận |
| Xuất ma trận | PM, SA | — | sinh snapshot | file báo cáo (HUB-REPORT) |
| Điều hướng ô | mọi thành viên | — | mở tài nguyên liên kết | chuyển màn hình |

### Trạng thái
- Độ phủ mỗi feature: UNLINKED (chưa có màn hình/test) → PARTIAL (có một phần) → COVERED (đủ màn hình + test theo tiêu chí) → VERIFIED (test đã PASS, liên kết HUB-TEST).
- Liên kết truy vết: ACTIVE; khi gỡ chuyển REMOVED (giữ lịch sử, không xóa cứng audit).
- Chống trùng: liên kết (feature, screen/api/task/test) là duy nhất; thêm trùng được hợp nhất.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.traceability(id, feature_id, screen_id, api_id, fe_task, be_task, test_id, status, created_at)`, tham chiếu `hub.hub_tasks`, `hub.test_cases`, features.json, danh mục màn hình/API. `audit_logs`.
- **API:** `GET /hub/traceability` (ma trận + lọc), `GET /hub/traceability/coverage` (tính độ phủ), `POST /hub/traceability` (thêm liên kết), `DELETE /hub/traceability/:id`, `GET /hub/traceability/export`. Lỗi chuẩn theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, liên kết truy vết dẫn xuất từ `features.json` + `tasks.json` + danh mục màn hình/API (file trong `document/content/07-truy-vet/` nếu có) và `state/*`; Hub tính độ phủ từ các nguồn này (một nguồn tại một thời điểm). Khi Backend Hub sẵn sàng, migration sang `hub.traceability`; ma trận xuất ra là snapshot chỉ đọc (R005).
- **Phân quyền:** XEM = mọi thành viên. Sửa liên kết theo cột trách nhiệm (BA/SA yêu cầu–thiết kế, FE/BE task, QA test). Duyệt/xuất = PM/SA. Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN feature A01.3 WHEN gắn SCR-COM-001 + test TC-A013-01 THEN ô ma trận cập nhật COVERED.
- Thường: GIVEN nhóm HUB WHEN bật "chỉ hiện thiếu phủ" THEN chỉ hiện feature thiếu màn hình/test.
- Lỗi: GIVEN gắn screen_id không tồn tại WHEN lưu THEN VALIDATION_ERROR.
- Biên: GIVEN feature có màn hình nhưng chưa có test WHEN tính phủ THEN trạng thái PARTIAL + cảnh báo thiếu test.
- Quyền: GIVEN QA WHEN gắn cột test THEN cho phép; WHEN sửa cột thiết kế của BA THEN theo quyền (403 nếu không có).
- Tích hợp: GIVEN test TC PASS ở HUB-TEST WHEN xem ma trận THEN feature chuyển VERIFIED.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Ma trận hiển thị đúng liên kết; tính độ phủ và cảnh báo thiếu (feature không màn hình/test, API mồ côi) chính xác; điều hướng ô hoạt động; mọi 67+9 feature truy vết được; audit đủ.
- **Tài liệu cập nhật:** Hướng dẫn đọc & duy trì ma trận truy vết; tiêu chí độ phủ; quy ước mã feature/screen/api/test.
