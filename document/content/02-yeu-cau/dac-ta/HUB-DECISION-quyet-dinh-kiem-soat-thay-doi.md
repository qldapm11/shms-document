## HUB-DECISION — Quyết định / giả định / câu hỏi / kiểm soát thay đổi

- **Mục đích:** Quản lý quyết định đã chốt (có thẩm quyền, lý do, tác động), giả định đang dùng, câu hỏi còn mở chờ trả lời, và kiểm soát thay đổi (change request) khi phạm vi/thiết kế thay đổi. Giữ khớp `state/decisions.json` và `state/open-questions.json`.
- **Vai trò sử dụng:** Mọi thành viên (xem/đề xuất quyết định, nêu câu hỏi); SA/PM (ghi quyết định, đánh giá tác động); người có thẩm quyền (phê chuẩn quyết định theo loại); PM (kiểm soát thay đổi).
- **Liên kết nguồn:** HUB-DECISION; SCR-HUB-008 (quyết định & báo cáo/bàn giao); API nhóm `/hub/decisions`; `hub.decisions` (khớp `state/decisions.json`), open-questions; liên kết risks.json.
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần SA Dương + PM Nguyệt xác nhận quy trình phê chuẩn & change control khi chốt).

### Phạm vi
- **Làm:** (1) Danh sách quyết định (D001...) với title, nội dung, thẩm quyền, nguồn, thời điểm, tác động; (2) Đề xuất quyết định mới → phê chuẩn bởi người có thẩm quyền; (3) Quản lý giả định (AS001...) với căn cứ + trạng thái (proposed/confirmed); (4) Quản lý câu hỏi mở (Q001...) với phương án, khuyến nghị, người trả lời, thứ chặn (`blocks`); (5) Đóng câu hỏi thành quyết định khi được trả lời; (6) Kiểm soát thay đổi: tạo change request khi thay đổi phạm vi/thiết kế, đánh giá tác động (feature/task/rủi ro), phê duyệt/từ chối; (7) Audit.
- **Không làm (giai đoạn này):** Tự động áp thay đổi vào tài liệu/task (chỉ liên kết + nhắc cập nhật); phê chuẩn tự động; xóa quyết định đã chốt (chỉ thay bằng quyết định mới có lịch sử — superseded).
- **Phụ thuộc:** HUB-AUTH, `hub.decisions`, bảng câu hỏi/giả định (từ `open-questions.json`/`decisions.json`), HUB-TASK (thay đổi ảnh hưởng task), risks.json, `audit_logs`.
- **Giả định & câu hỏi:** Giả định mỗi quyết định ghi "authority" là người/vai trò có thẩm quyền; câu hỏi có trường `blocks` liệt kê việc bị chặn. Câu hỏi: change request cần một cấp PM duyệt hay hội đồng? (đề xuất: PM duyệt, tham vấn SA cho thay đổi kỹ thuật; thay đổi scope lớn cần chủ dự án).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub.
- **Luồng chính (ghi quyết định):** Thành viên đề xuất tại SCR-HUB-008 → điền title/nội dung/lý do/tác động + đề xuất thẩm quyền → gửi → người có thẩm quyền phê chuẩn → quyết định CONFIRMED, cấp mã (D00x) → audit → nhắc cập nhật tài liệu/task liên quan.
- **Luồng chính (câu hỏi mở):** Thành viên nêu câu hỏi (Q00x) + phương án + khuyến nghị + người trả lời + `blocks` → trạng thái OPEN → khi được trả lời → đóng thành quyết định hoặc cập nhật giả định → audit.
- **Luồng chính (giả định):** Ghi giả định (AS00x) + căn cứ → trạng thái proposed → khi xác nhận chuyển confirmed; nếu bị bác → tạo câu hỏi/quyết định thay thế.
- **Luồng chính (kiểm soát thay đổi):** Người đề xuất tạo change request (mô tả thay đổi, lý do) → hệ thống/PM liệt kê tác động (feature/task/rủi ro liên quan) → PM (và SA nếu kỹ thuật) phê duyệt/từ chối → nếu duyệt, ghi quyết định + cập nhật các mục bị ảnh hưởng.
- **Luồng thay thế (thay thế quyết định):** Quyết định cũ không còn phù hợp → ghi quyết định mới tham chiếu + đánh dấu cũ SUPERSEDED (giữ lịch sử).
- **Ngoại lệ:** Phê chuẩn quyết định khi không có thẩm quyền → 403; đóng câu hỏi mà chưa có câu trả lời → VALIDATION_ERROR; người đề xuất tự phê chuẩn quyết định của mình khi loại quyết định yêu cầu thẩm quyền khác → 403 (tách vai trò); tạo change request thiếu đánh giá tác động → cảnh báo buộc bổ sung.
- **Hậu điều kiện:** Quyết định/giả định/câu hỏi/change request lưu với actor + thẩm quyền + thời điểm; các mục bị ảnh hưởng được liên kết/nhắc cập nhật; audit đủ; không xóa cứng quyết định.

