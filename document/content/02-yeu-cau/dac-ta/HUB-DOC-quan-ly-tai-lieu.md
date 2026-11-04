## HUB-DOC — Quản lý tài liệu: xem/tìm/lọc/version/so sánh

- **Mục đích:** Quản lý toàn bộ tài liệu dự án (yêu cầu, thiết kế, kế hoạch, báo cáo...) trong Project Hub: duyệt thư viện, tìm kiếm, lọc theo phân loại, xem lịch sử phiên bản và so sánh hai phiên bản. Giữ tài liệu có version, một nguồn chuẩn.
- **Vai trò sử dụng:** Mọi thành viên dự án (xem/tìm/so sánh); tác giả theo phân công (soạn/cập nhật phiên bản: BA, SA, Dev, QA tùy tài liệu); PM/PO (phê duyệt chốt phiên bản — xem HUB-REVIEW).
- **Liên kết nguồn:** HUB-DOC; SCR-HUB-002 (thư viện tài liệu), SCR-HUB-003 (soạn/so sánh); API nhóm `/hub/documents`; mô hình dữ liệu `hub.documents`, `hub.document_versions`.
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; nội dung tài liệu nguồn hiện ở `document/content/**` dạng file có version theo thư mục; cần SA xác nhận mô hình version khi chốt backend Q001).

### Phạm vi
- **Làm:** (1) Liệt kê thư viện tài liệu theo cây thư mục/phân loại (`category`); (2) Tìm kiếm theo tiêu đề/đường dẫn/nội dung; (3) Lọc theo phân loại, trạng thái, tác giả, thời gian; (4) Mở xem một tài liệu (markdown render); (5) Xem danh sách phiên bản (`document_versions`) và metadata (tác giả, thời điểm); (6) So sánh hai phiên bản (diff theo dòng); (7) Tạo phiên bản mới khi tác giả cập nhật (tăng `current_version`); (8) Hiển thị trạng thái review/duyệt của phiên bản (liên kết HUB-REVIEW).
- **Không làm (giai đoạn này):** Bình luận/phê duyệt (thuộc HUB-REVIEW); chỉnh sửa WYSIWYG phức tạp (giai đoạn đầu chỉ markdown); quản lý quyền cấp tài liệu riêng lẻ ngoài ma trận HUB-AUTH; xóa cứng tài liệu (chỉ chuyển trạng thái/lưu lịch sử).
- **Phụ thuộc:** HUB-AUTH (đăng nhập + quyền), `hub.documents`, `hub.document_versions`, `platform.files` (lưu nội dung/đính kèm), `platform.users` (tác giả). Nội dung thực tế nằm ở `document/content/**`.
- **Giả định & câu hỏi:** Giả định version đánh số tăng dần (1,2,3...) với `content_ref` trỏ tới file/blob. Giả định diff theo dòng là đủ cho markdown. Câu hỏi: nhị phân (docx/pptx/mp4) có cần so sánh hay chỉ liệt kê phiên bản + tải? (đề xuất: nhị phân chỉ liệt kê version + tải, không diff nội dung).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub (có quyền xem). Có ≥1 tài liệu trong thư viện.
- **Luồng chính (duyệt & tìm):** Vào SCR-HUB-002 → xem cây phân loại + danh sách → nhập từ khóa/áp bộ lọc → hệ thống trả danh sách khớp (phân trang) → chọn tài liệu → mở xem phiên bản hiện hành.
- **Luồng chính (xem version):** Trong tài liệu → mở tab "Phiên bản" → danh sách version giảm dần theo thời gian kèm tác giả, ghi chú, trạng thái review → chọn một version để xem nội dung tại thời điểm đó.
- **Luồng chính (so sánh):** Trong tab "Phiên bản" → chọn version A và version B → "So sánh" → SCR-HUB-003 hiển thị diff hai cột (thêm/xóa/sửa theo dòng) + metadata hai bên.
- **Luồng thay thế (tạo phiên bản mới):** Tác giả được phân công → "Sửa"/"Tải lên bản mới" → nhập nội dung + ghi chú thay đổi → lưu → tạo `document_versions` mới, tăng `current_version` → trạng thái về chờ review nếu tài liệu thuộc loại cần duyệt → audit.
- **Luồng thay thế (lọc rỗng):** Không kết quả → hiển thị trạng thái rỗng + gợi ý nới bộ lọc.
- **Ngoại lệ:** Tài liệu không tồn tại → 404; chọn so sánh cùng một version → cảnh báo "không có khác biệt"; người không phải tác giả bấm "Sửa" → nút bị khóa (chỉ xem); nội dung quá lớn → tải phân đoạn/cảnh báo.
- **Hậu điều kiện:** Danh sách/kết quả hiển thị đúng quyền (mọi người xem được); version mới (nếu tạo) được ghi nhận với tác giả/thời điểm; `current_version` cập nhật; audit ghi tạo/cập nhật.

