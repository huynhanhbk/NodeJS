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

# Lab 2.8: Thêm trang xử lý lỗi 404

## Thêm middleware ở app.js và bắt những đường dẫn mà chưa được định nghĩa rồi trả về một trang với nội dung: "Page not found".

```javascript
app.use((req, res, next) => {
  res.status(402).send('<h1>Page not found</h1>');
});
```

# Lab 2.9: Phân luồng đường dẫn

## cài đặt sao cho Route admin.js sẽ được nối thêm thành http://localhost:3000/admin/.... thay vì http://localhost:3000/....

- app.js

```javascript
...
app.use('/admin', adminRoutes);
app.use(shopRoutes);
...
```

- admin.js

```javascript
...
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});
...
```

# Lab 2.10.11: Tạo và cung cấp trang HTML

## Tạo 2 trang HTML giống nhau phần menu. Trang add-product.html là form submit sản phẩm (bao gồm thông tin title) và shop.html là danh sách sản phẩm.

res.sendFile(): cho phép gửi lại 1 file cho người dùng. Nó tự động thiết lập loại nội dung là trường res.sentHeader

Ta thêm đường dẫn đến file html bằng cách import 1 module path.
path.join(): join cung cấp cho ta 1 đường dẫn ở cuối, nó trả về 1 đường dẫn nhưng nó xây dựng nên đường dẫn này bằng cách móc nối những mảng khác nhau.
Gạch dưới, gạch dưới (\_\_dirname): Đây là biến toàn cục mà nó đơn thuần giữ phần đường dẫn tuyệt đối ở hệ điều hành cho cái thư mục dự án này. Ta thêm dấu ',' và view ở đây bởi vì mảng đầu tiên căn bản là đường dẫn cho cả thư mục dự án. Mảng tiếp theo là cái mà chúng ta muốn đi đến thư mục views và mảng thứ 3 sẽ là file của chúng ta.

```javascript
res.sendFile(path.join(__dirname, 'view', 'shop.html'));
```

- shop.html

```htm
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shop</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="/">Shop</a></li>
          <li><a href="/admin/add-product">Add Product</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>My Product</h1>
      <p>List of all the product...</p>
    </main>
  </body>
</html>
```

- add-product.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Shop</a></li>
                <li><a href="/admin/add-product">Add Product</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <form action="/admin/add-product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    </main>
</body>
</html>

- shop.js

```javascript
const path = require('path');

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;
```

- admin.js

```javascript
const path = require('path');
const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
```

# Lab 2.13: Sử dụng chức năng trợ giúp để điều hướng

## Tạo object hỗ trợ lấy path ngắn gọn hơn.

module.exports = path.dirname(require.main.filename): Cung cấp cho chúng ta đường dẫn đến tệp chịu trách nghiệm về thực tế là ứng dụng của chúng ta đang chạy và chúng đặt filename bên trong dirname để lấy đường dẫn đến thư mục.

# Lab 2.14: Cung cấp tệp tĩnh

## Dẫn link tương đối các file css bằng cách đưa vào folder public/css.

Ta dùng 1 tính năng cung cấp bởi express, ta cần có thể xử lý các tệp 1 cách static (tĩnh). Tĩnh đơn giản có nghĩa là không được xử lý bởi router express hoặc phần mềm trung gian khác. Thay vào đó được chuyển tiếp trực tiếp đến hệ thống tệp.

express.static(): Ta truyền vào 1 path, về cơ bản nó là thư mục mà ta muốn cấp quyền truy cập, nó chỉ có quyền truy cập đọc.
