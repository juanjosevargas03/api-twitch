const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log(`mongo DB is connected`))
  .catch((err) => console.log(err));