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

Tạo 3 middleware: + 1 cái luôn chạy. + 1 cái ứng với http://localhost:3000/add-product trả về một trang HTML với nội dung: "The Add product page". + 1 cái ứng với http://localhost:3000 trả về một trang HTML với nội dung: "Hello from Express.js".

```javascript
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('This always run!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('In the middleware!');
  res.send('<h1>The "Add product" Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3001);
```

# Lab 2.5: Phân tích cú pháp Requests đến (Parsing Incoming Requests)

## Ở trang http://localhost:3000/add-product trả về một trang HTML với nội dung là 1 form dùng để post sản phẩm (bao gồm thông tin về title) tới http://localhost:3000/product.Tạo middleware ứng với http://localhost:3000/product nhận post request đến và log ra console req.body

Để phân tích body ta sử dụng gói của bên thứ ba, cài đặt npm install --save body-parser (trình phân tích cú pháp nội dung). Bây giờ nó sẽ được tích hợp trong express theo mặc định.
app.use(bodyParser.urlencoded({extended: false})): Đây là chức năng bạn phải thực thi. Điều này ko phân tích cú pháp tất cả các loại nội dung có thể tệp, json .. nhưng sẽ phân tích cú pháp các phần tử như chúng ta nhận ở đây, được gửi qua 1 biểu mẫu.
false: là nếu nó sẽ có thể phân tích cú pháp các tính năng ko phải mặc định.

app.js

```javascript
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3001);
```

# Lab 2.6: Giới hạn việc thực thi Middleware đối với Post Requests

## Thay đổi middleware ứng với http://localhost:3000/product để chỉ nhận post request

Có thể sử dụng get thay cho use, get có thể sử dụng đường dẫn hoặc ko sử dụng, nhưng nó chỉ kích hoạt cho các yêu cầu nhận đến, get cho phép lọc các yêu cầu nhận

...

```javascript
app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});
```

...

# Lab 2.7: Sử dụng Express Router

## Cài đặt Express Router và chuyển các xử lý ở app.js về các file Router tương ứng.

Tạo thư mục routes gồm các file js

- admin.js
- shop.js

Ở admin.js

- Tạo bộ định tuyến bằng cách gọi express.Router(). Sau đó có thể xuất module bằng bộ định tuyến Router này. module.exports = Router

- Điểm khác nhau giữa dùng phương thức use và get là get thì phải chỉ định chính xác đường dẫn. Nếu như chỉ định đường dẫn là '/' mà nhập vào dhsjdhsj thì sẽ báo lỗi ko get đc dữ liệu, còn dùng use thì nhập ko đúng vẫn sẽ nhận đc.

* app.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3001);
```

- admin.js

```javascript
const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
```

- shop.js

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;
```

# Lab 2.7

```javascript
app.use((req, res, next) => {
  res.status(402).send('<h1>Page not found</h1>');
});
```
