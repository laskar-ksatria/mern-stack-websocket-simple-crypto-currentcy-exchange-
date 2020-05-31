const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We are connected to mongoose')
    });
};

module.exports = dbConnect;



