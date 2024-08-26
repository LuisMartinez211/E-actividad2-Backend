const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Ruta para obtener todos los usuarios
router.get('/', auth, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar un usuario
router.delete('/:id', auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener perfil del usuario autenticado
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Actualizar perfil del usuario autenticado
router.put('/profile', auth, async (req, res) => {
    const { name, email } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizar campos
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
