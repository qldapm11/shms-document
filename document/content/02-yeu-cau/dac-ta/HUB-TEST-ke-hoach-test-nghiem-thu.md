## HUB-TEST — Kế hoạch / test case / kết quả / lỗi / nghiệm thu

- **Mục đích:** Quản lý kiểm thử dự án: kế hoạch test, ca kiểm thử (test case) gắn feature, ghi kết quả chạy (PASS/FAIL), theo dõi lỗi (defect) và nghiệm thu từng feature/màn hình. Gắn với ma trận truy vết để biết độ phủ test.
- **Vai trò sử dụng:** Mọi thành viên (xem); QA (soạn kế hoạch/test case, chạy, ghi kết quả, mở lỗi); FE/BE (sửa lỗi, cập nhật trạng thái lỗi); PM/PO (nghiệm thu).
- **Liên kết nguồn:** HUB-TEST; SCR-HUB-007 (test & nghiệm thu); API nhóm `/hub/test-cases`; `hub.test_cases`; liên kết HUB-TRACE (độ phủ test) và HUB-TASK (lỗi gắn task sửa).
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần QA Phương Anh + PO/BA Minh xác nhận quy trình & tiêu chí nghiệm thu, gồm nghiệm thu mô phỏng Q004).

### Phạm vi
- **Làm:** (1) Lập kế hoạch test theo lô/feature (phạm vi, môi trường, tiêu chí vào/ra); (2) Soạn test case (Given–When–Then: các bước, kết quả mong đợi) gắn feature_id; (3) Ghi kết quả chạy từng lần (PASS/FAIL/BLOCKED) kèm minh chứng (`evidence_ref`); (4) Mở lỗi khi FAIL, gán cho FE/BE, theo dõi vòng đời lỗi; (5) Nghiệm thu feature khi đủ test PASS + tiêu chí; (6) Phân biệt nghiệm thu mô phỏng (adapter) và nghiệm thu thật (R003/Q004); (7) Audit kết quả/nghiệm thu.
- **Không làm (giai đoạn này):** Tự động chạy test (giai đoạn đầu ghi kết quả thủ công + tham chiếu CI khi có); test hiệu năng/bảo mật chuyên sâu (ghi nhận là hạng mục riêng); nghiệm thu tích hợp thật khi chưa có đối tác.
- **Phụ thuộc:** HUB-AUTH, `hub.test_cases`, HUB-TRACE (gắn test vào feature/màn hình), HUB-TASK (task sửa lỗi), features.json, `platform.files` (minh chứng), `audit_logs`.
- **Giả định & câu hỏi:** Giả định mỗi test case gắn ≥1 feature; kết quả lưu theo lần chạy (run) có revision. Giả định lỗi là một dạng task hoặc bản ghi riêng liên kết task sửa. Câu hỏi: mức nghiệm thu mô phỏng nào được chấp nhận cho demo (Q004)? (đề xuất: adapter có contract + fixture, ghi riêng tiêu chí thật).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub; feature đã có đặc tả để viết test.
- **Luồng chính (soạn test case):** QA mở SCR-HUB-007 → "Tạo test case" → chọn feature + viết các bước Given–When–Then + kết quả mong đợi → lưu → gắn vào ma trận truy vết (HUB-TRACE) → audit.
- **Luồng chính (chạy & ghi kết quả):** QA chọn test case → nhập kết quả PASS/FAIL/BLOCKED + minh chứng (ảnh/log) → lưu run → cập nhật trạng thái phủ feature (VERIFIED nếu PASS).
- **Luồng chính (mở & theo dõi lỗi):** Khi FAIL → "Mở lỗi" → mô tả, mức độ, gán FE/BE → lỗi NEW → dev xử lý → FIXED → QA kiểm lại → VERIFIED/REOPEN → audit.
- **Luồng chính (nghiệm thu):** PM/PO mở feature → xem tổng hợp test (số PASS/FAIL, lỗi còn mở) → nếu đủ tiêu chí vào/ra và không còn lỗi chặn → "Nghiệm thu" → trạng thái ACCEPTED (ghi rõ mô phỏng hay thật) → audit.
- **Luồng thay thế (BLOCKED):** Test không chạy được do môi trường/phụ thuộc → đánh BLOCKED kèm lý do → không tính vào PASS.
- **Ngoại lệ:** Ghi PASS mà thiếu minh chứng bắt buộc → VALIDATION_ERROR; nghiệm thu khi còn lỗi mức chặn → 422 BUSINESS_RULE; QA tự nghiệm thu thay PM → 403 (tách vai trò); gắn test vào feature không tồn tại → VALIDATION_ERROR.
- **Hậu điều kiện:** Test case/kết quả/lỗi/nghiệm thu lưu với actor + thời điểm + minh chứng; độ phủ test phản ánh ở HUB-TRACE; audit đủ; phân biệt rõ mô phỏng/thật.

