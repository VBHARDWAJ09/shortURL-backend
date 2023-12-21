const { body } = require('express-validator')

module.exports.createUrlValidations = [
    body('url').not().isEmpty().trim().escape().withMessage('Url is required')
]