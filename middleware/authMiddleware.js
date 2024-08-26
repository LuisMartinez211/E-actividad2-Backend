const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar el token JWT
module.exports = function(req, res, next) {
    // Obtener el token de la cabecera Authorization
    const token = req.header('Authorization');
    
    // Verificar si no se ha proporcionado token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token.split(' ')[1], 'secret'); // Reemplaza 'secret' con la clave secreta real usada en tu app
        req.user = decoded.user;
        next(); // Continuar con la siguiente función middleware o ruta
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Middleware para verificar el rol de administrador
module.exports.isAdmin = async function(req, res, next) {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied: Admins only' });
        }
        next(); // Continuar con la siguiente función middleware o ruta
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
