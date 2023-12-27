const mongoose = require('mongoose');

const { NODE_ENV, MONGO_URI, MONGO_URI_TEST } = process.env;
const connectionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;
mongoose.connect(connectionString);