## HUB-REVIEW — Bình luận / review / phê duyệt

- **Mục đích:** Cho phép thành viên bình luận trên tài liệu, reviewer được chỉ định đánh giá (chấp nhận hoặc yêu cầu sửa), và người có thẩm quyền phê duyệt chốt phiên bản. Bảo đảm tách danh tính người review và người phê duyệt.
- **Vai trò sử dụng:** Mọi thành viên (bình luận); reviewer được chỉ định (review); PM/PO (phê duyệt chốt). Tác giả tài liệu phản hồi/sửa theo góp ý.
- **Liên kết nguồn:** HUB-REVIEW; SCR-HUB-003 (soạn/so sánh & review); API nhóm `/hub/reviews`; `hub.reviews`; liên kết HUB-DOC (trạng thái phiên bản) và HUB-TASK (gắn review vào task).
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần PM Nguyệt + PO/BA Minh xác nhận quy trình duyệt khi chốt).

### Phạm vi
- **Làm:** (1) Bình luận theo dòng/đoạn hoặc toàn tài liệu, có thread phản hồi; (2) Chỉ định reviewer cho một phiên bản tài liệu; (3) Reviewer đưa kết luận APPROVED hoặc CHANGES (kèm bình luận bắt buộc khi CHANGES); (4) Tác giả phản hồi/đánh dấu đã xử lý góp ý; (5) PM/PO phê duyệt chốt phiên bản (chuyển APPROVED → chốt); (6) Chặn tự review + tự duyệt bởi cùng một danh tính; (7) Ghi audit cho mọi kết luận review/phê duyệt.
- **Không làm (giai đoạn này):** Chỉnh sửa nội dung tài liệu (thuộc HUB-DOC); duyệt nhiều cấp phức tạp (giai đoạn đầu một cấp review + một bước phê duyệt); thông báo email thật (dùng trung tâm thông báo nội bộ).
- **Phụ thuộc:** HUB-AUTH (quyền), HUB-DOC (phiên bản tài liệu), `hub.reviews`, `platform.notifications`, `platform.users`, `audit_logs`.
- **Giả định & câu hỏi:** Giả định quy trình: version IN_REVIEW → reviewer kết luận → nếu APPROVED thì PM/PO phê duyệt chốt; nếu CHANGES thì về DRAFT cho tác giả. Câu hỏi: cần tối thiểu bao nhiêu reviewer APPROVED trước khi PM duyệt? (đề xuất: ≥1 reviewer được chỉ định; PM có thể yêu cầu thêm).

### Luồng
- **Tiền điều kiện:** Tài liệu có phiên bản ở trạng thái IN_REVIEW; người dùng đã đăng nhập Hub.
- **Luồng chính (bình luận):** Mở SCR-HUB-003 → chọn dòng/đoạn → thêm bình luận → lưu → hiển thị trong thread, thông báo tác giả + reviewer liên quan.
- **Luồng chính (review):** Reviewer được chỉ định mở phiên bản → đọc + bình luận → chọn kết luận: APPROVED hoặc CHANGES (bắt buộc nêu lý do) → lưu `reviews` → cập nhật trạng thái phiên bản (nếu CHANGES → DRAFT; nếu đủ APPROVED → chờ phê duyệt) → audit + thông báo.
- **Luồng chính (phê duyệt):** PM/PO mở phiên bản đã có ≥1 APPROVED và không còn CHANGES mở → "Phê duyệt chốt" → version chuyển APPROVED(chốt), các version cũ SUPERSEDED → audit `hub.doc.approve` → thông báo nhóm.
- **Luồng thay thế (yêu cầu sửa):** Reviewer chọn CHANGES → tác giả nhận góp ý → sửa (HUB-DOC tạo version mới) → vòng review lặp lại.
- **Luồng thay thế (giải quyết bình luận):** Tác giả/đáp ứng góp ý → đánh dấu bình luận RESOLVED → thread đóng, vẫn lưu lịch sử.
- **Ngoại lệ:** Người không được chỉ định reviewer bấm "Kết luận review" → 403; CHANGES mà bỏ trống lý do → VALIDATION_ERROR; PM phê duyệt khi còn CHANGES chưa xử lý → 422 BUSINESS_RULE; cùng danh tính vừa review APPROVED lại bấm phê duyệt → 403 (tách vai trò).
- **Hậu điều kiện:** Kết luận review lưu với reviewer + thời điểm; trạng thái phiên bản tài liệu cập nhật đúng; bình luận lưu đầy đủ (kể cả RESOLVED); audit ghi đủ; thông báo tới các bên.

