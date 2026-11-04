# Checkpoint 2026-11-04 — Deploy SHMS lên Nginx gateway

- **Thời điểm:** 2026-11-04T08:10:00Z
- **Actor:** claude-cli (Opus 4)
- **Mục tiêu:** Deploy SHMS lên gateway Nginx workspace theo README /config/workspace.

## Đã làm (theo quy trình README §"Thêm một phần hệ thống")
1. Đọc README, infra/README, services.json, system.json, render script, generated conf.
2. **Frontend hỗ trợ prefix:** vite `base:'/shms/'`, router `basename=BASE_URL`, api baseURL `/shms/api/v1`, 401 redirect theo base, thêm vite-env.d.ts. Rebuild PASS, asset mang prefix `/shms/`.
3. **Backend hỗ trợ prefix:** `BASE_PATH=/shms`, mount toàn bộ API dưới prefix, phục vụ build frontend + SPA fallback cùng prefix. HOST/PORT từ env. typecheck PASS.
4. **Đăng ký registry:** services.json (service `shms`, port 3010, route `/shms/` stripPrefix=false, navigation portal) + system.json (project + relation Nginx→shms). `workspace validate` PASS.
5. **Render + reload:** `services.mjs render` sinh upstream+route; `nginx.sh test` PASS; `nginx.sh reload` PASS.
6. **Verify + audit.**

## Kiến trúc deploy
Một service: backend Express (3010, loopback) phục vụ cả API (`/shms/api/v1`) lẫn bản build React (`/shms/`). Gateway Nginx 6666 → 3010, stripPrefix=false (BE nhận `/shms/...` nguyên). Cloudflare chỉ tới gateway (không tạo tunnel trực tiếp — đúng AGENTS.md).

## Kiểm tra (bằng chứng, qua gateway 6666)
- redirect `/shms`→`/shms/` 302; FE index 200; asset `/shms/assets/*.js` 200; SPA deep-link `/shms/billing` 200.
- `/shms/api/v1/health` 200 (basePath=/shms); login 200.
- Portal homepage `/` có link "SHMS — Bệnh viện Thông minh".
- **E2E 15/15 PASS** (curl): 6 vai trò login, tiếp đón tạo BN+lượt, BS khám+hàng chờ, DS xem đơn, AI mock; **RBAC: TD kê đơn 403, BS /admin/users 403**.
- `workspace validate` PASS; render + nginx test/reload PASS; audit lưu history (SHMS sạch, đã dọn server static 3011 thừa).

## Hạn chế / chưa kiểm chứng
- **UI chưa render trong browser thật** (môi trường không có browser; Vite dev kẹt ENOSPC). Verify bằng HTTP qua gateway + build + typecheck + E2E API.
- Node `fetch` chặn port 6666 (undici "bad port") → E2E gateway dùng curl; không ảnh hưởng trình duyệt thật.
- Backend 3010 chạy nền phiên này, **chưa có autostart/watchdog** — thoát phiên là dừng. Cần cơ chế khởi động bền (PM2/cron như trackboard) nếu muốn trụ qua restart.
- Audit exit=1 do trackboard/personal-hub (dịch vụ có sẵn) không listener — không liên quan SHMS.
- Cloudflare tunnel thực tế chưa xác minh (ngoài phạm vi, thuộc host).

## Bước tiếp
1. Autostart backend (đăng ký action start/stop trong system.json như trackboard, hoặc PM2).
2. Serve FE qua chính backend đã xong; nếu muốn tách, cân nhắc service riêng.
3. Review UI trong browser thật.
4. Commit đầu cho 3 repo + lưu vết registry (history đã có snapshot).
