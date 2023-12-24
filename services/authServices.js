const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/constants')
const jwt = require('jsonwebtoken')

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed;
}

const comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword)
}

const createToken = async (user) => {
    return await jwt.sign(user, JWT_SECRET, {
        expiresIn: '7d'
    })
}
const authorized = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (headerToken) {
        try {
            const token = headerToken.split('auth ')[1];
            const verified = jwt.verify(token, JWT_SECRET);
            if (verified) {
                next()
            } else {
                return res.status(401).json({ errors: [{ msg: "Invalid Token mismatch" }] })
            }
        } catch (err) {
            return res.status(401).json({ errors: [{ msg: "Invalid Token" }] })
        }
    } else {
        return res.status(401).json({ errors: [{ msg: "Token is missing" }] });
    }
}
module.exports = { hashedPassword, comparePassword, createToken, authorized }