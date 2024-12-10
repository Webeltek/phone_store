const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3100,
        dbURL: 'mongodb://localhost:27017/phonestore',
        dbURL2 : 'mongodb+srv://webeltek2017:ZF84naO6jtJ6hyGE@cluster0.nwffn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        origin: ['http://localhost:5555', 'http://localhost:4300']
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];
