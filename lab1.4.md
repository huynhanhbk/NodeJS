# Lab 1.4: Chuyển hướng request

## Hiển thị một trang HTML có một thẻ input và một button khi truy cập vào http://localhost:3000, bấm button thì chuyển qua http://localhost:3000/message. Khi truy cập http://localhost:3000/message thì hiển thị một trang HTML có một thẻ H1 với nội dung "Hello from my Node.js server!"

if kiểm tra xem url có bằng với chỉ dấu / hay ko, và chỉ / mới khớp. Nếu đúng thì trả về 1 form chứa 1 input và 1 button sẽ gửi lại 1 request mới.

phương thức method: ở đây chúng ta gọi 1 cái request POST. Có 1 tập hợp các từ http có thể sử dụng, trong đó GET và POST là phổ biến nhất. Request GET tự động gửi khi bạn nhấp vào liên kết hoặc url. Request POST phải được thiết lập bằng cách tạo 1 form như vậy. ĐIều này sẽ gửi request POST đến /message và form thú vị ở chỗ nó sẽ không chỉ gửi 1 request như vậy. Nó cũng xem xét biểu mẫu, phát hiện bất kì input hoặc yếu tố liên quan ta có thể có như SELECT.
Nếu chúng ta đặt name cho input, ta nên làm điều này, nó cũng sẽ tự động đặt message đó vào request nó gửi đến server.

- Đặt return trước req.end(). Điều này là không bắt buộc để trả về 1 response nhưng để hàm trả về ẩn danh này và không tiếp tục phần code này vì chúng ta quay lại trước và điều này sẽ thoát khỏi việc thực thi hàm. Nếu ko có return thì nó sẽ thực thi những dòng ở dưới if.
