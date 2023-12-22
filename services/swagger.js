const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJSDoc = YAML.load("api.yaml")

module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJSDoc) }