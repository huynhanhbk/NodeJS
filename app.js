const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//const db = require('./util/database');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
//xac dinh moi quan he trang buoc, va khi xoa nguoi dung thi viec xoa cung dc thu hien cho sp
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync({ force: true }) //ghi de
  .sync()
  .then((result) => {
    return User.findById(1);
    //console.log(result);
    //app.listen(3000);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user; //lời hứa sẽ giải quyết ngay cho người dùng
    //Promise.resolve(user): điều này có thể bỏ qua vì nếu bạn trả về 1 return trong then
    // thì nó sẽ tự động trả về 1 promise mới
  })
  .then((user) => {
    //console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//app.listen(3000);
