const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(config.dbURL2, {
    dbName: 'phonestore',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};
