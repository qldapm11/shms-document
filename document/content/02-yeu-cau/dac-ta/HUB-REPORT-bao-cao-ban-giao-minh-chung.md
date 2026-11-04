## HUB-REPORT — Báo cáo / slide / video / bàn giao + minh chứng

- **Mục đích:** Tổng hợp và quản lý sản phẩm đầu ra của dự án: báo cáo từng phần và báo cáo chung, slide thuyết trình, video demo/hướng dẫn, hồ sơ bàn giao — kèm minh chứng (checkpoint, test, audit, file). Tạo gói bàn giao/nghiệm thu có truy vết.
- **Vai trò sử dụng:** Mọi thành viên (xem/đóng góp phần báo cáo); tác giả từng phần; PM (tổng hợp, chốt bàn giao); QA (review báo cáo/slide); DevOps (đóng gói, nộp).
- **Liên kết nguồn:** HUB-REPORT; SCR-HUB-008 (quyết định & báo cáo/bàn giao); API nhóm `/hub/reports`; liên kết `hub.documents` (báo cáo là tài liệu), `platform.files` (slide/video/minh chứng), HUB-TEST/HUB-TRACE/HUB-CONTEXT (nguồn minh chứng).
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần PM Nguyệt + DevOps Huy xác nhận cấu trúc gói bàn giao khi chốt).

### Phạm vi
- **Làm:** (1) Quản lý báo cáo từng phần (gắn tác giả, phần/chương) và tổng hợp thành báo cáo chung; (2) Quản lý slide thuyết trình và video (demo/hướng dẫn) dưới dạng tệp có phiên bản; (3) Đính kèm minh chứng từ Hub: checkpoint, kết quả test, ma trận truy vết, audit, ảnh/log; (4) Review báo cáo/slide (dùng HUB-REVIEW) trước khi chốt; (5) Tạo gói bàn giao/nghiệm thu: danh mục tài liệu + minh chứng + trạng thái, xuất snapshot chỉ đọc; (6) Đánh dấu phân biệt kết quả mô phỏng vs thật trong minh chứng (R003); (7) Audit.
- **Không làm (giai đoạn này):** Biên tập video/slide trong Hub (chỉ lưu/liên kết tệp đã dựng bên ngoài); công bố ra ngoài tổ chức (chỉ nội bộ dự án); gửi dữ liệu/mã ra endpoint bên thứ ba khi không được yêu cầu.
- **Phụ thuộc:** HUB-AUTH, HUB-DOC (báo cáo là tài liệu có version), HUB-REVIEW (duyệt), HUB-TEST/HUB-TRACE/HUB-CONTEXT (nguồn minh chứng), `platform.files`, `audit_logs`.
- **Giả định & câu hỏi:** Giả định báo cáo chung tổng hợp từ các phần theo mục lục chuẩn (10 phần theo mẫu báo cáo nhóm). Giả định slide/video lưu dưới `platform.files` + metadata phiên bản. Câu hỏi: gói bàn giao cuối cần định dạng gì (zip + index.md, hay PDF tổng)? (đề xuất: thư mục có index + tài liệu + minh chứng, kèm bản PDF tổng khi chốt).

### Luồng
- **Tiền điều kiện:** Đã đăng nhập Hub; có nội dung/minh chứng để tổng hợp.
- **Luồng chính (báo cáo từng phần):** Tác giả mở SCR-HUB-008 (tab Báo cáo) → tạo/sửa phần báo cáo (là tài liệu HUB-DOC có version) → gắn minh chứng liên quan → gửi review (HUB-REVIEW).
- **Luồng chính (tổng hợp):** PM "Tổng hợp báo cáo chung" → chọn các phần đã duyệt → hệ thống ghép theo mục lục → tạo tài liệu báo cáo chung version mới → gửi review chéo.
- **Luồng chính (slide/video):** Thành viên tải lên slide/video (tệp) → gắn phiên bản + mô tả → liên kết tới phần báo cáo/kịch bản demo → review.
- **Luồng chính (gói bàn giao):** PM/DevOps "Tạo gói bàn giao" → chọn tài liệu chốt + slide + video + minh chứng (test PASS, truy vết, audit) → hệ thống kiểm tra đủ mục bắt buộc → sinh snapshot chỉ đọc + danh mục → trạng thái gói READY_FOR_HANDOVER → audit.
- **Luồng thay thế (nộp bài):** DevOps đóng gói cuối → kiểm tra checklist → đánh dấu SUBMITTED kèm thời điểm + minh chứng.
- **Ngoại lệ:** Tạo gói thiếu mục bắt buộc (vd thiếu báo cáo chung đã duyệt hoặc thiếu minh chứng test) → 422 BUSINESS_RULE; đưa kết quả mô phỏng vào mục "nghiệm thu thật" → cảnh báo buộc gắn nhãn đúng; người không có quyền chốt gói bấm "Tạo gói" → 403.
- **Hậu điều kiện:** Báo cáo/slide/video/gói bàn giao lưu với tác giả + phiên bản + minh chứng truy vết; gói là snapshot chỉ đọc; phân biệt mô phỏng/thật rõ; audit đủ.

