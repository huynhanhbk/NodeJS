# Lab 4.1: Thêm Controller

# Lab 4.2: Hoàn thiện Controller

# Lab 4.3

static fetchAll(): hàm này sẽ tìm nạp tất cả các sản phẩm và tôi không muốn tạo 1 đối tượng mới bằng từ khóa mới với 1 số tiêu đề giả chỉ để tìm nạp tất cả các sản phẩm hiện có. Do đó ra sẽ thêm từ khóa tĩnh (static) mà js cung cấp. Để đảm bảo rằng ta có thể gọi phương thức này trực tiếp trên chính lớp đó chứ ko phải treeb 1 đối tượng được khởi tạo.

# Lab 4.4: Lưu trữ dữ liệu trong tệp thông qua model

# Lab 4.5: Tìm nạp dữ liệu từ các tệp thông qua model

save():
Để lưu trữ 1 sản phẩm mới, trước tiên ta cần lấy mảng sản phẩm hiện có. Vì vậy, trước hết ta sẽ đọc tệp đó. ReadFile

# Lab 4.8: Trích xuất các thông số động

routes.get('products/:productId'): Phần quan trọng là dấu :, điều này báo hiệu rằng nó không nên tìm kiếm 1 tuyến đường như ID sản phẩm mà thay vào đó, phần này ở đây có thể là bất kì thứ gì và nó sẽ chỉ định tuyến đường hoặc tải tuyến đường này cho đường dẫn này sau đó và ta có thể trích xuất thông tin qua tên đó.

req.params: express cung caaps cho chúng ta 1 đối tượng params theo request và trên đối tượng params này, chúng ta có thể truy cập ID sản phầm của mình, id sản phẩm này là tên sau dấu : . Vì vậy tên bạn sử dụng ở đây sau dấu : là tên bạn có thể trích xuất dữ liệu trên đối tượng params này.

# Lab 4.12: Thêm model giỏ hàng

Những gì chúng ta cần trên giỏ hàng này là 1 cách để thêm và xoá các sản phẩm của chúng ta 1 cách rõ ràng. Bây giờ vấn đề của ta là bản thân giỏ hàng không thực sự là một đối tượng mà chúng ta sẽ liên tục tạo lại, không phải đối với mỗi sản phẩm mới mà chúng ta thêm vào, chúng ta lại tạo 1 giỏ hàng mới. Thay vào đó sẽ luôn chỉ có 1 giỏ hàng trong ứng dụng của ta và ta chỉ muốn quản lý các sản phẩm trong đó. Vì thế ko thể tạo theo kiểu
constructor (){
this.product = [];
this.totalPrice = 0;
}

