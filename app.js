const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');

const app = express();

//cấu hình thêm template động với công cụ pug
// app.set('view engine', 'pug');
// app.set('views', 'views');

//lam viec voi handlebars
const expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs());
app.set('view engine', 'hbs'); //hbs cũng chính là tên đuôi .hbs ta sẽ sử dụng tạo file .hbs ở views, có thể đặt tên bất kì
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3001);
