//Gestionador de rutas de la api
const router = require('express').Router();

router.use('/text', require('./api/text'));

module.exports = router;