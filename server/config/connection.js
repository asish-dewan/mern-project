const mongoose = require ('mongoose');
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/tyro'

/* MONGOOSE SETUP */

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;