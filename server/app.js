if (process.NODE_ENV === 'development' || !process.NODE_ENV === 'development') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const PORT = process.env.PORT || 3020;

//db Connect
require('./db.connect')();

//Socketio
require('./Socket')(server);

//app use
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.use(require('./routes'));
app.use(require('./middlewares/errHandler'));


server.listen(PORT, () => console.log(`Server started on ${PORT}`))


