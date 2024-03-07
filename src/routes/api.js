import express from 'express'
import userController from '../controller/userController';
import { verifyaccount } from '../middleware/verifyAccount'

const router = express.Router()

const initAPIWebRoutes = (app) => {

    router.get('/', (req, res) => {
        res.send('Hello World!')
    })

    router.post("/register", userController.register)
    router.post("/login", userController.login)

    router.get("/account", verifyaccount, userController.account)


    app.use('/api/v1', router)
}

export default initAPIWebRoutes;