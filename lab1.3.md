# Lab 1.3: Gửi Response

**setHeader():**
Content-type: là header mặc định mà trình duyệt biết và hiểu, và chấp nhận. Sau đó giá trị thứ 2, chúng ta đặt giá trị cho Header này, chúng ta có thể gửi cái này đến, hoặc đặt cái này thành text/html. ĐIều này sẽ đính kèm 1 header vào response, nơi chúng ta về cơ bản truyền 1 số siêu dữ liệu.

**res.write()**: cho phép chúng ta ghi 1 số dữ liệu vào response và điều này về cơ bản có thể nói nó hoạt động theo các phần hoặc trong nhiều dòng, ta có thể viết nhiều dòng response.

**end()**: gọi end() để bây giờ ta không được viết thêm nữa. Ko đc write()
