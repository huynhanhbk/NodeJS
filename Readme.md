# Lab2.2: Cài đặt Middleware

Express tập trung vào middleware(mã trung gian). Xét cho cùng, middleware là 1 request gửi đến sẽ được tự động chuyển đến thông qua rất nhiều các hàm bởi express.js. Vậy nên thay vì chỉ có 1 request handler(trình xử lý yêu cầu), bạn sẽ có khả năng móc nối nhiều hàm mà request sẽ chuyển qua cho đến khi bạn gửi response. Điều này cho phép bạn chia code thành nhiều block hoặc nhiều phần thay vì có 1 hàm lớn xử lý mọi thứ. Và đây là tính chất có thể thêm plugin của express, trong đó có thể dễ dàng thêm các package của bên thứ 3.

## Cài đặt

app.use(): thuộc tính use cho phép chúng ta thêm vào 1 hàm trung gian mới, phương thức use khá linh hoạt. Nó nhận 1 array được gọi là request handler.
Cách sử dụng đơn giản là chỉ cần truyền vào 1 hàm vào. Hàm này sẽ thực thi cho tất cả những request đến và hàm này nhận 3 đối số (req, res, next). Hàm đang nhận ở đây phải được thực thi để cho phép request di chuyển đến middleware tiếp theo.

next(): cho phép request được tiếp tục đến middleware tiếp theo. Không gọi next thì request sẽ chết và sẽ không tiếp tục gửi đến middleware tiếp theo.

### Ta thực hiện gửi 1 phản hồi

res.send(): send cho phép chúng ta gửi 1 response thật thuận tiện, và cho phép chúng ta gán body có type bất kì.

Dùng next() nếu ko gửi response và muốn đến middleware tiếp theo còn ở middleware tiếp theo mà có gửi response bằng send() thì ko dùng next nữa.

# Lab 2.4: Xử lý các Route khác nhau

## Tạo 3 middleware:

## + 1 cái luôn chạy.

## + 1 cái ứng với http://localhost:3000/add-product trả về một trang HTML với nội dung: "The Add product page".

## + 1 cái ứng với http://localhost:3000 trả về một trang HTML với nội dung: "Hello from Express.js".
