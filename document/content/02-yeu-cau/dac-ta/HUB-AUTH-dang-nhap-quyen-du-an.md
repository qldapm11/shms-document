## HUB-AUTH — Đăng nhập Hub & quyền theo trách nhiệm dự án

- **Mục đích:** Cho thành viên dự án đăng nhập SHMS Project Hub và phân quyền theo trách nhiệm dự án (PM, PO/BA, SA, DevOps, UI/UX, FE, BE, QA). Mọi thành viên XEM được toàn bộ Hub; quyền sửa/review/phê duyệt gắn với trách nhiệm. Không gian vai trò dự án TÁCH BIỆT hoàn toàn với vai trò bệnh viện.
- **Vai trò sử dụng:** Mọi thành viên dự án (đăng nhập, xem); QTV nền tảng (cấp/thu hồi quyền dự án); chủ sở hữu khu vực (SA/PM duyệt gán vai trò).
- **Liên kết nguồn:** HUB-AUTH; SCR-HUB-001 (đăng nhập & trang chủ Hub); API nhóm `/hub/auth`; D005 (tách quyền bệnh viện vs Hub); kiến trúc §3 (hai không gian vai trò), §4 (bảo mật).
- **Mức xác nhận:** PROPOSED (cơ chế do agent đề xuất; cần SA Dương xác nhận khi chốt stack Q001; dùng chung lớp auth nền tảng A01.3 nhưng permission resolve theo không gian HUB).

### Phạm vi
- **Làm:** (1) Đăng nhập Hub bằng danh tính nền tảng (`platform.users`) ở không gian vai trò HUB; (2) Nếu tài khoản bật 2FA ở nền tảng thì áp dụng bước 2FA như A01.3; (3) Resolve quyền theo `space=HUB` (không lẫn quyền `space=HOSPITAL`); (4) Trang chủ Hub hiển thị điều hướng tới các khu vực (tài liệu, task, truy vết, context, test, quyết định, báo cáo) theo quyền; (5) Mọi thành viên có quyền XEM mặc định toàn bộ Hub; (6) Gán/thu hồi vai trò dự án cho tài khoản (chỉ QTV/PM có quyền); (7) Ghi `audit_logs` cho đăng nhập, gán quyền, từ chối truy cập.
- **Không làm (giai đoạn này):** Tạo mới tài khoản gốc (thuộc A01.1 nền tảng); SSO/OAuth ngoài; đổi mật khẩu/2FA (dùng lại A01.3, không nhân bản); phân quyền bệnh viện.
- **Phụ thuộc:** A01.3 (đăng nhập + 2FA), `platform.users`, `platform.roles(space=HUB)`, `platform.permissions`, `platform.user_roles`, `hub.hub_users`, `audit_logs`. Giai đoạn bootstrap chưa có backend: Hub đọc `document/state/*.json` theo cơ chế §6.
- **Giả định & câu hỏi:** Giả định 8 vai trò dự án theo AS003 (Nguyệt PM, Minh PO/BA, Dương SA, Huy DevOps, Phong UI/UX, Sơn FE, Tuấn BE, Phương Anh QA). Giả định ma trận quyền HUB (bảng dưới) là đề xuất cần PM+SA xác nhận. Câu hỏi: một người có đồng thời danh tính HUB và HOSPITAL thì chọn không gian lúc đăng nhập hay theo subdomain/app? (đề xuất: theo app Hub cổng 3002, mặc định space=HUB).

