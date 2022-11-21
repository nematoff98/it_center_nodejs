require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
require('./models/models')
const clientRouter = require('./routes/client')
const adminRouter = require('./routes/admin')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/ErrorMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5002

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/client', clientRouter)
app.use('/api/admin', adminRouter)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`${PORT} listen...`))
    } catch (err) {
        console.error(err, "start funksiya xatosi");
    }
}


start().then(_ => console.log('start'));
