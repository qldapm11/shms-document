## HUB-CONTEXT — Context / checkpoint / handoff

- **Mục đích:** Lưu và truy xuất ngữ cảnh làm việc theo task: checkpoint (mốc tiến độ có minh chứng), handoff (bàn giao giữa người/agent), và context hiện hành để một phiên mới (con người hoặc Claude CLI) tiếp tục liền mạch, chống mất bối cảnh khi tràn context (R002).
- **Vai trò sử dụng:** Mọi thành viên (xem context/checkpoint/handoff); owner task + agent (tạo checkpoint, khởi tạo handoff); người nhận bàn giao (xác nhận handoff); PM (giám sát tiến độ).
- **Liên kết nguồn:** HUB-CONTEXT; SCR-HUB-006 (context/checkpoint/handoff); API nhóm `/hub/checkpoints`, `/hub/handoffs`; `hub.checkpoints`, `hub.handoffs`, `hub.events`; khớp `state/checkpoints/**`, `state/handoffs/**`, `state/events.jsonl`.
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; mẫu checkpoint/handoff hiện có trong `state/`; cần PM Nguyệt + agent xác nhận khi chốt backend Q001).

### Phạm vi
- **Làm:** (1) Tạo checkpoint cho task: mục tiêu phiên, đã làm, chưa làm, file thay đổi, kiểm tra đã chạy, quyết định/giả định mới, blocker, bước tiếp cụ thể; (2) Danh sách checkpoint theo task/thời gian; (3) Khởi tạo handoff (from_actor → to_actor) kèm revision + nội dung bàn giao; (4) Người nhận xác nhận/ từ chối handoff; (5) Hiển thị "Context hiện hành" của task (tổng hợp từ checkpoint mới nhất + handoff + trạng thái task), tái tạo được khi mất bối cảnh; (6) Dòng sự kiện (`events`) append-only của hoạt động; (7) Audit.
- **Không làm (giai đoạn này):** Lưu toàn bộ transcript hội thoại AI (chỉ lưu checkpoint cô đọng + tham chiếu); tự động sinh checkpoint không có người/agent xác nhận; sửa sự kiện đã ghi (append-only).
- **Phụ thuộc:** HUB-AUTH, HUB-TASK (task gắn checkpoint/handoff), `hub.checkpoints`, `hub.handoffs`, `hub.events`, `platform.files` (minh chứng), `platform.users`.
- **Giả định & câu hỏi:** Giả định checkpoint lưu dạng nội dung cô đọng (markdown) + `content_ref`; `CURRENT_CONTEXT` tái tạo từ state. Giả định handoff có `revision` để chống nhận nhầm bản cũ. Câu hỏi: handoff cần người nhận xác nhận chủ động hay tự nhận khi mở? (đề xuất: xác nhận chủ động, lưu trạng thái ACCEPTED).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub; task tồn tại.
- **Luồng chính (checkpoint):** Owner/agent mở task tại SCR-HUB-006 → "Tạo checkpoint" → điền mục tiêu/đã làm/chưa làm/file thay đổi/kiểm tra/bước tiếp → lưu → append `events` (CHECKPOINT) → cập nhật `latest_checkpoint` của task → audit.
- **Luồng chính (handoff):** Owner → "Bàn giao" → chọn to_actor + revision + nội dung (bước tiếp, điều cần biết) → lưu handoff trạng thái PENDING → thông báo người nhận.
- **Luồng chính (nhận bàn giao):** Người nhận mở handoff → đọc → "Xác nhận nhận" → trạng thái ACCEPTED, trở thành owner mới nếu cấu hình vậy → append `events` → audit.
- **Luồng chính (context hiện hành):** Mở task → tab "Context" tổng hợp: checkpoint mới nhất + handoff đang mở + trạng thái/blocker + bước tiếp → có nút "Tái tạo context" để sinh lại bản tóm tắt từ state.
- **Luồng thay thế (từ chối handoff):** Người nhận "Từ chối" kèm lý do → trạng thái REJECTED → trả về from_actor.
- **Ngoại lệ:** Tạo handoff tới người không có vai trò phù hợp → cảnh báo; xác nhận handoff với revision cũ hơn bản mới nhất → 409 CONFLICT; sửa sự kiện đã ghi → chặn (append-only).
- **Hậu điều kiện:** Checkpoint/handoff lưu với actor + thời điểm + revision; `latest_checkpoint`/`handoff` của task cập nhật; events append đủ; context hiện hành phản ánh đúng; audit đủ.

