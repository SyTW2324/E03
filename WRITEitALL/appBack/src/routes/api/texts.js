//Gestiona las rutas de la api de textos
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Text = require('../../models/text.model');
const User = require('../../models/user.model');
const mongoose = require('mongoose');

//Peticiones GET (leer)
router.get('/', async (req, res) => {
    try {
        const texts = await Text.find();
         res.json(texts);
         } catch (error) {
             res.json({error: error.message});
         }
});
router.get('/count/:id', async (req, res) => {
    try {
    const count = await Text.countDocuments({creator: req.params.id});
    res.json(count);
    } catch (error) {
        res.json({error: error.message});
    }
});

router.get('/user/:token', async (req, res) => {
        
    try {
        const user_token  = jwt.decode(req.params.token);
        const userId = user_token.user_id;
        const creatorObjectId = new mongoose.Types.ObjectId(userId);
        const texts = await Text.find({creator: creatorObjectId});
        res.json(texts);
    
    } catch (error) {
        res.json({error: error.message});
    }
});

router.get('/public', async (req, res) => {
    try {
        const texts = await Text.find({private: false});
        res.json(texts);
    } catch (error) {
        res.json({error: error.message});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const textId  = req.params.id;
    const text = await Text.findById(textId);
    //Buscar el usuario por el creator y añadir el username al envio
    const user = await User.findById(text.creator);
    const response = {
        "title": text.title,
        "description": text.description,
        "content": text.content,
        "likes": text.likes,
        "comments": text.comments,
        "explicit": text.explicit,
        "private": text.private,
        "username": user.name
    }
    res.json(response);
    } catch (error) {
        res.json({error: error.message});
    }
});

//Peticiones POST (crear)
router.post('/', async (req, res) => {
    //TODO: validar los datos del req.body
    try {
        if(!req.body.title || req.body.title.length < 3) {
            res.json({success: false, error: "Title is required and must be at least 3 characters long"});
        } else if (!req.body.creator) {
            res.json({success: false, error: "Creator is required"});
        } else if (!req.body.description) {
            res.json({success: false, error: "Description is required"});
        } else if (!req.body.content) {
            res.json({success: false, error: "Content is required"});
        } else {
            if (!req.body.likes) {
                req.body.likes = 0;
            }
            if (!req.body.comments) {
                req.body.comments = [];
            }
            if (!req.body.explicit) {
                req.body.explicit = false;
            }
            if (!req.body.private) {
                req.body.private = false;
            }
            //En creator viene el jwt, hay que desencriptarlo para obtener el id del usuario
            const token = req.headers['authorization'];
            const decoded = jwt.verify(token, process.env.SECRET);
            req.body.creator = decoded.user_id;
            const text = await Text.create(req.body);
            res.json({success: true, message: 'Text created successfully!', textId: text._id});
        }
    } catch (error) {
        res.json({success: false, error: error.message});
    }
});

router.post('/:id', async (req, res) => {
    try {
        //Check if creator is the same as the id in token
        const token = req.params.token;
        const creator = await Text.findById(req.params.id);
        const creatorId = creator.creator;
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.user_id !== creatorId) {
            res.json({success: false, error: 'You are not authorized to edit this text'});
            return;
        } else {
            res.json({success: true, message: 'User allowed!'});
        }

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