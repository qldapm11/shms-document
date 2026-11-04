## HUB-TASK — Phân công / trạng thái / phụ thuộc / blocker

- **Mục đích:** Quản lý công việc dự án: phân công owner/reviewer, theo dõi vòng đời trạng thái, khai báo phụ thuộc và blocker giữa các task, liên kết task tới feature/màn hình/tài liệu/test. Giữ khớp với `state/tasks.json` hiện có (G01–G40 + T-*).
- **Vai trò sử dụng:** Mọi thành viên (xem bảng task); owner của task (cập nhật tiến độ/trạng thái); reviewer của task (review, trả CHANGES_REQUESTED); PM (phân công, đóng/duyệt task).
- **Liên kết nguồn:** HUB-TASK; SCR-HUB-004 (bảng task & phân công); API nhóm `/hub/tasks`; `hub.hub_tasks` (khớp `state/tasks.json`); vòng đời `hub_task` trong mô hình dữ liệu §Trạng thái.
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần PM Nguyệt + BE Tuấn xác nhận trường và quy trình khi chốt backend Q001).

### Phạm vi
- **Làm:** (1) Bảng task (list/kanban) lọc theo owner, trạng thái, nhóm (group_link G01–G40), feature, màn hình; (2) Tạo/sửa task kỹ thuật (T-*) với các trường tối thiểu; (3) Phân công owner (con người + agent) và reviewer; (4) Chuyển trạng thái theo vòng đời hợp lệ; (5) Khai báo phụ thuộc `dependency_ids`; (6) Đánh dấu/gỡ blocker kèm lý do; (7) Liên kết task ↔ feature_ids/screen_ids/tài liệu/test; (8) Hiển thị checkpoint/handoff/review mới nhất của task (liên kết HUB-CONTEXT/HUB-REVIEW); (9) Audit thay đổi phân công/trạng thái.
- **Không làm (giai đoạn này):** Ước lượng tự động/biểu đồ burndown nâng cao (chỉ hiển thị cơ bản); tích hợp công cụ ngoài (Jira...); sửa bảng 40 công việc nhóm như nguồn gốc (G01–G40 chỉ liên kết, nguồn là QLDAPM_Nhóm_11 theo D007).
- **Phụ thuộc:** HUB-AUTH, `hub.hub_tasks`, `hub.traceability` (HUB-TRACE), `hub.checkpoints`/`hub.handoffs` (HUB-CONTEXT), `hub.reviews` (HUB-REVIEW), `platform.users`, `audit_logs`.
- **Giả định & câu hỏi:** Giả định hai lớp task giữ nguyên: G01–G40 (cấp nhóm, chỉ đọc/liên kết) và T-* (kỹ thuật, chỉnh trong Hub). Giả định `readiness` tách khỏi `status` (spec/impl/acceptance). Câu hỏi: phụ thuộc vòng (cycle) xử lý thế nào? (đề xuất: chặn tạo dependency gây chu trình, báo 422).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub. Task tồn tại hoặc PM có quyền tạo.
- **Luồng chính (xem & lọc):** Vào SCR-HUB-004 → chọn chế độ list/kanban → lọc theo owner/trạng thái/nhóm → xem thẻ task với owner, reviewer, trạng thái, blocker, liên kết feature/màn hình.
- **Luồng chính (phân công):** PM mở task → gán `human_owner` + `agent_owner` + `reviewer` + `support` → lưu → audit `hub.task.assign` → thông báo người được giao.
- **Luồng chính (chuyển trạng thái):** Owner mở task → chọn chuyển trạng thái hợp lệ (vd READY→IN_PROGRESS) → nếu chuyển sang IN_REVIEW phải có handoff/checkpoint → lưu → audit.
- **Luồng chính (phụ thuộc/blocker):** Owner/PM thêm `dependency_ids` hoặc đánh dấu BLOCKED kèm lý do + link blocker → hệ thống kiểm tra chu trình → lưu → task phụ thuộc chưa DONE sẽ chặn chuyển IN_PROGRESS (cảnh báo).
- **Luồng thay thế (reviewer trả CHANGES):** Task IN_REVIEW → reviewer review (HUB-REVIEW) → nếu chưa đạt → chuyển CHANGES_REQUESTED → về IN_PROGRESS cho owner.
- **Luồng thay thế (hủy task):** PM chuyển CANCELLED kèm lý do → task ẩn khỏi active, giữ lịch sử.
- **Ngoại lệ:** Chuyển trạng thái không hợp lệ (vd DRAFT→DONE) → 422 BUSINESS_RULE; owner tự chuyển DONE mà không qua IN_REVIEW/đủ check → 422; tạo dependency gây chu trình → 422; người không phải owner cập nhật tiến độ → 403; owner tự review+duyệt task của mình → 403 (tách vai trò).
- **Hậu điều kiện:** Trạng thái/phân công/phụ thuộc lưu đúng; blocker phản ánh trên bảng; liên kết truy vết/test cập nhật; audit đủ; thông báo tới các bên liên quan.

