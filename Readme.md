# Lab 3.1: Chia sẻ dữ liệu giữa các Requests, User

## Tạo object products và chia sẻ giữa trang admin, shop.

- Để thực hiện việc chia sẻ dữ liệu, ta tạo 1 mảng products
- Thay đổi cách xuất router ở admin.js
  exports.routes = router;
  exports.products = products;
  Đây là bước quan trọng vì ta đã thay đổi cách xuất các routes
- Đến nơi xuất phần admin routes ở app.js, ta đổi lại là muốn truy cập vào phần routes object.

- Ở admin.js ta thực hiện thao tác push dữ liệu req.body vào mảng products. Sau đó ở shop.js sẽ thực hiện việc in log mảng product này ra bằng cách dùng adminData.products, trong đó products này chính là object ta đã exports mảng products ở file admin.js.
- Tuy nhiên cách này sẽ có bất cập đó là khi ta thay đổi trình duyệt để truy cập thì dữ liệu ta đã nhập cũng sẽ hiển thị ở những trình duyệt khác.
- Khi truy cập localhost từ 1 trình duyệt khác, đây là 1 dạng request mới nhưng được tạo từ 1 thiết bị khác, thì log vẫn hiện dữ liệu, vì đây thực sự là loại dữ liệu được gán cho node server khi nó đang chạy và do đó, nó được chia sẻ cho toàn bộ user.

* admin.js

```javascript
..
const products = [];
...
// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
```

- app.js

```javascript
...
const adminData = require('./routes/admin');
...
app.use('/admin', adminData.routes);
```

- shop.js

```javascript
...
const adminData = require('./admin');
...
console.log('shop.js', adminData.products);
```

# Lab 3.2: Cài đặt & triển khai Pug

## Cài đặt Pug template engine và tạo file shop.pug, chuyển đổi code từ file shop.html qua. Cấu hình để ứng dụng hoạt động với shop.pug.

- Cài npm install --save ejs pug handlebars

app.set(): Ứng dụng cho phép chúng ta thiết lập bất kì giá trị toàn cục nào cho ứng dụng express. Và nó có thể thực sự là mấu chốt hoặc những item cấu hình express không thể hiểu được. Ta có thể đọc chúng từ đối tượng app cùng với app.get(). Và đó là cách khác để chia sẻ dữ liệu xuyên suốt ứng dụng.

- view engine: cho phép chúng ta khai báo với express cho bất kì template động nào chúng ta cố hiển thị ra và sẽ có 1 hàm đặc biệt để làm điều này.
- pug: ta dùng pug ở đây bởi vì ta đã cài đặt bộ công cụ templating engine và công cụ này đi kèm với công cụ gỗ trợ express và tự động đăng kí nó với express. Đó là lí do tại sao nó hoạt động. Nó ko hoạt động với tất cả các công cụ nhưng bạn sẽ thấy nhiều liên kết hơn.

- 2 câu lệnh app.set(): giờ ta đnag báo exoress rằng ta muốn biên dịch template động với công cụ pug và đó là nơi ta tìm thấy những template đó.
  Bước cuối đương nhiên là việc ta thêm vào các template, ta sẽ thêm vào file shop.pug ở thư mục views. Ta có 1 file template và giờ pug hoạt động khác biệt với file html thông thường.

# Lab 3.3: Xuất nội dung động

res.render('shop'): ta cần truyền đối số thứ 2 cho phương thức kết xuất. phương thức kết xuất cho phép chúng ta truyền dữ liệu cần được thêm vào chế độ xem của chúng ta.

Ở file shop.pug: ta có thể chèn thêm các điều kiện và vòng lặp để kiểm tra như kiểm tra độ dài của mảng products lấy từ file shop.js.

# Lab 3.5: Thêm bố cục thư mục layout

Dùng từ khóa block để export

# Lab 3.7: Chuyển đổi ứng dụng sang Handlebars

# Lab 3.8: Thêm bố cục vào Handlebars

Handlebars không hỗ trợ bố cục nhưng nó hoạt động hơi khác so với pug.
Trước hết chúng ta phải cấu hình nó trong ứng dụng. Đây là nơi chúng ta đăng kí handlebars của mình, chúng phải vượt qua 1 số tùy chọn.

```javascript
const expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs());
app.set('view engine', 'hbs'); //hbs cũng chính là tên đuôi .hbs ta sẽ sử dụng tạo file .hbs ở views, có thể đặt tên bất kì
app.set('views', 'views');
```

layout: false // đây là 1 phím đặt biệt được hiểu bởi thanh điều khiển và nó ko sử dụng bố cục mặc định
