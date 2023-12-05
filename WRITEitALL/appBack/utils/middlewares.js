const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.json({ error: 'No autorizado' });
    }

    const token = req.headers['authorization'];
    
    try {
        jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return res.json({ error: 'Token no valido' });
    }
    next();
}

module.exports = { checkToken }