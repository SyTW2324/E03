//Gestionador de rutas de la api
const router = require('express').Router();

router.use('/text', require('./api/text'));

router.use('/users', require('./api/users'));
module.exports = router;