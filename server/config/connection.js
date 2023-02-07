const mongoose = require ('mongoose');

/* MONGOOSE SETUP */

mongoose.connect(/*process.env.MONGO_URI ||*/ 'mongodb://127.0.0.1:27017/tyro-sounds', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;