### Màn hình / form
**SCR-HUB-008 — Quyết định & kiểm soát thay đổi** (phần quyết định)
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Tiêu đề quyết định | text | Có | — | không rỗng | decisions.title |
| Nội dung | textarea | Có | — | không rỗng | decisions.decision |
| Thẩm quyền | select | Có | — | vai trò/người có thẩm quyền | decisions.authority |
| Lý do | textarea | Có | — | không rỗng | decisions.reason |
| Tác động | textarea | Có | — | không rỗng | decisions.impact |
| Câu hỏi (Q) | textarea | Có khi tạo Q | — | không rỗng | open-questions.question |
| Phương án / khuyến nghị | textarea | Không | — | — | open-questions.options |
| Việc bị chặn (blocks) | select(multi) | Không | — | task/feature tồn tại | open-questions.blocks |
| Mô tả thay đổi (CR) | textarea | Có khi CR | — | không rỗng | — |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Đề xuất quyết định | mọi thành viên | — | tạo bản nháp quyết định | chờ phê chuẩn |
| Phê chuẩn quyết định | người có thẩm quyền (theo loại) | ≠ người đề xuất khi loại yêu cầu | CONFIRMED + cấp mã | audit + nhắc cập nhật |
| Nêu/đóng câu hỏi | mọi thành viên (nêu); người trả lời (đóng) | có câu trả lời khi đóng | OPEN→ANSWERED→quyết định | audit |
| Cập nhật giả định | SA, PM, người đề xuất | — | proposed→confirmed/bác | audit |
| Tạo/duyệt change request | mọi thành viên (tạo); PM/SA (duyệt) | có đánh giá tác động | ghi CR + cập nhật ảnh hưởng | thông báo + audit |

### Trạng thái
- Quyết định: PROPOSED → CONFIRMED → SUPERSEDED (khi có quyết định mới thay). Không xóa cứng.
- Câu hỏi: OPEN → ANSWERED → CLOSED (chuyển thành quyết định/giả định). Giữ `blocks` để biết việc bị chặn.
- Giả định: proposed → confirmed \| rejected.
- Change request: DRAFT → UNDER_REVIEW → APPROVED \| REJECTED → APPLIED (khi cập nhật xong các mục ảnh hưởng).
- **Tách vai trò:** với loại quyết định yêu cầu thẩm quyền riêng, người đề xuất không tự phê chuẩn; CR do người đề xuất không tự duyệt. Chống trùng: mã quyết định/câu hỏi duy nhất; phê chuẩn idempotent.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.decisions(id, title, decision, authority, reason, decided_at, status, source, supersedes)` (khớp `state/decisions.json`), `hub.questions(id, topic, question, options[], recommendation, blocks[], owner_to_answer, status)` (khớp `open-questions.json`), `hub.assumptions(id, assumption, basis, status, impact)`, `hub.change_requests(id, description, reason, impact_refs[], status, decided_by, decided_at)`, `audit_logs`, liên kết `risks.json`.
- **API:** `GET/POST/PATCH /hub/decisions`, `POST /hub/decisions/:id/confirm`, `GET/POST/PATCH /hub/questions`, `POST /hub/questions/:id/close`, `GET/POST/PATCH /hub/assumptions`, `GET/POST /hub/change-requests`, `POST /hub/change-requests/:id/decide`. Lỗi chuẩn theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, nguồn chuẩn là `state/decisions.json` + `state/open-questions.json` (+ risks.json); Hub và Claude CLI đọc/ghi cùng các file (một nguồn tại một thời điểm). Khi Backend Hub sẵn sàng, migration sang `hub.decisions/questions/...`; file xuất ra là snapshot chỉ đọc (R005).
- **Phân quyền:** XEM/đề xuất = mọi thành viên. Phê chuẩn quyết định = người có thẩm quyền theo loại (vd stack: SA+chủ dự án; phân công: PM). Duyệt CR = PM/SA. Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN đề xuất quyết định WHEN người có thẩm quyền phê chuẩn THEN CONFIRMED + cấp mã D00x.
- Thường: GIVEN Q001 được trả lời WHEN đóng câu hỏi THEN tạo quyết định chốt stack + gỡ chặn task liên quan.
- Lỗi: GIVEN đóng câu hỏi chưa có câu trả lời WHEN lưu THEN VALIDATION_ERROR.
- Biên: GIVEN quyết định cũ bị thay WHEN ghi quyết định mới THEN cũ SUPERSEDED, vẫn tra cứu được.
- Quyền (tách vai trò): GIVEN người đề xuất WHEN tự phê chuẩn quyết định loại cần thẩm quyền khác THEN 403.
- Tích hợp: GIVEN CR APPROVED ảnh hưởng feature X WHEN áp dụng THEN task/tài liệu liên quan được nhắc cập nhật và ghi liên kết.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Ghi/phê chuẩn quyết định, quản lý câu hỏi/giả định, kiểm soát thay đổi có đánh giá tác động chạy đúng; tách vai trò đề xuất/phê chuẩn được chặn; khớp cấu trúc `decisions.json`/`open-questions.json`; không xóa cứng; audit đủ.
- **Tài liệu cập nhật:** Nhật ký quyết định (ADR) dự án; danh sách câu hỏi mở & giả định; quy trình kiểm soát thay đổi.
