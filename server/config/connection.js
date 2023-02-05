const mongoose = require ('mongoose');
const url = process.env.MONGO_URL

/* MONGOOSE SETUP */

mongoose.connect('mongodb://127.0.0.1:27017/tyro-sounds', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;