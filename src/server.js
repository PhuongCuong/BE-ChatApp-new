import express from 'express';
import ConnectDB from './config/ConnectDB'
import bodyParser from 'body-parser';
import initAPIWebRoutes from './routes/api'
import configCORS from './config/ConfigCORS'
import cookieParser from 'cookie-parser'

require('dotenv').config()
const app = express();
const port = process.env.PORT || 8081

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//config cookie
app.use(cookieParser())

//config connection DB
ConnectDB()

//config cors
configCORS(app)

//config init web routes
initAPIWebRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})