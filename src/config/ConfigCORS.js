import cors from 'cors'
require('dotenv').config();

const configCORS = (app) => {
    // app.use(cors({
    //     origin: ["*"],
    //     allowedHeaders: [
    //         'Content-Type'
    //     ],
    //     methods: "GET,PUT,POST,DELETE",

    //     credentials: true
    // }));
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', process.env.URL_CLIENT);
        res.header('Access-Control-Allow-Headers', true);
        res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });
}

export default configCORS;