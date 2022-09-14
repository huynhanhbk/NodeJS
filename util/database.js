const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://test:i54hWgheQw8CHbkr@anhhuynhcluster.o9kycbf.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('Connected!');
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', '12345', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

// module.exports = sequelize;