### Màn hình / form
**SCR-HUB-007 — Test & nghiệm thu**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Feature | select | Có | — | thuộc features.json | features.json |
| Tiêu đề test case | text | Có | — | không rỗng | — |
| Các bước (Given/When/Then) | textarea | Có | — | không rỗng | — |
| Kết quả mong đợi | textarea | Có | — | không rỗng | test_cases.expected |
| Kết quả chạy | select | Có khi ghi run | — | PASS/FAIL/BLOCKED | test_cases.result |
| Minh chứng | file/list | Có khi PASS | — | tệp hợp lệ | platform.files |
| Loại nghiệm thu | select | Có khi nghiệm thu | — | SIMULATED/REAL | — |
| Mức độ lỗi | select | Có khi mở lỗi | — | BLOCKER/MAJOR/MINOR | — |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Tạo/sửa test case | QA | có `hub.test.edit` | ghi test_cases | toast + gắn truy vết |
| Ghi kết quả chạy | QA | test case tồn tại, có minh chứng khi PASS | ghi run | cập nhật phủ feature |
| Mở lỗi | QA | kết quả FAIL | tạo lỗi + gán dev | thông báo FE/BE |
| Cập nhật trạng thái lỗi | FE, BE (sửa), QA (kiểm lại) | là người được gán/QA | chuyển trạng thái lỗi | audit |
| Nghiệm thu feature | PM, PO | đủ tiêu chí, không lỗi chặn, ≠ người chạy test | ACCEPTED (ghi loại) | audit + thông báo |

### Trạng thái
- Test case: DRAFT → READY → (chạy) → kết quả run PASS/FAIL/BLOCKED (nhiều run, mỗi run có thời điểm).
- Lỗi (defect): NEW → IN_PROGRESS → FIXED → VERIFIED \| REOPEN → CLOSED. Lỗi BLOCKER chặn nghiệm thu.
- Nghiệm thu feature: PENDING → ACCEPTED(SIMULATED \| REAL) \| REJECTED. Nghiệm thu mô phỏng không tự động thành nghiệm thu thật (R003).
- **Tách vai trò:** người chạy/ghi kết quả test (QA) không đồng thời là người nghiệm thu chốt (PM/PO); hệ thống chặn 403. Chống trùng: run ghi append theo thời điểm; nút khóa khi đang xử lý.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.test_cases(id, feature_id, title, steps, expected, result, evidence_ref, run_at, run_by)`, bảng lỗi `hub.defects(id, test_case_id, feature_id, severity, status, assignee, task_id, created_at)` (mở rộng từ ERD), nghiệm thu `hub.acceptances(id, feature_id, type[SIMULATED/REAL], decided_by, decided_at, note)`, `platform.files`, `audit_logs`.
- **API:** `GET/POST/PATCH /hub/test-cases`, `POST /hub/test-cases/:id/runs` (ghi kết quả), `GET/POST/PATCH /hub/defects`, `POST /hub/acceptances` (nghiệm thu). Lỗi chuẩn theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, kết quả test/check ghi trong `state/tasks.json` (trường `checks`) và tài liệu test ở `document/content/`; Hub đọc các nguồn này (một nguồn tại một thời điểm). Khi Backend Hub sẵn sàng, migration sang `hub.test_cases/defects/acceptances`; file xuất ra là snapshot chỉ đọc (R005).
- **Phân quyền:** XEM = mọi thành viên. Soạn/chạy test + mở lỗi = QA. Sửa lỗi = FE/BE được gán. Nghiệm thu = PM/PO (≠ người chạy test). Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN feature có đặc tả WHEN QA tạo test case + gắn feature THEN test xuất hiện trong ma trận truy vết.
- Thường: GIVEN test case WHEN ghi PASS kèm minh chứng THEN feature chuyển VERIFIED ở HUB-TRACE.
- Lỗi: GIVEN ghi PASS thiếu minh chứng WHEN lưu THEN VALIDATION_ERROR.
- Biên: GIVEN còn lỗi BLOCKER mở WHEN PM nghiệm thu THEN 422 BUSINESS_RULE.
- Quyền (tách vai trò): GIVEN QA vừa chạy test WHEN tự nghiệm thu feature THEN 403.
- Tích hợp: GIVEN test FAIL WHEN mở lỗi gán BE THEN lỗi xuất hiện như task liên kết ở HUB-TASK.
- Mô phỏng: GIVEN feature tích hợp (IoT/BHYT) WHEN nghiệm thu THEN ghi loại SIMULATED, không coi là nghiệm thu thật.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Soạn test case, ghi kết quả có minh chứng, mở/theo dõi lỗi, nghiệm thu feature chạy đúng; tách vai trò chạy test/nghiệm thu được chặn; phân biệt nghiệm thu mô phỏng/thật; độ phủ test khớp HUB-TRACE; audit đủ.
- **Tài liệu cập nhật:** Kế hoạch kiểm thử tổng thể; quy ước viết test case Given–When–Then; quy trình xử lý lỗi; tiêu chí nghiệm thu mô phỏng vs thật (Q004).