### Màn hình / form
**SCR-HUB-002 — Thư viện tài liệu**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Từ khóa tìm | text | Không | rỗng | — | — |
| Phân loại | select | Không | Tất cả | thuộc danh mục category | hub.documents.category |
| Trạng thái | select | Không | Tất cả | DRAFT/IN_REVIEW/APPROVED | hub.document_versions |
| Tác giả | select | Không | Tất cả | thuộc danh sách thành viên | platform.users |
| Khoảng thời gian | daterange | Không | — | from ≤ to | document_versions.created_at |

**SCR-HUB-003 — Soạn/so sánh tài liệu** (phần so sánh)
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Phiên bản A | select | Có | version trước | thuộc tài liệu | document_versions |
| Phiên bản B | select | Có | version hiện hành | ≠ A để có diff | document_versions |
| Ghi chú thay đổi (khi lưu bản mới) | textarea | Có khi tạo version | — | không rỗng | — |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Tìm/lọc | mọi thành viên | đã đăng nhập | truy vấn danh sách | danh sách phân trang |
| Xem tài liệu/version | mọi thành viên | — | render nội dung | hiển thị markdown |
| So sánh hai version | mọi thành viên | A ≠ B | tính diff | diff hai cột |
| Tạo/ cập nhật phiên bản | tác giả được phân công | có `hub.doc.edit` cho tài liệu | tạo document_versions mới | toast + chuyển chờ review |
| Tải tệp đính kèm | mọi thành viên | — | tải file | file từ platform.files |

### Trạng thái
- Phiên bản tài liệu: DRAFT → IN_REVIEW → APPROVED (chốt) → SUPERSEDED (khi có version mới hơn được duyệt). Trạng thái review do HUB-REVIEW điều khiển.
- Tài liệu: ACTIVE → ARCHIVED (ẩn khỏi danh sách mặc định, vẫn truy vết được). Không xóa cứng.
- Chống thao tác trùng: lưu version dùng `Idempotency-Key`; hai tác giả sửa song song → cảnh báo xung đột theo `current_version`, buộc hợp nhất trước khi lưu (optimistic lock).

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.documents(id, path, title, category, current_version)`, `hub.document_versions(id, document_id, version, content_ref, author_id, created_at, change_note, review_status)`, `platform.files`, `audit_logs`.
- **API:** `GET /hub/documents` (tìm/lọc/phân trang), `GET /hub/documents/:id`, `GET /hub/documents/:id/versions`, `GET /hub/documents/:id/versions/:v`, `GET /hub/documents/:id/diff?from=&to=`, `POST /hub/documents/:id/versions` (tạo bản mới), `POST /hub/documents` (tạo tài liệu mới). Lỗi chuẩn + phân trang theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, tài liệu nguồn là các file trong `document/content/**` có version theo lịch sử thư mục/commit; Hub đọc trực tiếp (chỉ đọc là mặc định, ghi version khi tác giả cập nhật qua công cụ bootstrap). Khi Backend Hub sẵn sàng, migration metadata + nội dung sang `hub.documents/document_versions`; file xuất ra là snapshot chỉ đọc. Không duy trì hai nguồn ghi song song (R005).
- **Phân quyền:** XEM/tìm/so sánh = mọi thành viên HUB. Tạo/cập nhật version = tác giả được phân công tài liệu đó (theo ma trận HUB-AUTH). Duyệt chốt = PM/PO (HUB-REVIEW). Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN thư viện có tài liệu WHEN lọc theo phân loại "thiết kế" THEN chỉ hiện tài liệu thiết kế.
- Thường: GIVEN tài liệu có 3 version WHEN chọn so sánh v2 và v3 THEN hiện diff đúng dòng thêm/xóa.
- Lỗi: GIVEN mở `/hub/documents/:id` không tồn tại WHEN xem THEN 404.
- Biên: GIVEN chọn so sánh cùng v2 và v2 WHEN so sánh THEN cảnh báo không có khác biệt.
- Quyền: GIVEN thành viên không phải tác giả WHEN mở tài liệu THEN xem được nhưng nút "Sửa" bị khóa.
- Quyền: GIVEN tác giả được phân công WHEN lưu bản mới THEN tạo version mới + chuyển IN_REVIEW.
- Tích hợp: GIVEN tạo version mới WHEN lưu THEN trạng thái review phản ánh ở SCR-HUB-002 và liên kết HUB-REVIEW.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Tìm/lọc trả đúng kết quả + phân trang; xem được mọi version; diff hai phiên bản chính xác; tạo version tăng `current_version` và ghi tác giả/ghi chú; mọi thành viên xem được, chỉ tác giả sửa được; audit đủ; không xóa cứng.
- **Tài liệu cập nhật:** Hướng dẫn sử dụng thư viện tài liệu; quy ước phân loại & đặt tên; hướng dẫn so sánh phiên bản.
