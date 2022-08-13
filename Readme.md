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
