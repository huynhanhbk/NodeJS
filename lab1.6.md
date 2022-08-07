# Lab 1.6: Đọc body của request

## Đọc nội dung body của request Khi có POST method được gửi tới http://localhost:3000/message , sau đó ghi nội dung đó vào file message.txt

Dữ liệu đến về cơ bản được gửi dưới dạng 1 luồng dữ liệu (stream) và đó là 1 cấu trúc đặc biệt của JS nói chung mà node.js sử dụng rất nhiều.

## Khái niệm Streams và buffers

**Stream:** về cơ bản là 1 quá trình liên tục, request chỉ đơn giản được đọc bởi Node từng phần một, trong nhiều phần và cuối cùng vào 1 thời điểm nào đó, nó hoàn tất. ĐIều này được thực hiện để về mặt lý thuyết, ta có thể bắt đầu làm việc này trên từng phần riêng lẻ mà không phải đợi đọc toàn bộ request. Đối với tập tin đang tải lên, điều này mất thời gian hơn nhiều so với ví dụ đơn giản ta đang làm, do đó việc stream dữ liệu là hợp lý vì nó cho phép ta ghi nó vào đĩa, với ổ cứng nơi ứng dụng của ta chạy, ứng dụng Node chạy trên server trong khi dữ liệu đến, để ta không phải parse toàn bộ tập tin, tất nhiên là mất nhiều thời gian và ta phải đợi nó được tải lên đầy đủ trước khi có thể làm bất cứ điều gì với nó. Nhưng đây là cách Node xử lý tất cả các request vì nó không biết trước mức độ phức tạp và lớn như thế nào.

**Buffers(bộ đếm):** giống như 1 bến xe buýt. 1 buffer đơn giản là 1 cấu trúc cho phép ta giữ nhiều phần và làm việc với chúng trước khi chúng được phát hành khi ta đã hoàn tất và làm việc với buffer.

**Ở trong bài của ta:**
Khi nhận được 1 message POST, trước khi gửi phản hồi và trước khi ghi vào tập tin, chúng ta muốn nhận dữ liệu request của mình đúng ko?
Chúng ta thực hiện hiện điều này bằng cách nhập req và đăng kí 1 eventListener. Node tự làm điều này , nó chạy ngầm. Giờ chúng ta làm việc này bằng phương thức on.
**req.on('data', (chunk) => {...} ):** on cho phép ta nghe các sự kiện nhất định và sự kiện ta muốn nghe ở đây là 1 event data. Ta cần thêm 1 đối số thứ 2 là hàm đó sẽ được thực thi cho mọi event.
Listener này nhận 1 phần dữ liệu, ở đây ta nhận 1 chunk và đây là thứ chúng ta có thể sử dụng ở đây.
Ta khai báo 1 body và ta sẽ cố gắng đọc body của request. Body phải là 1 mảng trống.
Sau đó push chunk vào mảng body.

**req.on('end', () => {...} ):** điều này cuối cùng sẽ tạo ra 1 buffer mới và thêm tất cả các chunk từ bên trong body vào nó. Ta có thể gọi phương thức toString để biến nó thành dạng chuỗi.
Vì vậy body của request là 1 văn bản.
