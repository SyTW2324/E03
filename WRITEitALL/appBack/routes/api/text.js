//Gestinoa las rutas de la api de textos
const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({user: "Usuario", group: "Grupo"});
});

router.get('/:id', (req, res) => {
    res.send(console.log("Usuario en concreto"));
});

module.exports = router;