# Lab 1.4: Chuyển hướng request

## Hiển thị một trang HTML có một thẻ input và một button khi truy cập vào http://localhost:3000, bấm button thì chuyển qua http://localhost:3000/message. Khi truy cập http://localhost:3000/message thì hiển thị một trang HTML có một thẻ H1 với nội dung "Hello from my Node.js server!"

if kiểm tra xem url có bằng với chỉ dấu / hay ko, và chỉ / mới khớp. Nếu đúng thì trả về 1 form chứa 1 input và 1 button sẽ gửi lại 1 request mới.

**phương thức method**: ở đây chúng ta gọi 1 cái request POST. Có 1 tập hợp các từ http có thể sử dụng, trong đó GET và POST là phổ biến nhất. Request GET tự động gửi khi bạn nhấp vào liên kết hoặc url. Request POST phải được thiết lập bằng cách tạo 1 form như vậy. ĐIều này sẽ gửi request POST đến /message và form thú vị ở chỗ nó sẽ không chỉ gửi 1 request như vậy. Nó cũng xem xét biểu mẫu, phát hiện bất kì input hoặc yếu tố liên quan ta có thể có như SELECT.
Nếu chúng ta đặt name cho input, ta nên làm điều này, nó cũng sẽ tự động đặt message đó vào request nó gửi đến server.

**Đặt return trước req.end()**. Điều này là không bắt buộc để trả về 1 response nhưng để hàm trả về ẩn danh này và không tiếp tục phần code này vì chúng ta quay lại trước và điều này sẽ thoát khỏi việc thực thi hàm. Nếu ko có return thì nó sẽ thực thi những dòng ở dưới if.

# Lab 1.5: Chuyển hướng request 2

## Khi có POST method được gửi tới http://localhost:3000/message thì tạo ra file message.txt với nội dung "DUMMY", sau đó chuyển hướng về http://localhost:3000 với response có statusCode là 302

**writeHead**: về cơ bản cho phép chúng ta viết một số meta information(siêu dữ liệu) trong 1 lần và sau đó chúng ta đặt trạng thái code là 302, viết tắt của chuyển hướng.

**res.setHeader('Location', '/'):** Location cũng là tiêu đề mặc định được trình duyệt chấp nhận và chúng ta đặt vị trí đó thành chỉ dấu / và ta sẽ tự động sử dụng máy chủ lưu trữ mà chúng ta đang chạy và sau đó gọi res.end.
Ở đây khi bấm vào url đang ở /message thì dùng setHeader sẽ đưa đường dẫn trở về lại chỉ có dấu /
