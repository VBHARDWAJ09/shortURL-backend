const express = require('express')
const app = express()
const constants = require('./config/constants')
const connect = require('./config/db')
const url = require('./routes/url')
const cors = require('cors')

connect()

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    return res.json({ message: 'Welcome' })
})

app.use('/api', url)

app.listen(constants.port, () => console.log(`Example app listening on port ${constants.port}!`))