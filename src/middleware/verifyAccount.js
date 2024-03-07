import { jwtDecoded, jwtSign } from '../jwt/JwtAction';
import User from '../modules/user';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()


const verifyaccount = async (req, res, next) => {
    try {
        let access_token = req.cookies?.access_token;
        let refresh_token = req.cookies?.refresh_token;
        if (access_token && refresh_token) {
            let decoded = await jwtDecoded(access_token);
            if (decoded === "JwtError") {
                let user = await User.findOne({
                    refresh_token: refresh_token
                }).exec();

                if (user.exp_refresh_token < new Date()) {
                    let refresh_tokenud = await uuidv4();
                    let date = new Date();
                    date.setDate(date.getDate() + 15)
                    // date.setSeconds(date.getSeconds() + 30);

                    await User.findOneAndUpdate(
                        {
                            email: user.email,
                            phoneNumber: user.phoneNumber
                        },
                        {
                            refresh_token: refresh_tokenud,
                            exp_refresh_token: date
                        },
                        { upsert: true }
                    )
                    let data = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber
                    }
                    let access_tokenup = await jwtSign(data);
                    res.cookie('access_token',
                        access_tokenup,
                        { maxAge: +process.env.EXP_ACCESS_TOKEN, httpOnly: true });

                    res.cookie('refresh_token',
                        refresh_tokenud,
                        { maxAge: +process.env.EXP_REFRESH_TOKEN, httpOnly: true });
                } else {
                    let data = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber
                    }
                    let access_tokenup = await jwtSign(data)

                    res.cookie('access_token',
                        access_tokenup,
                        { maxAge: +process.env.EXP_ACCESS_TOKEN, httpOnly: true });
                }

                req.user = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    is_online: user.is_online
                }

                next();
            } else {
                let user = await User.findOne({
                    email: decoded?.data?.email,
                    phoneNumber: decoded?.data?.phoneNumber
                }).exec();
                req.user = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    is_online: user.is_online
                }
                next()
            }
        } else {
            return res.status(403).json({
                EC: 1,
                EM: "you not authentication",
                DT: ''
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyaccount
}