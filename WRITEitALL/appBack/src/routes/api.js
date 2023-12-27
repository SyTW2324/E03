//Gestionador de rutas de la api
const router = require('express').Router();
const { checkToken }= require('../utils/middlewares');

router.use('/texts', checkToken, require('./api/texts'));

router.use('/users', require('./api/users'));

module.exports = router;