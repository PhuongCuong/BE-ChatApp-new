import userServices from '../services/userServices'
require('dotenv').config()

const register = async (req, res) => {
    try {
        let data = await userServices.registerService(req.body)
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'error from server',
            DT: ''
        })
    }
}

const login = async (req, res) => {
    try {
        let data = await userServices.loginService(req.body)
        if (data && +data.EC === 0) {
            if (data.DT && data.DT.access_token !== null && data.DT.refresh_token !== null) {
                res.cookie('access_token',
                    data.DT.access_token,
                    { maxAge: +process.env.EXP_ACCESS_TOKEN, httpOnly: true });

                res.cookie('refresh_token',
                    data.DT.refresh_token,
                    { maxAge: +process.env.EXP_REFRESH_TOKEN, httpOnly: true });
            }
        }
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'error from server',
            DT: ''
        })
    }
}

const account = (req, res) => {

    try {
        setTimeout(() => {
            if (req.user) {
                return res.status(200).json({
                    EC: 0,
                    EM: 'verify account success',
                    DT: req.user
                })
            }
        }, 3000);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            EM: 'error from server',
            DT: ''
        })
    }
}

module.exports = {
    register, login, account
}