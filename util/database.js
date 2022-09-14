const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db; //_ thể hiện biến này chỉ sử dụng nội bộ trong tệp này

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://test:i54hWgheQw8CHbkr@anhhuynhcluster.o9kycbf.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//kiem tra xem db da dc thiet lap chua?
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

//module.exports = mongoConnect;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', '12345', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

// module.exports = sequelize;
