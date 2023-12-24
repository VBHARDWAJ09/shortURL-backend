const express = require('express')
const app = express()
const constants = require('./config/constants')
const connect = require('./config/db')
const url = require('./routes/url')
const user = require('./routes/user')
const cors = require('cors')
const { swaggerServe, swaggerSetup } = require('./services/swagger')

connect()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerServe, swaggerSetup)
app.get('/', (req, res) => {
    return res.json({ message: 'Welcome' })
})

app.use('/api', url)
app.use('/api', user)

app.listen(constants.port, () => console.log(`Example app listening on port ${constants.port}!`))