### Luồng
- **Tiền điều kiện:** Tài khoản tồn tại, `status=ACTIVE`, có ≥1 `user_roles` với vai trò `space=HUB`. App Hub (cổng 3002 / prefix gateway riêng) đang chạy.
- **Luồng chính (đăng nhập Hub):** Vào SCR-HUB-001 → nhập username + mật khẩu → hệ thống xác thực qua lớp auth nền tảng → nếu `twofa_enabled` thì yêu cầu mã TOTP (A01.3) → cấp access token gắn `space=HUB` + danh sách permission HUB → chuyển vào trang chủ Hub, hiển thị menu theo quyền → ghi audit `hub.login`.
- **Luồng chính (xem Hub):** Mọi thành viên sau đăng nhập đều thấy toàn bộ khu vực ở chế độ đọc; các nút sửa/review/duyệt chỉ bật khi permission cho phép.
- **Luồng thay thế (gán vai trò dự án):** QTV/PM vào mục quản lý thành viên Hub → chọn tài khoản → gán vai trò `space=HUB` (PM/BA/SA/...) kèm `valid_from/valid_to` nếu tạm thời → lưu `user_roles` → audit `hub.role_grant`.
- **Luồng thay thế (thu hồi):** QTV/PM thu hồi vai trò → cập nhật `valid_to`/xóa gán → phiên liên quan mất quyền ở lần resolve kế → audit.
- **Ngoại lệ:** Sai mật khẩu → 401 UNAUTHENTICATED, không tiết lộ chi tiết; tài khoản không có vai trò HUB → 403 FORBIDDEN "Tài khoản chưa được cấp quyền Project Hub"; token mang `space=HOSPITAL` gọi `/hub/*` → 403 (chống lẫn quyền D005); TOTP sai N lần → khóa tạm theo A04.2.
- **Hậu điều kiện:** Có access token phạm vi HUB; menu/khả năng hiển thị khớp permission; audit ghi đủ; không rò rỉ secret/mật khẩu; không có quyền bệnh viện nào được cấp qua luồng này.

### Màn hình / form
**SCR-HUB-001 — Đăng nhập & trang chủ Hub**
| Trường | Kiểu | Bắt buộc | Mặc định | Validation | Nguồn |
|---|---|---|---|---|---|
| Tên đăng nhập | text | Có | — | không rỗng | platform.users.username |
| Mật khẩu | password | Có | — | khớp hash | platform.users |
| Mã TOTP (nếu bật 2FA) | text(6) | Có khi 2FA | — | 6 chữ số, khớp secret | platform.users.twofa_secret |
| Không gian làm việc | badge (chỉ đọc) | — | HUB | luôn = HUB tại app này | token.space |

**Trang chủ Hub (sau đăng nhập):** thẻ điều hướng 7 khu vực (Tài liệu, Review, Task, Truy vết, Context, Test, Quyết định/Báo cáo), hiển thị vai trò hiện tại, badge "chỉ đọc" nếu không có quyền sửa khu vực đó.

### Hành động
| Hành động | Quyền | Điều kiện cho phép | Tác động | Phản hồi |
|---|---|---|---|---|
| Đăng nhập Hub | mọi tài khoản có vai trò HUB | mật khẩu đúng (+2FA nếu bật) | cấp token space=HUB | vào trang chủ Hub |
| Mở khu vực bất kỳ | mọi thành viên HUB | đã đăng nhập | hiển thị nội dung (đọc) | render khu vực |
| Gán vai trò dự án | QTV, PM | có `hub.role.grant` | thêm/cập nhật user_roles(space=HUB) | toast + audit |
| Thu hồi vai trò dự án | QTV, PM | có `hub.role.grant` | set valid_to/xóa gán | toast + audit |
| Đăng xuất | chủ phiên | — | thu hồi token phiên | về màn đăng nhập |

### Trạng thái
- Phiên Hub: ANONYMOUS → AUTHENTICATED(space=HUB) → EXPIRED/LOGGED_OUT.
- Gán vai trò: ACTIVE (trong [valid_from, valid_to]) → EXPIRED (quá hạn) → REVOKED.
- Chống thao tác trùng: nút đăng nhập khóa khi đang xử lý; gán vai trò trùng được hợp nhất (idempotent), không tạo bản ghi lặp.
- Không có bước "tự review + tự duyệt" ở feature này; nguyên tắc tách danh tính review/duyệt áp dụng ở HUB-REVIEW/HUB-TASK.

