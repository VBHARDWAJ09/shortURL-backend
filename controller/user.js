const { validationResult } = require('express-validator')
const userModal = require('../model/user')
const { hashedPassword, comparePassword, createToken } = require('../services/authServices')

const registerController = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            const userExist = await userModal.findOne({ email })
            if (!userExist) {
                const _password = await hashedPassword(password)
                await userModal.create({ email, password: _password, name })
                return res.status(200).json({ msg: `User Registered successfully. Please Login` })
            } else {
                return res.status(203).json({ errors: [{ msg: `User Already Exist` }] })
            }
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: err.message }] })
        }
    } else {
        return res.status(400).json({ errors: errors.array() })
    }
}

const loginController = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { email, password } = req.body;
        try {
            const user = await userModal.findOne({ email })
            if (user) {
                const passwordMatch = await comparePassword(password, user.password)
                if (passwordMatch) {
                    const token = await createToken({ id: user._id, name: user.name })
                    return res.status(200).json({ msg: "Login successful", token })
                } else {
                    return res.status(204).json({ errors: [{ msg: `Incorrect password` }] })
                }
            } else {
                return res.status(203).json({ errors: [{ msg: `User doest not exist` }] })
            }
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: err.message }] })
        }
    } else {
        return res.status(400).json({ errors: errors.array() })
    }
}

module.exports = { registerController, loginController }