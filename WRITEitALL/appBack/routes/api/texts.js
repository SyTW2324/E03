//Gestinoa las rutas de la api de textos
const router = require('express').Router();

const Text = require('../../models/text.model');
router.get('/', async (req, res) => {
    try {
        const texts = await Text.find();
         res.json(texts);
         } catch (error) {
             res.json({error: error.message});
         }
});

router.get('/:id', async (req, res) => {
    try {
        const textId  = req.params.id;
    const text = await Text.findById(textId);
    res.json(text);
    } catch (error) {
        res.json({error: error.message});
    }
});

module.exports = router;