# Lab 1.7: Sử dụng Hệ thống Mô-đun Node

## Thực hiện export 2 thuộc tính là handler và someText trong cùng một module, chỉnh sửa code tương ứng ở nơi import và sử dụng module.

- Kết nối 2 file app.js và routes.js với nhau.
- Ta tạo 1 function mới tên requestHandler, viết bằng ES6.

Bây giờ chúng ta cần xuất handler này, chúng ta đang nhập với cú pháp require nhưng chúng ta xuất ra ở dạng nodejs như thế nào?
Có 2 cách:

- Cách 1: đi xuống dưới cùng và thêm module.exports, đây là 1 từ khóa hoặc 1 đối tượng khác được hiển thị toàn cục bởi nodejs có thuộc tính exports. Và chúng ta có thể gán 1 giá trị cho nó, chẳng hạn như requestHandler.
  Và bây giờ chúng ta có thể nhập từ file routes.js đó bằng cách yêu cầu nó và node sẽ tìm kiếm các module.exports và xem có cái gì dó đã được đăng kí cho file này ở đây không ( ở đây là requestHandler). Có thể thêm 1 đối tượng javascript với nhiều cặp khóa-giá trị ở đây chứ ko nhất thiết là 1 hàm.
  Bây giờ qua app.js và nhập routes, bằng cách require nó. Vì đây không phải là 1 module toàn cục, chúng ta ko chỉ nhập routes mà còn phải nhập đường dẫn cục bộ vào nó bằng ./ và có thể bỏ qua .js vì nodejs sẽ tự động đính kèm nó vào phía cuối.
  Bây giờ ta có 2 file: 1 file gọn nhẹ là app.js chỉ xoay quanh server nhưng quan trọng là nó tạo kết nối với 1 file khác.

* Bây giờ 1 lưu ý quan trọng ở đây là nội dung file ở đây thực sự được lưu vào bộ nhớ cache của node. Và chúng ta ko thể chỉnh sửa nó ở bên ngoài.

- Cách 2: Đôi khi bạn xuất nhiều thứ và bạn có thể làm điều đó bằng cách có 1 đối tượng với từ khóa là handler và nó cũng có key là someText. Đây là cách chúng ta có thể kết nối nhiêu file bằng cách xuất 1 phần tử
