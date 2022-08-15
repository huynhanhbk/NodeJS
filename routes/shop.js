const path = require('path');

const rootDir = require('../util/path');

const express = require('express');

const adminData = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  const products = adminData.products;

  //gọi file shop.pug
  //hbs: thêm hasProducts: products.length > 0 vào để xác định độ dài mảng > 0
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop cua Huynh',
    path: '/',
    hasProducts: products.length > 0,
  });
});

module.exports = router;
