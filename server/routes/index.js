const express = require('express');
const Router = express.Router();

Router.use(require('./user'));
Router.use(require('./order'));

module.exports = Router;