```javascript
module.exports = class Cart {
  static addProduct(id, productPrice) {
    //thao tác này sẽ lấy ID của sp mà ta muốn thêm và mục tiêu ở đây là sau đó
    //tìm nạp giỏ hàng cũ trước đó từ tệp của chúng ta

    // sử dụng hệ thống tệp để đọc tệp và đó sẽ là tệp tại đường dẫn đến tệp .json. Chúng ta truyền vào 1 callback gặp lỗi hoặc nội dung tệp. Khi gặp lỗi, ta biết rằng tệp chưa tồn tại và do đó ta chưa có giỏ hàng. Vì vậy nếu err thì giỏ hàng sẽ được tạo.
    //Thêm 1 giỏ hàng mới, sẽ có sản phẩm là 1 mảng trống, và 1 thuộc tính là tổng giá tiền khởi tạo bằng 0.
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        //Nếu ko có lỗi thì tức là chúng ta có 1 giỏ hàng hiện có, vì vậy trong trường hợp này, giỏ hàng của tôi phải bằng với nội dung tệp được phân tích cú pháp. Chúng ta sẽ lưu nó dưới dạng json vì vậy ta sẽ parse nội dung file với trình trợ giúp json.
        cart = JSON.parse(fileContent);
      }
      //phân tích điều đó và xem liệu chúng ta đã có sản phẩm đó chưa? Tìm sản phẩm hiện có

      //Ta tìm kiếm sp hiện có bằng cách đưa các sp trong giỏ hàng của ta vào đó, hãy nhớ rằng ta sẽ có các sp trong giỏ hàng là 1 mangr và sau đó tìm 1 phần tử trong đó. Vì vậy, 1 lần nữa, ta sẽ xem qua tất cả các sp và xem xét từng sp, xem liệu ID sp có khớp với ID sp mà chúng ta cố gắng không cộng.

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      ///lấy chỉ mục thay vì sp. Sau đó sẽ thêm sp hiện có của mình, đơn giản là sp giỏ hàng tại chỉ mục sp hiện có này. Chỉ 1 bước bổ sung nhưng điều này cho phép ta sử dụng chỉ mục đó để thay thế mục trong các sp giỏ ghàng của ta tại đây.
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // sau đó thêm sản phẩm mới hoặc tăng số lượng.

      //Bây giờ nếu ta có 1 sản phẩm hiện có thì ta chỉ muốn tăng số lượng đó lên. Vì vậy, giả sử rằng mỗi đối tượng sp được lưu trữ trong đó ko chỉ có 1 đối tượng sp có dữ liệu trong mô hình sp mà còn có trường số lượng bổ sung.
      //Bây giờ nếu ta có 1 sp hiện có, thì ta muốn tạo 1 sp mới và vì điều này ta sẽ tạo 1 biến mới là updatedProduct và sử dụng trong câu lệnh if khi sp tổn tại
      if (existingProduct) {
        //lấy tất cả các thuộc tính của sp hiện có và thêm chúng vào đối tượng js mới, sau đó trên updatedProduct, ta đặt số lượng bằng số lượng cũ + 1. Ta chỉ cần tăng số lượng lên 1 vì ta đã phân phối tất cả các thuộc tính của sp hiện có vào sp cập nhật.
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        ///Ở đây, ta sẽ đặt sp giỏ hàng bằng sp giỏ hàng bằng cách sao chép mảng cũ. Nhưng ta sẽ ko thêm sp sp cập nhật như ở dưới khối else. Thây vào đó ta sẽ đặt sp giỏ hàng và ghi đè sp hiện có chỉ mục. Vì vậy tại vị trí này,ta sẽ thay thế phần tử bằng sp cập nhật của mình. Vì vậy, bây giờ updatedProduct hoặc được thay thế hoặc thêm vào sp giỏ hàng cart.products và giá đc cập nhật. Bây giờ ta có thể lưu nó trở lại và sử dụng tệp ghi hệ thống.
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct; //thay thế
      } else {
        //Nế chúng ta có sp mới, ta sẽ đặt sp cập nhật bằng 1 object js mới nơi ta thêm thông tin cho sp đó và đó là id ở hàm addProduct và qty.
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct]; // thêm vào
      }
      //Tổng giá sẽ luôn tăng theo giá của sản phẩm đã thêm vào. Tuy nhiên hiện tại ta ko có thông tin đó vì thế ta thêm productPrice làm đối số ở hàm addProduct.
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
    //Vì vậy, bây giờ ta đã thêm sp của chúng ta, chúng ta cũng phân tích nó va ftheem 1 sp mới, tăng số lượng, bây giờ ta chỉ cần lưu giỏ hàng trở lại tệp của chúng ta. Tất nhiên giỏ hàng cũng nên chứa sp đc cập nhật.
    //Nếu chúng ta đang tạo 1 sp lần đầu tiên, vì vậy nếu ở trong khối khác, ta chỉ cần thêm sp cập nhật làm sp bổ sung mới. Tuy nhiên nếu tôi có 1 sp hiện có ở đây, ta ko muốn thêm sp đó vào sp mới mà thay vào đó ta muốn thay thế sp cũ và để làm điều đó, ta cần tìm hiểu xem sp hiện có này nằm ở đâu trong các sp cũ của mình. Vậy nên ta sẽ lấy chỉ mục Index thay vì sản phẩm.
  }
};
```

- shop.js controlled

```javascript
//Ở đây ta muốn thêm sp của mình. Trước tiên ta cần lấy sản phẩm vì ta cũng cần giá của nó. Ta sẽ dùng tính năng findById cho id sp của mình và sau đó ta có 1 callback khi lấy sp của mình product. Vì vậy đây là sp đc truy xuất tùe csdl sp ví dụ từ tệp sp. Và khi ta có tệp này, ta có thể sử dụng thông tin sp để cập nhật giỏ hàng của mình. Vì vậy ở đây ta sử dụng class Cart với phương thức addProduct. Bây giờ giỏ hàng cart về cơ bản là 1 mô hình tiện ích bạn có thể nói, chúng tôi ko khởi tại nó thay vào đó đang sử dụng hàm tĩnh static. Ta sử dụng addProduct để chuyển vào ID sp của tôi và cũg là sp của ta. Đây là sp ta đang truy xuất từ tệp sp, giá sp cũng cần trong đó.
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};
```

# Lab 4.13: Sử dụng tham số truy vấn

# Lab 4.15: Liên kết đến Trang chỉnh sửa

# Lab 4.16: Chỉnh sửa dữ liệu sản phẩm

- product.ejs
  <a href="/admin/edit-product/<%= product.id %>?edit=true" ..

