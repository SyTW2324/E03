//Gestinoa las rutas de la api de users
const router = require('express').Router();

const User = require('../../models/user.model');
router.get('/', async (req, res) => {
    try {
   const users = await User.find();
    res.json(users);
    } catch (error) {
        res.json({error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userId  = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
    } catch (error) {
        res.json({error: error.message});
    }
});

module.exports = router;