### Màn hình / form
**SCR-HUB-003 — Review tài liệu**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Nội dung bình luận | textarea | Có | — | không rỗng | — |
| Neo bình luận (dòng/đoạn) | ref | Không | toàn tài liệu | thuộc phiên bản đang xem | document_versions |
| Kết luận review | radio | Có khi review | — | APPROVED \| CHANGES | hub.reviews.status |
| Lý do (khi CHANGES) | textarea | Có khi CHANGES | — | không rỗng | — |
| Reviewer được chỉ định | select(multi) | Có khi gửi review | — | thành viên Hub ≠ tác giả | platform.users |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Thêm bình luận | mọi thành viên | phiên bản tồn tại | tạo bình luận/thread | hiển thị + thông báo |
| Chỉ định reviewer | tác giả, PM | phiên bản IN_REVIEW | gán reviewer | thông báo reviewer |
| Kết luận review | reviewer được chỉ định | là reviewer của phiên bản | ghi reviews(APPROVED/CHANGES) | cập nhật trạng thái + audit |
| Phê duyệt chốt | PM, PO | ≥1 APPROVED, không CHANGES mở, không tự duyệt bản mình vừa review | version APPROVED chốt | thông báo nhóm + audit |
| Đánh dấu đã xử lý | tác giả | bình luận chưa RESOLVED | thread RESOLVED | cập nhật thread |

### Trạng thái
- Phiên bản (phối hợp HUB-DOC): DRAFT → IN_REVIEW → (CHANGES → DRAFT) \| (APPROVED → chốt) → SUPERSEDED.
- Bình luận: OPEN → RESOLVED (không xóa, giữ lịch sử).
- Kết luận review: ghi nhận APPROVED \| CHANGES gắn reviewer + thời điểm.
- **Tách vai trò (bắt buộc):** người đưa kết luận review không được đồng thời là người phê duyệt chốt cùng phiên bản đó; hệ thống chặn (403) nếu trùng danh tính. Chống trùng: kết luận review mỗi reviewer một lần/phiên bản (ghi đè có lịch sử); nút khóa khi đang xử lý.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.reviews(id, document_id, version, reviewer_id, status[APPROVED/CHANGES], comment, created_at)`, bảng bình luận `hub.comments(id, document_id, version, anchor, author_id, body, status[OPEN/RESOLVED], parent_id, created_at)` (mở rộng từ ERD), `platform.notifications`, `audit_logs`.
- **API:** `GET /hub/reviews?document=&version=`, `POST /hub/reviews` (kết luận), `POST /hub/reviews/assign` (chỉ định reviewer), `POST /hub/reviews/approve` (phê duyệt chốt), `GET/POST /hub/comments`, `PATCH /hub/comments/:id/resolve`. Lỗi chuẩn theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, review/handoff ghi dạng file trong `document/state/handoffs/**` + sự kiện `events.jsonl`; Hub đọc các file này. Khi Backend Hub sẵn sàng, migration sang `hub.reviews`/`hub.comments`; file xuất ra là snapshot chỉ đọc (R005).
- **Phân quyền:** Bình luận = mọi thành viên. Kết luận review = reviewer được chỉ định (≠ tác giả). Phê duyệt = PM/PO (≠ reviewer vừa kết luận bản đó). Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN phiên bản IN_REVIEW WHEN reviewer chọn APPROVED THEN ghi review + chờ phê duyệt.
- Thường: GIVEN reviewer chọn CHANGES kèm lý do WHEN lưu THEN version về DRAFT, tác giả nhận thông báo.
- Lỗi: GIVEN CHANGES bỏ trống lý do WHEN lưu THEN VALIDATION_ERROR.
- Biên: GIVEN còn 1 bình luận CHANGES chưa xử lý WHEN PM phê duyệt THEN 422 BUSINESS_RULE.
- Quyền: GIVEN thành viên không phải reviewer WHEN kết luận review THEN 403.
- Quyền (tách vai trò): GIVEN người vừa APPROVED bản X WHEN bấm phê duyệt chốt bản X THEN 403.
- Tích hợp: GIVEN phê duyệt chốt WHEN hoàn tất THEN trạng thái tài liệu APPROVED hiển thị ở HUB-DOC và task liên quan cập nhật ở HUB-TASK.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Vòng bình luận → review (APPROVED/CHANGES) → phê duyệt chốt chạy đúng; quy tắc tách danh tính review/duyệt được chặn; CHANGES buộc có lý do; không xóa cứng bình luận; audit + thông báo đủ.
- **Tài liệu cập nhật:** Quy trình review & phê duyệt tài liệu dự án; hướng dẫn chỉ định reviewer; quy ước xử lý góp ý.
