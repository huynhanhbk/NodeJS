Lab 6.1: Cài đặt trình điều khiển MongoDB
Lab 6.2: Tạo kết nối cơ sở dữ liệu

# Lab 6.3: Tổng kết bài học kết nối cơ sở dữ liệu

\_db = client.db();
Lưu trũe quyền truy cập vào cơ sở dữ liệu

```javascript
MongoClient.connect(
  'mongodb+srv://test:i54hWgheQw8CHbkr@anhhuynhcluster.o9kycbf.mongodb.net/?retryWrites=true&w=majority'
);
```

Nó sẽ mặc định làm việc với csdl test vì đó là nơi ta chỉ định trong chuỗi kết nối

```javascript
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
```

Ta đang xuất 2 hàm, 1 hàm để kết nối và sau đó lưu trữ kết nối vào csdl.
product.js: const getDb = require('../util/database').getDb; Với điều này ta có thể gọi hàm này để truy cập vào csdl và do đó ta có thể sử dụng nó để tương tác với csdl.

# Lab 6.4: Sử dụng Kết nối Cơ sở dữ liệu

Lab 6.5: Tạo sản phẩm
Lab 6.6: Tìm nạp tất cả các sản phẩm
Lab 6.7: Tìm nạp một sản phẩm duy nhất
Lab 6.8: Làm cho các nút "Chỉnh sửa" & "Xóa" hoạt động trở lại
Lab 6.9: Làm việc trên Model Sản phẩm để Chỉnh sửa Sản phẩm
Lab 6.10: Hoàn thành code "Cập nhật sản phẩm"
Lab 6.11: Một lưu ý về việc cập nhật sản phẩm
Lab 6.12: Xóa sản phẩm
Lab 6.13: Sửa chức năng "Thêm sản phẩm"
Lab 6.14: Tạo người dùng mới
Lab 6.15: Lưu trữ Người dùng trong Cơ sở dữ liệu
Lab 6.16: Làm việc trên các mặt hàng & đơn đặt hàng trong giỏ hàng
Lab 6.17: Thêm chức năng "Thêm vào giỏ hàng"
Lab 6.18: Lưu trữ nhiều sản phẩm trong giỏ hàng
Lab 6.19: Hiển thị các mặt hàng trong giỏ hàng
Lab 6.20: Sửa lỗi
Lab 6.21: Xóa các mục trong giỏ hàng
Lab 6.22: Thêm đơn hàng
Lab 6.23: Thêm dữ liệu thứ tự quan hệ
Lab 6.24: Nhận đơn đặt hàng
