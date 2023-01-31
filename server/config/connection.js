const mongoose = require ('mongoose');

/* MONGOOSE SETUP */

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})

module.exports = mongoose.connection;