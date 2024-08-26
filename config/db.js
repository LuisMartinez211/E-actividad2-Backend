const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://martinezstanislaolufe:vs0y2j5hZjwl9WW6@clusterluis.x1mw6.mongodb.net/actividad2?retryWrites=true&w=majority&appName=ClusterLuis', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