### Màn hình / form
**SCR-HUB-008 — Báo cáo & bàn giao** (phần báo cáo)
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Phần báo cáo | select | Có | — | thuộc mục lục chuẩn | mẫu báo cáo |
| Tác giả | select | Có | người tạo | thành viên Hub | platform.users |
| Nội dung / tệp | ref/file | Có | — | tài liệu hoặc tệp hợp lệ | hub.documents/platform.files |
| Loại sản phẩm | select | Có | báo cáo | báo cáo/slide/video/gói | — |
| Minh chứng liên kết | select(multi) | Không | — | checkpoint/test/truy vết/audit tồn tại | HUB-CONTEXT/TEST/TRACE |
| Nhãn mô phỏng/thật | select | Có khi có minh chứng tích hợp | — | SIMULATED/REAL | — |

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Tạo/sửa phần báo cáo | tác giả được phân công | có `hub.report.edit` | ghi tài liệu báo cáo | gửi review |
| Tổng hợp báo cáo chung | PM | các phần đã duyệt | tạo version báo cáo chung | review chéo |
| Tải slide/video | thành viên | tệp hợp lệ | lưu file + version | liên kết sản phẩm |
| Tạo gói bàn giao | PM, DevOps | đủ mục bắt buộc | snapshot chỉ đọc + danh mục | READY_FOR_HANDOVER |
| Đánh dấu nộp bài | DevOps | checklist đạt | SUBMITTED + thời điểm | audit |

### Trạng thái
- Phần báo cáo / báo cáo chung: dùng vòng đời phiên bản HUB-DOC (DRAFT→IN_REVIEW→APPROVED→SUPERSEDED).
- Slide/video: UPLOADED → (review) → APPROVED; có phiên bản.
- Gói bàn giao: DRAFT → READY_FOR_HANDOVER → SUBMITTED. Sau khi tạo là snapshot chỉ đọc; chỉnh phải tạo gói phiên bản mới.
- Chống trùng: gói bàn giao idempotent theo (phiên bản, thời điểm); không ghi đè gói đã SUBMITTED, chỉ tạo bản mới.

### Dữ liệu / API / quyền
- **Dữ liệu:** `hub.documents` (báo cáo), `platform.files` (slide/video/minh chứng), `hub.handover_packages(id, version, items[], status, created_by, created_at, submitted_at)` (mở rộng), tham chiếu `hub.test_cases`/`hub.traceability`/`hub.checkpoints`/`audit_logs` làm minh chứng.
- **API:** `GET/POST/PATCH /hub/reports`, `POST /hub/reports/compose` (tổng hợp), `POST /hub/reports/assets` (slide/video), `GET/POST /hub/handover-packages`, `POST /hub/handover-packages/:id/submit`, `GET /hub/handover-packages/:id/export`. Lỗi chuẩn theo 06-api.
- **Cơ chế state/migration:** Giai đoạn bootstrap, báo cáo/minh chứng dẫn xuất từ `document/content/**` + `state/**` (checkpoints, tasks.checks, events); gói bàn giao là snapshot sinh từ các nguồn này (một nguồn tại một thời điểm). Khi Backend Hub sẵn sàng, migration sang bảng Hub; mọi file xuất ra (báo cáo, gói) là snapshot chỉ đọc (R005, kiến trúc §6). Không gửi mã/dữ liệu ra endpoint bên thứ ba trừ khi được yêu cầu.
- **Phân quyền:** XEM = mọi thành viên. Soạn phần = tác giả được phân công. Tổng hợp/chốt gói = PM. Đóng gói/nộp = DevOps. Review = reviewer chéo (HUB-REVIEW). Không dùng quyền bệnh viện.

### Kiểm thử (Given–When–Then)
- Thường: GIVEN các phần báo cáo đã duyệt WHEN PM tổng hợp THEN tạo báo cáo chung version mới theo mục lục.
- Thường: GIVEN đủ tài liệu + minh chứng test WHEN tạo gói bàn giao THEN sinh snapshot chỉ đọc + danh mục.
- Lỗi: GIVEN thiếu báo cáo chung đã duyệt WHEN tạo gói THEN 422 BUSINESS_RULE.
- Biên: GIVEN gói đã SUBMITTED WHEN sửa THEN buộc tạo gói phiên bản mới (không ghi đè).
- Quyền: GIVEN thành viên thường WHEN tạo gói bàn giao THEN 403 (chỉ PM/DevOps).
- An toàn: GIVEN minh chứng tích hợp mô phỏng WHEN đưa vào gói THEN phải gắn nhãn SIMULATED, không coi là nghiệm thu thật.
- Tích hợp: GIVEN gói bàn giao WHEN mở minh chứng THEN truy ngược được tới test/truy vết/checkpoint nguồn.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Quản lý báo cáo từng phần + tổng hợp, slide/video có phiên bản, gói bàn giao snapshot chỉ đọc có minh chứng truy vết chạy đúng; kiểm tra đủ mục bắt buộc; phân biệt mô phỏng/thật; không ghi đè gói đã nộp; audit đủ.
- **Tài liệu cập nhật:** Mục lục báo cáo chuẩn; quy trình tổng hợp & bàn giao; checklist đóng gói/nộp bài; quy ước gắn minh chứng.