### Màn hình / form
**SCR-HUB-004 — Bảng task & phân công**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Mã task | text | Có | tự sinh (T-...) | duy nhất | hub_tasks.id |
| Tiêu đề | text | Có | — | không rỗng | hub_tasks.title |
| Owner (người) | select | Có | — | thành viên Hub | platform.users |
| Owner (agent) | select | Không | — | agent đã đăng ký | — |
| Reviewer | select | Có khi IN_REVIEW | — | ≠ owner | platform.users |
| Trạng thái | select | Có | DRAFT | chuyển hợp lệ theo vòng đời | hub_tasks.status |
| Nhóm liên kết | select(multi) | Không | — | thuộc G01–G40 | state/tasks.json group |
| Feature liên kết | select(multi) | Không | — | thuộc features.json | features.json |
| Màn hình liên kết | select(multi) | Không | — | thuộc danh mục SCR | screens |
| Phụ thuộc | select(multi) | Không | — | task tồn tại, không tạo chu trình | hub_tasks.id |
| Blocker (lý do) | textarea | Có khi BLOCKED | — | không rỗng | — |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Tạo/sửa task | PM, owner (sửa task mình) | có `hub.task.edit` | ghi hub_tasks | toast + audit |
| Phân công owner/reviewer | PM | có `hub.task.assign` | cập nhật owner/reviewer | thông báo + audit |
| Chuyển trạng thái | owner (tiến độ), reviewer (CHANGES/approve), PM (đóng) | chuyển hợp lệ + điều kiện vào trạng thái | cập nhật status | cập nhật bảng + audit |
| Thêm phụ thuộc | owner, PM | không gây chu trình | cập nhật dependency_ids | cảnh báo nếu phụ thuộc chưa DONE |
| Đánh dấu/gỡ blocker | owner, PM | có lý do | set/clear BLOCKED | hiển thị cờ blocker |

### Trạng thái
- Vòng đời `hub_task`: **DRAFT → READY → IN_PROGRESS → IN_REVIEW → DONE**, cộng **BLOCKED**, **CHANGES_REQUESTED**, **CANCELLED**.
- Chuyển hợp lệ: DRAFT→READY→IN_PROGRESS→IN_REVIEW→DONE; IN_REVIEW→CHANGES_REQUESTED→IN_PROGRESS; bất kỳ trạng thái hoạt động → BLOCKED → (gỡ) về trạng thái trước; bất kỳ → CANCELLED (PM, kèm lý do). Không nhảy bỏ qua IN_REVIEW để DONE.
- Điều kiện vào DONE: đã IN_REVIEW, reviewer approve, các `required_checks` PASS, không còn blocker, phụ thuộc đã DONE.
- **Tách vai trò:** owner không được tự review + duyệt task của chính mình (reviewer phải khác owner); hệ thống chặn 403.
- Chống trùng: chuyển trạng thái idempotent; nút khóa khi đang xử lý; `readiness` (spec/impl/acceptance) tách khỏi `status`.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.hub_tasks(id, title, feature_ids[], screen_ids[], type, human_owner, agent_owner, support[], reviewer, status, readiness, group_link[], dependency_ids[], allowed_paths[], acceptance_criteria[], required_checks[], changed_files[], checks[], blockers[], next_action, latest_checkpoint, handoff, review, implementation_revision, merged_revision, updated_at)` — khớp `state/tasks.json`. `audit_logs`.
- **API:** `GET /hub/tasks` (lọc/phân trang), `GET /hub/tasks/:id`, `POST /hub/tasks`, `PATCH /hub/tasks/:id`, `POST /hub/tasks/:id/transition` (chuyển trạng thái có kiểm tra), `POST /hub/tasks/:id/dependencies`, `POST /hub/tasks/:id/block`. Lỗi chuẩn theo 06-api; dùng `Idempotency-Key` cho transition.
- **Cơ chế state/migration:** Giai đoạn bootstrap, nguồn chuẩn là `document/state/tasks.json`; Hub và Claude CLI đọc/ghi cùng file này (một nguồn tại một thời điểm). Khi Backend Hub sẵn sàng, migration sang `hub.hub_tasks` qua `/hub/tasks`; file xuất ra là snapshot chỉ đọc (R005). Hub UI và CLI phải dùng chung API để tránh lệch nguồn (kiến trúc §6).
- **Phân quyền:** XEM = mọi thành viên. Sửa tiến độ/trạng thái = owner. Phân công = PM. Review = reviewer được chỉ định (≠ owner). Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN task READY WHEN owner chuyển IN_PROGRESS THEN trạng thái cập nhật + audit.
- Thường: GIVEN task IN_REVIEW, reviewer approve, checks PASS WHEN PM đóng THEN DONE.
- Lỗi: GIVEN task DRAFT WHEN cố chuyển thẳng DONE THEN 422 BUSINESS_RULE.
- Biên: GIVEN tạo phụ thuộc A→B→A WHEN lưu THEN 422 (chu trình).
- Quyền: GIVEN thành viên không phải owner WHEN cập nhật tiến độ THEN 403.
- Quyền (tách vai trò): GIVEN owner là reviewer của chính task WHEN duyệt THEN 403.
- Tích hợp: GIVEN task có feature_ids WHEN mở HUB-TRACE THEN task xuất hiện trong ma trận truy vết tương ứng.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Bảng task lọc đúng; vòng đời DRAFT→...→DONE + BLOCKED/CHANGES_REQUESTED/CANCELLED chạy đúng với kiểm tra điều kiện; phụ thuộc chặn chu trình; tách vai trò owner/reviewer được chặn; khớp cấu trúc `tasks.json`; audit đủ.
- **Tài liệu cập nhật:** Quy trình quản lý task & phân công; quy ước trạng thái và điều kiện chuyển; hướng dẫn khai báo phụ thuộc/blocker.