Chúng ta đã thêm tham số truy vấn của mình và ta sẽ kiểm tra tham số truy vấn này trong controlled admin.js và nếu chúng ta ko tìm thấy tham số truy vấn đã thêm, chế độ đã thêm sẽ không được xác định và do đó chúng ta được chuyển hướng.
const editMode = req.query.edit;
if (!editMode) {
return res.redirect('/');
}

Vì thế ở trang product.ejs, chúng ta ko chỉ thêm ID này mà còn phải thêm tham số truy vấn đó và đặt giá trị true.

- Khi bấm vào update product, để thực hiện chức năng này, đầu tiên ta cần đăng kí 1 tuyến đường ở routes/admin.js.

router.post('/edit-product');

- Điều này sẽ không nhận được bất kì phân đoạn động nào (tức là dấu :)
  Tiếp theo sẽ đi đến bộ điều khiển controlled/admin.js và thêm vào 1 action post edit product nhận 3 đối số req, res, next, tất cả các chức năng của phần mềm trung gian. Về cơ bản, chúng ta muốn tạo ra 1 sp mới và thay thế sp hiện có bằng sp này.
- Điều này chúng ta sẽ làm việc việc trên models/product.js. Trong đó chúng ta nhận 1 phương thức save. Và bây giờ chúng ta đã sử dụng nó để tạo ra 1 sp mới. Bây giờ ta có thể sử dụng nó để cập nhật 1 sp hiện có nếu chúng ta đã có nó.  
  Để làm điều này, trong save ta chỉ cần kiểm tra xem chúng ta đã có id chưa và do đó, khi tạo 1 sp mới, ta cũng nên chấp nhận 1 id và sau đó đặt id bằng id nhưng chúng ta chỉ cần truyền null ở đây cho 1 sp hoàn toàn mới để chúng ta vẫn có thể tạo ra các sp chưa có id thì id sẽ được chỉ định ở đây. Nhưng nếu ta đang chỉnh sửa 1 cái, chúng ta đã có id nên ta có thể chỉ định nó ở đây. Và sau đó là ở save(), ta có thể chỉ cần kiểm tra xem id này đã tồn tại chưa, nếu đó là null. điều này sẽ ko thành công và sẽ tự động chuyển xuống dòng tiếp theo mà chúng ta muốn nhưng nêys chúng ta có id, save ko nên tạo 1 id mới và sp mới, thay vào đó, nó chỉ cập nhật cái hiện có. Tuy nhiên chúng ta vẫn sẽ phải lấy tất cả các sp, vì vậy điều này nên được chuyển vào câlback bởi vì chúng ta luôn cần tất cả các sp và việc tạo id cũng có thể truyền vào đó nhưng sau câu lệnh if này.

Bây giờ trong câu lệnh if này, ta muốn cập nhật sp hiện có. Để làm điều này, ta cần phải tùm nó trước. Vì vậy ta sẽ tìm lại chỉ mục sp hiện có existingProductIndex bằng cách tìm kiếm hoặc xem qua tất cả các sp của tôi với với phương thức tìm kiếm index (findIndex). Nếu tìm thấy chỉ mục sp ta muốn chinhr sửa và bây giờ ta chỉ cần thay thế trong mảng sp đó. Lưu trữ chúng trong 1 mảng mới và sau đó trên mảng updateProduct ta sẽ thay thế chỉ mục sp hiện có của mình bởi this.

Hàm save có thể sử dụng cả để thêm sản phẩm mới hoặc chỉnh sửa sp hiện có

```javascript
save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
```

this: bạn phải tưởng tượng rằng ta tạo 1 phiên bản sp mới, ta sẽ điền vào đó thông tin sp hiện có và sau đó tôi chỉ cần gọi hàm save và tôi sẽ phát hiện ra rằng tôi đã có sp này và do đó, tôi chỉ cần thay thế nó trong mảng được lưu trữ trong tệp với sp tôi mới tạo. Vì vậy với việc đã lưu, ta chỉ cần ghi thông tin đó vào tệp

- Đi đến admin.js controller, hàm postAddProduct cần đặt null làm id, làm đối số đầu tiển ở phương thức khởi tạo sản phẩm. Nếu nó là null thì sẽ thực hiện thêm sp mới ở hàm save, sau block else{}.
- Tiếp theo sẽ tạo dựng phương thức đăng edit product postEditProduct ở contrlled/admin.js.

* Trước hết ta cần nạp thông tin cho sp, sau đó ta cần tạo 1 phiên bản sp mới và điền vào đó với thông tin đó và sau đó ta lưu lại

- edit-product.ejs
  <% if (editing) { %>
  <input type="hidden" value="<%= product.id %>" name=""productId>
  <% } %>

Bây giờ có thể trích xuất productId theo name trong yêu cầu đến trong controlled
