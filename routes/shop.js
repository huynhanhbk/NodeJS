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
  res.render('shop', { prods: products, docTitle: 'Shop cua Huynh' });
});

module.exports = router;
