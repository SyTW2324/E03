//Gestinoa las rutas de la api de textos
const router = require('express').Router();

const Text = require('../../models/text.model');

//Peticiones GET (leer)
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

//Peticiones POST (crear)
router.post('/', async (req, res) => {
    //TODO: validar los datos del req.body
    try {
        const text = await Text.create(req.body);
        res.json(text);
    } catch (error) {
        res.json({error: error.message});
    }
});

//Peticiones PUT (actualizar)
router.put('/:id', async (req, res) => {
    try {
        const textId = req.params.id;
        const updatedText = await Text.findByIdAndUpdate(textId, req.body, {new: true});
        res.json(updatedText);
    } catch (error) {
            res.json({error: error.message});
    }
});

//Peticiones DELETE (borrar)
router.delete('/:id', async (req, res) => {
    try {
        const textId = req.params.id;
        const text = await Text.findByIdAndDelete(textId);
        res.json(text);
    } catch (error) {
        res.json({error: error.message});
    }
});

module.exports = router;