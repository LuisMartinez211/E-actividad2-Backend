const express = require('express');
const path = require('path'); // Importar path para manejar rutas de archivos
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors()); // Agregar CORS
app.use(express.json());

// Servir la carpeta 'uploads' de manera estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // Asegúrate de que esta línea esté presente

//app.use('/api/stats', require('./js/routes/stats'));
//app.use('/api/favorites', require('./routes/favorites'));
//app.use('/api/sales', require('./'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
