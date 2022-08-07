//Lab 1.2: Tạo Node Server

const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);

//createServer(): nhận tham số là 1 requestListener, phương thức này trả về 1 server
//nên ta phải lưu trữ nó trong 1 biến hoặc 1 hằng số mới, ta chỉ tạo server 1 lần nên
//dùng từ khóa const để tạo server
//Viết hàm requestListener: cos 2 tham số là req và res. req là đại diện cho yêu
//cầu đến và cho phép ta đọc dữ liệu từ yêu cầu đó và đối tượng thứ 2 là res
//được sử dụng để trả về 1 phản hồi cho bất cứ ai đó gửi yêu cầu.

// const http = require('http');
// function rqListener(req, res) {

// }
// http.createServer(rqListener);

//Yêu cầu với createServer: vui lòng tìm kiếm hàm này
// với tên này và thực thi nó cho mọi yêu cầu đến

//cũng có thể viết theo hàm ẩn danh:

// http.createServer(function (req, res) {
// })
// đây là kiến trúc hướng sự kiện, Node.js dùng rất nhiều
// Sử dụng cú pháp hàm mũi tên. Đây được gọi la hàm callback createServer, nó được
// gọi bởi nodejs bất cứ khi nào có yêu cầu đến server

// listen() bắt đầu 1 quá trình mà nodejs sẽ không thoát ngay tập lệnh chạy để nghe listen
// cho các yêu cầu đến. Listen nhận vào đối số là 1 port, hostname ...
// Listen(): tạo ra 1 trình lắng nghe trên cổng hoặc đường dẫn được chỉ định
