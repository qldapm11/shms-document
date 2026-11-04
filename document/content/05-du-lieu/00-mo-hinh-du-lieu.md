# Mô hình dữ liệu SHMS (ERD mức khái niệm)

> [ĐỀ XUẤT] — mức khái niệm phục vụ thiết kế. Chi tiết cột/kiểu/validation sẽ hoàn thiện khi đặc tả từng feature (Loại C) và trước khi code BE. Hai schema: `hospital`, `hub`; dùng chung `platform`.

## Schema PLATFORM (dùng chung)
- **users**(id, username, email, phone, password_hash, status[ACTIVE/LOCKED/DISABLED], twofa_enabled, twofa_secret, created_at)
- **staff_profiles**(id, user_id→users, full_name, dob, department_id, title, employee_code)
- **roles**(id, code, name, space[HOSPITAL/HUB], is_default)
- **permissions**(id, code, action, resource)
- **role_permissions**(role_id, permission_id)
- **user_roles**(user_id, role_id, data_scope[dept_ids], valid_from, valid_to) — hỗ trợ A02.4 phân quyền tạm thời
- **audit_logs**(id, user_id, action, resource, resource_id, before, after, ip, created_at) — append-only
- **notifications**(id, user_id, type, title, body, channel, read_at, created_at)
- **files**(id, owner_id, path, mime, size, checksum, created_at)

## Schema HOSPITAL
Tổ chức & danh mục:
- **departments**(id, parent_id, code, name, type[KHOA/PHONG/BUONG]) 
- **beds**(id, room_id→departments, code, status[EMPTY/OCCUPIED/RESERVED/MAINT])
- **services**(id, code, name, specialty, price, bhyt_price)
- **drugs**(id, code, name, unit, form, active_ingredient)
- **supplies**(id, code, name, unit)
- **icd10**(code, name, parent)

Người bệnh & lượt khám:
- **patients**(id, code, full_name, dob, gender, address, phone, bhyt_card_no, bhyt_valid_to)
- **appointments**(id, patient_id, department_id, scheduled_at, channel[ONLINE/COUNTER], status)
- **encounters**(id, patient_id, type[OUTPATIENT/INPATIENT], department_id, doctor_id, queue_no, status[WAITING/IN_EXAM/DONE/ADMITTED/DISCHARGED], created_at)
- **diagnoses**(id, encounter_id, icd10_code, type[PRIMARY/SECONDARY], note)
- **orders**(id, encounter_id, type[LAB/IMAGING], service_id, status, result_id)
- **lab_results**(id, order_id, result_json, verified_by, verified_at) — nguồn mô phỏng LIS/RIS
- **prescriptions**(id, encounter_id, doctor_id, status, signed_at)
- **prescription_items**(id, prescription_id, drug_id, dose, frequency, duration, quantity)

Bệnh án & nội trú:
- **medical_records**(id, patient_id, encounter_id, summary, status, signed_by, signed_at) — U03, ký số
- **admissions**(id, encounter_id, bed_id, admit_at, discharge_at, status)
- **care_tasks**(id, admission_id, nurse_id, type, scheduled_at, done_at, note) — y lệnh/chăm sóc
- **vital_signs**(id, admission_id, bed_id, measured_at, hr, spo2, temp, bp_sys, bp_dia, source[IOT/MANUAL]) — U06

Nguồn lực:
- **medical_devices**(id, code, name, department_id, status, next_maintenance)
- **duty_rosters**(id, department_id, staff_id, shift, date)

Viện phí & dược:
- **invoices**(id, encounter_id, total, bhyt_part, patient_part, status)
- **invoice_items**(id, invoice_id, service_id/drug_id, qty, unit_price, amount)
- **payments**(id, invoice_id, amount, method, receipt_no, paid_at)
- **bhyt_claims**(id, invoice_id, status, sent_at, response_json) — mô phỏng
- **drug_dispenses**(id, prescription_id, dispensed_by, dispensed_at)
- **inventory_lots**(id, drug_id/supply_id, lot_no, qty, expiry_date, warehouse)

Cấu hình & tích hợp:
- **config_params**(key, value, scope) — A04.1
- **alert_thresholds**(id, metric, dept_id, min, max, severity) — A04.2
- **integrations**(id, type[IOT/BHYT/LIS/AI], config_json, status)
- **sync_logs**(id, integration_id, direction, status, payload_ref, error, created_at) — A05.5
- **ai_requests**(id, feature_code, request_json, response_json, status, latency_ms, provider, created_at) — audit AI 9router

## Schema HUB
- **hub_users**(id, user_id→platform.users, project_role) 
- **documents**(id, path, title, category, current_version)
- **document_versions**(id, document_id, version, content_ref, author_id, created_at)
- **reviews**(id, document_id, version, reviewer_id, status[APPROVED/CHANGES], comment, created_at)
- **hub_tasks**(id, code, title, feature_ids[], screen_ids[], type, owner, reviewer, status, dependency_ids[], ...) — khớp state/tasks.json
- **traceability**(id, feature_id, screen_id, api_id, fe_task, be_task, test_id)
- **checkpoints**(id, task_id, actor, content_ref, created_at)
- **handoffs**(id, task_id, from_actor, to_actor, revision, status)
- **test_cases**(id, feature_id, steps, expected, result, evidence_ref)
- **decisions**(id, title, decision, authority, reason, decided_at) — khớp state/decisions.json
- **events**(id, actor, type, detail, created_at) — khớp state/events.jsonl

## Trạng thái quan trọng (vòng đời)
- **encounter**: WAITING → IN_EXAM → DONE | → ADMITTED → DISCHARGED
- **prescription**: DRAFT → SIGNED → DISPENSED (không sửa sau SIGNED, chỉ tạo bản đính chính có lịch sử)
- **invoice**: DRAFT → ISSUED → PAID | PARTIAL
- **bed**: EMPTY → RESERVED → OCCUPIED → EMPTY | MAINT
- **hub_task**: DRAFT → READY → IN_PROGRESS → IN_REVIEW → DONE (+ BLOCKED, CHANGES_REQUESTED, CANCELLED)

## Nguyên tắc dữ liệu
- Không xóa cứng dữ liệu nghiệp vụ nhạy cảm (bệnh án, đơn, hóa đơn): dùng trạng thái + lịch sử.
- Mọi thay đổi bệnh án/đơn/thu tiền/quyền ghi audit_logs.
- Số liệu minh họa (giá, ngưỡng) trong seed đánh dấu là GIẢ LẬP, cần xác nhận trước nghiệm thu thật.
