const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3100,
        dbURL: 'mongodb://localhost:27017/phonestore',
        origin: ['http://localhost:5555', 'http://localhost:4300']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];
