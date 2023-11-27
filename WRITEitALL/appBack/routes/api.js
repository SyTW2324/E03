//Gestionador de rutas de la api
const router = require('express').Router();

router.use('/texts', require('./api/texts'));

router.use('/users', require('./api/users'));

module.exports = router;