### Màn hình / form
**SCR-HUB-006 — Context / checkpoint / handoff**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Task | select | Có | task đang mở | thuộc hub_tasks | HUB-TASK |
| Mục tiêu phiên | textarea | Có khi checkpoint | — | không rỗng | — |
| Đã làm / Chưa làm | textarea | Có khi checkpoint | — | không rỗng | — |
| File thay đổi | list | Không | — | đường dẫn hợp lệ | changed_files |
| Kiểm tra đã chạy | list | Không | — | tên + kết quả | checks |
| Bước tiếp cụ thể | textarea | Có khi checkpoint | — | không rỗng | — |
| Người nhận (handoff) | select | Có khi handoff | — | thành viên/agent | platform.users |
| Revision | text | Có khi handoff | tự tăng | duy nhất theo task | handoffs.revision |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Tạo checkpoint | owner, agent của task | task tồn tại | ghi checkpoints + event | cập nhật latest_checkpoint |
| Khởi tạo handoff | owner, agent | có bước tiếp rõ | ghi handoffs(PENDING) | thông báo người nhận |
| Xác nhận handoff | người nhận | revision mới nhất | ACCEPTED, (chuyển owner) | event + audit |
| Từ chối handoff | người nhận | có lý do | REJECTED về from_actor | thông báo |
| Tái tạo context | mọi thành viên | — | tổng hợp từ state | hiển thị bản tóm tắt |

### Trạng thái
- Checkpoint: CREATED (bất biến, append-only); không sửa, chỉ tạo mới.
- Handoff: PENDING → ACCEPTED \| REJECTED. Revision tăng dần; xác nhận bản cũ bị 409.
- Events: append-only, không sửa/xóa (nhất quán nguyên tắc audit).
- Chống trùng: checkpoint idempotent theo (task, revision, actor); handoff một bản PENDING tại một thời điểm cho mỗi task (bản mới thay bản cũ với revision cao hơn).

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.checkpoints(id, task_id, actor, content_ref, created_at)`, `hub.handoffs(id, task_id, from_actor, to_actor, revision, status, content_ref, created_at)`, `hub.events(id, actor, type, detail, created_at)` (khớp `events.jsonl`), `platform.files`, `audit_logs`.
- **API:** `GET/POST /hub/checkpoints?task=`, `GET/POST /hub/handoffs?task=`, `POST /hub/handoffs/:id/accept`, `POST /hub/handoffs/:id/reject`, `GET /hub/context/:taskId` (context hiện hành), `GET /hub/events?task=`. Lỗi chuẩn + `Idempotency-Key` theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, checkpoint lưu ở `state/checkpoints/*.md`, handoff ở `state/handoffs/*.md`, sự kiện ở `state/events.jsonl` — Hub và Claude CLI đọc/ghi cùng các file này (một nguồn tại một thời điểm, kiến trúc §6). `CURRENT_CONTEXT.md` ở `document/agent/` sinh lại từ state (mitigation R002). Khi Backend Hub sẵn sàng, migration sang `hub.checkpoints/handoffs/events`; file xuất ra là snapshot chỉ đọc (R005).
- **Phân quyền:** XEM = mọi thành viên. Tạo checkpoint/handoff = owner + agent của task. Xác nhận handoff = người nhận. Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN task IN_PROGRESS WHEN owner tạo checkpoint THEN latest_checkpoint cập nhật + event CHECKPOINT ghi.
- Thường: GIVEN handoff PENDING WHEN người nhận xác nhận THEN ACCEPTED + (chuyển owner nếu cấu hình).
- Lỗi: GIVEN xác nhận handoff revision cũ WHEN accept THEN 409 CONFLICT.
- Biên: GIVEN mất bối cảnh (phiên mới) WHEN mở context hiện hành THEN tái tạo đủ mục tiêu/đã làm/bước tiếp từ state.
- Quyền: GIVEN thành viên không phải owner/agent WHEN tạo checkpoint THEN 403 (xem được, tạo thì không).
- An toàn: GIVEN sự kiện đã ghi WHEN cố sửa/xóa THEN chặn (append-only).
- Tích hợp: GIVEN handoff ACCEPTED WHEN xem HUB-TASK THEN trường handoff của task phản ánh người nhận mới.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Tạo/xem checkpoint, khởi tạo/xác nhận/từ chối handoff, tái tạo context hiện hành chạy đúng; append-only cho checkpoint/event được bảo đảm; revision chống nhận bản cũ; khớp định dạng `state/checkpoints`, `state/handoffs`, `events.jsonl`; audit đủ.
- **Tài liệu cập nhật:** Hướng dẫn tạo checkpoint & bàn giao; quy ước nội dung handoff; hướng dẫn tái tạo context cho phiên mới (gồm Claude CLI).
