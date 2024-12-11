const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3100,
        dbURL: 'mongodb://127.0.0.1:27017/phonestore',
        origin: ['http://localhost:5555', 'http://localhost:4300']
    },
    production: {
        port: process.env.PORT || 3100,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: ['https://phone-store-jocg.onrender.com']
    }
};

module.exports = config[env];
