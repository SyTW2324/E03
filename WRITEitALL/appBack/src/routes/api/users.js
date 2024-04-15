//Gestinoa las rutas de la api de users
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

//Get all users
router.get('/', async (req, res) => {
    try {
   const users = await User.find();
    res.json(users);
    } catch (error) {
        res.json({succes: false, error: "No se ha podido encontrar los usuarios"});
    }
});

//Get user by id
router.get('/:id', async (req, res) => {
    try {
        const userId  = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
    } catch (error) {
        res.json({succes: false, error: "No se ha podido encontrar el usuario"});
    }
});


//Register new user
router.post('/register', async (req, res) => {
    try {
        //Validar datos de entrada
        if (!req.body.name || req.body.name.length < 3) {
            res.json({success: false, error: "Name is required and must be at least 3 characters long"});
            return;
        } else if (!req.body.password || req.body.password.length < 6) {
            res.json({success: false, error: "Password is required and must be at least 6 characters long"});
        } else if (!req.body.email) {
            res.json({success: false, error: "Email is required"});
        } else {
            //Encriptar password
            req.body.password = bcrypt.hashSync(req.body.password, 12);
            //Comprobar que el email no está en la base de datos.
            req.body.description = "";
            const user = await User.findOne({email: req.body.email})
            if (user === null) {
                await User.create(req.body);
                res.json({success: true, message: 'User registered successfully!'});
            }  else {
                res.json({success: false, error: 'Email already registered'});
            }
        }
    } catch (error) {
        res.json({error: error.message});
    }
});


//Login user
router.post('/login', async (req, res) => {
    try {
        //Validar datos de entrada
        if (!req.body.password || req.body.password.length < 6) {
            res.json({success: false, error: "Password is required and must be at least 6 characters long"});
        } else if (!req.body.email) {
            res.json({success: false, error: "Email is required"});
        } else {
            //Buscar usuario en la base de datos
        const user = await User.findOne({email: req.body.email})
            if (user === null) {
                res.json({success: false, error: 'Email not found'});
                
            }  else {
                //Comprobar que la contraseña es correct
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.json({_id: user._id, success: true, token: createToken(user)});
                } else {
                    res.json({success: false, error: 'Password incorrect'});
                }
            }
        }
    } catch (error) {
        res.json({error: error.message});
    }
});

router.get('/token/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const user = jwt.verify(token, process.env.SECRET);
        res.json(user);
    } catch (error) {
        res.json({error: error.message});
    }
});
//update user
router.put('/:id', async (req, res) => {
    try {
        const userId  = req.params.id;
    const user = await User.findByIdAndUpdate(userId, req.body);
    res.json(user);
    } catch (error) {
        res.json({succes: false, error: "No se ha podido encontrar el usuario"});
    }
});

function createToken(user) {
    const payload = {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'});
}
module.exports = router;