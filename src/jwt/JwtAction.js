import jwt from 'jsonwebtoken';
require('dotenv').config()

const jwtSign = async (data) => {
    let token = await jwt.sign({
        data: data
    },
        process.env.JWT_KEY,
        { expiresIn: '1d' });

    return token;
}

const jwtDecoded = async (token) => {
    let decoded = null;
    try {
        decoded = await jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            decoded = "JwtError";
        }
    }
    return decoded;
}

module.exports = {
    jwtSign, jwtDecoded
}