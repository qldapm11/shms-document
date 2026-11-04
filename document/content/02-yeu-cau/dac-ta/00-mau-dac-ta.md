# Mẫu đặc tả tính năng (theo bootstrap §8)

Mỗi tính năng dùng đúng khung này. Lô nền tảng đặc tả COMPLETE; còn lại CATALOG/DRAFT, nâng dần.

```
## <Mã> — <Tên>

- Mục đích:
- Vai trò sử dụng:
- Liên kết nguồn: (feature id, UI-REF, màn hình SCR-*)
- Mức xác nhận: CONFIRMED | PROPOSED | ASSUMED

### Phạm vi
- Làm:
- Không làm:
- Phụ thuộc:
- Giả định & câu hỏi:

### Luồng
- Tiền điều kiện:
- Luồng chính:
- Luồng thay thế:
- Ngoại lệ:
- Hậu điều kiện:

### Màn hình / form
- Màn hình (SCR-*), tab, popup
- Bảng trường: tên | kiểu | bắt buộc | mặc định | validation | nguồn dữ liệu

### Hành động
- Bảng: nút/hành động | quyền | điều kiện cho phép | tác động | phản hồi

### Trạng thái
- Vòng đời, chuyển trạng thái hợp lệ, hủy/sửa sau hoàn thành, chống thao tác trùng

### Dữ liệu / API / quyền
- Bảng/quan hệ dữ liệu
- API + hợp đồng
- Phân quyền theo hành động & phạm vi dữ liệu

### Kiểm thử (Given–When–Then)
- Thường / lỗi / biên / quyền / tích hợp

### Nghiệm thu & tài liệu
- Điều kiện nghiệm thu
- Tài liệu hướng dẫn cần cập nhật
```