### Dữ liệu / API / quyền
- **Dữ liệu:** `platform.users`, `platform.roles(space=HUB)`, `platform.permissions`, `platform.role_permissions`, `platform.user_roles`, `hub.hub_users(user_id, project_role)`, `audit_logs`.
- **API:** `POST /hub/auth/login` (2 bước nếu 2FA), `POST /hub/auth/refresh`, `POST /hub/auth/logout`, `GET /hub/auth/me` (hồ sơ + quyền HUB), `GET/POST/DELETE /hub/auth/roles` (gán/thu hồi vai trò dự án). Hợp đồng lỗi chuẩn theo 06-api; token mang `space=HUB`.
- **Cơ chế state/migration:** Giai đoạn bootstrap, danh tính/vai trò lấy từ `document/state/*` (seed) và Hub đọc trực tiếp file; không ghi hai nguồn. Khi Backend Hub sẵn sàng, migration sang DB qua `/hub/auth/*`; file xuất ra là snapshot chỉ đọc (R005: một nguồn chuẩn tại một thời điểm).
- **Phân quyền (đề xuất ma trận HUB — cần PM+SA xác nhận):**

| Khu vực | XEM | SỬA/ĐÓNG GÓP | REVIEW | PHÊ DUYỆT |
|---|---|---|---|---|
| Tài liệu (DOC) | tất cả | tác giả theo phân công (BA/SA/Dev...) | reviewer được chỉ định | PM/PO phê duyệt chốt |
| Review (REVIEW) | tất cả | người bình luận: tất cả | reviewer | PM/PO |
| Task (TASK) | tất cả | owner của task | reviewer của task | PM (đóng/duyệt) |
| Truy vết (TRACE) | tất cả | BA/SA/Dev liên quan | QA | PM/SA |
| Context (CONTEXT) | tất cả | owner task + agent | reviewer | — |
| Test (TEST) | tất cả | QA (Phương Anh) | QA lead | PM/PO nghiệm thu |
| Quyết định (DECISION) | tất cả | người đề xuất | SA/PM | người có thẩm quyền ghi trong quyết định |
| Báo cáo (REPORT) | tất cả | tác giả phần | reviewer chéo | PM |

- Không endpoint `/hub/*` nào chấp nhận token `space=HOSPITAL`; không quyền bệnh viện nào ánh xạ sang Hub (D005).

### Kiểm thử (Given–When–Then)
- Thường: GIVEN tài khoản có vai trò HUB WHEN đăng nhập đúng THEN nhận token space=HUB và vào trang chủ.
- Thường: GIVEN thành viên bất kỳ WHEN mở khu vực không thuộc trách nhiệm THEN xem được ở chế độ đọc, nút sửa bị ẩn/khóa.
- Lỗi: GIVEN tài khoản không có vai trò HUB WHEN đăng nhập THEN 403 kèm thông báo chưa cấp quyền Hub.
- Biên: GIVEN vai trò tạm thời quá `valid_to` WHEN resolve quyền THEN coi là hết hạn, chỉ còn quyền xem.
- Quyền: GIVEN token space=HOSPITAL WHEN gọi `/hub/documents` THEN 403 (không lẫn quyền).
- Quyền: GIVEN FE (Sơn) WHEN cố phê duyệt tài liệu THEN 403 (chỉ PM/PO duyệt).
- Tích hợp: GIVEN tài khoản bật 2FA WHEN đăng nhập Hub THEN bắt buộc nhập TOTP trước khi cấp token.

### Nghiệm thu & tài liệu
- **Nghiệm thu:** Đăng nhập Hub + 2FA chạy đúng; mọi thành viên xem được toàn bộ; quyền sửa/review/duyệt khớp ma trận; token Hub không dùng được cho API bệnh viện và ngược lại (test cách ly D005); audit ghi đủ login/grant/deny; không lộ secret.
- **Tài liệu cập nhật:** Hướng dẫn đăng nhập Project Hub; bảng vai trò & quyền dự án; quy trình QTV/PM cấp quyền Hub.
